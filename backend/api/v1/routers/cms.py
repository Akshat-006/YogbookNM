from fastapi import APIRouter, Depends

from api.v1.deps import get_current_admin

from schemas.cms import *

from services.cms_service import *

router = APIRouter(

    prefix="/cms",

    tags=["CMS"]

)

@router.post("")
async def create(
    data: CMSCreate,
    admin=Depends(get_current_admin)
):
    return await create_cms(data)


@router.get("")
async def get():
    return await get_all_cms()


@router.get("/{key}")
async def get_by_key(key: str):
    return await get_cms_by_key(key)


@router.put("/{cms_id}")
async def update(
    cms_id: str,
    data: CMSUpdate,
    admin=Depends(get_current_admin)
):
    return await update_cms(cms_id, data)


@router.delete("/{cms_id}")
async def delete(
    cms_id: str,
    admin=Depends(get_current_admin)
):
    return await delete_cms(cms_id)