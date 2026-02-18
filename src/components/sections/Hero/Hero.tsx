import { Button } from '../../ui/Button/Button'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import SplitText from 'react-bits/src/content/TextAnimations/SplitText/SplitText'
import AnimatedContent from 'react-bits/src/content/Animations/AnimatedContent/AnimatedContent'
import { WHATSAPP_NUMBER } from '../../../constants'
import heroPersonImg from '../../../assets/bg/hero-person.png'
import styles from './Hero.module.css'

const LOGO_HERO_SRC = `${import.meta.env.BASE_URL}logo-hero.svg`

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactClick = () => {
    const message = encodeURIComponent('Hola, necesito un técnico para revisar mi lavadora.')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
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
      <div className={styles.heroPerson} aria-hidden="true">
        <img
          src={heroPersonImg}
          alt=""
          className={styles.heroPersonImage}
          width={500}
          height={700}
          fetchPriority="high"
        />
      </div>
      <Container>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <SplitText text="¿TU LAVADORA FALLÓ? NOSOTROS LA REVIVIMOS" className={styles.title} />
            </h1>
            <AnimatedContent delay={0.15} direction="vertical" distance={30}>
              <p className={styles.subtitle}>
                  Expertos en reparación y mantenimiento de lavadoras. También compramos tu equipo usado y vendemos lavadoras reacondicionadas con garantía.
              </p>
            </AnimatedContent>
            <div className={styles.ctaGroup}>
              <AnimatedContent delay={0.1} direction="vertical" distance={50}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleContactClick}
                  className={styles.ctaButton}
                >
                  Solicitar Técnico
                </Button>
              </AnimatedContent>
              <AnimatedContent delay={0.2} direction="vertical" distance={50}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('#compra')}
                  className={styles.ctaButton}
                >
                  Vender Equipo
                </Button>
              </AnimatedContent>
              <AnimatedContent delay={0.3} direction="vertical" distance={50}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('#venta')}
                  className={styles.ctaButton}
                >
                  Ver Catálogo
                </Button>
              </AnimatedContent>
            </div>
          </div>
          <div className={styles.illustration}>
            <AnimatedContent delay={0.2} direction="horizontal" distance={100}>
              <div className={styles.washingMachine}>
                <img
                  src={LOGO_HERO_SRC}
                  alt="Lavadora LAVALEX"
                  className={styles.logoImage}
                  width={600}
                  height={700}
                  fetchPriority="high"
                />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>
    </Section>
  )
}

