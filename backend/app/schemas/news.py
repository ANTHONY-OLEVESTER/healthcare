from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class NewsBase(BaseModel):
    title: str
    summary: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    order: int = 0
    is_active: bool = True


class NewsCreate(NewsBase):
    pass


class NewsUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class NewsRead(NewsBase):
    id: int
    published_at: Optional[datetime] = None

    class Config:
        from_attributes = True
