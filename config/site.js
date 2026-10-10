// Centralised, environment-driven brand configuration.
// Replace values via .env (NEXT_PUBLIC_*) — nothing is hard-coded in components.

export const site = {
  name: process.env.NEXT_PUBLIC_CAMILA_NAME || 'Camila Ravelle',
  shortName: 'Camila',
  tagline: 'Lifestyle • Fashion • Fitness • Travel',
  description:
    'A fictional AI creator sharing everyday moments, fashion, fitness and travel experiences.',
  domain: 'camilaravelle.com',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@camilarevelle.com',
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/camila.ravelle/',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@camila.ravelle',
  },
};

export default site;
