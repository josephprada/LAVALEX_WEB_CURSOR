import { useState, useEffect } from 'react'
import { useScroll } from '../../../hooks/useScroll'
import { NAVIGATION_ITEMS } from '../../../constants'
import styles from './Header.module.css'
import { Container } from '../Container/Container'
import logoIcon from '../../../assets/logos/Mesa de trabajo 2 copia.svg'

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
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isVisible ? styles.visible : styles.hidden}`}
      >
          <Container>
            <div className={styles.content}>
              <div className={styles.logo} onClick={() => handleNavClick('#inicio')}>
                <img src={logoIcon} alt="LAVALEX Logo" className={styles.logoIcon} />
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

            {isMobileMenuOpen && (
              <nav className={styles.mobileNav}>
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
              </nav>
            )}
          </Container>
        </header>
    </>
  )
}

