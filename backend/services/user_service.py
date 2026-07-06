from bson import ObjectId
from fastapi import HTTPException

from core.database import get_database


async def get_user_dashboard(email: str):

    db = get_database()

    bookings_cursor = db["class_bookings"].find({
        "email": email
    }).sort("created_at", -1)

    appointments_cursor = db["appointments"].find({
        "email": email
    }).sort("appointment_datetime", -1)

    payments_cursor = db["payments"].find({
        "user_email": email
    }).sort("created_at", -1)

    bookings = []

    async for booking in bookings_cursor:

        booking["_id"] = str(booking["_id"])

        bookings.append(booking)

    appointments = []

    async for appointment in appointments_cursor:

        appointment["_id"] = str(appointment["_id"])

        appointments.append(appointment)

    payments = []

    async for payment in payments_cursor:

        payment["_id"] = str(payment["_id"])

        payments.append(payment)

    return {
        "profile": {
            "email": email
        },

        "statistics": {
            "total_bookings": len(bookings),
            "total_appointments": len(appointments),
            "completed_payments": len(
                [
                    p for p in payments
                    if p["status"] == "success"
                ]
            )
        },

        "upcoming_classes": bookings[:5],

        "upcoming_appointments": appointments[:5],

        "recent_payments": payments[:10]
    }