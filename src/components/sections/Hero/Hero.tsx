import { Button } from '../../ui/Button/Button'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import SplitText from 'react-bits/src/content/TextAnimations/SplitText/SplitText'
import AnimatedContent from 'react-bits/src/content/Animations/AnimatedContent/AnimatedContent'
import logoWashingMachine from '../../../assets/logos/Mesa de trabajo 2 copia.svg'
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
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <SplitText text="COMPRA Y VENTA DE LAVADORAS AUTOMÁTICAS" className={styles.title} />
            </h1>
            <AnimatedContent delay={0.15} direction="vertical" distance={30}>
              <p className={styles.subtitle}>
                  Compra, venta, reparación y mantenimiento en Bucaramanga. Calidad garantizada y atención inmediata a domicilio.
              </p>
            </AnimatedContent>
            <div className={styles.ctaGroup}>
              <AnimatedContent delay={0.1} direction="vertical" distance={50}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollToSection('#venta')}
                  className={styles.ctaButton}
                >
                  COMPRAR
                </Button>
              </AnimatedContent>
              <AnimatedContent delay={0.2} direction="vertical" distance={50}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('#compra')}
                  className={styles.ctaButton}
                >
                  VENDER
                </Button>
              </AnimatedContent>
              <AnimatedContent delay={0.3} direction="vertical" distance={50}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('#reparacion')}
                  className={styles.ctaButton}
                >
                  <span className={styles.buttonText}>
                    REPARACIÓN<br />MANTENIMIENTO
                  </span>
                </Button>
              </AnimatedContent>
            </div>
          </div>
          <div className={styles.illustration}>
            <AnimatedContent delay={0.2} direction="horizontal" distance={100}>
              <div className={styles.washingMachine}>
                <img
                  src={logoWashingMachine}
                  alt="Lavadora LAVALEX"
                  className={styles.logoImage}
                />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>
    </Section>
  )
}

