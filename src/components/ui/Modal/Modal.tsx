import { useEffect, useState } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  initialIndex?: number
  title?: string
}

export const Modal = ({ isOpen, onClose, images, initialIndex = 0, title }: ModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      document.body.style.overflow = 'hidden'
      // Reducir z-index del header cuando el modal está abierto
      const header = document.querySelector('header')
      if (header) {
        ;(header as HTMLElement).style.zIndex = '1'
      }
    } else {
      document.body.style.overflow = ''
      // Restaurar z-index del header cuando el modal se cierra
      const header = document.querySelector('header')
      if (header) {
        ;(header as HTMLElement).style.zIndex = ''
      }
    }

    return () => {
      document.body.style.overflow = ''
      const header = document.querySelector('header')
      if (header) {
        ;(header as HTMLElement).style.zIndex = ''
      }
    }
  }, [isOpen, initialIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  const handlePrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      setIsTransitioning(false)
    }, 150)
  }

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      setIsTransitioning(false)
    }, 150)
  }

  const handleIndicatorClick = (index: number) => {
    if (index !== currentIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(index)
        setIsTransitioning(false)
      }, 150)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        {title && <h3 className={styles.title}>{title}</h3>}

        <div className={styles.imageContainer}>
          <img
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1} de ${images.length}`}
            className={`${styles.image} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}
          />

          {images.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevious}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNext}
                aria-label="Imagen siguiente"
              >
                ›
              </button>

              <div className={styles.indicators}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => handleIndicatorClick(index)}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>

              <div className={styles.counter}>
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

