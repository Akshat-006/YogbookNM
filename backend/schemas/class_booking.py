from pydantic import BaseModel, EmailStr
from typing import Optional


class ClassBookingCreate(BaseModel):
    class_id: str
    name: str
    email: EmailStr
    phone: str
    notes: Optional[str] = None


class ClassBookingUpdate(BaseModel):
    payment_status: Optional[str] = None
    booking_status: Optional[str] = None
    notes: Optional[str] = None