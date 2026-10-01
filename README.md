# Camila Reyes — Premium Creator Platform

A premium digital creator platform for **Camila Reyes**, a fictional AI-generated lifestyle creator (lifestyle · fashion · fitness · travel). Built as a scalable application foundation — not a static site — ready to grow into memberships, community and AI features.

> **AI Disclosure:** Camila Reyes is a fictional, AI-generated character and is never presented as a real person. See the in-app **AI Disclosure** page.

## Tech Stack
- **Next.js 15** (App Router) + React 18
- **Tailwind CSS** + shadcn/ui + **Framer Motion**
- **MongoDB** (clean model/API separation for easy future migration)
- Vercel-ready

## Project Structure
```
app/
  page.js                     # SPA orchestrator (routing, cart, transitions)
  layout.js                   # SEO metadata, OpenGraph, Twitter, JSON-LD schema
  sitemap.js / robots.js      # SEO
  api/[[...path]]/route.js    # All backend API routes (MongoDB)
components/site/              # Navbar, Footer, primitives, all page views
config/site.js                # Env-driven brand config (name, socials, premium URL)
data/content.js               # IMAGE + content management system (easily swappable)
models/schemas.js             # MongoDB collection names + document shapes + validation
public/camila/                # Camila's photos (hero, about, fashion, lifestyle, travel)
```

## Environment Variables
Create `.env` (values below are placeholders — safe to expose as they are public):
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=camila_reyes
NEXT_PUBLIC_BASE_URL=https://your-domain.com

NEXT_PUBLIC_CAMILA_NAME="Camila Reyes"
NEXT_PUBLIC_CONTACT_EMAIL="hello@camilares.com"
NEXT_PUBLIC_PREMIUM_URL="https://premium.camilares.com"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/camilares"
NEXT_PUBLIC_TIKTOK_URL="https://tiktok.com/@camilares"
NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/@camilares"
NEXT_PUBLIC_PINTEREST_URL="https://pinterest.com/camilares"
NEXT_PUBLIC_X_URL="https://x.com/camilares"
```

## Install & Run (local)
```bash
yarn install
yarn dev      # http://localhost:3000
```

## Database Setup
No manual setup needed. Collections are created and **auto-seeded on first API call**:
`blog_posts`, `gallery_items`, `products` (seed from `data/content.js`).
Other collections: `newsletter_subscribers`, `contact_messages`, `analytics_events`.
All documents use string **UUID** ids (no Mongo ObjectId) for portability.

To re-seed after changing content:
```bash
node scripts/reseed.js   # clears blog_posts, gallery_items, products -> re-seeds on next GET
```

## API Endpoints (prefix `/api`)
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/config` | Public brand config |
| POST/GET | `/api/newsletter` | Subscribe / list subscribers |
| POST | `/api/contact` | Store contact message |
| GET | `/api/blog`, `/api/blog/:slug` | Blog list / single + related |
| GET | `/api/gallery` | Gallery items |
| GET | `/api/products`, `/api/products/:id` | Products |
| POST | `/api/analytics` | Event tracking |

## Replacing Placeholder Images
All imagery is centralised in **`data/content.js`**.
- **Camila photos** live in `public/camila/` (`hero.jpg`, `about.jpg`, `fashion.jpg`, `lifestyle.jpg`, `travel.jpg`). Drop in new files with the same names, or point the `HERO_IMG` / `ABOUT_IMG` / etc. constants at new paths.
- **Scenery/object placeholders** are Unsplash/Pexels URLs — replace the `opt(...)` URLs with your own.
- Every image keeps `alt` + `caption` metadata for SEO/accessibility.
- Optional optimizer: `node scripts/conv.js` (uses `sharp`) to resize/compress new photos.

## Production Build
```bash
yarn build
yarn start
```

## Deploy to Vercel
1. Push to GitHub and import the repo in Vercel.
2. Add all environment variables above (use a managed MongoDB like **MongoDB Atlas** for `MONGO_URL`).
3. Deploy. Optionally enable **Vercel Analytics** / add a **Google Analytics** ID — tracking hooks already fire events (`page_view`, `newsletter_signup`, `premium_click`, `social_click`, `contact_submit`).

## Future Expansion Recommendations
- **Auth & members:** Login/Signup/Dashboard scaffolding exists — wire to NextAuth or Supabase Auth; add a `users`/`profiles`-backed session.
- **Payments:** Shop has product details + cart placeholder — integrate Stripe Checkout.
- **Premium area:** Replace the external `PREMIUM_URL` redirect with gated in-app content (`premium_content` collection is modelled).
- **AI interactions:** Add a "Chat with Camila" experience (clearly labelled AI).
- **CMS:** Move blog/gallery into an admin UI or headless CMS.
