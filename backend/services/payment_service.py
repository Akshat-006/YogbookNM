import json
from typing import Any

import razorpay
from bson import ObjectId
from fastapi import HTTPException

from core.config import settings
from core.database import get_database
from services.dashboard_service import build_monthly_revenue_breakdown
from services.email_service import email_service
from utils.constants import PAYMENT_FAILED, PAYMENT_PAID, PAYMENT_PENDING
from utils.datetime import utc_now

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)


def normalize_razorpay_status(event_name: str | None, payment_status: str | None) -> str:
    event_name = (event_name or "").lower()
    payment_status = (payment_status or "").lower()

    if payment_status in {"captured", "paid", "success"} or event_name in {"payment.captured", "payment.paid"}:
        return PAYMENT_PAID

    if payment_status in {"failed", "refunded", "reversed"} or event_name in {"payment.failed", "payment.refunded", "payment.reversed"}:
        return PAYMENT_FAILED

    return PAYMENT_PENDING


async def _update_payment_and_booking_status(payment_record: dict[str, Any], status: str, payment_id: str | None = None):
    db = get_database()

    update_payload = {
        "status": status,
        "updated_at": utc_now(),
    }

    if payment_id:
        update_payload["razorpay_payment_id"] = payment_id

    await db["payments"].update_one(
        {"_id": payment_record["_id"]},
        {"$set": update_payload},
    )

    booking_payload = {
        "payment_status": status,
        "updated_at": utc_now(),
    }

    if status == PAYMENT_PAID:
        booking_payload["is_paid"] = True
    else:
        booking_payload["is_paid"] = False

    if payment_record.get("booking_id"):
        await db["class_bookings"].update_one(
            {"_id": ObjectId(payment_record["booking_id"])},
            {"$set": booking_payload},
        )


async def create_payment(booking_id: str, user_email: str):
    db = get_database()

    booking = await db["class_bookings"].find_one({
        "_id": ObjectId(booking_id)
    })

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking.get("email") != user_email:
        raise HTTPException(status_code=403, detail="You do not have permission to pay for this booking")
    
    amount = int(booking["amount"] * 100)

    try:
        order = client.order.create(
            {
                "amount": amount,
                "currency": "INR",
                "payment_capture": 1
            }
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to create Razorpay order: {exc}") from exc

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


async def verify_payment(payment_data, user_email: str | None = None):

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

        if user_email and payment.get("user_email") != user_email:
            raise HTTPException(status_code=403, detail="You do not have permission to verify this payment")

        await _update_payment_and_booking_status(
            payment,
            PAYMENT_PAID,
            payment_id=payment_data.razorpay_payment_id,
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
        payment = await db["payments"].find_one({
            "razorpay_order_id": payment_data.razorpay_order_id
        })

        if payment:
            await _update_payment_and_booking_status(payment, PAYMENT_FAILED)

    return {
        "success": False,
        "message": str(e)
    }
    
    
    
async def handle_webhook(payload: dict[str, Any], signature: str | None = None):
    if not payload:
        return {
            "success": False,
            "message": "Invalid webhook payload"
        }

    payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})
    if not payment_entity:
        return {
            "success": False,
            "message": "No payment entity found in webhook payload"
        }

    event_name = payload.get("event")
    status = normalize_razorpay_status(event_name, payment_entity.get("status"))

    if settings.RAZORPAY_WEBHOOK_SECRET:
        try:
            client.utility.verify_webhook_signature(
                json.dumps(payload, separators=(",", ":"), sort_keys=True),
                signature or "",
                settings.RAZORPAY_WEBHOOK_SECRET,
            )
        except Exception as exc:
            return {
                "success": False,
                "message": f"Invalid webhook signature: {exc}"
            }

    db = get_database()

    payment = None
    order_id = payment_entity.get("order_id")
    payment_id = payment_entity.get("id")

    if order_id:
        payment = await db["payments"].find_one({
            "razorpay_order_id": order_id
        })

    if not payment and payment_id:
        payment = await db["payments"].find_one({
            "razorpay_payment_id": payment_id
        })

    if not payment:
        return {
            "success": False,
            "message": "Payment record not found for webhook"
        }

    await _update_payment_and_booking_status(payment, status, payment_id=payment_id)

    if status == PAYMENT_PAID:
        try:
            await email_service.send_payment_email(
                payment["user_email"],
                payment["amount"],
            )
        except Exception as exc:
            print(f"Payment webhook email error: {exc}")

    return {
        "success": True,
        "message": "Webhook processed successfully",
        "status": status,
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

async def get_all_payments():

    db = get_database()

    payments = []

    cursor = db["payments"].find().sort(
        "created_at",
        -1
    )

    async for payment in cursor:

        payment["_id"] = str(payment["_id"])

        payments.append(payment)

    return payments

async def get_user_payments(
    email: str
):

    db = get_database()

    payments = []

    cursor = db["payments"].find({

        "user_email": email

    }).sort(

        "created_at",

        -1

    )

    async for payment in cursor:

        payment["_id"] = str(payment["_id"])

        payments.append(payment)

    return payments


async def get_payment_details(
    payment_id: str
):

    db = get_database()

    if not ObjectId.is_valid(payment_id):
        raise HTTPException(status_code=400, detail="Invalid payment ID")

    payment = await db["payments"].find_one({
        "_id": ObjectId(payment_id)
    })

    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")

    payment["_id"] = str(payment["_id"])
    return payment


async def get_payment_analytics():

    db = get_database()

    total = await db["payments"].count_documents({})

    successful_payments = await db["payments"].count_documents({
        "status": {"$in": [PAYMENT_PAID, "success"]}
    })

    pending_payments = await db["payments"].count_documents({
        "status": PAYMENT_PENDING
    })

    failed_payments = await db["payments"].count_documents({
        "status": PAYMENT_FAILED
    })

    revenue = 0
    paid_payments = []

    cursor = db["payments"].find({
        "status": {"$in": [PAYMENT_PAID, "success"]}
    })

    async for payment in cursor:
        amount = payment.get("amount", 0) or 0
        revenue += amount
        paid_payments.append(payment)

    monthly_revenue_breakdown = build_monthly_revenue_breakdown(paid_payments)

    return {
        "total_payments": total,
        "successful_payments": successful_payments,
        "pending_payments": pending_payments,
        "failed_payments": failed_payments,
        "total_revenue": revenue,
        "monthly_revenue_breakdown": monthly_revenue_breakdown,
    }


