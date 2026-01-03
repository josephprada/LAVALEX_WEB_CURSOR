import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { Container } from '../Container/Container'
import styles from './Footer.module.css'
import { WHATSAPP_NUMBER } from '../../../constants'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')
  }

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>LAVALEX</h3>
            <p className={styles.description}>
              Tu centro de confianza para lavadoras automáticas: compra, venta, reparación y mantenimiento en Bucaramanga.
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Enlaces</h4>
            <nav className={styles.links}>
              <a href="#inicio" className={styles.link}>Inicio</a>
              <a href="#compra-venta" className={styles.link}>Compra y Venta</a>
              <a href="#reparacion" className={styles.link}>Reparación</a>
              <a href="#quien-soy" className={styles.link}>Quién Soy</a>
              <a href="#faq" className={styles.link}>FAQ</a>
            </nav>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Legal</h4>
            <nav className={styles.links}>
              <a href="/terminos" className={styles.link}>Términos y Condiciones</a>
              <a href="/privacidad" className={styles.link}>Política de Privacidad</a>
            </nav>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Contacto</h4>
            <div className={styles.social}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:contacto@lavalex.com"
                className={styles.socialLink}
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} LAVALEX. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}

