from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.slide import Slide
from app.schemas.slide import SlideCreate, SlideUpdate, SlideRead

router = APIRouter()


@router.get("", response_model=List[SlideRead])
def list_slides(db: Session = Depends(deps.get_db)):
    return db.query(Slide).filter(Slide.is_active == True).order_by(Slide.order.asc()).all()  # noqa: E712


@router.post("", response_model=SlideRead)
def create_slide(slide_in: SlideCreate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
    slide = Slide(**slide_in.dict())
    db.add(slide)
    db.commit()
    db.refresh(slide)
    return slide


@router.put("/{slide_id}", response_model=SlideRead)
def update_slide(slide_id: int, slide_in: SlideUpdate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
    slide = db.query(Slide).filter(Slide.id == slide_id).first()
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    for field, value in slide_in.dict(exclude_unset=True).items():
        setattr(slide, field, value)
    db.commit()
    db.refresh(slide)
    return slide


@router.delete("/{slide_id}")
def delete_slide(slide_id: int, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
    slide = db.query(Slide).filter(Slide.id == slide_id).first()
    if not slide:
        raise HTTPException(status_code=404, detail="Slide not found")
    db.delete(slide)
    db.commit()
    return {"status": "deleted"}
