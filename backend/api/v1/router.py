"""
API router for version 1.
Includes all the routers for different modules.
"""

from fastapi import APIRouter
from api.v1.routers import users, classes, bookings

api_router = APIRouter()

# Include routers from different modules
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(classes.router, prefix="/classes", tags=["classes"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])