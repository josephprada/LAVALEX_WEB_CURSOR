import { Accordion } from '../../ui/Accordion/Accordion'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { FAQ_ITEMS } from '../../../constants'
import styles from './FAQ.module.css'

export const FAQ = () => {
  return (
    <Section id="faq" variant="secondary" className={styles.faq}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Preguntas Frecuentes</h2>
          <p className={styles.description}>
            Resolvemos las dudas más comunes sobre nuestros servicios de compra, venta, reparación y mantenimiento de lavadoras.
          </p>
        </div>

        <div className={styles.accordionContainer}>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </Section>
  )
}

