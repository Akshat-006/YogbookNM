from fastapi import APIRouter, HTTPException

from schemas.admin import AdminLogin
from services.auth_service import get_admin_by_email
from utils.security import (
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin Auth"]
)


@router.post("/login")
async def login(data: AdminLogin):

    admin = await get_admin_by_email(data.email)

    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        data.password,
        admin["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        {"sub": admin["email"]}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

from api.v1.deps import get_current_admin
from fastapi import Depends

@router.get("/me")
async def get_me(
    current_admin: str = Depends(get_current_admin)
):
    return {
        "email": current_admin
    }