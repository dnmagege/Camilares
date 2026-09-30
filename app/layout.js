import './globals.css'
import { Providers } from './providers'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://camilares.com'

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Camila Reyes — Lifestyle • Fashion • Fitness • Travel',
    template: '%s | Camila Reyes',
  },
  description:
    'A fictional AI creator sharing everyday moments, fashion, fitness and travel experiences. Premium lifestyle stories from Camila Reyes.',
  keywords: ['Camila Reyes', 'lifestyle', 'fashion', 'fitness', 'travel', 'AI creator', 'digital creator'],
  authors: [{ name: 'Camila Reyes' }],
  openGraph: {
    type: 'website',
    title: 'Camila Reyes — Lifestyle • Fashion • Fitness • Travel',
    description: 'A fictional AI creator sharing lifestyle, fashion, fitness and travel inspired stories.',
    url: BASE,
    siteName: 'Camila Reyes',
    images: [{ url: 'https://images.unsplash.com/photo-1579809011670-aa21121f5ec6?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Camila Reyes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camila Reyes — Lifestyle • Fashion • Fitness • Travel',
    description: 'A fictional AI creator sharing lifestyle, fashion, fitness and travel inspired stories.',
    images: ['https://images.unsplash.com/photo-1579809011670-aa21121f5ec6?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Camila Reyes',
  description: 'A fictional AI-generated lifestyle creator. Camila Reyes is not a real person.',
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
