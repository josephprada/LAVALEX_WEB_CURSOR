import { lazy, Suspense } from 'react'
import { Header } from './layout/Header/Header'
import { Footer } from './layout/Footer/Footer'
import { WhatsAppButton } from './WhatsAppButton/WhatsAppButton'
import { ScrollToTop } from './ScrollToTop/ScrollToTop'
import { Hero } from './sections/Hero/Hero'

// Lazy load below-the-fold sections only (Hero is above-the-fold for LCP)
const Buy = lazy(() => import('./sections/Buy/Buy').then(m => ({ default: m.Buy })))
const Sell = lazy(() => import('./sections/Sell/Sell').then(m => ({ default: m.Sell })))
const RepairMaintenance = lazy(() => import('./sections/RepairMaintenance/RepairMaintenance').then(m => ({ default: m.RepairMaintenance })))
const About = lazy(() => import('./sections/About/About').then(m => ({ default: m.About })))
const FAQ = lazy(() => import('./sections/FAQ/FAQ').then(m => ({ default: m.FAQ })))

const BelowFoldFallback = () => (
  <div
    style={{
      minHeight: '50vh',
      paddingTop: '80px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      alignItems: 'center',
      maxWidth: '1280px',
      margin: '0 auto',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    }}
    aria-hidden="true"
  >
    <div style={{ height: '200px', background: 'var(--color-bg-secondary, #1a2a4a)', borderRadius: '8px' }} />
    <div style={{ height: '400px', background: 'var(--color-bg-secondary, #1a2a4a)', borderRadius: '8px', maxWidth: '400px' }} />
  </div>
)

export const LandingPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<BelowFoldFallback />}>
          <Buy />
          <Sell />
          <RepairMaintenance />
          <About />
          <FAQ />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}
