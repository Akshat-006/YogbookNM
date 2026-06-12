from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class AdminCreate(BaseModel):
    email: EmailStr
    password: str


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminResponse(BaseModel):
    id: str
    email: EmailStr
    is_active: bool
    created_at: Optional[datetime]