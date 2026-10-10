'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Container } from './primitives'

const NAV = [
  { key: 'about', label: 'About' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'fitness', label: 'Fitness' },
  { key: 'travel', label: 'Travel' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'blog', label: 'Journal' },
  { key: 'contact', label: 'Contact' },
  { key: 'premium', label: 'Premium' },
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
        <button onClick={() => nav('home')} className="flex shrink-0 items-center" aria-label="Camila Ravelle home">
          <img src="/camila/camila-ravelle-logo.png" alt="Camila Ravelle" className="h-[58px] w-[92px] object-contain sm:h-[66px] sm:w-[110px]" />
        </button>

        <nav className="hidden lg:flex items-center gap-4 2xl:gap-7">
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

        <Button onClick={() => nav('contact')} className="hidden rounded-full px-3 text-xs lg:inline-flex 2xl:px-5 2xl:text-sm">
          Let’s Work Together <span aria-hidden="true" className="ml-1">→</span>
        </Button>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open navigation menu" aria-expanded={open}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {[{ key: 'home', label: 'Home' }, ...NAV].map((item) => (
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
                <Button onClick={() => nav('contact')} className="mt-3 rounded-full">
                  Let’s Work Together <span aria-hidden="true" className="ml-1">→</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
