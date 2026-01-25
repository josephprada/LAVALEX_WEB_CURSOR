import { Accordion } from '../../ui/Accordion/Accordion'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import BlurText from 'react-bits/src/content/TextAnimations/BlurText/BlurText'
import FadeContent from 'react-bits/src/content/Animations/FadeContent/FadeContent'
import { FAQ_ITEMS } from '../../../constants'
import styles from './FAQ.module.css'

export const FAQ = () => {
  return (
    <Section 
      id="faq" 
      variant="secondary" 
      className={styles.faq}
    >
      <div className={styles.animatedBackground}>
        <div className={styles.bubbles}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className={styles.bubble} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
            }}></div>
          ))}
        </div>
        <div className={styles.waves}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
      </div>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <BlurText text="Preguntas Frecuentes" className={styles.title} />
          </h2>
          <FadeContent delay={0.2}>
            <p className={styles.description}>
              Resolvemos las dudas más comunes sobre nuestros servicios de reparación, mantenimiento, compra y venta de lavadoras. Si tienes alguna otra pregunta, contáctanos.
            </p>
          </FadeContent>
        </div>

        <div className={styles.accordionContainer}>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </Section>
  )
}

