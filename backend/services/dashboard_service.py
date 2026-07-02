from core.database import get_database

async def get_dashboard_stats():
    db = get_database()

    total_classes = await db["classes"].count_documents({})
    total_bookings = await db["class_bookings"].count_documents({})
    total_appointments = await db["appointments"].count_documents({})
    total_users = await db["users"].count_documents({})
    total_payments = await db["payments"].count_documents({})

    completed_payments = await db["class_bookings"].count_documents({
        "payment_status": "paid"
    })

    pending_payments = await db["class_bookings"].count_documents({
        "payment_status": "pending"
    })

    revenue = 0

    cursor = db["class_bookings"].find({
        "payment_status": "paid"
    })

    async for booking in cursor:
        revenue += booking.get("amount", 0)

    return {
        "total_classes": total_classes,
        "total_bookings": total_bookings,
        "total_appointments": total_appointments,
        "completed_payments": completed_payments,
        "pending_payments": pending_payments,
        "total_revenue": revenue,
        "total_users": total_users,
        "total_payments": total_payments
    }