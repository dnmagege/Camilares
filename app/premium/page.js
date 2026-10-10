import SiteShell from '@/components/site/SiteShell'

export const metadata = {
  title: 'Premium Channel',
  description: 'A tasteful signpost to Camila Ravelle’s separate premium platform. Private content is not hosted on this website.',
  alternates: { canonical: '/premium' },
  robots: { index: false, follow: true },
}

export default function PremiumPage() {
  return <SiteShell />
}