from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.career import Career
from app.schemas.career import CareerCreate, CareerUpdate, CareerRead

router = APIRouter()


@router.get("", response_model=List[CareerRead])
def list_careers(db: Session = Depends(deps.get_db)):
  return db.query(Career).filter(Career.is_active == True).all()  # noqa: E712


@router.get("/{career_id}", response_model=CareerRead)
def get_career(career_id: int, db: Session = Depends(deps.get_db)):
  career = db.query(Career).filter(Career.id == career_id).first()
  if not career:
    raise HTTPException(status_code=404, detail="Career not found")
  return career


@router.post("", response_model=CareerRead)
def create_career(career_in: CareerCreate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  career = Career(**career_in.dict())
  db.add(career)
  db.commit()
  db.refresh(career)
  return career


@router.put("/{career_id}", response_model=CareerRead)
def update_career(career_id: int, career_in: CareerUpdate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  career = db.query(Career).filter(Career.id == career_id).first()
  if not career:
    raise HTTPException(status_code=404, detail="Career not found")
  for field, value in career_in.dict(exclude_unset=True).items():
    setattr(career, field, value)
  db.commit()
  db.refresh(career)
  return career


@router.delete("/{career_id}")
def delete_career(career_id: int, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  career = db.query(Career).filter(Career.id == career_id).first()
  if not career:
    raise HTTPException(status_code=404, detail="Career not found")
  db.delete(career)
  db.commit()
  return {"status": "deleted"}
