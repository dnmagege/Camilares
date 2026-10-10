import { notFound } from 'next/navigation'
import SiteShell from '@/components/site/SiteShell'
import { blogSeed } from '@/data/content'

const STATIC_ROUTES = [
  'about', 'lifestyle', 'fashion', 'fitness', 'travel', 'gallery', 'blog', 'contact',
  'ai-disclosure', 'privacy', 'cookies', 'terms',
]

function isKnownRoute(parts) {
  if (parts.length === 1) return STATIC_ROUTES.includes(parts[0])
  if (parts.length === 2 && parts[0] === 'blog') return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(parts[1])
  return false
}

export function generateStaticParams() {
  return [
    ...STATIC_ROUTES.map((slug) => ({ slug: [slug] })),
    ...blogSeed.map((post) => ({ slug: ['blog', post.slug] })),
  ]
}

export async function generateMetadata({ params }) {
  const { slug = [] } = await params
  const path = slug.join('/')
  const labels = {
    about: 'About Camila', lifestyle: 'Lifestyle', fashion: 'Fashion', fitness: 'Fitness',
    travel: 'Travel', gallery: 'Gallery', blog: 'Journal',
    contact: 'Contact',
    'ai-disclosure': 'AI Disclosure',
    privacy: 'Privacy Policy', cookies: 'Cookie Policy', terms: 'Terms of Service',
  }
  const post = slug[0] === 'blog' ? blogSeed.find((item) => item.slug === slug[1]) : null
  const title = post?.title || labels[slug[0]] || 'Camila Ravelle'
  const canonicalPath = `/${slug.map((part) => encodeURIComponent(part)).join('/')}`
  return {
    title,
    description: post?.excerpt || 'A fictional AI-generated creator sharing considered lifestyle, fashion, wellness and travel editorials.',
    alternates: { canonical: canonicalPath },
  }
}

export default async function RoutedPublicPage({ params }) {
  const { slug = [] } = await params
  if (!isKnownRoute(slug)) notFound()
  return <SiteShell />
}
