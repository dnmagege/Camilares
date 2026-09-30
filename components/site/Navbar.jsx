'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Container, track } from './primitives'
import site from '@/config/site'

const NAV = [
  { key: 'about', label: 'About' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'travel', label: 'Travel' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'blog', label: 'Blog' },
  { key: 'shop', label: 'Shop' },
  { key: 'contact', label: 'Contact' },
]

export default function Navbar({ route, go }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = (key) => {
    setOpen(false)
    go(key)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-border/60 py-3' : 'bg-transparent py-5'
      )}
    >
      <Container className="flex items-center justify-between">
        <button onClick={() => nav('home')} className="flex flex-col leading-none">
          <span className="font-serif-i text-xl md:text-2xl font-semibold tracking-wide text-foreground">
            CAMILA REYES
          </span>
          <span className="mt-0.5 hidden sm:block text-[10px] tracking-luxe uppercase text-muted-foreground">
            Lifestyle &middot; Fashion &middot; Fitness &middot; Travel
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <button
              key={item.key}
              onClick={() => nav(item.key)}
              className={cn(
                'relative text-sm transition-colors hover:text-foreground',
                route === item.key ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.label}
              {route === item.key && <span className="absolute -bottom-1.5 left-0 h-px w-full bg-foreground" />}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => nav('login')}
          >
            Sign in
          </Button>
          <Button
            size="sm"
            className="rounded-full px-5"
            onClick={() => { track('premium_click', { from: 'navbar' }); nav('premium') }}
          >
            Join Premium
          </Button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {[{ key: 'home', label: 'Home' }, ...NAV, { key: 'premium', label: 'Premium' }].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => nav(item.key)}
                    className={cn(
                      'rounded-lg px-4 py-3 text-left text-base transition-colors hover:bg-secondary',
                      route === item.key ? 'bg-secondary font-medium' : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="outline" className="rounded-full" onClick={() => nav('login')}>Sign in</Button>
                  <Button className="rounded-full" onClick={() => nav('signup')}>Create account</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
