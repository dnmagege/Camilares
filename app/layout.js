import './globals.css'
import { Providers } from './providers'
import { heroImages } from '@/data/hero-image-manifest'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://camilaravelle.com'

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Camila Ravelle — Lifestyle • Fashion • Fitness • Travel',
    template: '%s | Camila Ravelle',
  },
  description:
    'A fictional AI creator sharing everyday moments, fashion, fitness and travel experiences. Premium lifestyle stories from Camila Ravelle.',
  alternates: { canonical: '/' },
  keywords: ['Camila Ravelle', 'lifestyle', 'fashion', 'fitness', 'travel', 'AI creator', 'digital creator'],
  authors: [{ name: 'Camila Ravelle' }],
  openGraph: {
    type: 'website',
    title: 'Camila Ravelle — Lifestyle • Fashion • Fitness • Travel',
    description: 'A fictional AI creator sharing lifestyle, fashion, fitness and travel inspired stories.',
    url: BASE,
    siteName: 'Camila Ravelle',
    images: [{ url: heroImages[0].src, width: 1672, height: 941, alt: heroImages[0].alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camila Ravelle — Lifestyle • Fashion • Fitness • Travel',
    description: 'A fictional AI creator sharing lifestyle, fashion, fitness and travel inspired stories.',
    images: [heroImages[0].src],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Camila Ravelle',
  description: 'A fictional AI-generated lifestyle creator. Camila Ravelle is not a real person.',
  disambiguatingDescription: 'Fictional AI-generated character',
  url: BASE,
  knowsAbout: ['Lifestyle', 'Fashion', 'Fitness', 'Travel'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
