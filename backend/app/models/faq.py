from sqlalchemy import Column, Integer, String, Boolean, Text

from app.db.base_class import Base


class FAQ(Base):
  __tablename__ = "faqs"

  id = Column(Integer, primary_key=True, index=True)
  question = Column(String, nullable=False)
  answer = Column(Text, nullable=False)
  category = Column(String, nullable=True)
  order = Column(Integer, default=0)
  is_active = Column(Boolean, default=True)
