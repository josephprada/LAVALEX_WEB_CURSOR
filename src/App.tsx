import { lazy, Suspense } from 'react'
import { Header } from './components/layout/Header/Header'
import { Footer } from './components/layout/Footer/Footer'
import { WhatsAppButton } from './components/WhatsAppButton/WhatsAppButton'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import './styles/mixins.css'

// Lazy load sections for better performance
const Hero = lazy(() => import('./components/sections/Hero/Hero').then(m => ({ default: m.Hero })))
const BuySell = lazy(() => import('./components/sections/BuySell/BuySell').then(m => ({ default: m.BuySell })))
const RepairMaintenance = lazy(() => import('./components/sections/RepairMaintenance/RepairMaintenance').then(m => ({ default: m.RepairMaintenance })))
const About = lazy(() => import('./components/sections/About/About').then(m => ({ default: m.About })))
const FAQ = lazy(() => import('./components/sections/FAQ/FAQ').then(m => ({ default: m.FAQ })))

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>}>
          <Hero />
          <BuySell />
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

export default App
