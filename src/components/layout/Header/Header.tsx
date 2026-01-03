import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from '../../../hooks/useScroll'
import { NAVIGATION_ITEMS } from '../../../constants'
import styles from './Header.module.css'
import { Container } from '../Container/Container'

export const Header = () => {
  const { scrollDirection, isScrolled } = useScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (scrollDirection === 'down' && isScrolled) {
      setIsVisible(false)
    } else if (scrollDirection === 'up') {
      setIsVisible(true)
    }
  }, [scrollDirection, isScrolled])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        >
          <Container>
            <div className={styles.content}>
              <div className={styles.logo} onClick={() => handleNavClick('#inicio')}>
                <span className={styles.logoText}>LAVALEX</span>
              </div>

              <nav className={styles.nav}>
                {NAVIGATION_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={styles.navLink}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                className={styles.mobileMenuButton}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className={styles.hamburger}>
                  <span className={isMobileMenuOpen ? styles.open : ''}></span>
                  <span className={isMobileMenuOpen ? styles.open : ''}></span>
                  <span className={isMobileMenuOpen ? styles.open : ''}></span>
                </span>
              </button>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.mobileNav}
                >
                  {NAVIGATION_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      className={styles.mobileNavLink}
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </Container>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

