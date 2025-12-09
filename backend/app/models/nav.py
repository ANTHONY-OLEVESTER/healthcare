from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class NavItem(Base):
  __tablename__ = "nav_items"

  id = Column(Integer, primary_key=True, index=True)
  label = Column(String, nullable=False)
  path = Column(String, nullable=False)
  order = Column(Integer, default=0)
  parent_id = Column(Integer, ForeignKey("nav_items.id"), nullable=True)
  is_visible = Column(Boolean, default=True)

  children = relationship(
    "NavItem",
    cascade="all, delete-orphan",
    backref="parent",
    remote_side=[id],
    single_parent=True,
  )
