'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Youtube, Twitter, Music2, Sparkles, ArrowRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

// --- Analytics helper (fire-and-forget) -------------------------------------
export function track(event, meta = {}) {
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, meta }),
    }).catch(() => {})
  } catch (_) {}
}

export function Container({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-[1400px] px-6 md:px-10', className)}>{children}</div>
}

export function Eyebrow({ children, className }) {
  return (
    <span className={cn('tracking-luxe text-[11px] font-medium uppercase text-muted-foreground', className)}>
      {children}
    </span>
  )
}

export function Reveal({ children, delay = 0, y = 24, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ eyebrow, title, subtitle, center, className }) {
  return (
    <div className={cn(center && 'text-center mx-auto max-w-2xl', 'space-y-3', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{subtitle}</p>}
    </div>
  )
}

export function SmartImage({ src, alt, className, imgClassName }) {
  return (
    <div className={cn('relative overflow-hidden bg-secondary', className)}>
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        className={cn('h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform', imgClassName)}
      />
    </div>
  )
}

export function AIBadge({ className }) {
  return (
    <Badge variant="secondary" className={cn('gap-1.5 rounded-full bg-blush/40 text-charcoal border-blush/40 font-normal', className)}>
      <Sparkles className="h-3 w-3" /> Fictional AI creator
    </Badge>
  )
}

const socialMeta = {
  instagram: { label: 'Instagram', Icon: Instagram },
  tiktok: { label: 'TikTok', Icon: Music2 },
  youtube: { label: 'YouTube', Icon: Youtube },
  pinterest: { label: 'Pinterest', Icon: null },
  x: { label: 'X', Icon: Twitter },
}

export function SocialLinks({ social = {}, className, onClick }) {
  const entries = Object.entries(social).filter(([, url]) => url)
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {entries.map(([key, url]) => {
        const meta = socialMeta[key] || { label: key, Icon: null }
        const Icon = meta.Icon
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={meta.label}
            onClick={() => onClick?.(key)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground/80 transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5"
          >
            {Icon ? <Icon className="h-[18px] w-[18px]" /> : <span className="text-sm font-medium">{meta.label[0]}</span>}
          </a>
        )
      })}
    </div>
  )
}

export function FeatureCard({ item, onClick, index = 0 }) {
  return (
    <Reveal delay={index * 0.08}>
      <button
        onClick={onClick}
        className="group relative w-full overflow-hidden rounded-2xl text-left"
      >
        <SmartImage src={item.image} alt={item.title} className="aspect-[3/4]" imgClassName="group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
          <Eyebrow className="text-cream/70">Explore</Eyebrow>
          <h3 className="mt-1 text-2xl font-medium">{item.title}</h3>
          <p className="mt-2 text-sm text-cream/80 leading-relaxed line-clamp-2">{item.description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
            Discover <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </button>
    </Reveal>
  )
}

export function ContentCard({ item, index = 0, onClick }) {
  return (
    <Reveal delay={index * 0.06}>
      <button onClick={onClick} className="group block w-full text-left">
        <SmartImage src={item.image} alt={item.title} className="aspect-[4/5] rounded-xl" imgClassName="group-hover:scale-105" />
        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="tracking-luxe uppercase text-foreground/60">{item.category}</span>
            <span>&middot;</span>
            <span>{item.date}</span>
          </div>
          <h3 className="text-lg font-medium leading-snug group-hover:underline underline-offset-4 decoration-1">{item.title}</h3>
        </div>
      </button>
    </Reveal>
  )
}

export function BlogCard({ post, index = 0, onClick }) {
  return (
    <Reveal delay={index * 0.06}>
      <article onClick={onClick} className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-charcoal/5">
        <SmartImage src={post.cover} alt={post.title} className="aspect-[16/10]" imgClassName="object-top group-hover:scale-105" />
        <div className="space-y-3 p-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="tracking-luxe uppercase">{post.category}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="text-xl font-medium leading-snug">{post.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-foreground">
            Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Reveal>
  )
}

export function ProductCard({ product, index = 0, onOpen, onAdd }) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="group overflow-hidden rounded-2xl border border-border bg-card">
        <button onClick={onOpen} className="block w-full">
          <SmartImage src={product.image} alt={product.name} className="aspect-square" imgClassName="group-hover:scale-105" />
        </button>
        <div className="space-y-2 p-5">
          <Eyebrow>{product.category}</Eyebrow>
          <h3 className="text-base font-medium leading-snug">{product.name}</h3>
          <div className="flex items-center justify-between pt-1">
            <span className="text-lg font-medium">${product.price}</span>
            <Button size="sm" variant="secondary" className="rounded-full gap-1" onClick={() => onAdd?.(product)}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function NewsletterForm({ compact, source = 'website', className }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!consent) return toast.error('Please accept to receive emails.')
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, source }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(data.message || 'Subscribed!')
        track('newsletter_signup', { source })
        setEmail('')
        setConsent(false)
      } else {
        toast.error(data.error || 'Something went wrong.')
      }
    } catch (_) {
      toast.error('Network error, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className={cn('w-full', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="h-12 rounded-full bg-card px-5"
        />
        <Button type="submit" disabled={loading} className="h-12 rounded-full px-7">
          {loading ? 'Joining…' : 'Subscribe'}
        </Button>
      </div>
      <label className="mt-3 flex items-start gap-2.5 text-xs text-muted-foreground">
        <Checkbox checked={consent} onCheckedChange={(v) => setConsent(!!v)} className="mt-0.5" />
        <span>I agree to receive newsletters and accept the privacy policy. Unsubscribe anytime.</span>
      </label>
    </form>
  )
}
