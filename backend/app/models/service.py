from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.dialects.sqlite import JSON

from app.db.base_class import Base


class Service(Base):
  __tablename__ = "services"

  id = Column(Integer, primary_key=True, index=True)
  slug = Column(String, unique=True, nullable=False, index=True)
  name = Column(String, nullable=False)
  short_description = Column(Text, nullable=True)
  long_description = Column(Text, nullable=True)
  hero_title = Column(String, nullable=True)
  hero_subtitle = Column(Text, nullable=True)
  hero_image_url = Column(String, nullable=True)
  highlight_points = Column(JSON, nullable=True)
  gallery_image_urls = Column(JSON, nullable=True)
  category = Column(String, nullable=True)
