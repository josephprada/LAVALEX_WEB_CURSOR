import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import BlurText from 'react-bits/src/content/TextAnimations/BlurText/BlurText'
import CountUp from 'react-bits/src/content/TextAnimations/CountUp/CountUp'
import GradientText from 'react-bits/src/content/TextAnimations/GradientText/GradientText'
import FadeContent from 'react-bits/src/content/Animations/FadeContent/FadeContent'
import AnimatedContent from 'react-bits/src/content/Animations/AnimatedContent/AnimatedContent'
import ProfileCard from '../../ui/ProfileCard/ProfileCard'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../../constants'
import expertImage from '../../../assets/Generated Image January 03, 2026 - 4_14PM.png'
import grainUrl from '../../../assets/profile-card/grain.webp'
import styles from './About.module.css'

export const About = () => {
  const handleContactClick = () => {
    const message = encodeURIComponent(WHATSAPP_MESSAGE)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <Section id="quien-soy" className={styles.about}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <ProfileCard
              avatarUrl={expertImage}
              name="Alex Prada"
              title="Técnico"
              handle="alexprada"
              status="Disponible"
              contactText="Contactar"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              grainUrl={grainUrl}
              innerGradient="linear-gradient(145deg, rgba(0, 191, 255, 0.25) 0%, rgba(30, 144, 255, 0.15) 50%, rgba(0, 102, 204, 0.2) 100%)"
              behindGlowEnabled={true}
              behindGlowColor="rgba(0, 191, 255, 0.67)"
              behindGlowSize="50%"
              className={styles.profileCardWrapper}
              onContactClick={handleContactClick}
            />
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              <BlurText text="Conoce al Experto" className={styles.title} />
            </h2>
            <FadeContent delay={0.2}>
              <p className={styles.description}>
                Con más de 10 años reparando lavadoras en Bucaramanga, conozco las fallas más comunes y cómo solucionarlas. Cada caso es diferente, y siempre hay algo nuevo que aprender.
              </p>
            </FadeContent>
            <FadeContent delay={0.3}>
              <p className={styles.description}>
                En LAVALEX no solo reparamos: diagnosticamos el problema real, usamos repuestos de calidad y te garantizamos el trabajo. Si tu lavadora tiene solución, la encontramos. Si no la tiene, te lo decimos honestamente.
              </p>
            </FadeContent>
            <AnimatedContent delay={0.4} direction="vertical" distance={50}>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.5!2d-73.1419471!3d7.1577142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6815d6b45ce7e7%3A0x3d14d673f58d3dd4!2sLAVALEX%20-%20ALQUILER%20DE%20LAVADORAS!5e0!3m2!1ses!2sco!4v1736457600000!5m2!1ses!2sco"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.map}
                  title="Ubicación de LAVALEX en Bucaramanga"
                />
              </div>
            </AnimatedContent>
            <AnimatedContent delay={0.5} direction="vertical" distance={50}>
              <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  <GradientText colors={['#00BFFF', '#1E90FF', '#0066CC', '#00CED1']}>
                    <CountUp to={500} />+
                  </GradientText>
                </span>
                <span className={styles.statLabel}>Clientes Atendidos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  <GradientText colors={['#00BFFF', '#1E90FF', '#0066CC', '#00CED1']}>
                    <CountUp to={10} />+
                  </GradientText>
                </span>
                <span className={styles.statLabel}>Años Resolviendo Fallas</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  <GradientText colors={['#00BFFF', '#1E90FF', '#0066CC', '#00CED1']}>
                    24h
                  </GradientText>
                </span>
                <span className={styles.statLabel}>Diagnóstico Express</span>
              </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>
    </Section>
  )
}

