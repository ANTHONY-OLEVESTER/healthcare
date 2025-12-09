# Roadrunner Healthcare – Backend

FastAPI + SQLite CMS API with JWT auth powering the frontend (nav, services, FAQ, careers, slides, news) and file uploads.

## Tech Stack
- FastAPI
- SQLAlchemy (SQLite)
- Pydantic v2 + pydantic-settings
- python-jose (JWT)
- passlib (hashing)
- uvicorn (server)

## Setup
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python -m app.db.init_db   # creates tables, seeds admin/content
uvicorn app.main:app --reload
```

## Env / Config (see `app/core/config.py`)
- `SQLALCHEMY_DATABASE_URI` (default sqlite:///./roadrunner.db)
- `SECRET_KEY` (JWT)
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `BACKEND_CORS_ORIGINS` (dev defaults include localhost:5173 and localhost:3000)
- `BASE_URL` (for uploaded file URLs, default http://localhost:8000)
- `UPLOAD_DIR` (default ./uploads)
- `GROQ_API_KEY` and `GROQ_MODEL` for chat assistant (set in `.env`)

## Scripts / Commands
- `python -m app.db.init_db` — create tables and seed:
  - admin user: `admin@roadrunnerhealthcare.com` / `ChangeMe123!`
  - nav, services, FAQ, careers, slides, news
- `uvicorn app.main:app --reload` — run API locally

## API Endpoints (base: `/api/v1`)
- Auth: `POST /auth/login`, `GET /users/me`
- Nav: `GET /nav`, `POST/PUT/DELETE /nav/{id}` (admin)
- Services: `GET /services`, `GET /services/{slug}`, `POST/PUT/DELETE /services/{id}` (admin)
- FAQ: `GET /faq`, `POST/PUT/DELETE /faq/{id}` (admin)
- Careers: `GET /careers`, `GET /careers/{id}`, `POST/PUT/DELETE /careers/{id}` (admin)
- Slides: `GET /slides`, `POST/PUT/DELETE /slides/{id}` (admin)
- News: `GET /news`, `POST/PUT/DELETE /news/{id}` (admin)
- Uploads: `POST /uploads` (admin) returns URL; files served from `/uploads`
- Health: `GET /health`

## Structure (key files)
- `app/main.py` — FastAPI app, CORS, routers, static uploads
- `app/core/` — config, security, deps
- `app/db/` — session, base, init_db seeding
- `app/models/` — User, NavItem, Service, FAQ, Career, Slide, NewsItem
- `app/schemas/` — Pydantic models for API I/O
- `app/api/v1/` — routers (auth, users, nav, services, faq, careers, slides, news, uploads)
- `app/utils/password.py` — hashing/verify

## Notes
- CORS allows localhost:5173/3000; adjust `BACKEND_CORS_ORIGINS` as needed.
- Uploads directory is created automatically; ensure the process has write permissions.
