import razorpay
from core.database import get_database
from core.config import settings
from utils.datetime import utc_now
from utils.constants import *
from bson import ObjectId
from utils.constants import PAYMENT_PENDING
from services.email_service import email_service

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)

async def create_payment(booking_id: str):
    db = get_database()

    booking = await db["class_bookings"].find_one({
        "_id": ObjectId(booking_id)
    })

    if not booking:
        return {
            "success": False,
            "message": "Booking not found"
        }
    
    amount = int(booking["amount"] * 100)

    order = client.order.create(
    {
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1
    }
)
    

    payment = {
        "booking_id": booking_id,
        "class_id": booking["class_id"],
        "user_name": booking["name"],
        "user_email": booking["email"],
        "amount": booking["amount"],
        "currency": "INR",
        "status": PAYMENT_PENDING,
        "provider": "razorpay",
        "razorpay_order_id": order["id"],
        "razorpay_payment_id": None,
        "created_at": utc_now(),
        "updated_at": utc_now()
    }

    result = await db["payments"].insert_one(payment)

    return {
        "success": True,
        "payment_id": str(result.inserted_id),
        "order_id": order["id"],
        "amount": amount,
        "currency": "INR",
        "status": PAYMENT_PENDING
}


async def verify_payment(payment_data):

    db = get_database()

    try:

        client.utility.verify_payment_signature({
            "razorpay_order_id": payment_data.razorpay_order_id,
            "razorpay_payment_id": payment_data.razorpay_payment_id,
            "razorpay_signature": payment_data.razorpay_signature
        })

        payment = await db["payments"].find_one({
            "razorpay_order_id": payment_data.razorpay_order_id
        })

        if not payment:
            return {
                "success": False,
                "message": "Payment record not found"
            }

        await db["payments"].update_one(
            {
                "_id": payment["_id"]
            },
            {
                "$set": {
                    "status": PAYMENT_SUCCESS,
                    "razorpay_payment_id": payment_data.razorpay_payment_id,
                    "updated_at": utc_now()
                }
            }
        )

        await db["class_bookings"].update_one(
            {
                "_id": ObjectId(payment["booking_id"])
            },
            {
                "$set": {
                    "payment_status": "paid",
                    "is_paid": True,
                    "updated_at": utc_now()
                }
            }
        )

        try:
            await email_service.send_payment_email(
                payment["user_email"],
                payment["amount"]
                )
        except Exception as e:
            print(f"Payment email error: {e}")

        return {
            "success": True,
            "message": "Payment verified successfully"
        }

    except Exception as e:
        await db["payments"].update_one(
            {
                "razorpay_order_id": payment_data.razorpay_order_id
            },
            {
                "$set": {
                    "status": PAYMENT_FAILED,
                    "updated_at": utc_now()
                }
            }
        )

    return {
        "success": False,
        "message": str(e)
    }
    
    
    
async def get_payment_status(payment_id: str):

    db = get_database()

    payment = await db["payments"].find_one({
        "_id": ObjectId(payment_id)
    })

    if not payment:
        return {
            "success": False,
            "message": "Payment not found"
        }

    return {
        "success": True,
        "status": payment["status"]
    }

