import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import BlurText from 'react-bits/src/content/TextAnimations/BlurText/BlurText'
import CountUp from 'react-bits/src/content/TextAnimations/CountUp/CountUp'
import GradientText from 'react-bits/src/content/TextAnimations/GradientText/GradientText'
import FadeContent from 'react-bits/src/content/Animations/FadeContent/FadeContent'
import AnimatedContent from 'react-bits/src/content/Animations/AnimatedContent/AnimatedContent'
import expertImage from '../../../assets/Generated Image January 03, 2026 - 4_14PM.png'
import styles from './About.module.css'

export const About = () => {
  return (
    <Section id="quien-soy" className={styles.about}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <div className={styles.avatar}>
              <img 
                src={expertImage} 
                alt="Experto en reparación de lavadoras" 
                className={styles.expertImage}
              />
            </div>
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              <BlurText text="Conoce al Experto" className={styles.title} />
            </h2>
            <FadeContent delay={0.2}>
              <p className={styles.description}>
                Soy un técnico especializado en reparación y mantenimiento de lavadoras automáticas con más de 10 años de experiencia en el sector. 
                Mi pasión por brindar un servicio de calidad me ha llevado a especializarme en todas las marcas y modelos del mercado.
              </p>
            </FadeContent>
            <FadeContent delay={0.3}>
              <p className={styles.description}>
                En LAVALEX, nos comprometemos a ofrecer soluciones rápidas, eficientes y confiables para todos nuestros clientes en Bucaramanga. 
                Trabajamos con repuestos originales y garantizamos nuestro trabajo, porque tu satisfacción es nuestra prioridad.
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
                    <CountUp to={10} />+
                  </GradientText>
                </span>
                <span className={styles.statLabel}>Años de Experiencia</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  <GradientText colors={['#00BFFF', '#1E90FF', '#0066CC', '#00CED1']}>
                    <CountUp to={500} />+
                  </GradientText>
                </span>
                <span className={styles.statLabel}>Clientes Satisfechos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  <GradientText colors={['#00BFFF', '#1E90FF', '#0066CC', '#00CED1']}>
                    <CountUp to={100} />%
                  </GradientText>
                </span>
                <span className={styles.statLabel}>Garantía</span>
              </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>
    </Section>
  )
}

