import { useState } from 'react'
import { Button } from '../../ui/Button/Button'
import { Input } from '../../ui/Input/Input'
import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import BlurText from 'react-bits/src/content/TextAnimations/BlurText/BlurText'
import FadeContent from 'react-bits/src/content/Animations/FadeContent/FadeContent'
import AnimatedContent from 'react-bits/src/content/Animations/AnimatedContent/AnimatedContent'
import { WHATSAPP_NUMBER } from '../../../constants'
import styles from './Buy.module.css'

export const Buy = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

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

    const message = `Hola, soy ${formData.name}. Me interesa vender mi lavadora. ${formData.message ? `Mensaje: ${formData.message}` : ''}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
  }

  return (
    <Section id="compra" className={styles.buy}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <BlurText text="Compramos Tu Lavadora" className={styles.title} />
          </h2>
          <FadeContent delay={0.2}>
            <p className={styles.description}>
              ¿Tienes una lavadora usada o dañada que quieres vender? Compramos lavadoras automáticas de todas las marcas y modelos. 
              Evaluamos cada caso individualmente para ofrecerte el mejor precio.
            </p>
          </FadeContent>
        </div>

        <div className={styles.content}>
          <div className={styles.infoSection}>
            <AnimatedContent delay={0.3} direction="vertical" distance={50}>
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
            </AnimatedContent>
          </div>

          <div className={styles.formSection}>
            <AnimatedContent delay={0.4} direction="vertical" distance={50}>
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
                <Button type="submit" variant="primary" size="lg" className={styles.submitButton}>
                  Enviar a WhatsApp
                </Button>
              </form>
              </Card>
            </AnimatedContent>
          </div>
        </div>
      </Container>
    </Section>
  )
}

