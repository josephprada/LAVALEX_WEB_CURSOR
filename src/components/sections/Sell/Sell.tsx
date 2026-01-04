import { Button } from '../../ui/Button/Button'
import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { WHATSAPP_NUMBER } from '../../../constants'
import styles from './Sell.module.css'

export const Sell = () => {
  const washers = [
    { id: 1, model: 'Lavadora Automática 15kg', price: '$450.000', status: 'Reacondicionada', brand: 'LG' },
    { id: 2, model: 'Lavadora Automática 12kg', price: '$380.000', status: 'Reacondicionada', brand: 'Samsung' },
    { id: 3, model: 'Lavadora Automática 18kg', price: '$520.000', status: 'Reacondicionada', brand: 'Whirlpool' },
  ]

  const handleContact = (washer: typeof washers[0]) => {
    const message = encodeURIComponent(`Hola, me interesa la ${washer.model} - ${washer.brand} por ${washer.price}`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <Section id="venta" variant="secondary" className={styles.sell}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Lavadoras en Venta</h2>
          <p className={styles.description}>
            Vendemos lavadoras reacondicionadas con garantía. Todas nuestras lavadoras pasan por un proceso 
            de revisión y mantenimiento completo antes de ser puestas a la venta.
          </p>
        </div>

        <div className={styles.gallery}>
          {washers.map((washer) => (
            <Card key={washer.id} variant="elevated" className={styles.washerCard}>
              <div className={styles.washerImage}>
                <div className={styles.placeholderImage}>🔄</div>
              </div>
              <div className={styles.washerInfo}>
                <h4 className={styles.washerBrand}>{washer.brand}</h4>
                <h3 className={styles.washerModel}>{washer.model}</h3>
                <p className={styles.washerPrice}>{washer.price}</p>
                <p className={styles.washerStatus}>{washer.status}</p>
                <Button 
                  variant="primary" 
                  size="md" 
                  className={styles.contactButton}
                  onClick={() => handleContact(washer)}
                >
                  Consultar Disponibilidad
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {washers.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              Próximamente tendremos más lavadoras disponibles. Contáctanos para conocer nuestro inventario actual.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const message = encodeURIComponent('Hola, me gustaría conocer las lavadoras disponibles')
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
              }}
            >
              Contactar por WhatsApp
            </Button>
          </div>
        )}
      </Container>
    </Section>
  )
}


