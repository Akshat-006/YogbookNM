from fastapi import APIRouter
from api.v1.routers.auth import router as auth_router
from api.v1.routers.classes import router as classes_router
from api.v1.routers.class_bookings import router as class_bookings_router
from api.v1.routers.appointments import router as appointments_router
from api.v1.routers.dashboard import router as dashboard_router
from api.v1.routers.payments import router as payment_router
# from api.v1.routers.google_calendar import router as calendar_router
from api.v1.routers import user
from api.v1.routers import auth
from api.v1.routers.cms import router as cms_router


api_router = APIRouter()

api_router.include_router(auth_router, prefix="/admin")
api_router.include_router(classes_router)
api_router.include_router(class_bookings_router)
api_router.include_router(appointments_router)
api_router.include_router(dashboard_router)
api_router.include_router(payment_router)
# api_router.include_router(calendar_router)
api_router.include_router(user.router)
api_router.include_router(auth.router)
api_router.include_router(cms_router)