from fastapi import APIRouter, Depends

from api.v1.deps import get_current_admin
from services.payment_service import (
    create_payment,
    get_payment_status,
    verify_payment
)
from schemas.payment import CreatePayment
from schemas.payment import VerifyPayment

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

#Payment creation endpoint temporary
@router.post("/create")
async def create(
    payment: CreatePayment
    # current_admin: str = Depends(get_current_admin)
):
    return await create_payment(payment.booking_id)

# Payment status endpoint
@router.get("/{payment_id}")
async def payment_status(
    payment_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await get_payment_status(payment_id)

# Payment verification endpoint
@router.post("/verify")
async def verify(
    payment: VerifyPayment,
    # current_admin: str = Depends(get_current_admin)
):
    return await verify_payment(payment)
