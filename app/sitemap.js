const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://camilares.com'

export default function sitemap() {
  const now = new Date()
  const routes = [
    '', '/about', '/lifestyle', '/fashion', '/fitness', '/travel',
    '/gallery', '/blog', '/premium', '/shop', '/contact', '/ai-disclosure',
    '/privacy', '/cookies', '/terms',
  ]
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }))
}
