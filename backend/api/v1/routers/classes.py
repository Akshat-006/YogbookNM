from fastapi import APIRouter, Depends

from schemas.class_schema import ClassCreate, ClassUpdate
from services.class_service import (
    create_class,
    get_all_classes,
    get_class_by_id,
    update_class,
    delete_class
)
from api.v1.deps import get_current_admin

router = APIRouter(prefix="/classes", tags=["Classes"])


@router.post("")
async def create_new_class(
    class_data: ClassCreate,
    current_admin: str = Depends(get_current_admin)
):
    return await create_class(class_data)


@router.get("")
async def fetch_all_classes():
    return await get_all_classes()


@router.get("/{class_id}")
async def fetch_class_by_id(class_id: str):
    return await get_class_by_id(class_id)


@router.put("/{class_id}")
async def update_existing_class(
    class_id: str,
    class_data: ClassUpdate,
    current_admin: str = Depends(get_current_admin)
):
    return await update_class(class_id, class_data)


@router.delete("/{class_id}")
async def delete_existing_class(
    class_id: str,
    current_admin: str = Depends(get_current_admin)
):
    return await delete_class(class_id)