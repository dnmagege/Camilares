// Centralised, environment-driven brand configuration.
// Replace values via .env (NEXT_PUBLIC_*) — nothing is hard-coded in components.

export const site = {
  name: process.env.NEXT_PUBLIC_CAMILA_NAME || 'Camila Reyes',
  shortName: 'Camila',
  tagline: 'Lifestyle • Fashion • Fitness • Travel',
  description:
    'A fictional AI creator sharing everyday moments, fashion, fitness and travel experiences.',
  domain: 'camilares.com',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@camilares.com',
  premiumUrl: process.env.NEXT_PUBLIC_PREMIUM_URL || 'https://premium.camilares.com',
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/camilares',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@camilares',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@camilares',
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com/camilares',
    x: process.env.NEXT_PUBLIC_X_URL || 'https://x.com/camilares',
  },
};

export default site;
