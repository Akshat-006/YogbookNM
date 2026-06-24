from fastapi import APIRouter

from api.v1.routers.auth import router as auth_router

from api.v1.routers.classes import router as classes_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/admin")
api_router.include_router(classes_router)