'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, Check, Search, ShoppingBag, Trash2,
  Sparkles, Heart, Bell, Star, Calendar, Clock,
  Plane, Dumbbell, Camera, Share2, Tag, Mail,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import site from '@/config/site'
import { premiumPreviewImages } from '@/data/premium-preview-manifest'
import {
  heroImages, aboutImage, homeAboutImage, homePremiumImage,
  galleryHeroImage, blogHeroImage, shopHeroImage, contactHeroImage, premiumHeroImage,
  aboutGalleryImages, categoryTitles,
  features, latestContent, personalityTraits, categories, galleryItems,
  galleryFilters, blogSeed, productSeed, premiumBenefits,
} from '@/data/content'
import {
  Container, Eyebrow, Reveal, SectionTitle, SmartImage, AIBadge,
  SocialLinks, FeatureCard, ContentCard, BlogCard, ProductCard,
} from './primitives'

// ---------------------------------------------------------------------------
// Shared page hero
// ---------------------------------------------------------------------------
function PageHero({ image, eyebrow, title, subtitle }) {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-charcoal pt-24">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/20" />
      <Container className="relative z-10 pb-14 text-cream">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          {eyebrow && <Eyebrow className="text-cream/70">{eyebrow}</Eyebrow>}
          <h1 className="mt-2 max-w-3xl text-4xl md:text-6xl font-medium leading-tight">{title}</h1>
          {subtitle && <p className="mt-4 max-w-xl text-cream/85 text-lg leading-relaxed">{subtitle}</p>}
        </motion.div>
      </Container>
    </section>
  )
}

function Section({ className, children }) {
  return <section className={cn('py-16 md:py-24', className)}><Container>{children}</Container></section>
}

// ===========================================================================
// HOME
// ===========================================================================
export function HomeView({ go }) {
  const [heroIndex, setHeroIndex] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % heroImages.length), 6500)
    return () => window.clearInterval(timer)
  }, [])
  const activeHero = heroImages[heroIndex]

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal">
        <motion.img key={activeHero.src} src={activeHero.src} alt={activeHero.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/40 to-transparent" />
        <Container className="relative z-10 py-32 text-cream">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl">
            <AIBadge className="bg-cream/15 text-cream border-cream/20 backdrop-blur-sm" />
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight">CAMILA RAVELLE</h1>
            <p className="mt-5 tracking-luxe uppercase text-sm text-cream/80">Lifestyle &middot; Fashion &middot; Fitness &middot; Travel</p>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-cream/85 leading-relaxed">Sharing the places, moments and little things I love.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 bg-cream text-charcoal hover:bg-cream/90" onClick={() => go('gallery')}>
                Explore My World <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-xs tracking-luxe uppercase text-cream/60">Follow</span>
              <SocialLinks social={site.social} />
            </div>
          </motion.div>
        </Container>
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3" aria-label="Hero image carousel controls">
          {heroImages.map((image, index) => (
            <button key={image.src} onClick={() => setHeroIndex(index)} aria-label={`Show hero image ${index + 1}`} aria-current={heroIndex === index} className={cn('h-2.5 rounded-full transition-all', heroIndex === index ? 'w-8 bg-cream' : 'w-2.5 bg-cream/50')} />
          ))}
        </div>
      </section>

      {/* Features */}
      <Section>
        <SectionTitle center eyebrow="The world of Camila" title="Four passions, one story" subtitle="Explore the pillars that shape every editorial, diary entry and everyday moment." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureCard key={f.key} item={f} index={i} onClick={() => go(f.key)} />
          ))}
        </div>
      </Section>

      {/* About preview */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal><SmartImage src={homeAboutImage} alt="Camila enjoying a quiet autumn café moment" className="aspect-[4/5] rounded-3xl" /></Reveal>
            <Reveal delay={0.1} className="space-y-6">
              <Eyebrow>Meet Camila</Eyebrow>
              <h2 className="text-3xl md:text-5xl font-medium leading-tight">A fictional AI creator with a very human sense of style</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Camila Ravelle is an AI-generated lifestyle creator — warm, confident and endlessly curious.
                She shares considered stories across fashion, fitness, travel and the small rituals of everyday life.
              </p>
              <div className="flex flex-wrap gap-2">
                {personalityTraits.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-full font-normal px-3 py-1">{t}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button className="rounded-full px-7" onClick={() => go('about')}>Read her story</Button>
                <Button variant="outline" className="rounded-full px-7" onClick={() => go('ai-disclosure')}>AI Disclosure</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Latest content */}
      <Section>
        <div className="flex items-end justify-between gap-6">
          <SectionTitle eyebrow="Fresh from the diary" title="Latest content" />
          <Button variant="ghost" className="rounded-full hidden sm:inline-flex" onClick={() => go('blog')}>View all <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </div>
        <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {latestContent.map((c, i) => (
            <ContentCard key={c.slug} item={c} index={i} onClick={() => go('post', c.slug)} />
          ))}
        </div>
      </Section>

      {/* Premium CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <img src={homePremiumImage} alt="A festive evening at a winter market" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-charcoal/70" />
              <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-cream text-center">
                <Eyebrow className="text-cream/70">Exclusive</Eyebrow>
                <h2 className="mx-auto mt-3 max-w-2xl text-3xl md:text-5xl font-medium leading-tight">A more personal side of Camila</h2>
                <p className="mx-auto mt-4 max-w-xl text-cream/80 text-lg">Behind-the-scenes moments, extended stories and content shared with her premium community.</p>
                <Button size="lg" className="mt-8 rounded-full px-9 bg-cream text-charcoal hover:bg-cream/90" onClick={() => go('premium')}>
                  Explore Premium <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Work together CTA */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Let’s work together</Eyebrow>
              <h2 className="mt-3 text-3xl font-medium leading-tight md:text-5xl">Have a project, collaboration, or brand idea?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                I’d love to hear what you have in mind.
              </p>
              <Button size="lg" className="mt-8 rounded-full px-9" onClick={() => go('contact')}>
                Let’s Work Together <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

    </>
  )
}

// ===========================================================================
// ABOUT
// ===========================================================================
export function AboutView({ go }) {
  const blocks = [
    { h: 'Who is Camila?', p: 'Camila Ravelle is a fictional AI lifestyle creator, imagined as a 25-year-old Latina-American based in Miami. She shares warmth, style and inspiration while remaining transparent about her digital nature.' },
    { h: 'Personality', p: 'Warm and approachable, confident yet curious. Camila brings a creative, adventurous spirit to everything she shares, with a modern, feminine sensibility.' },
    { h: 'Interests', p: 'From fashion and beauty edits to mindful movement, travel and everyday life, Camila is drawn to the beautiful, the intentional and the curious.' },
    { h: 'Creator philosophy', p: 'Less noise, more meaning. Camila believes in quality over quantity, softness over hustle, and stories that make ordinary days feel a little more special.' },
  ]
  return (
    <>
      <PageHero image={heroImages[0].src} eyebrow="About" title="Meet Camila Ravelle" subtitle="A fictional AI creator sharing lifestyle, fashion, fitness and travel inspired stories." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            {blocks.map((b, i) => (
              <Reveal key={b.h} delay={i * 0.05} className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-medium">{b.h}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{b.p}</p>
              </Reveal>
            ))}
            <Reveal>
              <div className="rounded-2xl border border-blush/50 bg-blush/20 p-6">
                <div className="flex items-center gap-2 text-charcoal"><Sparkles className="h-4 w-4" /><span className="font-medium">AI Disclosure</span></div>
                <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">Camila Ravelle is not a real person. She is an AI-generated character created for storytelling and creative expression.</p>
                <Button variant="link" className="mt-1 h-auto p-0 text-charcoal" onClick={() => go('ai-disclosure')}>Read the full disclosure →</Button>
              </div>
            </Reveal>
          </div>
          <div className="mx-auto w-full max-w-lg space-y-4 lg:mx-0">
            <Reveal><SmartImage src={aboutGalleryImages[0]} alt="Camila under an umbrella on a rainy autumn street" className="aspect-[4/5] rounded-2xl" /></Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={0.05}><SmartImage src={aboutGalleryImages[1]} alt="Camila at sunset on the Positano coast" className="aspect-square rounded-2xl" imgClassName="object-top" /></Reveal>
              <Reveal delay={0.1}><SmartImage src={aboutGalleryImages[2]} alt="Camila enjoying a warm autumn café moment" className="aspect-square rounded-2xl" imgClassName="object-top" /></Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

// ===========================================================================
// CATEGORY (Lifestyle / Fashion / Fitness / Travel)
// ===========================================================================
export function CategoryView({ catKey, go }) {
  const cat = categories[catKey]
  if (!cat) return null
  const categoryImages = [...new Set(cat.grid.filter((src) => src !== cat.hero))]
  return (
    <>
      <PageHero image={cat.hero} eyebrow={cat.title} title={cat.tagline} />
      <Section>
        <SectionTitle center title={`${cat.title} stories`} subtitle={cat.intro} />
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 masonry">
          {categoryImages.map((src, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <SmartImage src={src} alt={`${cat.title} ${i + 1}`} className="rounded-2xl" imgClassName="hover:scale-105" />
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button className="rounded-full px-8" onClick={() => go('gallery')}>Browse full gallery <ArrowRight className="ml-1 h-4 w-4" /></Button>
        </div>
      </Section>
    </>
  )
}

// ===========================================================================
// GALLERY
// ===========================================================================
export function GalleryView() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  const filtered = useMemo(
    () => {
      const selected = filter === 'All' ? galleryItems : galleryItems.filter((item) => categoryTitles[item.category] === filter)
      const seen = new Set()
      return selected.filter((item) => {
        const key = item.src.split('?')[0].trim().toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    },
    [filter]
  )

  return (
    <>
      <PageHero image={galleryHeroImage} eyebrow="Gallery" title="A visual diary" subtitle="Editorial moments across lifestyle, fashion, fitness and travel." />
      <Section>
        <div className="flex flex-wrap justify-center gap-2">
          {galleryFilters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={cn('rounded-full border px-5 py-2 text-sm transition-all',
                filter === f ? 'border-foreground bg-foreground text-background' : 'border-border bg-card text-muted-foreground hover:text-foreground')}>
              {f}
            </button>
          ))}
        </div>
        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 masonry">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={(i % 4) * 0.04}>
              <button onClick={() => setActive(item)} className="group relative block w-full overflow-hidden rounded-2xl">
                <SmartImage src={item.src} alt={item.alt} className="" imgClassName="group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="p-4 text-sm text-cream">{item.caption}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-0 bg-transparent p-0 shadow-none">
          {active && (
            <div className="overflow-hidden rounded-2xl bg-card">
              <img src={active.src} alt={active.alt} className="max-h-[75vh] w-full object-contain bg-charcoal" />
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium">{active.caption}</p>
                  <p className="text-sm text-muted-foreground">{active.alt}</p>
                </div>
                <Badge variant="secondary" className="rounded-full capitalize">{active.category}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// ===========================================================================
// BLOG
// ===========================================================================
export function BlogView({ go }) {
  const [q, setQ] = useState('')
  const searchFiltered = blogSeed.filter((p) =>
    (p.title + p.category + p.excerpt).toLowerCase().includes(q.toLowerCase())
  )
  const seenCovers = new Set()
  const filtered = searchFiltered.filter((post) => {
    const key = (post.cover || post.cover_url || '').split('?')[0].trim().toLowerCase()
    if (!key || seenCovers.has(key)) return false
    seenCovers.add(key)
    return true
  })

  return (
    <>
      <PageHero image={blogHeroImage} eyebrow="Journal" title="The Camila diary" subtitle="Stories, edits and everyday inspiration." />
      <Section>
        <div className="mx-auto mb-12 flex max-w-md items-center gap-2 rounded-full border border-border bg-card px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="border-0 bg-transparent px-1 focus-visible:ring-0" />
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No articles found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <BlogCard key={p.id} post={p} index={i} />
            ))}
          </div>
        )}
      </Section>
    </>
  )
}

export function PostView({ slug, go }) {
  const post = blogSeed.find((b) => b.slug === slug)
  const relatedCandidates = blogSeed.filter((b) => b.slug !== slug).slice(0, 3)
  const usedCovers = new Set([post?.cover].filter(Boolean).map((src) => src.split('?')[0].toLowerCase()))
  const related = relatedCandidates.filter((item) => {
    const key = (item.cover || item.cover_url || '').split('?')[0].trim().toLowerCase()
    if (!key || usedCovers.has(key)) return false
    usedCovers.add(key)
    return true
  })
  if (!post) return <Section><p className="pt-24 text-center text-muted-foreground">Article not found.</p></Section>

  return (
    <>
      <PageHero image={post.cover} eyebrow={post.category} title={post.title} />
      <Section>
        <div className="mx-auto max-w-2xl">
          <Button variant="ghost" className="mb-8 -ml-3 rounded-full" onClick={() => go('blog')}><ArrowLeft className="mr-1 h-4 w-4" /> All articles</Button>
          <div className="flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readingTime}</span>
            <span>By {post.author}</span>
          </div>
          <div className="prose prose-lg mt-8 max-w-none">
            {(post.body || []).map((block, i) => (
              block.startsWith('## ') ? (
                <h2 key={i} className="mb-4 mt-12 text-2xl font-medium tracking-tight text-foreground first:mt-0">{block.slice(3)}</h2>
              ) : (
                <p key={i} className="mb-4 text-lg leading-relaxed text-foreground/90">
                  {block.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) return <strong key={partIndex}>{part.slice(2, -2)}</strong>
                    if (part.startsWith('*') && part.endsWith('*')) return <em key={partIndex}>{part.slice(1, -1)}</em>
                    return part
                  })}
                </p>
              )
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-blush/50 bg-blush/20 p-5 text-sm text-charcoal/80">
            <span className="font-medium text-charcoal">Note:</span> Camila Ravelle is a fictional AI-generated character. This article is creative editorial content created as part of the Camila Ravelle fictional world.
          </div>
          {post.camilaNotes?.length > 0 && (
            <aside className="mt-8 rounded-2xl border border-border bg-secondary/50 p-6 md:p-8" aria-label="Camila's Notes">
              <Eyebrow>Camila’s Notes</Eyebrow>
              <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                {post.camilaNotes.map(([label, note]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium uppercase tracking-luxe text-muted-foreground">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-foreground">{note}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-5xl">
            <SectionTitle eyebrow="Keep reading" title="Related stories" />
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((p, i) => <BlogCard key={p.id || i} post={p} index={i} />)}
            </div>
          </div>
        )}
      </Section>
    </>
  )
}

// ===========================================================================
// PREMIUM
// ===========================================================================
const benefitIcons = [Sparkles, Heart, Star, Bell]

export function PremiumView() {
  return (
    <>
      <PageHero image={premiumHeroImage} eyebrow="Exclusive" title="Exclusive With Camila" subtitle="Some moments are meant to stay a little more personal." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {premiumBenefits.map((b, i) => {
            const Icon = benefitIcons[i % benefitIcons.length]
            return (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-blush/40 text-charcoal"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-5 text-lg font-medium">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
        <div className="mt-16">
          <SectionTitle
            center
            eyebrow={categoryTitles['private-review']}
            title="A blurred glimpse of the exclusive edits"
            subtitle="These previews are permanently blurred. The original exclusive images are only available on Camila’s Fanvue page."
          />
          <div className="mx-auto mt-9 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3">
            {premiumPreviewImages.map((src, index) => (
              <div
                key={src}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-secondary last:col-span-2 last:w-1/2 last:justify-self-center md:last:col-span-1 md:last:w-auto"
              >
                <img
                  src={src}
                  alt={`Permanently blurred Fanvue exclusive teaser ${index + 1}`}
                  className="h-full w-full select-none object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-charcoal/45 p-4 text-center text-cream transition-colors group-hover:bg-charcoal/55">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-cream/50 bg-charcoal/45">
                    <Sparkles aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">Premium preview</span>
                  <span className="text-xs">Preview only</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Only small, permanently blurred teaser files are served here. Full-resolution originals remain private and are available only on Fanvue.</p>
        </div>
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-16 text-center text-cream md:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl font-medium leading-tight">A more personal side of Camila</h2>
            <p className="mx-auto mt-4 max-w-lg text-cream/80">The premium community is hosted separately. This website uses public category images and never serves Private Review originals.</p>
            <p className="mx-auto mt-5 max-w-lg text-sm text-cream/70">Premium content is hosted on a separate platform. This site provides editorial information and previews only.</p>
          </div>
        </Reveal>
      </Section>
    </>
  )
}

// ===========================================================================
// SHOP
// ===========================================================================
export function ShopView({ go, cart, addToCart, removeFromCart }) {
  const [products, setProducts] = useState(productSeed)
  const [cat, setCat] = useState('All')
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    fetch('/api/products').then((r) => r.json()).then((d) => { if (d.products?.length) setProducts(d.products) }).catch(() => {})
  }, [])

  const cats = ['All', ...Array.from(new Set(products.map((p) => p.category)))]
  const categoryProducts = cat === 'All' ? products : products.filter((p) => p.category === cat)
  const seenProductImages = new Set()
  const filtered = categoryProducts.filter((product) => {
    const key = (product.image || '').split('?')[0].trim().toLowerCase()
    if (!key || seenProductImages.has(key)) return false
    seenProductImages.add(key)
    return true
  })
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <PageHero image={shopHeroImage} eyebrow="Shop" title="The Camila shop" subtitle="Digital downloads, guides, creator resources and merchandise." />
      <Section>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={cn('rounded-full border px-4 py-2 text-sm transition-all',
                  cat === c ? 'border-foreground bg-foreground text-background' : 'border-border bg-card text-muted-foreground hover:text-foreground')}>
                {c}
              </button>
            ))}
          </div>
          <Button variant="outline" className="rounded-full gap-2" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-4 w-4" /> Cart {count > 0 && <Badge className="ml-1 rounded-full px-2">{count}</Badge>}
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={() => go('product', p.id)}
              onAdd={(prod) => { addToCart(prod); toast.success(`${prod.name} added to cart`) }} />
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">Checkout is a placeholder — payment integration (e.g. Stripe) is planned for a future release.</p>
      </Section>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md">
          <h3 className="text-xl font-medium">Your cart</h3>
          {cart.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            <>
              <div className="max-h-[50vh] space-y-3 overflow-y-auto py-2">
                {cart.map((i) => (
                  <div key={i.id} className="flex items-center gap-3">
                    <img src={i.image} alt={i.name} className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-tight">{i.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {i.qty} &middot; ${i.price}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(i.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-muted-foreground">Total</span>
                <span className="text-lg font-medium">${total}</span>
              </div>
              <Button className="w-full rounded-full" onClick={() => toast('Checkout coming soon — payments not yet enabled.')}>Checkout</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export function ProductView({ id, go, addToCart }) {
  const [product, setProduct] = useState(productSeed.find((p) => p.id === id) || null)
  useEffect(() => {
    fetch(`/api/products/${id}`).then((r) => r.json()).then((d) => { if (d.product) setProduct(d.product) }).catch(() => {})
  }, [id])
  if (!product) return <Section><p className="pt-24 text-center text-muted-foreground">Product not found.</p></Section>

  return (
    <Section className="pt-32">
      <Button variant="ghost" className="mb-8 -ml-3 rounded-full" onClick={() => go('shop')}><ArrowLeft className="mr-1 h-4 w-4" /> Back to shop</Button>
      <div className="grid gap-10 lg:grid-cols-2">
        <SmartImage src={product.image} alt={product.name} className="aspect-square rounded-3xl" />
        <div className="space-y-5">
          <Eyebrow>{product.category}</Eyebrow>
          <h1 className="text-3xl md:text-4xl font-medium">{product.name}</h1>
          <p className="text-2xl font-medium">${product.price}</p>
          <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
          <Badge variant="secondary" className="rounded-full capitalize">{product.type} product</Badge>
          <div className="flex gap-3 pt-2">
            <Button size="lg" className="rounded-full px-8" onClick={() => { addToCart(product); toast.success('Added to cart') }}>Add to cart</Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" onClick={() => toast('Checkout coming soon.')}>Buy now</Button>
          </div>
          <p className="text-xs text-muted-foreground">Payments are not yet enabled — this is a future-ready placeholder.</p>
        </div>
      </div>
    </Section>
  )
}

// ===========================================================================
// CONTACT
// ===========================================================================
export function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '', projectDetails: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))
  const emailDraft = `mailto:${site.contactEmail}?subject=${encodeURIComponent(form.subject || 'Website enquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany / Brand: ${form.company || 'Not provided'}\n\n${form.message}${form.projectDetails ? `\n\nProject details:\n${form.projectDetails}` : ''}`)}`

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok || !data.success) {
        setError(data.error || 'We could not send your message. Please use the direct email option below.')
        return
      }
      toast.success(data.message || 'Your message has been sent.')
      setForm({ name: '', email: '', company: '', subject: '', message: '', projectDetails: '', website: '' })
    } catch {
      setError('We could not reach the email service. Please use the direct email option below.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero image={contactHeroImage} eyebrow="Contact" title="Let’s connect" subtitle="Have a project, collaboration, or brand idea? I’d love to hear what you have in mind." />
      <Section>
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary">
              <img src={heroImages[0].src} alt="Camila Ravelle, editorial portrait" className="absolute inset-0 h-full w-full object-cover object-top" />
            </div>
            <div>
              <p className="font-serif-i text-2xl">Camila Ravelle</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">For general questions, business enquiries, and thoughtful collaboration ideas.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
            <div className="mb-7">
              <Eyebrow>Contact Camila</Eyebrow>
              <h2 className="mt-2 text-2xl font-medium md:text-3xl">Send a message</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Tell us a little about you and what you have in mind.</p>
            </div>
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="contact-name">Name</Label><Input id="contact-name" autoComplete="name" required minLength={2} maxLength={150} value={form.name} onChange={set('name')} placeholder="Your name" /></div>
                <div className="space-y-2"><Label htmlFor="contact-email">Email</Label><Input id="contact-email" autoComplete="email" required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="contact-company">Company / Brand <span className="text-muted-foreground">(optional)</span></Label><Input id="contact-company" autoComplete="organization" maxLength={200} value={form.company} onChange={set('company')} placeholder="Your company or brand" /></div>
              <div className="space-y-2"><Label htmlFor="contact-subject">Subject</Label><Input id="contact-subject" required minLength={3} maxLength={180} value={form.subject} onChange={set('subject')} placeholder="What is your message about?" /></div>
              <div className="space-y-2"><Label htmlFor="contact-message">Message</Label><Textarea id="contact-message" required minLength={10} maxLength={5000} rows={6} value={form.message} onChange={set('message')} placeholder="Write your message…" /></div>
              <div className="space-y-2"><Label htmlFor="contact-project-details">Project details <span className="text-muted-foreground">(optional)</span></Label><Textarea id="contact-project-details" maxLength={5000} rows={3} value={form.projectDetails} onChange={set('projectDetails')} placeholder="Share any timing, budget, deliverables, or other details that may help." /></div>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <Label htmlFor="contact-website">Leave this field blank</Label>
                <Input id="contact-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </div>
              {error && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={loading} className="h-12 w-full rounded-full">
                {loading ? 'Sending…' : 'Send message'}
              </Button>
            </form>
            <div className="mt-7 border-t border-border pt-6">
              <p className="text-sm text-muted-foreground">Prefer email?</p>
              <a href={emailDraft} className="mt-1 inline-flex items-center gap-2 font-medium text-foreground underline underline-offset-4 hover:text-foreground/70">
                <Mail className="h-4 w-4" /> {site.contactEmail}
              </a>
              <p className="mt-5 text-sm text-muted-foreground">For quick updates, find Camila on Instagram and TikTok.</p>
              <div className="mt-3"><SocialLinks social={site.social} /></div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

// ===========================================================================
// AI DISCLOSURE
// ===========================================================================
export function DisclosureView({ go }) {
  return (
    <Section className="pt-32">
      <div className="mx-auto max-w-2xl">
        <AIBadge />
        <h1 className="mt-5 text-4xl md:text-5xl font-medium">AI Disclosure</h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p><span className="font-medium text-foreground">Camila Ravelle is a fictional, AI-generated character.</span> She is not a real person. Every image, story and piece of content associated with Camila is created for artistic and entertainment purposes.</p>
          <p>Public character images are curated AI-generated editorial illustrations. Scenic and object photography may be illustrative stock imagery; no image is intended to identify or impersonate a real person.</p>
          <p>We are committed to transparency. Camila will never be presented as a real human being, and this disclosure is linked throughout the site.</p>
          <p>This public website does not provide accounts or host private content. Any future premium experience will be hosted by a separate third-party platform and clearly labelled as AI-generated.</p>
        </div>
        <div className="mt-10 flex gap-3">
          <Button className="rounded-full px-7" onClick={() => go('about')}>About Camila</Button>
          <Button variant="outline" className="rounded-full px-7" onClick={() => go('home')}>Back home</Button>
        </div>
      </div>
    </Section>
  )
}

// ===========================================================================
// LEGAL (privacy / cookies / terms)
// ===========================================================================
const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This site is an informational editorial website with a simple email enquiry form and links to social platforms.',
    sections: [
      ['Contact enquiries', 'If email delivery is configured, the name, email address, subject, and message you submit are sent to Camila’s team by email. This website does not store contact submissions. You may instead open a prefilled email draft in your own email app.'],
      ['External links', 'Instagram and TikTok are third-party services. When you follow those links, their own privacy policies and terms apply.'],
      ['Site operation', 'The site serves editorial pages and images. No analytics tracking is sent from the website.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'A short note on the cookies and analytics currently used by this site.',
    sections: [
      ['Essential cookies', 'These are required for the site to function correctly and cannot be switched off.'],
      ['Analytics', 'The website does not send analytics events or use advertising trackers.'],
      ['Managing cookies', 'You can control cookies through your browser settings at any time.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro: 'The basic terms for using this website.',
    sections: [
      ['Fictional character', 'Camila Ravelle is a fictional AI-generated character. All content is provided for entertainment and inspiration.'],
      ['Acceptable use', 'You agree not to misuse the site or attempt to disrupt its normal operation.'],
      ['Changes', 'These terms may be updated from time to time. Continued use constitutes acceptance of any changes.'],
    ],
  },
}
export function LegalView({ type, go }) {
  const data = LEGAL[type] || LEGAL.privacy
  return (
    <Section className="pt-32">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-2 text-4xl md:text-5xl font-medium">{data.title}</h1>
        <p className="mt-3 text-muted-foreground text-lg">{data.intro}</p>
        <div className="mt-10 space-y-8">
          {data.sections.map(([h, p]) => (
            <div key={h} className="space-y-2">
              <h2 className="text-xl font-medium">{h}</h2>
              <p className="text-muted-foreground leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">Last updated: October 6, 2026.</p>
      </div>
    </Section>
  )
}

// ===========================================================================
// WORK WITH CAMILA (professional collaborations)
// ===========================================================================
const collabCards = [
  { icon: Sparkles, title: 'Brand Collaborations', desc: 'Fashion, beauty, lifestyle and consumer brands.' },
  { icon: Plane, title: 'Travel & Hospitality', desc: 'Hotels, destinations, tourism and travel experiences.' },
  { icon: Dumbbell, title: 'Fitness & Wellness', desc: 'Fitness, active lifestyle and wellness brands.' },
  { icon: Camera, title: 'Content Creation', desc: 'Photography, social content and campaign assets.' },
  { icon: Share2, title: 'Social Campaigns', desc: 'Instagram, TikTok, YouTube and other social campaigns.' },
  { icon: Tag, title: 'Affiliate Partnerships', desc: 'Product recommendations and lifestyle partnerships.' },
]
export function WorkView() {
  const [form, setForm] = useState({ name: '', company: '', email: '', campaignType: 'Brand collaboration', message: '', website: '' })
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }))
  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch('/api/collab', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(data.message)
        setForm({ name: '', company: '', email: '', campaignType: 'Brand collaboration', message: '', website: '' })
      } else toast.error(data.error || 'Something went wrong.')
    } catch (_) { toast.error('Network error, please try again.') } finally { setLoading(false) }
  }
  return (
    <>
      <PageHero image={heroImages[1].src} eyebrow="Work With Camila" title="Let’s create something memorable" subtitle="Partner with Camila on lifestyle, fashion, travel and creative campaigns." />
      <Section>
        <SectionTitle center eyebrow="Partnerships" title="Ways to collaborate" subtitle="From single posts to full campaigns, Camila works with brands that share her warm, considered aesthetic." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collabCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-blush/40 text-charcoal"><c.icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-lg font-medium">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-secondary/40 py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div className="space-y-6">
              <Eyebrow>Business enquiries</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-medium leading-tight">Interested in working with Camila?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">Let’s create something memorable together. Share a few details about your brand and campaign, and Camila’s team will be in touch.</p>
              <Reveal><SmartImage src={aboutImage} alt="Camila on a winter walk" className="aspect-[4/5] rounded-2xl" imgClassName="object-top" /></Reveal>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" /> {site.contactEmail}</div>
            </div>

            <form onSubmit={submit} className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="work-name">Name *</Label><Input id="work-name" autoComplete="name" required value={form.name} onChange={set('name')} placeholder="Your name" /></div>
                <div className="space-y-2"><Label htmlFor="work-company">Company</Label><Input id="work-company" autoComplete="organization" value={form.company} onChange={set('company')} placeholder="Company / brand" /></div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="work-email">Email *</Label><Input id="work-email" autoComplete="email" required type="email" value={form.email} onChange={set('email')} placeholder="you@brand.com" /></div>
                <div className="space-y-2">
                  <Label htmlFor="work-campaign-type">Campaign type</Label>
                  <Select value={form.campaignType} onValueChange={(v) => setForm((f) => ({ ...f, campaignType: v }))}>
                    <SelectTrigger id="work-campaign-type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brand collaboration">Brand collaboration</SelectItem>
                      <SelectItem value="Travel & hospitality">Travel &amp; hospitality</SelectItem>
                      <SelectItem value="Fitness & wellness">Fitness &amp; wellness</SelectItem>
                      <SelectItem value="Content creation">Content creation</SelectItem>
                      <SelectItem value="Social campaign">Social campaign</SelectItem>
                      <SelectItem value="Affiliate partnership">Affiliate partnership</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label htmlFor="work-message">Message *</Label><Textarea id="work-message" required rows={5} value={form.message} onChange={set('message')} placeholder="Tell us about your brand and the campaign you have in mind…" /></div>
              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <Label htmlFor="collab-website">Leave this field blank</Label>
                <Input id="collab-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full h-12">{loading ? 'Sending…' : 'Send enquiry'}</Button>
              <p className="text-center text-xs text-muted-foreground">Or <a className="underline underline-offset-4 hover:text-foreground" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Collaboration: ${form.campaignType}`)}&body=${encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nCampaign: ${form.campaignType}\n\n${form.message}`)}`}>email {site.contactEmail} directly</a>.</p>
            </form>
          </div>
        </Container>
      </section>
    </>
  )
}
