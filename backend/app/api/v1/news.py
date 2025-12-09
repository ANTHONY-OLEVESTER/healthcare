from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api import deps
from app.models.news import NewsItem
from app.schemas.news import NewsCreate, NewsUpdate, NewsRead

router = APIRouter()


@router.get("", response_model=List[NewsRead])
def list_news(db: Session = Depends(deps.get_db)):
    return db.query(NewsItem).filter(NewsItem.is_active == True).order_by(NewsItem.order.asc()).all()  # noqa: E712


@router.post("", response_model=NewsRead)
def create_news(news_in: NewsCreate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
    item = NewsItem(**news_in.dict())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{news_id}", response_model=NewsRead)
def update_news(news_id: int, news_in: NewsUpdate, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
    item = db.query(NewsItem).filter(NewsItem.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="News item not found")
    for field, value in news_in.dict(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{news_id}")
def delete_news(news_id: int, db: Session = Depends(deps.get_db), current_user=Depends(deps.get_current_active_admin)):
    item = db.query(NewsItem).filter(NewsItem.id == news_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="News item not found")
    db.delete(item)
    db.commit()
    return {"status": "deleted"}
