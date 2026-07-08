from datetime import datetime, timezone
from bson import ObjectId
from fastapi import HTTPException
from datetime import timedelta
from uuid import uuid4
from core.database import get_database

#Create Class
async def create_class(class_data):
    db = get_database()

    should_create_series = (
        class_data.recurring
        and class_data.recurring_type != "none"
        and class_data.recurring_until is not None
    )

    if should_create_series:
        series_id = str(uuid4())
        return await generate_recurring_classes(class_data, series_id)

    new_class = {
        "series_id": None,
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

    # Normalize datetimes to naive UTC to avoid aware/naive arithmetic errors
    if "schedule_datetime" in update_data and update_data["schedule_datetime"] is not None:
        sd = update_data["schedule_datetime"]
        if getattr(sd, "tzinfo", None) is not None:
            # convert to UTC then drop tzinfo
            sd = sd.astimezone(timezone.utc).replace(tzinfo=None)
        update_data["schedule_datetime"] = sd

    update_data["updated_at"] = datetime.utcnow()

    await db["classes"].update_one(
        {"_id": ObjectId(class_id)},
        {"$set": update_data}
    )

    if (
        existing_class.get("series_id")
        and "schedule_datetime" in update_data
    ):
        new_sd = update_data["schedule_datetime"]
        existing_sd = existing_class["schedule_datetime"]

        # normalize existing to naive UTC if needed
        if getattr(existing_sd, "tzinfo", None) is not None:
            existing_sd = existing_sd.astimezone(timezone.utc).replace(tzinfo=None)

        delta = new_sd - existing_sd

        if delta.total_seconds() != 0:
            cursor = db["classes"].find(
                {
                    "series_id": existing_class["series_id"],
                    "schedule_datetime": {"$gt": existing_sd},
                }
            )

            async for future_class in cursor:
                future_sd = future_class["schedule_datetime"]
                if getattr(future_sd, "tzinfo", None) is not None:
                    future_sd = future_sd.astimezone(timezone.utc).replace(tzinfo=None)
                new_datetime = future_sd + delta
                await db["classes"].update_one(
                    {"_id": future_class["_id"]},
                    {
                        "$set": {
                            "schedule_datetime": new_datetime,
                            "updated_at": datetime.utcnow(),
                        }
                    },
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

    created_class = None

    while True:
        new_class = {
            **class_data.model_dump(),
            "series_id": series_id,
            "schedule_datetime": current_date,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        result = await db["classes"].insert_one(new_class)
        new_class["_id"] = str(result.inserted_id)

        if created_class is None:
            created_class = new_class

        if class_data.recurring_until and current_date >= class_data.recurring_until:
            break

        current_date += interval

    return created_class

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