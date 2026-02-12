import { useState, useEffect } from 'react'
import { useScroll } from '../../../hooks/useScroll'
import { useTheme } from '../../../hooks/useTheme'
import { NAVIGATION_ITEMS } from '../../../constants'
import GradientText from 'react-bits/src/content/TextAnimations/GradientText/GradientText'
import styles from './Header.module.css'
import { Container } from '../Container/Container'
import logoIcon from '../../../assets/logos/Mesa de trabajo 2 copia.svg'

export const Header = () => {
  const { scrollDirection, isScrolled } = useScroll()
  const { theme, toggleTheme } = useTheme()
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
                <img src={logoIcon} alt="LAVALEX Logo" className={styles.logoIcon} width={40} height={40} />
                <span className={styles.logoText}>
                  <GradientText colors={['#00BFFF', '#1E90FF', '#0066CC', '#00CED1']}>LAVALEX</GradientText>
                </span>
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

              <div className={styles.actions}>
                <button
                  className={styles.themeToggle}
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                  title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                >
                  {theme === 'dark' ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  )}
                </button>

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

