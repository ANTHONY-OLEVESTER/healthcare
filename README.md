# Roadrunner Healthcare Monorepo

A combined frontend + backend stack for Roadrunner Hospice, Home Health, and Access Medical. The React/Vite frontend now lives under `frontend/` and a new FastAPI CMS/API lives under `backend/` with JWT auth and SQLite persistence.

## Monorepo layout

- `frontend/` — React 18 + Vite app (public site and basic admin login)
- `backend/` — FastAPI + SQLite API for nav, services, FAQ, careers, and users

## Frontend

Location: `frontend/`

Key pieces:
- Dynamic nav (services dropdown thumbnails) and service pages backed by API data
- Gallery data in `frontend/src/content/galleryImages.js`
- Admin login route (`/admin/login`) placeholder for authenticated workflows

Common scripts:
```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to frontend/dist
npm run preview
npm run lint
```
- Configure API base (optional): set `VITE_API_BASE_URL` to your backend (defaults to `http://localhost:8000/api/v1`).

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
python -m app.db.init_db   # creates tables, seeds admin/content
uvicorn app.main:app --reload
```

Config:
- Defaults live in `app/core/config.py` (JWT secret, DB URL, CORS origins).
- SQLite file path defaults to `./roadrunner.db` relative to backend working dir.

Default admin (seeded by `init_db`):
- Email: `admin@roadrunnerhealthcare.com`
- Password: `ChangeMe123!`

API base: `http://localhost:8000/api/v1`

Key endpoints:
- `POST /auth/login` — obtain JWT
- `GET /users/me` — current user
- `GET /nav` — public nav tree
- `GET /services` / `GET /services/{slug}` — service catalog
- `GET /faq` — FAQs (optional `?category=`)
- `GET /careers` / `GET /careers/{id}` — careers
- `GET /slides` — homepage slides
- `GET /news` — homepage “what’s new” items
- Admin CRUD for nav/services/faq/careers via POST/PUT/DELETE (JWT, superuser required)
- File uploads: `POST /uploads` (admin-only) saves to `/uploads` and returns a URL

## Page-by-page summary (frontend)

- **Home** (`frontend/src/routes/Home.jsx`): Hero with gallery background, services grid, highlight with image slider, CTA.
- **About** (`frontend/src/routes/About.jsx`): Story, mission, values, service area, image grid.
- **Services Overview** (`frontend/src/routes/Services/ServicesOverview.jsx`): Image-backed hero, service cards with media.
- **Hospice / Home Health / Medical Care** (`frontend/src/routes/Services/*.jsx`): Image hero + supporting gallery content.
- **Referrals** (`frontend/src/routes/Referrals.jsx`): Referral info/form.
- **Contact** (`frontend/src/routes/Contact.jsx`): Contact details, hours, form.
- **FAQ** (`frontend/src/routes/FAQ.jsx`): Expandable FAQ list.
- **Careers** (`frontend/src/routes/Careers.jsx`): Active job listings.
- **Admin** (`frontend/src/routes/Admin/*` if added): Login + placeholder dashboard.

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

- `roadrunnerhhc.com/*` → `/services/hospice`
- `roadrunnerhomehealth.care/*` → `/services/home-health`
- `accessmedicalnm.care/*` → `/services/medical-care`

Add specific paths as needed (`/referrals`, `/contact`, `/careers`).

## License

Copyright (c) 2025 Roadrunner Healthcare. All rights reserved.
