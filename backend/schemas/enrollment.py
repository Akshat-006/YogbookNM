from pydantic import BaseModel, EmailStr


class EnrollmentCreate(BaseModel):
    class_id: str
    name: str
    email: EmailStr
    phone: str


class EnrollmentResponse(EnrollmentCreate):
    id: str
    payment_status: str