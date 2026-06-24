from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ClassCreate(BaseModel):
    title: str
    description: str
    instructor_name: str
    duration: int
    capacity: int
    price: float
    schedule_datetime: datetime


class ClassUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    instructor_name: Optional[str] = None
    duration: Optional[int] = None
    capacity: Optional[int] = None
    price: Optional[float] = None
    schedule_datetime: Optional[datetime] = None
    is_active: Optional[bool] = None