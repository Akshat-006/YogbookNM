from collections import OrderedDict
from datetime import datetime, UTC
from typing import Any

from core.database import get_database
from utils.constants import PAYMENT_PAID, PAYMENT_PENDING


def build_monthly_revenue_breakdown(payments: list[dict[str, Any]]) -> list[dict[str, Any]]:
    monthly_totals: OrderedDict[tuple[int, int], float] = OrderedDict()

    for payment in payments:
        created_at = payment.get("created_at")
        if not created_at:
            continue

        if isinstance(created_at, datetime):
            month_dt = created_at
        elif isinstance(created_at, str):
            try:
                month_dt = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
            except ValueError:
                continue
        else:
            continue

        key = (month_dt.year, month_dt.month)
        monthly_totals[key] = monthly_totals.get(key, 0.0) + float(payment.get("amount", 0) or 0)

    return [
        {
            "month": datetime(year=key[0], month=key[1], day=1).strftime("%b %Y"),
            "revenue": round(value, 2),
        }
        for key, value in sorted(monthly_totals.items())
    ]


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
    paid_payments = []

    status_counts = {
        "paid": 0,
        "pending": 0,
        "failed": 0,
    }

    payment_cursor = db["payments"].find()

    async for payment in payment_cursor:
        status = payment.get("status")
        amount = float(payment.get("amount", 0) or 0)

        if status in {PAYMENT_PAID, "success"}:
            status_counts["paid"] += 1
            revenue += amount
            paid_payments.append(payment)

        elif status == PAYMENT_PENDING:
            status_counts["pending"] += 1
        elif status == PAYMENT_FAILED:
            status_counts["failed"] += 1

    monthly_revenue = {}
    for payment in paid_payments:
        created = payment.get("created_at")
        if not created:
            continue
        key = created.strftime("%b %Y")
        monthly_revenue[key] = monthly_revenue.get(key, 0) + float(payment.get("amount", 0) or 0)

    monthly_revenue_breakdown = build_monthly_revenue_breakdown(paid_payments)

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
            "$gte": datetime.now(UTC).replace(tzinfo=None)
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
            "$gte": datetime.now(UTC).replace(tzinfo=None)
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
            "total_revenue": revenue,
            "payment_counts": status_counts,
        },
        "monthly_revenue": monthly_revenue,
        "monthly_revenue_breakdown": monthly_revenue_breakdown,
        "recent_payments": recent_payments,
        "upcoming_classes": upcoming_classes,
        "upcoming_appointments": upcoming_appointments,
    }