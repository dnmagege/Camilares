# Camila Ravelle — Production-Ready Brand Platform

A premium digital creator platform for **Camila Ravelle**, a fictional AI-generated lifestyle creator (lifestyle · fashion · fitness · travel). This project is built as a scalable foundation for a public brand site with a separate premium/private layer, designed to deploy cleanly on Vercel.

> **AI Disclosure:** Camila Ravelle is a fictional, AI-generated character and is never presented as a real person. See the in-app **AI Disclosure** page.

## Tech Stack
- **Next.js 15** (App Router) + React 18
- **Tailwind CSS** + **Framer Motion** + **shadcn/ui-style components**
- **Optional Resend email delivery** for contact and collaboration enquiries; direct `mailto:` fallback is available
- **Optional Supabase data layer** only if you want editable public content or analytics storage
- **Vercel deployment** with environment-driven config
- Legacy Mongo fallback remains available for prototyping or migration support

## Production Architecture
This project is structured around the correct premium/public split:

- **Public brand site:** polished editorial landing pages, about, gallery, contact, collaborations, and disclosures
- **Premium page:** a public, tasteful signpost only; private content, accounts, and payments stay on Fanvue/OnlyFans (or another separate platform)
- **Supabase is optional:** it is not needed for the premium link, contact emails, or third-party logins
- **No Emergent dependency or traces remain** in the app runtime or project metadata

## Project Structure
```
app/
  page.js                     # Public homepage
  premium/page.js             # Explicit public signpost route to an external premium platform
  [...slug]/page.js           # Remaining editorial routes, with static route validation
  layout.js                   # SEO metadata and site config
  sitemap.js / robots.js      # SEO files
  api/health/route.ts         # Health endpoint for deployment checks
  api/                         # Focused public API routes

components/site/             # Navbar, Footer, all page views and branded primitives
config/site.js               # Environment-driven brand config
data/content.js              # Content model and image definitions
data/journal.js              # Long-form Journal stories, reading times and Camila's Notes
docs/camila-ravelle-editorial-bible.md # Voice, story canon and continuity guidance
lib/supabase/                # Server-only optional public-site data client
lib/validation/              # Zod validation for forms and payloads
public/camila/               # Editorial imagery and brand assets
scripts/generate-public-image-manifest.js # Indexes public image folders at dev/build time
```

## Environment Variables
Copy `.env.example` to `.env` and fill in the values for your deployment:

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CAMILA_NAME="Camila Ravelle"
NEXT_PUBLIC_CONTACT_EMAIL="hello@camilarevelle.com"
CONTACT_TO_EMAIL="hello@camilarevelle.com"
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="Camila Ravelle <hello@camilarevelle.com>"
NEXT_PUBLIC_INSTAGRAM_URL="https://www.instagram.com/camila.ravelle/"
NEXT_PUBLIC_TIKTOK_URL="https://www.tiktok.com/@camila.ravelle"

# Optional: only needed if using this project's database-backed content/analytics
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## Install & Run
```bash
corepack yarn install
corepack yarn dev
```

## Adding Category Images
The image source of truth for public editorial photos is `private-media/camila-review/categories/`. Every supported image directly inside `fashion/`, `fitness/`, `lifestyle/`, `travel/`, and `unclassified/` is included on the public website; there is no filename approval list. Unclassified images appear under “Other” in the Gallery. The homepage carousel has its own source of truth: `private-media/camila-review/hero/`; every supported hero image appears in the carousel as a horizontally mirrored WebP derivative, leaving clear space on the left for the hero copy, and is not added to the Gallery. Category PNGs are automatically converted to WebP. Run `corepack yarn images:prepare` to regenerate public copies and manifests; dev startup and production builds run this automatically when the archive exists.

Every supported image placed in `categories/private-review/` is instead transformed into a small, permanently blurred WebP teaser for the Premium page. Only those blurred derivatives are written to `public/camila/premium-preview/`; full-resolution originals stay in the git-ignored archive and are never copied into `public/`. Generated public images and blurred teasers are deployment assets, so builds can use them when the private archive is unavailable.

The Premium page is informational: blurred previews are not clickable, and the site does not link directly to the external premium profile. Contact includes a Name, Email, Subject, and Message form plus a prefilled direct-email fallback. To send form submissions, configure Resend with `RESEND_API_KEY` and an `EMAIL_FROM` address on a verified domain; without it, visitors can still use the direct email option. Add carousel images to `hero/`, public editorial images to a category source folder other than `private-review/`, and exclusive images only to `categories/private-review/`.

## Production Checks
```bash
corepack yarn build
corepack yarn start
```

## Deployment to Vercel
1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the production environment variables from `.env.example`.
4. Set `NEXT_PUBLIC_BASE_URL` to `https://camilaravelle.com`. Set `NEXT_PUBLIC_CONTACT_EMAIL` to the public contact address and `CONTACT_TO_EMAIL` to the inbox that should receive enquiries. To enable form delivery, verify a sender domain with Resend and configure `RESEND_API_KEY` and `EMAIL_FROM`; the direct mailto fallback remains available.
5. Supabase is only necessary if you want database-backed editable content/analytics; it is not required for form email delivery.
6. The Premium page contains informational copy and blurred previews; users can find social profiles using the Instagram and TikTok links.
7. Add `camilaravelle.com` and `www.camilaravelle.com` in Vercel's project domain settings, apply the DNS records Vercel provides in GoDaddy, then deploy and validate the public site on the production domain.

## Recommended Next Steps
- Keep premium originals private; do not copy them into this site's `public/` directory.
- Replace placeholder commerce flows with Stripe Checkout when the product layer is ready.
- Move all editorial content into a CMS or Supabase-managed tables for low-friction updates.

## Disclosure Reminder
Camila Ravelle is a fictional AI-generated character and should never be represented as a real human in public, premium, or marketing materials.
