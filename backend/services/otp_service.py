import random
from datetime import datetime, timedelta, UTC

from core.database import get_database
from services.email_service import email_service


OTP_EXPIRY_MINUTES = 5


def generate_otp():
    return str(random.randint(100000, 999999))

async def send_otp(email: str):
    db = get_database()

    otp = generate_otp()

    expires_at = datetime.now(UTC).replace(tzinfo=None) + timedelta(
        minutes=OTP_EXPIRY_MINUTES
    )

    await db["otp_verifications"].delete_many({
        "email": email
    })

    await db["otp_verifications"].insert_one({

        "email": email,

        "otp": otp,

        "verified": False,

        "expires_at": expires_at,

        "created_at": datetime.now(UTC).replace(tzinfo=None)

    })

    try:
        await email_service.send_otp_email(
            email,
            otp
        )
    except Exception as e:
        # Rollback created OTP record to avoid orphaned entries
        await db["otp_verifications"].delete_many({"email": email})
        # Raise HTTPException so frontend receives non-2xx and can show error
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail="Unable to send OTP right now")

    return {
        "success": True,
        "message": "OTP sent successfully"
    }

async def verify_otp(email: str, otp: str):

    db = get_database()

    record = await db["otp_verifications"].find_one({
        "email": email
    })

    if not record:
        return {
            "success": False,
            "message": "OTP not found"
        }

    if record["expires_at"] < datetime.now(UTC).replace(tzinfo=None):
        return {
            "success": False,
            "message": "OTP expired"
        }

    if record["otp"] != otp:
        return {
            "success": False,
            "message": "Invalid OTP"
        }

    await db["otp_verifications"].update_one(
        {
            "_id": record["_id"]
        },
        {
            "$set": {
                "verified": True
            }
        }
    )

    return {
        "success": True
    }