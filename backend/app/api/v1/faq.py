from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.api import deps
from app.models.faq import FAQ
from app.schemas.faq import FAQCreate, FAQUpdate, FAQRead

router = APIRouter()


@router.get("", response_model=List[FAQRead])
def list_faq(category: Optional[str] = None, db: Session = Depends(deps.get_db)):
  query = db.query(FAQ).filter(FAQ.is_active == True)  # noqa: E712
  if category:
    query = query.filter(FAQ.category == category)
  return query.order_by(FAQ.order.asc()).all()


@router.post("", response_model=FAQRead)
def create_faq(faq_in: FAQCreate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  faq = FAQ(**faq_in.dict())
  db.add(faq)
  db.commit()
  db.refresh(faq)
  return faq


@router.put("/{faq_id}", response_model=FAQRead)
def update_faq(faq_id: int, faq_in: FAQUpdate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
  if not faq:
    raise HTTPException(status_code=404, detail="FAQ not found")
  for field, value in faq_in.dict(exclude_unset=True).items():
    setattr(faq, field, value)
  db.commit()
  db.refresh(faq)
  return faq


@router.delete("/{faq_id}")
def delete_faq(faq_id: int, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
  faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
  if not faq:
    raise HTTPException(status_code=404, detail="FAQ not found")
  db.delete(faq)
  db.commit()
  return {"status": "deleted"}
