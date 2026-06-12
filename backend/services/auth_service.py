from core.database import get_database


async def get_admin_by_email(email: str):
    db = get_database()

    admin = await db.admins.find_one(
        {"email": email}
    )

    return admin