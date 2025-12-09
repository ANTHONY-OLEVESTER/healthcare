from typing import Optional
from pydantic import BaseModel


class FAQBase(BaseModel):
  question: str
  answer: str
  category: Optional[str] = None
  order: int = 0
  is_active: bool = True


class FAQCreate(FAQBase):
  pass


class FAQUpdate(BaseModel):
  question: Optional[str] = None
  answer: Optional[str] = None
  category: Optional[str] = None
  order: Optional[int] = None
  is_active: Optional[bool] = None


class FAQRead(FAQBase):
  id: int

  class Config:
    orm_mode = True
