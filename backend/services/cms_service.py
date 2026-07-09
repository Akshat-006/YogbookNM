from datetime import datetime, UTC
from bson import ObjectId
from fastapi import HTTPException

from core.database import get_database


async def create_cms(data):

    db = get_database()

    existing = await db["cms"].find_one(
        {
            "key": data.key
        }
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="CMS key already exists"
        )

    document = {

        **data.model_dump(),

        "created_at": datetime.now(UTC).replace(tzinfo=None),

        "updated_at": datetime.now(UTC).replace(tzinfo=None)

    }

    result = await db["cms"].insert_one(
        document
    )

    document["_id"] = str(
        result.inserted_id
    )

    return document


async def get_all_cms():

    db = get_database()

    cms = []

    cursor = db["cms"].find().sort(
        "created_at",
        -1
    )

    async for item in cursor:

        item["_id"] = str(item["_id"])

        cms.append(item)

    return cms


async def get_cms_by_key(
    key: str
):

    db = get_database()

    item = await db["cms"].find_one(
        {
            "key": key,
            "is_active": True
        }
    )

    if not item:

        raise HTTPException(
            status_code=404,
            detail="Content not found"
        )

    item["_id"] = str(item["_id"])

    return item


async def update_cms(
    cms_id: str,
    data
):

    db = get_database()

    if not ObjectId.is_valid(
        cms_id
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid CMS ID"
        )

    existing = await db["cms"].find_one(
        {
            "_id": ObjectId(cms_id)
        }
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="CMS not found"
        )

    update = data.model_dump(
        exclude_unset=True
    )

    if not update:
        raise HTTPException(
            status_code=400,
            detail="Nothing to update"
        )

    update["updated_at"] = datetime.now(UTC).replace(tzinfo=None)

    await db["cms"].update_one(
        {
            "_id": ObjectId(cms_id)
        },
        {
            "$set": update
        }
    )

    updated = await db["cms"].find_one(
        {
            "_id": ObjectId(cms_id)
        }
    )

    updated["_id"] = str(
        updated["_id"]
    )

    return updated


async def delete_cms(
    cms_id: str
):

    db = get_database()

    if not ObjectId.is_valid(
        cms_id
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid CMS ID"
        )

    existing = await db["cms"].find_one(
        {
            "_id": ObjectId(cms_id)
        }
    )

    if not existing:
        raise HTTPException(
            status_code=404,
            detail="CMS not found"
        )

    await db["cms"].delete_one(
        {
            "_id": ObjectId(cms_id)
        }
    )

    return {
        "message": "CMS deleted successfully"
    }