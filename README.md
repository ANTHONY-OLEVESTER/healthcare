# Roadrunner Healthcare Monorepo

A combined frontend + backend stack for Roadrunner Hospice, Home Health, and Access Medical. The React/Vite frontend lives under `frontend/` and the FastAPI CMS/API lives under `backend/` with JWT auth and SQLite persistence.

## Monorepo layout

- `frontend/` – React 18 + Vite app (public site and admin UI)
- `backend/` – FastAPI + SQLite API for nav, services, FAQ, careers, slides, news, uploads, and chat

## Frontend

Location: `frontend/`

Highlights:
- Dynamic nav (services dropdown thumbnails) and service pages backed by API data
- Home slides + "What’s New" pulled from the CMS
- Accessibility panel (themes, font sizing, reduced motion, read aloud)
- Chat widget (Priya Caregiver) powered by backend chat endpoint

Common scripts:
```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to frontend/dist
npm run preview
npm run lint
```
- API base: set `VITE_API_BASE_URL` to your backend (defaults to `http://localhost:8000/api/v1`).

## Backend

Location: `backend/`

Stack: FastAPI, SQLAlchemy, JWT, SQLite.

Setup:
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
# copy .env.example to .env and set GROQ_API_KEY before running (required for chat)
python -m app.db.init_db   # creates tables, seeds admin/content
uvicorn app.main:app --reload
```

Config:
- Defaults live in `app/core/config.py` (JWT secret, DB URL, CORS origins, Groq model).
- SQLite file path defaults to `./roadrunner.db` relative to backend working dir.
- CORS origins should be a JSON array (see `.env.example`).

Default admin (seeded by `init_db`):
- Email: `admin@roadrunnerhealthcare.com`
- Password: `ChangeMe123!`

API base: `http://localhost:8000/api/v1`

Key endpoints:
- `POST /auth/login` – obtain JWT
- `GET /users/me` – current user
- `GET /nav` – public nav tree
- `GET /services` / `GET /services/{slug}` – service catalog
- `GET /faq` – FAQs (optional `?category=`)
- `GET /careers` / `GET /careers/{id}` – careers
- `GET /slides` – homepage slides
- `GET /news` – homepage "what’s new" items
- `POST /uploads` – upload image/file (admin-only), served from `/uploads/*`
- `POST /chat` – Groq-backed care assistant (requires `GROQ_API_KEY`)

## Page-by-page summary (frontend)

- **Home** (`frontend/src/routes/Home.jsx`): Hero, services grid, highlight with slider, “What’s New”, referrals/contact CTAs.
- **About** (`frontend/src/routes/About.jsx`): Story, mission, values, service area, image grid.
- **Services Overview** (`frontend/src/routes/Services/ServicesOverview.jsx`): Cards powered by CMS services.
- **Service detail** (`frontend/src/routes/Services/ServiceDetail.jsx`): Generic service page by slug (hospice, home-health, medical-care).
- **Referrals** (`frontend/src/routes/Referrals.jsx`): Referral info/form.
- **Contact** (`frontend/src/routes/Contact.jsx`): Contact details, hours, form.
- **FAQ** (`frontend/src/routes/FAQ.jsx`): Expandable FAQ list from API.
- **Careers** (`frontend/src/routes/Careers.jsx`): Active job listings from API.
- **Admin** (`frontend/src/routes/Admin/*`): Login plus basic CRUD screens for nav, services, FAQ, careers, slides, news.

## Sitemap (key routes)

- `/`
- `/about`
- `/services`
  - `/services/hospice`
  - `/services/home-health`
  - `/services/medical-care`
- `/referrals`
- `/contact`
- `/faq`
- `/careers`
- `/admin/login`, `/admin`

## Redirect guidance (legacy domains)

- `roadrunnerhhc.com/*` -> `/services/hospice`
- `roadrunnerhomehealth.care/*` -> `/services/home-health`
- `accessmedicalnm.care/*` -> `/services/medical-care`

Add specific paths as needed (`/referrals`, `/contact`, `/careers`).

## License

Copyright (c) 2025 Roadrunner Healthcare. All rights reserved.
