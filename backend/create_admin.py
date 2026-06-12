import asyncio

from core.database import connect_to_mongo, get_database
from utils.security import hash_password


async def create_admin():
    await connect_to_mongo()

    db = get_database()

    existing_admin = await db.admins.find_one(
        {"email": "admin@yogbook.com"}
    )

    if existing_admin:
        print("Admin already exists")
        return

    admin = {
        "email": "admin@yogbook.com",
        "password": hash_password("admin123"),
        "is_active": True
    }

    await db.admins.insert_one(admin)

    print("Admin created successfully")


if __name__ == "__main__":
    asyncio.run(create_admin())