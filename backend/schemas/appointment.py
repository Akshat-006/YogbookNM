from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime



class AppointmentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    appointment_datetime: datetime
    meet_link: str | None = None
    notes: Optional[str] = None


class AppointmentUpdate(BaseModel):
    payment_status: Optional[str] = None
    appointment_status: Optional[str] = None
    meet_link: str | None = None
    notes: Optional[str] = None