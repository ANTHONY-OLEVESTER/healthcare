from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.core.config import get_settings
from app.db.session import engine
from app.db.base import Base  # noqa: F401
from app.api.v1 import auth, users, nav, services, faq, careers, slides, news, uploads, chat

settings = get_settings()

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["users"])
app.include_router(nav.router, prefix=f"{settings.API_V1_STR}/nav", tags=["nav"])
app.include_router(services.router, prefix=f"{settings.API_V1_STR}/services", tags=["services"])
app.include_router(faq.router, prefix=f"{settings.API_V1_STR}/faq", tags=["faq"])
app.include_router(careers.router, prefix=f"{settings.API_V1_STR}/careers", tags=["careers"])
app.include_router(slides.router, prefix=f"{settings.API_V1_STR}/slides", tags=["slides"])
app.include_router(news.router, prefix=f"{settings.API_V1_STR}/news", tags=["news"])
app.include_router(uploads.router, prefix=f"{settings.API_V1_STR}/uploads", tags=["uploads"])
app.include_router(chat.router, prefix=f"{settings.API_V1_STR}/chat", tags=["chat"])

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")
