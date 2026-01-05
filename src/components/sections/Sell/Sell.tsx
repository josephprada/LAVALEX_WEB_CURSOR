import { useState } from 'react'
import { Button } from '../../ui/Button/Button'
import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { Modal } from '../../ui/Modal/Modal'
import BlurText from 'react-bits/src/content/TextAnimations/BlurText/BlurText'
import FadeContent from 'react-bits/src/content/Animations/FadeContent/FadeContent'
import { WHATSAPP_NUMBER } from '../../../constants'
import styles from './Sell.module.css'

import samsungImage1 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.32.31 AM.jpeg'
import samsungImage2 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.32.31 AM (1).jpeg'
import samsungImage3 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.32.31 AM (2).jpeg'
import samsungImage4 from '../../../assets/venta/samsung/WhatsApp Image 2025-12-17 at 11.34.27 AM.jpeg'
import backgroundImage from '../../../assets/bg/Generated Image January 03, 2026 - 7_40PM.png'

export const Sell = () => {
  const [selectedWasher, setSelectedWasher] = useState<number | null>(null)
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({})
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
      const currentIndex = imageIndices[washerId] || 0
      setSelectedWasher(washerId)
      // Actualizar el índice inicial del modal
      setTimeout(() => {
        setImageIndices(prev => ({ ...prev, [washerId]: currentIndex }))
      }, 0)
    }
  }

  const handleImageNavigation = (washerId: number, direction: 'prev' | 'next', e: React.MouseEvent) => {
    e.stopPropagation()
    const washer = washers.find((w) => w.id === washerId)
    if (!washer || !washer.images || washer.images.length <= 1) return

    const currentIndex = imageIndices[washerId] || 0
    let newIndex: number

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? washer.images.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex === washer.images.length - 1 ? 0 : currentIndex + 1
    }

    setImageIndices(prev => ({ ...prev, [washerId]: newIndex }))
  }

  const getCurrentImage = (washer: typeof washers[0]) => {
    if (!washer.images || washer.images.length === 0) return washer.image
    const currentIndex = imageIndices[washer.id] || 0
    return washer.images[currentIndex]
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
          <h2 className={styles.title}>
            <BlurText text="Lavadoras en Venta" className={styles.title} />
          </h2>
          <FadeContent delay={0.2}>
            <p className={styles.description}>
              Vendemos lavadoras reacondicionadas con garantía. Todas nuestras lavadoras pasan por un proceso 
              de revisión y mantenimiento completo antes de ser puestas a la venta.
            </p>
          </FadeContent>
        </div>

        <div className={styles.gallery}>
          {washers.map((washer) => (
            <Card key={washer.id} variant="elevated" className={styles.washerCard}>
              <div
                className={styles.washerImage}
                onClick={() => handleImageClick(washer.id)}
                style={{ cursor: washer.images && washer.images.length > 0 ? 'pointer' : 'default' }}
              >
                {getCurrentImage(washer) ? (
                  <>
                    <img src={getCurrentImage(washer)} alt={`${washer.brand} ${washer.model}`} className={styles.washerImg} />
                    {washer.images && washer.images.length > 0 && (
                      <>
                        <div className={styles.expandIcon} onClick={(e) => { e.stopPropagation(); handleImageClick(washer.id); }}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        {washer.images.length > 1 && (
                          <>
                            <button
                              className={styles.navArrowLeft}
                              onClick={(e) => handleImageNavigation(washer.id, 'prev', e)}
                              aria-label="Imagen anterior"
                            >
                              ‹
                            </button>
                            <button
                              className={styles.navArrowRight}
                              onClick={(e) => handleImageNavigation(washer.id, 'next', e)}
                              aria-label="Imagen siguiente"
                            >
                              ›
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </>
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
              initialIndex={imageIndices[washer.id] || 0}
              title={`${washer.brand} ${washer.model}`}
            />
          )
        })()}
      </Container>
    </Section>
  )
}


