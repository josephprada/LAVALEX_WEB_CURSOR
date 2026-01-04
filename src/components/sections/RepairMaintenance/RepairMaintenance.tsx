import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import BlurText from 'react-bits/src/content/TextAnimations/BlurText/BlurText'
import FadeContent from 'react-bits/src/content/Animations/FadeContent/FadeContent'
import { SERVICES } from '../../../constants'
import styles from './RepairMaintenance.module.css'

export const RepairMaintenance = () => {

  return (
    <Section id="reparacion" variant="secondary" className={styles.repairMaintenance}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <BlurText text="Reparación y Mantenimiento" className={styles.title} />
          </h2>
          <FadeContent delay={0.2}>
            <p className={styles.description}>
              Ofrecemos servicios profesionales de reparación y mantenimiento para todas las marcas y modelos de lavadoras automáticas.
            </p>
          </FadeContent>
        </div>

        <div className={styles.servicesGrid}>
          {SERVICES.map((service) => (
            <div key={service.id}>
              <Card variant="elevated" className={styles.serviceCard}>
                <div className={styles.icon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

