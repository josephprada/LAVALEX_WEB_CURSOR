import { motion } from 'framer-motion'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import styles from './About.module.css'

export const About = () => {
  return (
    <Section id="quien-soy" className={styles.about}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.imageContainer}
          >
            <div className={styles.avatar}>
              <span className={styles.avatarPlaceholder}>👤</span>
            </div>
          </motion.div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Quién Soy</h2>
            <p className={styles.description}>
              Soy un técnico especializado en reparación y mantenimiento de lavadoras automáticas con más de 10 años de experiencia en el sector. 
              Mi pasión por brindar un servicio de calidad me ha llevado a especializarme en todas las marcas y modelos del mercado.
            </p>
            <p className={styles.description}>
              En LAVALEX, nos comprometemos a ofrecer soluciones rápidas, eficientes y confiables para todos nuestros clientes en Bucaramanga. 
              Trabajamos con repuestos originales y garantizamos nuestro trabajo, porque tu satisfacción es nuestra prioridad.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Años de Experiencia</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Clientes Satisfechos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Garantía</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}

