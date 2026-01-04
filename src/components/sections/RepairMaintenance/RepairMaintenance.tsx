import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { SERVICES } from '../../../constants'
import styles from './RepairMaintenance.module.css'

export const RepairMaintenance = () => {

  return (
    <Section id="reparacion" variant="secondary" className={styles.repairMaintenance}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Reparación y Mantenimiento</h2>
          <p className={styles.description}>
            Ofrecemos servicios profesionales de reparación y mantenimiento para todas las marcas y modelos de lavadoras automáticas.
          </p>
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

