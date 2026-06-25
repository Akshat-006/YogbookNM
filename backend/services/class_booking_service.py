from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException

from core.database import get_database


async def create_class_booking(booking_data):
    db = get_database()

    # 1. Validate class_id
    if not ObjectId.is_valid(booking_data.class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")

    class_obj_id = ObjectId(booking_data.class_id)

    # 2. Check class exists
    class_item = await db["classes"].find_one({"_id": class_obj_id})
    if not class_item:
        raise HTTPException(status_code=404, detail="Class not found")

    # 3. Check class active
    if not class_item.get("is_active", True):
        raise HTTPException(status_code=400, detail="Class is not active")

    # 4. Check class time is not in past
    if class_item["schedule_datetime"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Cannot book past class")

    # 5. Prevent duplicate booking by same email for same class
    existing_booking = await db["class_bookings"].find_one({
        "class_id": booking_data.class_id,
        "email": booking_data.email,
        "booking_status": {"$ne": "cancelled"}
    })

    if existing_booking:
        raise HTTPException(
            status_code=400,
            detail="You have already booked this class"
        )

    # 6. Capacity check
    current_bookings = await db["class_bookings"].count_documents({
        "class_id": booking_data.class_id,
        "booking_status": {"$ne": "cancelled"}
    })

    if current_bookings >= class_item["capacity"]:
        raise HTTPException(status_code=400, detail="Class is full")

    # 7. Create booking
    new_booking = {
        "class_id": booking_data.class_id,
        "name": booking_data.name,
        "email": booking_data.email,
        "phone": booking_data.phone,
        "notes": booking_data.notes,
        "payment_status": "pending",
        "booking_status": "booked",
        "created_at": datetime.utcnow()
    }

    result = await db["class_bookings"].insert_one(new_booking)
    new_booking["_id"] = str(result.inserted_id)

    return new_booking


async def get_all_class_bookings():
    db = get_database()

    bookings = []
    cursor = db["class_bookings"].find().sort("created_at", -1)

    async for booking in cursor:
        booking["_id"] = str(booking["_id"])
        bookings.append(booking)

    return bookings


async def get_class_booking_by_id(booking_id: str):
    db = get_database()

    if not ObjectId.is_valid(booking_id):
        raise HTTPException(status_code=400, detail="Invalid booking ID")

    booking = await db["class_bookings"].find_one({"_id": ObjectId(booking_id)})

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking["_id"] = str(booking["_id"])
    return booking


async def update_class_booking(booking_id: str, booking_data):
    db = get_database()

    if not ObjectId.is_valid(booking_id):
        raise HTTPException(status_code=400, detail="Invalid booking ID")

    existing_booking = await db["class_bookings"].find_one(
        {"_id": ObjectId(booking_id)}
    )
    if not existing_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    update_data = booking_data.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    await db["class_bookings"].update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": update_data}
    )

    updated_booking = await db["class_bookings"].find_one(
        {"_id": ObjectId(booking_id)}
    )
    updated_booking["_id"] = str(updated_booking["_id"])

    return updated_booking


async def delete_class_booking(booking_id: str):
    db = get_database()

    if not ObjectId.is_valid(booking_id):
        raise HTTPException(status_code=400, detail="Invalid booking ID")

    existing_booking = await db["class_bookings"].find_one(
        {"_id": ObjectId(booking_id)}
    )
    if not existing_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    await db["class_bookings"].delete_one({"_id": ObjectId(booking_id)})

    return {"message": "Class booking deleted successfully"}