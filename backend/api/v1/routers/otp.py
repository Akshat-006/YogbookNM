from fastapi import APIRouter

from schemas.otp_schema import (
    SendOTPRequest,
    VerifyOTPRequest
)

from services.otp_service import (
    send_otp,
    verify_otp
)

router = APIRouter(
    prefix="/otp",
    tags=["OTP"]
)


@router.post("/send")
async def send(data: SendOTPRequest):
    return await send_otp(data.email)


@router.post("/verify")
async def verify(data: VerifyOTPRequest):
    return await verify_otp(
        data.email,
        data.otp
    )