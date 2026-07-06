from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException
from datetime import timedelta
from uuid import uuid4
from core.database import get_database

#Create Class
async def create_class(class_data):
    db = get_database()

    series_id = str(uuid4()) if class_data.recurring else None
    new_class = {
        "series_id": series_id,
        "title": class_data.title,
        "description": class_data.description,
        "instructor_name": class_data.instructor_name,
        "duration": class_data.duration,
        "capacity": class_data.capacity,
        "price": class_data.price,
        "schedule_datetime": class_data.schedule_datetime,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "meet_link": class_data.meet_link

    }

    result = await db["classes"].insert_one(new_class)

    if (
        class_data.recurring
        and
        class_data.recurring_type != "none"
        and
        class_data.recurring_until
    ):
        await generate_recurring_classes(
        class_data,
        series_id
    )
    new_class["_id"] = str(result.inserted_id)
        
    return new_class

# All Class
async def get_all_classes():
    db = get_database()

    classes = []
    cursor = db["classes"].find(
        {
            "schedule_datetime": {
                "$gte": datetime.utcnow()
            },
            "is_active": True
        }
    ).sort(
        "schedule_datetime",
        1
    )


    async for class_item in cursor:
        class_item["_id"] = str(class_item["_id"])
        classes.append(class_item)

    return classes

# Class by id
async def get_class_by_id(class_id: str):
    db = get_database()

    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")

    class_item = await db["classes"].find_one({"_id": ObjectId(class_id)})

    if not class_item:
        raise HTTPException(status_code=404, detail="Class not found")

    class_item["_id"] = str(class_item["_id"])
    return class_item

# Update Class 
async def update_class(class_id: str, class_data):
    db = get_database()

    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")

    existing_class = await db["classes"].find_one({"_id": ObjectId(class_id)})
    if not existing_class:
        raise HTTPException(status_code=404, detail="Class not found")

    update_data = class_data.model_dump(
        exclude_unset=True)

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

#Delete Class
async def delete_class(class_id: str):
    db = get_database()

    if not ObjectId.is_valid(class_id):
        raise HTTPException(status_code=400, detail="Invalid class ID")

    existing_class = await db["classes"].find_one({"_id": ObjectId(class_id)})
    if not existing_class:
        raise HTTPException(status_code=404, detail="Class not found")

    await db["classes"].delete_one({"_id": ObjectId(class_id)})

    return {"message": "Class deleted successfully"}

# Get classes for calendar view
async def get_classes_calendar():
    db = get_database()

    classes = []

    cursor = db["classes"].find(
        {
            "is_active": True
        }
    ).sort("schedule_datetime", 1)

    async for item in cursor:

        classes.append({
            "id": str(item["_id"]),
            "title": item["title"],
            "datetime": item["schedule_datetime"],
            "duration": item["duration"],
            "capacity": item["capacity"],
            "price": item["price"],
            "instructor": item["instructor_name"]
        })

    return classes

# Recurring Classes
async def generate_recurring_classes(
    class_data, series_id
):

    db = get_database()

    current_date = class_data.schedule_datetime

    interval = timedelta(days=1)

    if class_data.recurring_type == "weekly":

        interval = timedelta(days=7)

    while current_date < class_data.recurring_until:

        current_date += interval

        new_class = {

            **class_data.model_dump(),

            "series_id": series_id,

            "schedule_datetime": current_date,

            "created_at": datetime.utcnow(),

            "updated_at": datetime.utcnow()

        }

        await db["classes"].insert_one(
            new_class
        )

async def delete_recurring_classes(
    series_id: str
):
    db = get_database()

    await db["classes"].delete_many(
        {
            "series_id": series_id
        }
    )

    return {
        "message": "Future recurring classes deleted successfully"
    }