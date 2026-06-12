from pydantic import BaseModel


class ClassCreate(BaseModel):
    title: str
    description: str
    instructor: str
    duration: int
    capacity: int
    price: float
    schedule: str


class ClassResponse(ClassCreate):
    id: str
    is_active: bool