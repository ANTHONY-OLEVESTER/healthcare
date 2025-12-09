from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
  email: EmailStr
  full_name: Optional[str] = None
  is_active: bool = True
  is_superuser: bool = False


class UserCreate(UserBase):
  password: str


class UserUpdate(BaseModel):
  full_name: Optional[str] = None
  password: Optional[str] = None
  is_active: Optional[bool] = None
  is_superuser: Optional[bool] = None


class UserRead(UserBase):
  id: int

  class Config:
    orm_mode = True
