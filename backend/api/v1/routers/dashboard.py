from fastapi import APIRouter, Depends

from api.v1.deps import get_current_admin
from services.dashboard_service import get_dashboard_stats

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/")
async def dashboard(
    current_admin: str = Depends(get_current_admin)
):
    return await get_dashboard_stats()