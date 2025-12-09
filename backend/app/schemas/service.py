from typing import List, Optional
from pydantic import BaseModel


class ServiceBase(BaseModel):
  slug: str
  name: str
  short_description: Optional[str] = None
  long_description: Optional[str] = None
  hero_title: Optional[str] = None
  hero_subtitle: Optional[str] = None
  hero_image_url: Optional[str] = None
  highlight_points: Optional[List[str]] = None
  gallery_image_urls: Optional[List[str]] = None
  category: Optional[str] = None


class ServiceCreate(ServiceBase):
  pass


class ServiceUpdate(BaseModel):
  name: Optional[str] = None
  short_description: Optional[str] = None
  long_description: Optional[str] = None
  hero_title: Optional[str] = None
  hero_subtitle: Optional[str] = None
  hero_image_url: Optional[str] = None
  highlight_points: Optional[List[str]] = None
  gallery_image_urls: Optional[List[str]] = None
  category: Optional[str] = None


class ServiceRead(ServiceBase):
  id: int

  class Config:
    orm_mode = True
