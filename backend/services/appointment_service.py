from datetime import datetime, timedelta
from bson import ObjectId
from fastapi import HTTPException

from core.database import get_database


APPOINTMENT_SLOT_MINUTES = 30


async def create_appointment(appointment_data):
    db = get_database()

    appointment_datetime = appointment_data.appointment_datetime

    # 1. Past datetime not allowed
    if appointment_datetime < datetime.utcnow():
        raise HTTPException(
            status_code=400,
            detail="Cannot book appointment in the past"
        )

    # 2. Force appointment to align with 30-min slots
    # allowed examples: 10:00, 10:30, 11:00, 11:30
    if appointment_datetime.minute not in [0, 30] or appointment_datetime.second != 0:
        raise HTTPException(
            status_code=400,
            detail="Appointment must be booked on 30-minute slot"
        )

    # 3. Check exact slot already booked or not
    existing_appointment = await db["appointments"].find_one({
        "appointment_datetime": appointment_datetime,
        "appointment_status": {"$ne": "cancelled"}
    })

    if existing_appointment:
        raise HTTPException(
            status_code=400,
            detail="This appointment slot is already booked"
        )

    # 4. Create appointment
    new_appointment = {
        "name": appointment_data.name,
        "email": appointment_data.email,
        "phone": appointment_data.phone,
        "appointment_datetime": appointment_datetime,
        "notes": appointment_data.notes,
        "payment_status": "pending",
        "appointment_status": "booked",
        "created_at": datetime.utcnow()
    }

    result = await db["appointments"].insert_one(new_appointment)
    new_appointment["_id"] = str(result.inserted_id)

    return new_appointment


async def get_all_appointments():
    db = get_database()

    appointments = []
    cursor = db["appointments"].find().sort("appointment_datetime", 1)

    async for appointment in cursor:
        appointment["_id"] = str(appointment["_id"])
        appointments.append(appointment)

    return appointments


async def get_appointment_by_id(appointment_id: str):
    db = get_database()

    if not ObjectId.is_valid(appointment_id):
        raise HTTPException(status_code=400, detail="Invalid appointment ID")

    appointment = await db["appointments"].find_one(
        {"_id": ObjectId(appointment_id)}
    )

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    appointment["_id"] = str(appointment["_id"])
    return appointment


async def update_appointment(appointment_id: str, appointment_data):
    db = get_database()

    if not ObjectId.is_valid(appointment_id):
        raise HTTPException(status_code=400, detail="Invalid appointment ID")

    existing_appointment = await db["appointments"].find_one(
        {"_id": ObjectId(appointment_id)}
    )
    if not existing_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_data = appointment_data.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    await db["appointments"].update_one(
        {"_id": ObjectId(appointment_id)},
        {"$set": update_data}
    )

    updated_appointment = await db["appointments"].find_one(
        {"_id": ObjectId(appointment_id)}
    )
    updated_appointment["_id"] = str(updated_appointment["_id"])

    return updated_appointment


async def delete_appointment(appointment_id: str):
    db = get_database()

    if not ObjectId.is_valid(appointment_id):
        raise HTTPException(status_code=400, detail="Invalid appointment ID")

    existing_appointment = await db["appointments"].find_one(
        {"_id": ObjectId(appointment_id)}
    )
    if not existing_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    await db["appointments"].delete_one({"_id": ObjectId(appointment_id)})

    return {"message": "Appointment deleted successfully"}