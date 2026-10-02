'use client'

import { Container, SocialLinks, NewsletterForm, AIBadge, track } from './primitives'
import site from '@/config/site'

const COLS = [
  {
    title: 'Explore',
    links: [
      { key: 'about', label: 'About' },
      { key: 'lifestyle', label: 'Lifestyle' },
      { key: 'fashion', label: 'Fashion' },
      { key: 'fitness', label: 'Fitness' },
      { key: 'travel', label: 'Travel' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { key: 'work', label: 'Work With Me' },
      { key: 'gallery', label: 'Gallery' },
      { key: 'blog', label: 'Blog' },
      { key: 'shop', label: 'Shop' },
      { key: 'premium', label: 'Premium' },
      { key: 'contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { key: 'ai-disclosure', label: 'AI Disclosure' },
      { key: 'privacy', label: 'Privacy Policy' },
      { key: 'cookies', label: 'Cookie Policy' },
      { key: 'terms', label: 'Terms' },
    ],
  },
]

export default function Footer({ go }) {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div>
              <p className="font-serif-i text-2xl font-semibold">CAMILA REYES</p>
              <p className="mt-1 text-sm text-muted-foreground">Lifestyle &middot; Fashion &middot; Fitness &middot; Travel</p>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              A fictional AI creator sharing everyday moments, fashion, fitness and travel experiences.
            </p>
            <AIBadge />
            <SocialLinks social={site.social} onClick={(k) => track('social_click', { platform: k, from: 'footer' })} />
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="tracking-luxe text-[11px] uppercase text-muted-foreground">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.key}>
                    <button onClick={() => go(l.key)} className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <h3 className="text-xl font-medium">Join the newsletter</h3>
              <p className="mt-1 text-sm text-muted-foreground">Monthly notes, new stories and early access — straight to your inbox.</p>
            </div>
            <NewsletterForm source="footer" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Camila Reyes. A fictional AI-generated character. All imagery is placeholder.</p>
          <p>{site.contactEmail}</p>
        </div>
      </Container>
    </footer>
  )
}
