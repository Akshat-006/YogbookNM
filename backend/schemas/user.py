from pydantic import BaseModel
from typing import Any


class UserProfile(BaseModel):
    email: str
    name: str | None = None
    phone: str | None = None


class UserDashboardResponse(BaseModel):
    profile: UserProfile
    appointments: list[Any]
    class_bookings: list[Any]
    payments: list[Any]


class UpdateUserProfileRequest(BaseModel):
    name: str | None = None
    phone: str | None = None
