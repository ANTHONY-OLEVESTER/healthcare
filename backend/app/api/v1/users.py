from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.user import User
from app.schemas.user import UserCreate, UserRead
from app.utils.password import get_password_hash

router = APIRouter()


@router.post("/", response_model=UserRead)
def create_user(user_in: UserCreate, db: Session = Depends(deps.get_db), current_user: User = Depends(deps.get_current_active_admin)):
  existing = db.query(User).filter(User.email == user_in.email).first()
  if existing:
    raise HTTPException(status_code=400, detail="Email already registered")
  user = User(
    email=user_in.email,
    full_name=user_in.full_name,
    hashed_password=get_password_hash(user_in.password),
    is_active=user_in.is_active,
    is_superuser=user_in.is_superuser,
  )
  db.add(user)
  db.commit()
  db.refresh(user)
  return user


@router.get("/me", response_model=UserRead)
def read_users_me(current_user: User = Depends(deps.get_current_user)):
  return current_user
