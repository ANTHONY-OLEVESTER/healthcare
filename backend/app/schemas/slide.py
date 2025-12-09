from typing import Optional
from pydantic import BaseModel


class SlideBase(BaseModel):
    title: str
    subtitle: Optional[str] = None
    image_url: str
    cta_label: Optional[str] = None
    cta_url: Optional[str] = None
    order: int = 0
    is_active: bool = True


class SlideCreate(SlideBase):
    pass


class SlideUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image_url: Optional[str] = None
    cta_label: Optional[str] = None
    cta_url: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class SlideRead(SlideBase):
    id: int

    class Config:
        from_attributes = True
