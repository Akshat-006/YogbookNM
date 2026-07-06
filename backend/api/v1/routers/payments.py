from fastapi import APIRouter, Depends, Request

from api.v1.deps import (
    get_current_admin,
    get_current_user
)

from services.payment_service import (
    create_payment,
    verify_payment,
    handle_webhook,
    get_payment_status,
    get_all_payments,
    get_user_payments,
    get_payment_details,
    get_payment_analytics
)

from schemas.payment import (
    CreatePayment,
    VerifyPayment
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

#Payment creation endpoint temporary
@router.post("/create")
async def create(
    payment: CreatePayment,
    current_user: str = Depends(get_current_user)
):
    return await create_payment(payment.booking_id, current_user)

# Payment verification endpoint
@router.post("/verify")
async def verify(
    payment: VerifyPayment,
    current_user: str = Depends(get_current_user)
):
    return await verify_payment(payment, current_user)

@router.post("/webhook")
async def webhook(request: Request):
    payload = await request.json()
    signature = request.headers.get("X-Razorpay-Signature", "")
    return await handle_webhook(payload, signature)

@router.get("/")
async def all_payments(
    current_admin: str = Depends(
        get_current_admin
    )
):
    return await get_all_payments()

@router.get("/user/history")
async def payment_history(
    current_user: str = Depends(
        get_current_user
    )
):
    return await get_user_payments(
        current_user
    )

@router.get("/details/{payment_id}")
async def payment_details(
    payment_id: str,
    current_admin: str = Depends(
        get_current_admin
    )
):
    return await get_payment_details(
        payment_id
    )

@router.get("/analytics")
async def analytics(
    current_admin: str = Depends(
        get_current_admin
    )
):
    return await get_payment_analytics()

# Payment status endpoint
@router.get("/{payment_id}")
async def payment_status(
    payment_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await get_payment_status(payment_id)

