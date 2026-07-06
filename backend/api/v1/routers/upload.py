from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from api.v1.deps import get_current_admin
from services.upload_service import (
    upload_image,
    delete_image
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/image")
async def upload(
    file: UploadFile = File(...),
    current_admin: str = Depends(get_current_admin)
):
    return await upload_image(file)


@router.delete("/{public_id}")
async def delete(
    public_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await delete_image(public_id)