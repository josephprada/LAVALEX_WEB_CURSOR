import { motion } from 'framer-motion'
import { Accordion } from '../../ui/Accordion/Accordion'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { FAQ_ITEMS } from '../../../constants'
import styles from './FAQ.module.css'

export const FAQ = () => {
  return (
    <Section id="faq" variant="secondary" className={styles.faq}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Preguntas Frecuentes</h2>
          <p className={styles.description}>
            Resolvemos las dudas más comunes sobre nuestros servicios de compra, venta, reparación y mantenimiento de lavadoras.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.accordionContainer}
        >
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </Container>
    </Section>
  )
}

