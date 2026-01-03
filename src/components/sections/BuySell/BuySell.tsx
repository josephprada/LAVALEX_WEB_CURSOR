import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../ui/Button/Button'
import { Input } from '../../ui/Input/Input'
import { Card } from '../../ui/Card/Card'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../../constants'
import styles from './BuySell.module.css'

export const BuySell = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'comprar',
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

    const message = `Hola, soy ${formData.name}. Me interesa ${formData.service === 'comprar' ? 'comprar' : 'vender'} una lavadora. ${formData.message ? `Mensaje: ${formData.message}` : ''}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
  }

  const washers = [
    { id: 1, model: 'Lavadora Automática 15kg', price: '$450.000', status: 'Reacondicionada' },
    { id: 2, model: 'Lavadora Automática 12kg', price: '$380.000', status: 'Reacondicionada' },
    { id: 3, model: 'Lavadora Automática 18kg', price: '$520.000', status: 'Reacondicionada' },
  ]

  return (
    <Section id="compra-venta" className={styles.buySell}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Compra y Venta de Lavadoras</h2>
          <p className={styles.description}>
            Compramos lavadoras usadas o dañadas y vendemos lavadoras reacondicionadas con garantía. 
            Contáctanos para conocer más sobre nuestros servicios.
          </p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.formSection}
          >
            <Card variant="elevated" className={styles.formCard}>
              <h3 className={styles.formTitle}>Solicita Información</h3>
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
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="service"
                      value="comprar"
                      checked={formData.service === 'comprar'}
                      onChange={handleChange}
                      className={styles.radio}
                    />
                    Quiero Comprar
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="service"
                      value="vender"
                      checked={formData.service === 'vender'}
                      onChange={handleChange}
                      className={styles.radio}
                    />
                    Quiero Vender
                  </label>
                </div>
                <Input
                  type="textarea"
                  name="message"
                  label="Mensaje (opcional)"
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button type="submit" variant="primary" size="lg" className={styles.submitButton}>
                  Enviar a WhatsApp
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.gallerySection}
          >
            <h3 className={styles.galleryTitle}>Lavadoras Disponibles</h3>
            <div className={styles.gallery}>
              {washers.map((washer, index) => (
                <motion.div
                  key={washer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="elevated" className={styles.washerCard}>
                    <div className={styles.washerImage}>
                      <div className={styles.placeholderImage}>🔄</div>
                    </div>
                    <div className={styles.washerInfo}>
                      <h4 className={styles.washerModel}>{washer.model}</h4>
                      <p className={styles.washerPrice}>{washer.price}</p>
                      <p className={styles.washerStatus}>{washer.status}</p>
                      <Button variant="outline" size="sm" className={styles.infoButton}>
                        Más Información
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

