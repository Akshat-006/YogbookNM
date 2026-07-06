from core.database import get_database
from datetime import datetime

from utils.constants import PAYMENT_PAID, PAYMENT_PENDING


async def get_dashboard_stats():

    db = get_database()

    total_classes = await db["classes"].count_documents({})
    total_bookings = await db["class_bookings"].count_documents({})
    total_appointments = await db["appointments"].count_documents({})
    total_users = await db["users"].count_documents({})
    total_payments = await db["payments"].count_documents({})

    completed_payments = await db["payments"].count_documents({
        "status": {"$in": [PAYMENT_PAID, "success"]}
    })

    pending_payments = await db["payments"].count_documents({
        "status": PAYMENT_PENDING
    })

    revenue = 0

    payment_cursor = db["payments"].find({
        "status": {"$in": [PAYMENT_PAID, "success"]}
    })

    async for payment in payment_cursor:
        revenue += payment.get("amount", 0)

    monthly_revenue = {}

    payment_cursor = db["payments"].find({
        "status": {"$in": [PAYMENT_PAID, "success"]}
    })

    async for payment in payment_cursor:

        created = payment.get("created_at")

        if created:

            key = created.strftime("%b %Y")

            monthly_revenue[key] = (
                monthly_revenue.get(key, 0)
                +
                payment.get("amount", 0)
            )

    recent_payments = []

    cursor = db["payments"].find().sort(
        "created_at",
        -1
    ).limit(5)

    async for payment in cursor:

        recent_payments.append({

            "name": payment.get("user_name"),

            "amount": payment.get("amount"),

            "status": payment.get("status"),

            "date": payment.get("created_at")

        })

    upcoming_classes = []

    cursor = db["classes"].find({

        "schedule_datetime": {
            "$gte": datetime.utcnow()
        },

        "is_active": True

    }).sort(
        "schedule_datetime",
        1
    ).limit(5)

    async for item in cursor:

        upcoming_classes.append({

            "title": item["title"],

            "datetime": item["schedule_datetime"],

            "instructor": item["instructor_name"],

            "capacity": item["capacity"]

        })

    upcoming_appointments = []

    cursor = db["appointments"].find({

        "appointment_datetime": {
            "$gte": datetime.utcnow()
        },

        "appointment_status": "booked"

    }).sort(
        "appointment_datetime",
        1
    ).limit(5)

    async for appointment in cursor:

        upcoming_appointments.append({

            "name": appointment["name"],

            "datetime": appointment["appointment_datetime"]

        })

    return {

        "stats": {

            "total_classes": total_classes,

            "total_bookings": total_bookings,

            "total_appointments": total_appointments,

            "total_users": total_users,

            "total_payments": total_payments,

            "completed_payments": completed_payments,

            "pending_payments": pending_payments,

            "total_revenue": revenue

        },

        "monthly_revenue": monthly_revenue,

        "recent_payments": recent_payments,

        "upcoming_classes": upcoming_classes,

        "upcoming_appointments": upcoming_appointments

    }