from typing import Optional, List
from pydantic import BaseModel


class NavItemBase(BaseModel):
  label: str
  path: str
  order: int = 0
  parent_id: Optional[int] = None
  is_visible: bool = True


class NavItemCreate(NavItemBase):
  pass


class NavItemUpdate(BaseModel):
  label: Optional[str] = None
  path: Optional[str] = None
  order: Optional[int] = None
  parent_id: Optional[int] = None
  is_visible: Optional[bool] = None


class NavItemRead(NavItemBase):
  id: int
  children: List["NavItemRead"] = []

  class Config:
    orm_mode = True
    arbitrary_types_allowed = True


NavItemRead.update_forward_refs()
