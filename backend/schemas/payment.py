from pydantic import BaseModel
from typing import Literal

class CreatePayment(BaseModel):
    booking_id: str

class VerifyPayment(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class PaymentResponse(BaseModel):
    order_id: str
    amount: int
    currency: str = "INR"

class PaymentStatus(BaseModel):
    payment_status: Literal[
        "pending",
        "paid",
        "failed"
    ]