from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func

from app.db.base_class import Base


class Career(Base):
  __tablename__ = "careers"

  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, nullable=False)
  location = Column(String, nullable=True)
  department = Column(String, nullable=True)
  employment_type = Column(String, nullable=True)
  description = Column(Text, nullable=True)
  is_active = Column(Boolean, default=True)
  posted_at = Column(DateTime(timezone=True), server_default=func.now())
