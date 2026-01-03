import { motion } from 'framer-motion'
import { Button } from '../../ui/Button/Button'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import styles from './Hero.module.css'

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section id="inicio" variant="primary" className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Compra y Venta de Lavadoras Automáticas
            </motion.h1>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Tu centro de confianza para lavadoras automáticas de alta calidad. 
              Ofrecemos compra, venta, reparación y mantenimiento de todas las marcas y modelos en Bucaramanga.
            </motion.p>
            <motion.div
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection('#compra-venta')}
                className={styles.ctaButton}
              >
                Comprar Lavadora
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('#compra-venta')}
                className={styles.ctaButton}
              >
                Vender Lavadora
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.illustration}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.washingMachine}>
              <div className={styles.drum}>
                <div className={styles.water}></div>
                <div className={styles.bubbles}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={styles.controls}>
                <div className={styles.control}></div>
                <div className={styles.control}></div>
                <div className={styles.control}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

