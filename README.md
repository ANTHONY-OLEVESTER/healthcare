# Roadrunner Healthcare

A unified React website consolidating **Roadrunner Hospice**, **Roadrunner Home Health**, and **Access Medical** (homebound primary care) into a single, professional healthcare platform.

## Overview

This React application provides comprehensive information and referral capabilities for all three Roadrunner Healthcare services:

- **Hospice Care** – End-of-life comfort and family support
- **Home Health & In-Home Care** – Skilled nursing, therapy, and caregiving
- **Homebound Primary Care (Access Medical)** – Geriatric primary care visits

## Features

- Modern, responsive React application built with Vite
- React Router v6 for seamless navigation
- Professional, accessible design optimized for healthcare
- Mobile-first responsive layout
- Comprehensive service information pages
- Referral form for providers and families
- Contact forms and FAQ section
- Careers page for recruitment

## Tech Stack

- **React 18** – UI library
- **React Router 6** – Client-side routing
- **Vite** – Build tool and dev server
- **Vanilla CSS** – Styling with CSS variables
- **ESLint** – Code quality and linting

## Project Structure

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Main app with routes
├── index.css                 # Global styles
├── components/
│   ├── layout/
│   │   ├── Layout.jsx        # Main layout wrapper
│   │   ├── Header.jsx        # Site header with navigation
│   │   └── Footer.jsx        # Site footer
│   └── common/
│       └── (reusable components)
├── routes/
│   ├── Home.jsx              # Homepage
│   ├── About.jsx             # About Roadrunner Healthcare
│   ├── Services/
│   │   ├── ServicesOverview.jsx
│   │   ├── Hospice.jsx
│   │   ├── HomeHealth.jsx
│   │   └── MedicalCare.jsx
│   ├── Careers.jsx           # Careers page
│   ├── Referrals.jsx         # Referral form
│   ├── FAQ.jsx               # Frequently asked questions
│   └── Contact.jsx           # Contact information and form
└── content/
    ├── siteConfig.js         # Site-wide configuration
    └── servicesContent.js    # Service details and content
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)
- Git (for version control)

### Installation

1. Clone or navigate to the project directory:

```bash
cd Healthcare
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` – Start development server with hot reload
- `npm run build` – Create production build
- `npm run preview` – Preview production build locally
- `npm run lint` – Run ESLint to check code quality

## Sitemap

### Main Routes

- `/` – Home
- `/about` – About Roadrunner Healthcare
- `/services` – Services overview
- `/services/hospice` – Hospice care details
- `/services/home-health` – Home health and in-home care
- `/services/medical-care` – Access Medical primary care
- `/careers` – Careers and job opportunities
- `/referrals` – Referral form (for providers and families)
- `/faq` – Frequently asked questions
- `/contact` – Contact information and form

## Customization

### Update Contact Information

Edit [src/content/siteConfig.js](src/content/siteConfig.js) to update:

- Phone numbers and fax
- Email addresses
- Physical addresses
- Service areas

### Update Content

- **Service details**: Edit [src/content/servicesContent.js](src/content/servicesContent.js)
- **Page content**: Edit individual route files in `src/routes/`

### Styling

All styles are in [src/index.css](src/index.css) using CSS variables for easy theming.

To change the color scheme, update the CSS variables in `:root`:

```css
:root {
  --color-primary: #0066cc;
  --color-secondary: #2d7a3e;
  /* etc. */
}
```

## Forms

The referral and contact forms currently log to the console. To integrate with a backend:

1. Replace `console.log()` in form submission handlers
2. Add API calls to your backend or email service
3. Consider using services like:
   - Formspree
   - Netlify Forms
   - SendGrid
   - Custom backend API

## Deployment

### Netlify / Vercel

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Traditional Hosting

1. Run `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure server to redirect all requests to `index.html` (for client-side routing)

### Apache .htaccess Example

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Redirects from Old Sites

When migrating from the three separate websites, set up **permanent 301 redirects** to preserve SEO and ensure visitors find the correct pages.

Provide this mapping to your IT/hosting team to configure in Nginx, Apache, Cloudflare, or your CDN:

### From roadrunnerhhc.com (Hospice)

```
https://roadrunnerhhc.com/                      → https://roadrunnerhealthcare.com/services/hospice
https://roadrunnerhhc.com/hospice-care         → https://roadrunnerhealthcare.com/services/hospice
https://roadrunnerhhc.com/hospice              → https://roadrunnerhealthcare.com/services/hospice
https://roadrunnerhhc.com/referrals            → https://roadrunnerhealthcare.com/referrals
https://roadrunnerhhc.com/careers              → https://roadrunnerhealthcare.com/careers
https://roadrunnerhhc.com/contact              → https://roadrunnerhealthcare.com/contact
https://roadrunnerhhc.com/about                → https://roadrunnerhealthcare.com/about
```

### From roadrunnerhomehealth.care (Home Health)

```
https://roadrunnerhomehealth.care/              → https://roadrunnerhealthcare.com/services/home-health
https://roadrunnerhomehealth.care/services      → https://roadrunnerhealthcare.com/services/home-health
https://roadrunnerhomehealth.care/skilled-nursing → https://roadrunnerhealthcare.com/services/home-health
https://roadrunnerhomehealth.care/therapy       → https://roadrunnerhealthcare.com/services/home-health
https://roadrunnerhomehealth.care/caregiving    → https://roadrunnerhealthcare.com/services/home-health
https://roadrunnerhomehealth.care/in-home-care  → https://roadrunnerhealthcare.com/services/home-health
https://roadrunnerhomehealth.care/referrals     → https://roadrunnerhealthcare.com/referrals
https://roadrunnerhomehealth.care/careers       → https://roadrunnerhealthcare.com/careers
https://roadrunnerhomehealth.care/contact       → https://roadrunnerhealthcare.com/contact
```

### From accessmedicalnm.care (Access Medical)

```
https://accessmedicalnm.care/                   → https://roadrunnerhealthcare.com/services/medical-care
https://accessmedicalnm.care/about              → https://roadrunnerhealthcare.com/about
https://accessmedicalnm.care/services           → https://roadrunnerhealthcare.com/services/medical-care
https://accessmedicalnm.care/primary-care       → https://roadrunnerhealthcare.com/services/medical-care
https://accessmedicalnm.care/contact            → https://roadrunnerhealthcare.com/contact
```

### Nginx Example Configuration

```nginx
# In your nginx config for old domains
server {
    listen 80;
    server_name roadrunnerhhc.com www.roadrunnerhhc.com;

    location = / {
        return 301 https://roadrunnerhealthcare.com/services/hospice;
    }

    location /hospice-care {
        return 301 https://roadrunnerhealthcare.com/services/hospice;
    }

    location /referrals {
        return 301 https://roadrunnerhealthcare.com/referrals;
    }

    # Add remaining redirects...
}
```

### Cloudflare Page Rules Alternative

If using Cloudflare, create Page Rules for each old domain:

1. `roadrunnerhhc.com/*` → Forward to `https://roadrunnerhealthcare.com/services/hospice` (301)
2. `roadrunnerhomehealth.care/*` → Forward to `https://roadrunnerhealthcare.com/services/home-health` (301)
3. `accessmedicalnm.care/*` → Forward to `https://roadrunnerhealthcare.com/services/medical-care` (301)

Then add specific path redirects as needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Responsive design for all screen sizes
- Color contrast meets WCAG AA standards

## License

Copyright © 2025 Roadrunner Healthcare. All rights reserved.

## Support

For questions or support:

- Phone: 505-321-4819
- Email: info@roadrunnerhealthcare.com
