from fastapi import APIRouter, Depends

from api.v1.deps import get_current_user

from services.user_service import (
    get_user_dashboard
)

router = APIRouter(
    prefix="/user",
    tags=["User"]
)


@router.get("/dashboard")
async def dashboard(

    current_user: str = Depends(
        get_current_user
    )

):

    return await get_user_dashboard(
        current_user
    )