'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
  instagram: { label: 'Instagram', classes: 'bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white' },
  tiktok: { label: 'TikTok', classes: 'bg-[#111111] text-white' },
}

export function SocialLinks({ social = {}, className, onClick }) {
  const entries = ['instagram', 'tiktok'].filter((key) => social[key])
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {entries.map((key) => {
        const meta = socialMeta[key]
        return (
          <a
            key={key}
            href={social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={meta.label}
            onClick={() => onClick?.(key)}
            className={cn('grid h-10 w-10 place-items-center rounded-full shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md', meta.classes)}
          >
            {key === 'instagram' ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.65" cy="6.55" r="1" fill="currentColor" stroke="none" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px]">
                <path d="M14.2 3.2h3.1c.2 2.1 1.4 3.7 3.5 4.3v3.2a9.5 9.5 0 0 1-3.5-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.5 0 1 .1 1.5.2v3.4a2.8 2.8 0 1 0 1.6 2.5V3.2Z" fill="#25F4EE" transform="translate(-1 1)" />
                <path d="M14.2 3.2h3.1c.2 2.1 1.4 3.7 3.5 4.3v3.2a9.5 9.5 0 0 1-3.5-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.5 0 1 .1 1.5.2v3.4a2.8 2.8 0 1 0 1.6 2.5V3.2Z" fill="#FE2C55" transform="translate(1 -1)" />
                <path d="M14.2 3.2h3.1c.2 2.1 1.4 3.7 3.5 4.3v3.2a9.5 9.5 0 0 1-3.5-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.5 0 1 .1 1.5.2v3.4a2.8 2.8 0 1 0 1.6 2.5V3.2Z" fill="white" />
              </svg>
            )}
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

export function BlogCard({ post, index = 0 }) {
  return (
    <Reveal delay={index * 0.06}>
      <article className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-charcoal/5">
        <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
        </Link>
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

