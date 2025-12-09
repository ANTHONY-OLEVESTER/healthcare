from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token
from app.core.config import get_settings
from app.api import deps
from app.schemas.auth import LoginRequest, Token
from app.models.user import User
from app.utils.password import verify_password

router = APIRouter()
settings = get_settings()


@router.post("/login", response_model=Token)
def login_for_access_token(form_data: LoginRequest, db: Session = Depends(deps.get_db)):
  user = db.query(User).filter(User.email == form_data.email).first()
  if not user or not verify_password(form_data.password, user.hashed_password):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
  access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(subject=user.email, expires_delta=access_token_expires)
  return Token(access_token=access_token, token_type="bearer")
