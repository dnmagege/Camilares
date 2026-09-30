'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/site/Navbar'
import Footer from '@/components/site/Footer'
import {
  HomeView, AboutView, CategoryView, GalleryView, BlogView, PostView,
  PremiumView, ShopView, ProductView, ContactView, DisclosureView,
  LegalView, AuthView, DashboardView,
} from '@/components/site/views'
import { track } from '@/components/site/primitives'

function App() {
  const [view, setView] = useState({ name: 'home', param: null })
  const [cart, setCart] = useState([])

  const go = useCallback((name, param = null) => {
    setView({ name, param })
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' })
    track('page_view', { page: name, param })
  }, [])

  useEffect(() => { track('page_view', { page: 'home' }) }, [])

  const addToCart = useCallback((product) => {
    setCart((c) => {
      const found = c.find((i) => i.id === product.id)
      if (found) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      return [...c, { ...product, qty: 1 }]
    })
  }, [])
  const removeFromCart = useCallback((id) => setCart((c) => c.filter((i) => i.id !== id)), [])

  const render = () => {
    const { name, param } = view
    switch (name) {
      case 'home': return <HomeView go={go} />
      case 'about': return <AboutView go={go} />
      case 'lifestyle': return <CategoryView catKey="lifestyle" go={go} />
      case 'fashion': return <CategoryView catKey="fashion" go={go} />
      case 'fitness': return <CategoryView catKey="fitness" go={go} />
      case 'travel': return <CategoryView catKey="travel" go={go} />
      case 'gallery': return <GalleryView go={go} />
      case 'blog': return <BlogView go={go} />
      case 'post': return <PostView slug={param} go={go} />
      case 'premium': return <PremiumView go={go} />
      case 'shop': return <ShopView go={go} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
      case 'product': return <ProductView id={param} go={go} addToCart={addToCart} />
      case 'contact': return <ContactView go={go} />
      case 'ai-disclosure': return <DisclosureView go={go} />
      case 'privacy': return <LegalView type="privacy" go={go} />
      case 'cookies': return <LegalView type="cookies" go={go} />
      case 'terms': return <LegalView type="terms" go={go} />
      case 'login': return <AuthView mode="login" go={go} />
      case 'signup': return <AuthView mode="signup" go={go} />
      case 'dashboard':
      case 'members':
      case 'profile': return <DashboardView go={go} />
      default: return <HomeView go={go} />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar route={view.name} go={go} />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${view.name}-${view.param || ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {render()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer go={go} />
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
