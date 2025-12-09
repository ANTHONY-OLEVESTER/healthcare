from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.nav import NavItem
from app.schemas.nav import NavItemCreate, NavItemUpdate, NavItemRead

router = APIRouter()


def serialize_nav(item: NavItem) -> dict:
  return {
    "id": item.id,
    "label": item.label,
    "path": item.path,
    "order": item.order,
    "parent_id": item.parent_id,
    "is_visible": item.is_visible,
    "children": [],
  }


def build_tree(items: list[NavItem]) -> list[dict]:
  lookup = {item.id: serialize_nav(item) for item in items}
  roots: list[dict] = []
  for item in items:
    node = lookup[item.id]
    if item.parent_id and item.parent_id in lookup:
      lookup[item.parent_id]["children"].append(node)
    else:
      roots.append(node)
  for node in lookup.values():
    node["children"] = sorted(node["children"], key=lambda n: n["order"])
  return sorted(roots, key=lambda n: n["order"])


@router.get("", response_model=List[NavItemRead])
def get_nav(db: Session = Depends(deps.get_db)):
  items = db.query(NavItem).filter(NavItem.is_visible == True).all()  # noqa: E712
  tree = build_tree(items)
  return tree


@router.post("", response_model=NavItemRead)
def create_nav_item(nav_in: NavItemCreate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  nav = NavItem(**nav_in.dict())
  db.add(nav)
  db.commit()
  db.refresh(nav)
  return serialize_nav(nav)


@router.put("/{item_id}", response_model=NavItemRead)
def update_nav_item(item_id: int, nav_in: NavItemUpdate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  nav = db.query(NavItem).filter(NavItem.id == item_id).first()
  if not nav:
    raise HTTPException(status_code=404, detail="Nav item not found")
  for field, value in nav_in.dict(exclude_unset=True).items():
    setattr(nav, field, value)
  db.commit()
  db.refresh(nav)
  return serialize_nav(nav)


@router.delete("/{item_id}")
def delete_nav_item(item_id: int, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  nav = db.query(NavItem).filter(NavItem.id == item_id).first()
  if not nav:
    raise HTTPException(status_code=404, detail="Nav item not found")
  db.delete(nav)
  db.commit()
  return {"status": "deleted"}
