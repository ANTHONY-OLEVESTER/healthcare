# Roadrunner Healthcare

A unified React/Vite website for Roadrunner Hospice, Roadrunner Home Health, and Access Medical (homebound primary care). The site now includes curated, open-source imagery across the homepage, services, and navigation for a more visual experience.

## Overview

- Three service lines in one responsive site (Hospice, Home Health, Primary Care)
- New gallery data source (`src/content/galleryImages.js`) powering the homepage hero, slider, service cards, and services pages
- Services dropdown now shows thumbnails for quick visual cues
- Service detail pages include photo hero banners and supporting image grids

## Features

- React 18 + React Router 6
- Vite for fast dev/build
- Accessible, mobile-first CSS with variables
- Service detail pages (hospice, home health, primary care)
- Referrals, contact, FAQ, and careers

## Tech Stack

- React 18
- React Router 6
- Vite
- Vanilla CSS
- ESLint

## Project Structure

```
src/
  main.jsx                # Entry point
  App.jsx                 # App shell and routes
  index.css               # Global styles
  content/
    siteConfig.js         # Site-wide configuration
    servicesContent.js    # Service copy blocks
    galleryImages.js      # Open-source image catalog
  components/
    layout/
      Layout.jsx
      Header.jsx          # Nav with service thumbnails
      Footer.jsx
  routes/
    Home.jsx              # Homepage with hero + slider
    About.jsx
    Services/
      ServicesOverview.jsx
      Hospice.jsx
      HomeHealth.jsx
      MedicalCare.jsx
    Referrals.jsx
    Contact.jsx
    FAQ.jsx
    Careers.jsx
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Git

### Install & Run

```bash
npm install
npm run dev
# open http://localhost:5173 (Vite default)
```

### Build & Preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Scripts (package.json)

- `npm run dev` — Start Vite dev server with hot reload.
- `npm run build` — Production build to `dist/`.
- `npm run preview` — Serve the production build locally.
- `npm run lint` — Run ESLint (uses project config).

## Deployment

The repository is configured for GitHub Actions. Standard static hosting settings:

- Build command: `npm run build`
- Publish directory: `dist`

## Content & Customization

- Contact info: `src/content/siteConfig.js`
- Service copy: `src/content/servicesContent.js`
- Image catalog: `src/content/galleryImages.js` (used by hero, slider, dropdown thumbnails, and service pages)
- Styling: `src/index.css` (CSS variables in `:root` for theming)

## Sitemap (key routes)

- `/` — Home
- `/about` — About
- `/services` — Services overview
  - `/services/hospice`
  - `/services/home-health`
  - `/services/medical-care`
- `/referrals`
- `/contact`
- `/faq`
- `/careers`

## Page-by-page summary

- **Home** (`src/routes/Home.jsx`): Hero with image overlay, call-to-actions, services grid, highlight section with image slider, and CTA.
- **About** (`src/routes/About.jsx`): Story, mission, values, service area, services summary, CTA, and an image grid from the gallery.
- **Services Overview** (`src/routes/Services/ServicesOverview.jsx`): Image-backed hero, three service cards each with photo media, features, and links to details.
- **Hospice** (`src/routes/Services/Hospice.jsx`): Image hero, intro with supportive photo grid, coverage of care team, eligibility, benefits, and referral steps.
- **Home Health** (`src/routes/Services/HomeHealth.jsx`): Image hero, overview with photo grid, detailed nursing/therapy/caregiving sections, qualification criteria, conditions, payment, and steps to start.
- **Medical Care** (`src/routes/Services/MedicalCare.jsx`): Image hero, intro with photo grid, service breakdown, conditions managed, coordination with home health/hospice, payment, and getting started.
- **Referrals** (`src/routes/Referrals.jsx`): Referral form and info for providers and families.
- **Contact** (`src/routes/Contact.jsx`): Contact details, hours, service areas, and contact form.
- **FAQ** (`src/routes/FAQ.jsx`): Frequently asked questions organized in categories.
- **Careers** (`src/routes/Careers.jsx`): Open positions and hiring information.
- **NotFound** (`src/routes/NotFound.jsx`): 404 page for unknown routes.

## Redirect Guidance (legacy domains)

Map old domains to the consolidated site with 301s:

- `roadrunnerhhc.com/*` → `/services/hospice`
- `roadrunnerhomehealth.care/*` → `/services/home-health`
- `accessmedicalnm.care/*` → `/services/medical-care`

Add specific paths as needed (e.g., `/referrals`, `/contact`, `/careers`).

## License

Copyright (c) 2025 Roadrunner Healthcare. All rights reserved.

## Support

- Phone: 505-321-4819
- Email: info@roadrunnerhealthcare.com
