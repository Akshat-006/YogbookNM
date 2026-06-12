from pydantic import BaseModel, EmailStr
from typing import Optional


class AppointmentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    appointment_date: str
    appointment_time: str
    service_type: str
    notes: Optional[str] = None


class AppointmentResponse(AppointmentCreate):
    id: str
    status: str