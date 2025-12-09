from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceRead

router = APIRouter()


@router.get("", response_model=List[ServiceRead])
def list_services(db: Session = Depends(deps.get_db)):
  return db.query(Service).all()


@router.get("/{slug}", response_model=ServiceRead)
def get_service(slug: str, db: Session = Depends(deps.get_db)):
  service = db.query(Service).filter(Service.slug == slug).first()
  if not service:
    raise HTTPException(status_code=404, detail="Service not found")
  return service


@router.post("", response_model=ServiceRead)
def create_service(service_in: ServiceCreate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  existing = db.query(Service).filter(Service.slug == service_in.slug).first()
  if existing:
    raise HTTPException(status_code=400, detail="Service already exists")
  service = Service(**service_in.dict())
  db.add(service)
  db.commit()
  db.refresh(service)
  return service


@router.put("/{service_id}", response_model=ServiceRead)
def update_service(service_id: int, service_in: ServiceUpdate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  service = db.query(Service).filter(Service.id == service_id).first()
  if not service:
    raise HTTPException(status_code=404, detail="Service not found")
  for field, value in service_in.dict(exclude_unset=True).items():
    setattr(service, field, value)
  db.commit()
  db.refresh(service)
  return service


@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  service = db.query(Service).filter(Service.id == service_id).first()
  if not service:
    raise HTTPException(status_code=404, detail="Service not found")
  db.delete(service)
  db.commit()
  return {"status": "deleted"}
