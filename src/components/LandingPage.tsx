import { lazy, Suspense } from 'react'
import { Header } from './layout/Header/Header'
import { Footer } from './layout/Footer/Footer'
import { WhatsAppButton } from './WhatsAppButton/WhatsAppButton'
import { ScrollToTop } from './ScrollToTop/ScrollToTop'

// Lazy load sections for better performance
const Hero = lazy(() => import('./sections/Hero/Hero').then(m => ({ default: m.Hero })))
const Buy = lazy(() => import('./sections/Buy/Buy').then(m => ({ default: m.Buy })))
const Sell = lazy(() => import('./sections/Sell/Sell').then(m => ({ default: m.Sell })))
const RepairMaintenance = lazy(() => import('./sections/RepairMaintenance/RepairMaintenance').then(m => ({ default: m.RepairMaintenance })))
const About = lazy(() => import('./sections/About/About').then(m => ({ default: m.About })))
const FAQ = lazy(() => import('./sections/FAQ/FAQ').then(m => ({ default: m.FAQ })))

export const LandingPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>}>
          <Hero />
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
