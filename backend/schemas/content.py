from pydantic import BaseModel


class ContentUpdate(BaseModel):
    section: str
    title: str
    content: str


class ContentResponse(ContentUpdate):
    id: str