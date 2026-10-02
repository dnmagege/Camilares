'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, Check, Search, ShoppingBag, Trash2, Lock,
  Sparkles, Heart, Bell, Users, Star, Calendar, Clock,
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
import {
  heroImage, aboutImage, features, latestContent, personalityTraits,
  categories, galleryItems, galleryFilters, blogSeed, productSeed, premiumBenefits,
} from '@/data/content'
import {
  Container, Eyebrow, Reveal, SectionTitle, SmartImage, AIBadge,
  SocialLinks, NewsletterForm, FeatureCard, ContentCard, BlogCard, ProductCard, track,
} from './primitives'

// ---------------------------------------------------------------------------
// Shared page hero
// ---------------------------------------------------------------------------
function PageHero({ image, eyebrow, title, subtitle }) {
  return (
    <section className="relative flex min-h-[56vh] items-end overflow-hidden pt-24 bg-charcoal">
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
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-charcoal">
        <img src={heroImage} alt="Camila Reyes" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/40 to-transparent" />
        <Container className="relative z-10 py-32 text-cream">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl">
            <AIBadge className="bg-cream/15 text-cream border-cream/20 backdrop-blur-sm" />
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight">CAMILA REYES</h1>
            <p className="mt-5 tracking-luxe uppercase text-sm text-cream/80">Lifestyle &middot; Fashion &middot; Fitness &middot; Travel</p>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-cream/85 leading-relaxed">{site.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 bg-cream text-charcoal hover:bg-cream/90" onClick={() => go('about')}>
                Explore Camila <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream" onClick={() => { track('premium_click', { from: 'hero' }); go('premium') }}>
                Join Premium
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-xs tracking-luxe uppercase text-cream/60">Follow</span>
              <SocialLinks social={site.social} onClick={(k) => track('social_click', { platform: k, from: 'hero' })} />
            </div>
          </motion.div>
        </Container>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 text-xs tracking-luxe uppercase animate-pulse">Scroll</div>
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
            <Reveal><SmartImage src={aboutImage} alt="Meet Camila" className="aspect-[4/5] rounded-3xl" /></Reveal>
            <Reveal delay={0.1} className="space-y-6">
              <Eyebrow>Meet Camila</Eyebrow>
              <h2 className="text-3xl md:text-5xl font-medium leading-tight">A fictional AI creator with a very human sense of style</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Camila Reyes is an AI-generated lifestyle creator — warm, confident and endlessly curious.
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
            <ContentCard key={i} item={c} index={i} onClick={() => go('blog')} />
          ))}
        </div>
      </Section>

      {/* Premium CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <img src={features[1].image} alt="Premium" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-charcoal/70" />
              <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-cream text-center">
                <Eyebrow className="text-cream/70">Exclusive</Eyebrow>
                <h2 className="mx-auto mt-3 max-w-2xl text-3xl md:text-5xl font-medium leading-tight">Discover exclusive updates and premium experiences</h2>
                <p className="mx-auto mt-4 max-w-xl text-cream/80 text-lg">Go behind the scenes with early access, extended stories and members-only content.</p>
                <Button size="lg" className="mt-8 rounded-full px-9 bg-cream text-charcoal hover:bg-cream/90" onClick={() => { track('premium_click', { from: 'home_cta' }); go('premium') }}>
                  Join Premium <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Newsletter */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-14 text-center">
          <Eyebrow>Stay close</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl md:text-4xl font-medium">Join the newsletter</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">A monthly letter with new stories, edits and early access.</p>
          <div className="mx-auto mt-7 max-w-lg text-left"><NewsletterForm source="home" /></div>
        </div>
      </Section>
    </>
  )
}

// ===========================================================================
// ABOUT
// ===========================================================================
export function AboutView({ go }) {
  const blocks = [
    { h: 'Who is Camila?', p: 'Camila Reyes is a fictional, AI-generated lifestyle creator. She was designed to explore how a modern digital personality can share warmth, style and inspiration — while being fully transparent about her artificial nature.' },
    { h: 'Personality', p: 'Warm and approachable, confident yet curious. Camila brings a creative, adventurous spirit to everything she shares, with a modern, feminine sensibility.' },
    { h: 'Interests', p: 'From capsule wardrobes and seasonal edits to mindful movement and slow travel — Camila is drawn to the beautiful, the intentional and the everyday.' },
    { h: 'Creator philosophy', p: 'Less noise, more meaning. Camila believes in quality over quantity, softness over hustle, and stories that make ordinary days feel a little more special.' },
  ]
  return (
    <>
      <PageHero image={aboutImage} eyebrow="About" title="Meet Camila Reyes" subtitle="A fictional AI creator sharing lifestyle, fashion, fitness and travel inspired stories." />
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
                <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">Camila Reyes is not a real person. She is an AI-generated character created for storytelling and creative expression.</p>
                <Button variant="link" className="mt-1 h-auto p-0 text-charcoal" onClick={() => go('ai-disclosure')}>Read the full disclosure →</Button>
              </div>
            </Reveal>
          </div>
          <div className="space-y-4">
            <Reveal><SmartImage src={features[0].image} alt="Lifestyle" className="aspect-[4/5] rounded-2xl" /></Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={0.05}><SmartImage src={features[1].image} alt="Fashion" className="aspect-square rounded-2xl" /></Reveal>
              <Reveal delay={0.1}><SmartImage src={features[3].image} alt="Travel" className="aspect-square rounded-2xl" /></Reveal>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureCard key={f.key} item={f} index={i} onClick={() => go(f.key)} />
          ))}
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
  const related = latestContent.filter((c) => c.category.toLowerCase() === catKey)
  return (
    <>
      <PageHero image={cat.hero} eyebrow={cat.title} title={cat.tagline} />
      <Section>
        <SectionTitle center title={`${cat.title} stories`} subtitle={cat.intro} />
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 masonry">
          {cat.grid.map((src, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <SmartImage src={src} alt={`${cat.title} ${i + 1}`} className="rounded-2xl" imgClassName="hover:scale-105" />
            </Reveal>
          ))}
        </div>
        {related.length > 0 && (
          <div className="mt-20">
            <SectionTitle eyebrow="Related" title={`From the ${cat.title.toLowerCase()} diary`} />
            <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => <ContentCard key={i} item={c} index={i} onClick={() => go('blog')} />)}
            </div>
          </div>
        )}
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
  const [items, setItems] = useState(galleryItems)
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  useEffect(() => {
    fetch('/api/gallery').then((r) => r.json()).then((d) => { if (d.items?.length) setItems(d.items) }).catch(() => {})
  }, [])

  const filtered = useMemo(
    () => (filter === 'All' ? items : items.filter((i) => i.category === filter.toLowerCase())),
    [items, filter]
  )

  return (
    <>
      <PageHero image={categories.fashion.hero} eyebrow="Gallery" title="A visual diary" subtitle="Editorial moments across lifestyle, fashion, fitness and travel." />
      <Section>
        <div className="flex flex-wrap justify-center gap-2">
          {galleryFilters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
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
  const [posts, setPosts] = useState(blogSeed)
  const [q, setQ] = useState('')

  useEffect(() => {
    fetch('/api/blog').then((r) => r.json()).then((d) => { if (d.posts?.length) setPosts(d.posts) }).catch(() => {})
  }, [])

  const filtered = posts.filter((p) =>
    (p.title + p.category + p.excerpt).toLowerCase().includes(q.toLowerCase())
  )

  return (
    <>
      <PageHero image={categories.lifestyle.hero} eyebrow="Journal" title="The Camila diary" subtitle="Stories, edits and everyday inspiration." />
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
              <BlogCard key={p.id} post={p} index={i} onClick={() => go('post', p.slug)} />
            ))}
          </div>
        )}
      </Section>
    </>
  )
}

export function PostView({ slug, go }) {
  const [data, setData] = useState(null)
  const fallback = blogSeed.find((b) => b.slug === slug)

  useEffect(() => {
    fetch(`/api/blog/${slug}`).then((r) => r.json()).then((d) => { if (d.post) setData(d) }).catch(() => {})
  }, [slug])

  const post = data?.post || fallback
  const related = data?.related || blogSeed.filter((b) => b.category === post?.category && b.slug !== slug).slice(0, 3)
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
            {(post.body || []).map((para, i) => (
              <p key={i} className="mb-6 text-lg leading-relaxed text-foreground/90">{para}</p>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-blush/50 bg-blush/20 p-5 text-sm text-charcoal/80">
            <span className="font-medium text-charcoal">Note:</span> Camila Reyes is a fictional AI-generated character. This article is creative content.
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-20 max-w-5xl">
            <SectionTitle eyebrow="Keep reading" title="Related stories" />
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((p, i) => <BlogCard key={p.id || i} post={p} index={i} onClick={() => go('post', p.slug)} />)}
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
      <PageHero image={features[1].image} eyebrow="Premium" title="Exclusive Camila" subtitle="Discover exclusive updates, behind-the-scenes content and premium experiences." />
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
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-16 text-center text-cream md:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl font-medium leading-tight">Ready for the full experience?</h2>
            <p className="mx-auto mt-4 max-w-lg text-cream/80">Join the premium community for early access, extended stories and members-only content.</p>
            <a href={site.premiumUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('premium_click', { from: 'premium_page' })}>
              <Button size="lg" className="mt-8 rounded-full px-10 bg-cream text-charcoal hover:bg-cream/90">Join Premium <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </a>
            <p className="mt-5 text-xs text-cream/50">You will be redirected to our external premium platform.</p>
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
  const filtered = cat === 'All' ? products : products.filter((p) => p.category === cat)
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <PageHero image={categories.lifestyle.hero} eyebrow="Shop" title="The Camila shop" subtitle="Digital downloads, guides, creator resources and merchandise." />
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
  const [form, setForm] = useState({ name: '', email: '', company: '', category: 'General enquiry', message: '' })
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(data.message)
        track('contact_submit', { category: form.category })
        setForm({ name: '', email: '', company: '', category: 'General enquiry', message: '' })
      } else toast.error(data.error || 'Something went wrong.')
    } catch (_) { toast.error('Network error, please try again.') } finally { setLoading(false) }
  }

  return (
    <>
      <PageHero image={features[3].image} eyebrow="Contact" title="Let’s connect" subtitle="Brand partnerships, media enquiries or just to say hello." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Get in touch</h2>
            <p className="text-muted-foreground leading-relaxed">Whether you’re a brand looking to collaborate or a fan with a question, we’d love to hear from you.</p>
            <div className="space-y-3">
              {['Brand partnership', 'Media', 'General enquiry'].map((c) => (
                <div key={c} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <Check className="h-4 w-4 text-foreground/60" /><span className="text-sm">{c}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Email: {site.contactEmail}</p>
          </div>

          <form onSubmit={submit} className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2"><Label>Name *</Label><Input required value={form.name} onChange={set('name')} placeholder="Your name" /></div>
              <div className="space-y-2"><Label>Email *</Label><Input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" /></div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2"><Label>Company</Label><Input value={form.company} onChange={set('company')} placeholder="Company (optional)" /></div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brand partnership">Brand partnership</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="General enquiry">General enquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2"><Label>Message *</Label><Textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Tell us a little more…" /></div>
            <Button type="submit" disabled={loading} className="w-full rounded-full h-12">{loading ? 'Sending…' : 'Send message'}</Button>
          </form>
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
          <p><span className="font-medium text-foreground">Camila Reyes is a fictional, AI-generated character.</span> She is not a real person. Every image, story and piece of content associated with Camila is created for artistic and entertainment purposes.</p>
          <p>All photographs currently shown are placeholder images and do not depict a real individual. When final approved imagery is added, it will consistently represent the same AI-generated character.</p>
          <p>We are committed to transparency. Camila will never be presented as a real human being, and this disclosure is linked throughout the site.</p>
          <p>This platform is built as a scalable foundation that may, in future, include memberships, community features and AI-powered interactions — all clearly labelled as AI-generated.</p>
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
    intro: 'How we handle the limited information you share with us.',
    sections: [
      ['Information we collect', 'We only collect information you voluntarily provide — such as your email when subscribing to the newsletter, or the details you submit through the contact form.'],
      ['How we use it', 'Newsletter emails are used solely to send you updates you opted into. Contact details are used to respond to your enquiry. We do not sell your data.'],
      ['Your rights', 'You may request access to, or deletion of, your data at any time by contacting us.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'A short note on the cookies and analytics this site may use.',
    sections: [
      ['Essential cookies', 'These are required for the site to function correctly and cannot be switched off.'],
      ['Analytics', 'We may use privacy-friendly analytics (e.g. Google Analytics or Vercel Analytics) to understand aggregate, anonymous usage.'],
      ['Managing cookies', 'You can control cookies through your browser settings at any time.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro: 'The basic terms for using this website.',
    sections: [
      ['Fictional character', 'Camila Reyes is a fictional AI-generated character. All content is provided for entertainment and inspiration.'],
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
        <p className="mt-10 text-sm text-muted-foreground">Last updated: June 2025.</p>
      </div>
    </Section>
  )
}

// ===========================================================================
// AUTH (login / signup placeholders)
// ===========================================================================
export function AuthView({ mode, go }) {
  const isLogin = mode === 'login'
  return (
    <Section className="pt-32">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8">
        <div className="text-center">
          <p className="font-serif-i text-2xl font-semibold">CAMILA REYES</p>
          <h1 className="mt-4 text-2xl font-medium">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{isLogin ? 'Sign in to your future member area.' : 'Join to unlock the future community.'}</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); toast('Accounts are coming soon — this is a placeholder.') }}>
          {!isLogin && <div className="space-y-2"><Label>Name</Label><Input placeholder="Your name" /></div>}
          <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="you@email.com" /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="••••••••" /></div>
          <Button type="submit" className="w-full rounded-full h-12">{isLogin ? 'Sign in' : 'Create account'}</Button>
        </form>
        <div className="mt-4 rounded-xl bg-blush/20 p-3 text-center text-xs text-charcoal/80">
          <Lock className="mr-1 inline h-3 w-3" /> Authentication is a future-ready placeholder. No account is created yet.
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button className="font-medium text-foreground underline underline-offset-4" onClick={() => go(isLogin ? 'signup' : 'login')}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </Section>
  )
}

// ===========================================================================
// DASHBOARD (placeholder)
// ===========================================================================
export function DashboardView({ go }) {
  const cards = [
    { icon: Users, title: 'Community', desc: 'Connect with other members and join the conversation.' },
    { icon: Heart, title: 'Saved content', desc: 'Your bookmarked stories, looks and guides in one place.' },
    { icon: Star, title: 'Membership', desc: 'Manage your premium membership and perks.' },
    { icon: Bell, title: 'Notifications', desc: 'Stay updated on new drops and exclusive releases.' },
  ]
  return (
    <Section className="pt-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow>Dashboard</Eyebrow>
          <h1 className="mt-2 text-3xl md:text-4xl font-medium">Your member area</h1>
          <p className="mt-2 text-muted-foreground">A preview of what’s coming for the Camila community.</p>
        </div>
        <Badge variant="secondary" className="rounded-full">Preview</Badge>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-secondary"><c.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-medium">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-blush/50 bg-blush/20 p-6 text-sm text-charcoal/80">
        <span className="font-medium text-charcoal">Coming soon.</span> Accounts, memberships and community features are architected but not yet enabled.
        <Button variant="link" className="ml-1 h-auto p-0 text-charcoal" onClick={() => go('premium')}>Explore Premium →</Button>
      </div>
    </Section>
  )
}
