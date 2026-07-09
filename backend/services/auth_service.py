from datetime import datetime, timedelta, UTC
from fastapi import HTTPException

from core.database import get_database
from services.email_service import email_service
from services.otp_service import generate_otp
from utils.security import create_access_token
from utils.constants import OTP_EXPIRY_MINUTES


async def get_admin_by_email(email: str):
    db = get_database()
    return await db["admins"].find_one({"email": email})


async def send_otp(email: str):
    db = get_database()

    # Remove previous OTPs
    await db["otp_codes"].delete_many({
        "email": email
    })

    otp = generate_otp()

    expires_at = datetime.now(UTC).replace(tzinfo=None) + timedelta(
        minutes=OTP_EXPIRY_MINUTES
    )

    await db["otp_codes"].insert_one({
        "email": email,
        "otp": otp,
        "verified": False,
        "expires_at": expires_at,
        "created_at": datetime.now(UTC).replace(tzinfo=None)
    })

    await email_service.send_otp_email(
        email,
        otp
    )

    return {
        "success": True,
        "message": "OTP sent successfully"
    }


async def verify_otp(
    email: str,
    otp: str
):
    db = get_database()

    otp_doc = await db["otp_codes"].find_one({
        "email": email
    })

    if not otp_doc:
        raise HTTPException(
            status_code=404,
            detail="OTP not found"
        )

    if otp_doc["expires_at"] < datetime.now(UTC).replace(tzinfo=None):

        await db["otp_codes"].delete_one({
            "_id": otp_doc["_id"]
        })

        raise HTTPException(
            status_code=400,
            detail="OTP expired"
        )

    if otp_doc["otp"] != otp:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    await db["otp_codes"].update_one(
        {
            "_id": otp_doc["_id"]
        },
        {
            "$set": {
                "verified": True
            }
        }
    )

    # -----------------------------
    # Detect Role
    # -----------------------------

    role = "user"

    admin = await db["admins"].find_one({
        "email": email
    })

    if admin:
        role = "admin"

    token = create_access_token({
        "sub": email,
        "role": role
    })

    # OTP no longer needed
    await db["otp_codes"].delete_one({
        "_id": otp_doc["_id"]
    })

    return {
        "success": True,
        "access_token": token,
        "role": role
    }