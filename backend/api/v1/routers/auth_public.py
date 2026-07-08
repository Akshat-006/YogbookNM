from fastapi import APIRouter

from schemas.auth import (
    SendOTPRequest as SendOTPReq,
    VerifyOTPRequest as VerifyOTPReq,
)

from services.auth_service import (
    send_otp as send_otp_service,
    verify_otp as verify_otp_service,
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/send-otp")
async def send_otp_endpoint(data: SendOTPReq):
    return await send_otp_service(data.email)


@router.post("/verify-otp")
async def verify_otp_endpoint(data: VerifyOTPReq):
    return await verify_otp_service(data.email, data.otp)
