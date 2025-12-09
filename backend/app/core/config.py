from functools import lru_cache
from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Roadrunner Healthcare CMS"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "change-this-secret"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./roadrunner.db"
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    class Config:
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()
