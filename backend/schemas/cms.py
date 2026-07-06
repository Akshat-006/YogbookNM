from pydantic import BaseModel
from typing import Optional


class CMSCreate(BaseModel):

    key: str

    title: Optional[str] = None

    subtitle: Optional[str] = None

    description: Optional[str] = None

    image: Optional[str] = None

    icon: Optional[str] = None

    button_text: Optional[str] = None

    button_link: Optional[str] = None

    is_active: bool = True


class CMSUpdate(BaseModel):

    title: Optional[str] = None

    subtitle: Optional[str] = None

    description: Optional[str] = None

    image: Optional[str] = None

    icon: Optional[str] = None

    button_text: Optional[str] = None

    button_link: Optional[str] = None

    is_active: Optional[bool] = None