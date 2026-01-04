import { useState } from 'react'
import { Button } from '../../ui/Button/Button'
import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { Modal } from '../../ui/Modal/Modal'
import { WHATSAPP_NUMBER } from '../../../constants'
import styles from './Sell.module.css'

import samsungImage1 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.32.31 AM.jpeg'
import samsungImage2 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.32.31 AM (1).jpeg'
import samsungImage3 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.32.31 AM (2).jpeg'
import samsungImage4 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.34.27 AM.jpeg'
import backgroundImage from '../../../assets/bg/Generated Image January 03, 2026 - 7_40PM.png'

export const Sell = () => {
  const [selectedWasher, setSelectedWasher] = useState<number | null>(null)
  const washers = [
    { id: 1, model: 'Lavadora Automática 15kg', price: '$450.000', status: 'Reacondicionada', brand: 'LG', image: null },
    { id: 2, model: 'Lavadora Automática 12kg', price: '$380.000', status: 'Reacondicionada', brand: 'Samsung', image: samsungImage1, images: [samsungImage1, samsungImage2, samsungImage3, samsungImage4] },
    { id: 3, model: 'Lavadora Automática 18kg', price: '$520.000', status: 'Reacondicionada', brand: 'Whirlpool', image: null },
  ]

  const handleContact = (washer: typeof washers[0]) => {
    const message = encodeURIComponent(`Hola, me interesa la ${washer.model} - ${washer.brand} por ${washer.price}`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const handleImageClick = (washerId: number) => {
    const washer = washers.find((w) => w.id === washerId)
    if (washer && washer.images && washer.images.length > 0) {
      setSelectedWasher(washerId)
    }
  }

  const handleCloseModal = () => {
    setSelectedWasher(null)
  }

  const getSelectedWasherData = () => {
    if (selectedWasher === null) return null
    return washers.find((w) => w.id === selectedWasher) || null
  }

  return (
    <Section id="venta" variant="secondary" className={styles.sell}>
      <div 
        className={styles.backgroundWrapper}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
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
              <div
                className={styles.washerImage}
                onClick={() => handleImageClick(washer.id)}
                style={{ cursor: washer.images && washer.images.length > 0 ? 'pointer' : 'default' }}
              >
                {washer.image ? (
                  <img src={washer.image} alt={`${washer.brand} ${washer.model}`} className={styles.washerImg} />
                ) : (
                  <div className={styles.placeholderImage}>🔄</div>
                )}
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

        {(() => {
          const washer = getSelectedWasherData()
          if (!washer || !washer.images) return null
          return (
            <Modal
              isOpen={selectedWasher !== null}
              onClose={handleCloseModal}
              images={washer.images}
              initialIndex={0}
              title={`${washer.brand} ${washer.model}`}
            />
          )
        })()}
      </Container>
    </Section>
  )
}


