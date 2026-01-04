import { useState, useRef, useEffect } from 'react'
import { Button } from '../../ui/Button/Button'
import { Input } from '../../ui/Input/Input'
import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { WHATSAPP_NUMBER } from '../../../constants'
import styles from './Buy.module.css'

export const Buy = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photoPreviewsRef = useRef<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    const validFiles = newFiles.filter((file) => file.type.startsWith('image/'))
    
    if (validFiles.length === 0) return

    const updatedPhotos = [...photos, ...validFiles]
    setPhotos(updatedPhotos)

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))
    setPhotoPreviews((prev) => {
      const updated = [...prev, ...newPreviews]
      photoPreviewsRef.current = updated
      return updated
    })
  }

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index)
    const updatedPreviews = photoPreviews.filter((_, i) => i !== index)
    
    URL.revokeObjectURL(photoPreviews[index])
    photoPreviewsRef.current = updatedPreviews
    
    setPhotos(updatedPhotos)
    setPhotoPreviews(updatedPreviews)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    return () => {
      photoPreviewsRef.current.forEach((preview) => URL.revokeObjectURL(preview))
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!/^[0-9+\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const photosInfo = photos.length > 0 ? `\n\nAdjunté ${photos.length} foto${photos.length > 1 ? 's' : ''} de mi lavadora.` : ''
    const message = `Hola, soy ${formData.name}. Me interesa vender mi lavadora. ${formData.message ? `Mensaje: ${formData.message}` : ''}${photosInfo}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
    
    if (photos.length > 0) {
      setTimeout(() => {
        alert('Nota: Las fotos se pueden compartir manualmente en WhatsApp después de abrir el chat.')
      }, 500)
    }
  }

  return (
    <Section id="compra" className={styles.buy}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Compramos Tu Lavadora</h2>
          <p className={styles.description}>
            ¿Tienes una lavadora usada o dañada que quieres vender? Compramos lavadoras automáticas de todas las marcas y modelos. 
            Evaluamos cada caso individualmente para ofrecerte el mejor precio.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.infoSection}>
            <Card variant="elevated" className={styles.infoCard}>
              <h3 className={styles.infoTitle}>¿Qué Lavadoras Compramos?</h3>
              <ul className={styles.infoList}>
                <li>Lavadoras automáticas de todas las marcas</li>
                <li>Lavadoras en buen estado o dañadas</li>
                <li>Diferentes capacidades (10kg, 12kg, 15kg, 18kg, etc.)</li>
              </ul>
              <h3 className={styles.infoTitle}>Proceso de Compra</h3>
              <ol className={styles.processList}>
                <li>Contáctanos con los datos de tu lavadora</li>
                <li>Realizamos una evaluación del equipo</li>
                <li>Te ofrecemos el mejor precio del mercado</li>
                <li>Acordamos la recogida o entrega</li>
              </ol>
            </Card>
          </div>

          <div className={styles.formSection}>
            <Card variant="elevated" className={styles.formCard}>
              <h3 className={styles.formTitle}>Vende Tu Lavadora</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                  type="text"
                  name="name"
                  label="Nombre completo"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  label="Teléfono"
                  placeholder="300 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
                <Input
                  type="textarea"
                  name="message"
                  label="Información de tu lavadora (opcional)"
                  placeholder="Marca, modelo, capacidad, estado, etc..."
                  value={formData.message}
                  onChange={handleChange}
                />
                <div className={styles.photoSection}>
                  <label className={styles.photoLabel}>
                    Fotos de tu lavadora (opcional)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    onChange={handlePhotoChange}
                    className={styles.photoInput}
                    id="photo-input"
                  />
                  <label htmlFor="photo-input" className={styles.photoButton}>
                    <span className={styles.photoButtonIcon}>📷</span>
                    <span>{photos.length > 0 ? 'Agregar más fotos' : 'Tomar o seleccionar fotos'}</span>
                  </label>
                  {photoPreviews.length > 0 && (
                    <div className={styles.photoPreviews}>
                      {photoPreviews.map((preview, index) => (
                        <div key={index} className={styles.photoPreview}>
                          <img src={preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className={styles.removePhotoButton}
                            aria-label="Eliminar foto"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button type="submit" variant="primary" size="lg" className={styles.submitButton}>
                  Enviar a WhatsApp
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

