# Roadrunner Healthcare – Frontend

React/Vite SPA for Roadrunner Healthcare with dynamic data from the FastAPI backend (nav, services, FAQ, careers, slides, news) and a simple admin UI.

## Tech Stack
- React 18
- Vite (dev/build)
- React Router 6
- React Helmet Async (SEO/meta)
- Vanilla CSS with CSS variables
- Fetch-based API client

## Env
- `VITE_API_BASE_URL` (default `http://localhost:8000/api/v1`)

## Scripts
From `frontend/`:
- `npm install` — install deps
- `npm run dev` — start dev server (default http://localhost:5173)
- `npm run build` — production build to `frontend/dist`
- `npm run preview` — serve built assets locally
- `npm run lint` — run ESLint

## Structure (key files)
- `src/main.jsx` — React entry, router setup
- `src/App.jsx` — routes, admin shell, auth guard
- `src/index.css` — global styles and admin styles
- `src/content/` — gallery images, legacy content
- `src/api/` — API clients (auth, nav, services, faq, careers, slides, news, uploads)
- `src/context/AuthContext.jsx` — JWT/session handling
- `src/components/layout/` — Header/Footer/Layout/ScrollToTop
- `src/components/admin/` — RequireAuth, AdminLayout
- `src/routes/` — pages; admin CRUD pages for nav/services/faq/careers/slides/news
- `public/` — static assets (favicon, robots, sitemap)

## Data flow
- Public pages fetch data from the backend APIs (`/nav`, `/services`, `/faq`, `/careers`, `/slides`, `/news`).
- Admin pages perform CRUD via the same endpoints (JWT required).
- File uploads use `POST /uploads` (admin-only) to get a public URL served from backend `/uploads`.

## Admin
- Login: `/admin/login` (default admin seeded by backend init)
- Dashboard and sections:
  - Home CMS: Slides, What’s New (news)
  - Services CMS: Navigation, Services
  - Content CMS: FAQ, Careers

## Notes
- Ensure backend is running and CORS allows your frontend origin.
- Set `VITE_API_BASE_URL` if backend is not on default host/port.
