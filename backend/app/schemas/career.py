from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class CareerBase(BaseModel):
  title: str
  location: Optional[str] = None
  department: Optional[str] = None
  employment_type: Optional[str] = None
  description: Optional[str] = None
  is_active: bool = True


class CareerCreate(CareerBase):
  pass


class CareerUpdate(BaseModel):
  title: Optional[str] = None
  location: Optional[str] = None
  department: Optional[str] = None
  employment_type: Optional[str] = None
  description: Optional[str] = None
  is_active: Optional[bool] = None


class CareerRead(CareerBase):
  id: int
  posted_at: Optional[datetime] = None

  class Config:
    orm_mode = True
