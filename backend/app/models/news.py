from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base


class NewsItem(Base):
    __tablename__ = "news_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    summary = Column(String, nullable=True)
    link = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    published_at = Column(DateTime(timezone=True), server_default=func.now())
