'use client'

import { Container, SocialLinks, AIBadge } from './primitives'
import { Button } from '@/components/ui/button'
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
      { key: 'gallery', label: 'Gallery' },
      { key: 'blog', label: 'Blog' },
      { key: 'contact', label: 'Contact' },
      { key: 'premium', label: 'Premium' },
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
              <img src="/camila/camila-ravelle-logo.png" alt="Camila Ravelle" className="h-[105px] w-[160px] object-contain object-left" />
              <p className="mt-1 text-sm text-muted-foreground">Lifestyle &middot; Fashion &middot; Fitness &middot; Travel</p>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              A fictional AI creator sharing everyday moments, fashion, fitness and travel experiences.
            </p>
            <AIBadge />
            <SocialLinks social={site.social} />
            <div className="space-y-3 pt-2">
              <p className="text-sm font-medium">Have a project, collaboration, or brand idea?</p>
              <p className="text-sm text-muted-foreground">I’d love to hear what you have in mind.</p>
              <Button onClick={() => go('contact')} className="rounded-full">
                Let’s Work Together <span aria-hidden="true" className="ml-1">→</span>
              </Button>
              <p>
                <a className="text-sm text-foreground/80 underline underline-offset-4 hover:text-foreground" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </p>
            </div>
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

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Camila Ravelle. A fictional AI-generated character. Public imagery is editorial and curated.</p>
        </div>
      </Container>
    </footer>
  )
}
