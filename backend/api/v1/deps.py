from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

from core.config import settings

security = HTTPBearer()

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/verify-otp"
)

security = HTTPBearer()


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=["HS256"]
        )

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )
        
        role = payload.get("role")

        if role != "admin":
            raise HTTPException(
                status_code=403,
                detail="Admin access required"
            )

        return email

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials"
        )
    
async def get_current_user(

    token: str = Depends(
        oauth2_scheme
    )

):

    try:

        payload = jwt.decode(

            token,

            settings.SECRET_KEY,

            algorithms=["HS256"]

        )

        email = payload.get("sub")

        if not email:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return email

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials"
        ) 