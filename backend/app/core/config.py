from functools import lru_cache
from typing import List
from pathlib import Path
import json
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from pydantic import field_validator

# Load .env from repo root or backend/.env
BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")
load_dotenv(BASE_DIR / "backend" / ".env")


def safe_json_loads(value: str):
    try:
        return json.loads(value)
    except Exception:
        return value


class Settings(BaseSettings):
    PROJECT_NAME: str = "Roadrunner Healthcare CMS"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "change-this-secret"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./roadrunner.db"
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    BASE_URL: str = "http://localhost:8000"
    UPLOAD_DIR: str = "./uploads"
    GROQ_API_KEY: str | None = None
    GROQ_MODEL: str = "llama-3.1-8b-instant"

    class Config:
        case_sensitive = True

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def split_cors(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


@lru_cache()
def get_settings() -> Settings:
    return Settings()
