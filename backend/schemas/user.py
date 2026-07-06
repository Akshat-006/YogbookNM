from pydantic import BaseModel
from typing import Any


class UserDashboardResponse(BaseModel):
    profile: dict
    appointments: list[Any]
    class_bookings: list[Any]
    payments: list[Any]