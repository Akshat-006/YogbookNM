from pydantic import BaseModel


class PaymentCreate(BaseModel):
    amount: float
    entity_type: str
    entity_id: str


class PaymentResponse(PaymentCreate):
    id: str
    status: str
    razorpay_order_id: str