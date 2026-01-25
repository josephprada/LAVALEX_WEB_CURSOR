import { FaFacebook, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import GradientText from 'react-bits/src/content/TextAnimations/GradientText/GradientText'
import { Container } from '../Container/Container'
import styles from './Footer.module.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.companyTitle}>
              <GradientText colors={['#00BFFF', '#1E90FF', '#0066CC', '#00CED1']}>LAVALEX</GradientText>
            </h3>
            <p className={styles.description}>
              Expertos en reparación, mantenimiento, compra y venta de lavadoras en Bucaramanga. Más de 10 años resolviendo fallas.
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Contacto</h4>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>Bucaramanga, Norte</p>
              <a href="tel:+573015710520" className={styles.contactItem}>
                +57 3015710520
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Horarios</h4>
            <div className={styles.scheduleInfo}>
              <p className={styles.scheduleItem}>Lunes - Sábado</p>
              <p className={styles.scheduleItem}>8:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.subtitle}>Síguenos</h4>
            <div className={styles.social}>
              <a
                href="https://www.facebook.com/share/1AkTk8MFnt/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.google.com/maps/place/LAVALEX+-+ALQUILER+DE+LAVADORAS/@7.1577195,-73.144522,962m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e6815d6b45ce7e7:0x3d14d673f58d3dd4!8m2!3d7.1577142!4d-73.1419471!16s%2Fg%2F11shv5z4k5?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Google Maps"
              >
                <FaMapMarkerAlt />
              </a>
              <a
                href={`https://wa.me/573015710520`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
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

