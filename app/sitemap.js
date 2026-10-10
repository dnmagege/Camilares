import { blogSeed } from '@/data/content'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://camilaravelle.com'

export default async function sitemap() {
  const now = new Date()
  const routes = new Set([
    '', '/about', '/lifestyle', '/fashion', '/fitness', '/travel',
    '/gallery', '/blog', '/premium', '/contact', '/ai-disclosure',
    '/privacy', '/cookies', '/terms',
  ])
  for (const post of blogSeed) routes.add(`/blog/${encodeURIComponent(post.slug)}`)

  return [...routes].map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }))
}
