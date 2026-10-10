'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import {
  HomeView, AboutView, CategoryView, GalleryView, BlogView, PostView,
  PremiumView, ContactView, DisclosureView, LegalView,
} from '@/components/site/views'

const PATHS = {
  home: '/', about: '/about', lifestyle: '/lifestyle', fashion: '/fashion',
  fitness: '/fitness', travel: '/travel', gallery: '/gallery', blog: '/blog',
  premium: '/premium', contact: '/contact',
  'ai-disclosure': '/ai-disclosure', privacy: '/privacy', cookies: '/cookies',
  terms: '/terms',
}

function routeFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] === 'blog' && parts.length === 2) return { name: 'post', param: parts[1] }
  return { name: parts[0] || 'home', param: null }
}

export default function SiteShell() {
  const pathname = usePathname()
  const router = useRouter()
  const view = routeFromPath(pathname || '/')
  const go = useCallback((name, param = null) => {
    const href = name === 'post' ? `/blog/${encodeURIComponent(param)}`
        : (PATHS[name] || '/')
    router.push(href)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [router])

  const render = () => {
    switch (view.name) {
      case 'home': return <HomeView go={go} />
      case 'about': return <AboutView go={go} />
      case 'lifestyle': return <CategoryView catKey="lifestyle" go={go} />
      case 'fashion': return <CategoryView catKey="fashion" go={go} />
      case 'fitness': return <CategoryView catKey="fitness" go={go} />
      case 'travel': return <CategoryView catKey="travel" go={go} />
      case 'gallery': return <GalleryView go={go} />
      case 'blog': return <BlogView go={go} />
      case 'post': return <PostView slug={view.param} go={go} />
      case 'premium': return <PremiumView go={go} />
      case 'contact': return <ContactView />
      case 'ai-disclosure': return <DisclosureView go={go} />
      case 'privacy': return <LegalView type="privacy" go={go} />
      case 'cookies': return <LegalView type="cookies" go={go} />
      case 'terms': return <LegalView type="terms" go={go} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar route={view.name} go={go} />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${view.name}-${view.param || ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {render()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer go={go} />
      <Toaster position="top-center" richColors />
    </div>
  )
}
