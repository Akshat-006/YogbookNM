from bson import ObjectId
from fastapi import HTTPException
from datetime import datetime

from core.database import get_database

async def create_cms(data):

    db = get_database()

    document = {

        **data.model_dump(),

        "created_at": datetime.utcnow(),

        "updated_at": datetime.utcnow()

    }

    result = await db["cms"].insert_one(document)

    document["_id"] = str(result.inserted_id)

    return document

# Get all cms
async def get_all_cms():

    db = get_database()

    cms = []

    cursor = db["cms"].find()

    async for item in cursor:

        item["_id"] = str(item["_id"])

        cms.append(item)

    return cms

# Get by key
async def get_cms_by_key(key: str):

    db = get_database()

    item = await db["cms"].find_one({

        "key": key,

        "is_active": True

    })

    if not item:

        raise HTTPException(

            status_code=404,

            detail="Content not found"

        )

    item["_id"] = str(item["_id"])

    return item

#Update Cms
async def update_cms(

    cms_id: str,

    data

):

    db = get_database()

    update = data.model_dump(

        exclude_unset=True

    )

    update["updated_at"] = datetime.utcnow()

    await db["cms"].update_one(

        {

            "_id": ObjectId(cms_id)

        },

        {

            "$set": update

        }

    )

    item = await db["cms"].find_one({

        "_id": ObjectId(cms_id)

    })

    item["_id"] = str(item["_id"])

    return item

# Delete Cms
async def delete_cms(

    cms_id: str

):

    db = get_database()

    await db["cms"].delete_one({

        "_id": ObjectId(cms_id)

    })

    return {

        "message": "CMS deleted."

    }