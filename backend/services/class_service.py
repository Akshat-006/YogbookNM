from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException

from core.database import get_database


async def create_class(class_data):
    db = get_database()

    new_class = {
        "title": class_data.title,
        "description": class_data.description,
        "instructor_name": class_data.instructor_name,
        "duration": class_data.duration,
        "capacity": class_data.capacity,
        "price": class_data.price,
        "schedule_datetime": class_data.schedule_datetime,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

    result = await db["classes"].insert_one(new_class)

    new_class["_id"] = str(result.inserted_id)
    return new_class


async def get_all_classes():
    db = get_database()

    classes = []
    cursor = db["classes"].find().sort("schedule_datetime", 1)

    async for class_item in cursor:
        class_item["_id"] = str(class_item["_id"])
        classes.append(class_item)

    return classes


async def get_class_by_id(class_id: str):
    db = get_database()

    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")

    class_item = await db["classes"].find_one({"_id": ObjectId(class_id)})

    if not class_item:
        raise HTTPException(status_code=404, detail="Class not found")

    class_item["_id"] = str(class_item["_id"])
    return class_item


async def update_class(class_id: str, class_data):
    db = get_database()

    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")

    existing_class = await db["classes"].find_one({"_id": ObjectId(class_id)})
    if not existing_class:
        raise HTTPException(status_code=404, detail="Class not found")

    update_data = {
        key: value
        for key, value in class_data.dict(exclude_unset=True).items()
    }

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    update_data["updated_at"] = datetime.utcnow()

    await db["classes"].update_one(
        {"_id": ObjectId(class_id)},
        {"$set": update_data}
    )

    updated_class = await db["classes"].find_one({"_id": ObjectId(class_id)})
    updated_class["_id"] = str(updated_class["_id"])

    return updated_class


async def delete_class(class_id: str):
    db = get_database()

    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")

    existing_class = await db["classes"].find_one({"_id": ObjectId(class_id)})
    if not existing_class:
        raise HTTPException(status_code=404, detail="Class not found")

    await db["classes"].delete_one({"_id": ObjectId(class_id)})

    return {"message": "Class deleted successfully"}