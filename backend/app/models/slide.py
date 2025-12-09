from sqlalchemy import Column, Integer, String, Boolean
from app.db.base_class import Base


class Slide(Base):
    __tablename__ = "slides"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=True)
    image_url = Column(String, nullable=False)
    cta_label = Column(String, nullable=True)
    cta_url = Column(String, nullable=True)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
