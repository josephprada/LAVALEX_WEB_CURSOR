import { useState, useRef, useEffect } from 'react'
import { createWasher, updateWasher } from '../../../services/washers'
import { Button } from '../../ui/Button/Button'
import { Input } from '../../ui/Input/Input'
import type { Washer, WasherFormData } from '../../../types/washer'
import styles from './WasherForm.module.css'

interface WasherFormProps {
  washer?: Washer | null
  onSave: () => void
  onCancel: () => void
}

export const WasherForm = ({ washer, onSave, onCancel }: WasherFormProps) => {
  const [formData, setFormData] = useState<WasherFormData>({
    brand: '',
    model: '',
    price: '',
    status: 'Reacondicionada',
    images: [],
  })
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (washer) {
      setFormData({
        brand: washer.brand,
        model: washer.model,
        price: washer.price,
        status: washer.status,
        images: [],
      })
      setExistingImages(washer.image_urls || [])
      setImagesToRemove([])
    } else {
      setFormData({
        brand: '',
        model: '',
        price: '',
        status: 'Reacondicionada',
        images: [],
      })
      setExistingImages([])
      setImagesToRemove([])
    }
  }, [washer])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.brand.trim()) {
      newErrors.brand = 'La marca es requerida'
    }

    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido'
    }

    if (!formData.price.trim()) {
      newErrors.price = 'El precio es requerido'
    } else if (!/^\$?[\d.,]+$/.test(formData.price.trim())) {
      newErrors.price = 'Formato de precio inválido'
    }

    if (!formData.status) {
      newErrors.status = 'El estado es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof WasherFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeNewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== url))
    setImagesToRemove((prev) => [...prev, url])
  }

  const restoreExistingImage = (url: string) => {
    setExistingImages((prev) => [...prev, url])
    setImagesToRemove((prev) => prev.filter((img) => img !== url))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      if (washer) {
        // Actualizar
        console.log('🔄 Actualizando lavadora:', washer.id)
        const { data, error } = await updateWasher(
          washer.id,
          formData,
          existingImages,
          imagesToRemove
        )

        if (error) {
          console.error('❌ Error al actualizar:', error)
          alert(`Error al actualizar: ${error.message}`)
          setLoading(false)
          return
        }

        if (data) {
          console.log('✅ Lavadora actualizada:', data)
          console.log('📸 URLs de imágenes guardadas:', data.image_urls)
          onSave()
        }
      } else {
        // Crear
        console.log('➕ Creando nueva lavadora')
        const { data, error } = await createWasher(formData)

        if (error) {
          console.error('❌ Error al crear:', error)
          alert(`Error al crear: ${error.message}`)
          setLoading(false)
          return
        }

        if (data) {
          console.log('✅ Lavadora creada:', data)
          console.log('📸 URLs de imágenes guardadas:', data.image_urls)
          onSave()
        }
      }
    } catch (error) {
      console.error('❌ Error inesperado:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`)
      setLoading(false)
    }
  }

  const allImages = [
    ...existingImages.map((url) => ({ url, isExisting: true })),
    ...formData.images.map((file, index) => ({ file, index, isExisting: false })),
  ]

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <Input
          type="text"
          label="Marca"
          placeholder="Ej: LG, Samsung, Whirlpool"
          value={formData.brand}
          onChange={(e) => handleChange('brand', e.target.value)}
          required
          error={errors.brand}
          disabled={loading}
        />

        <Input
          type="text"
          label="Modelo"
          placeholder="Ej: Lavadora Automática 15kg"
          value={formData.model}
          onChange={(e) => handleChange('model', e.target.value)}
          required
          error={errors.model}
          disabled={loading}
        />

        <Input
          type="text"
          label="Precio"
          placeholder="Ej: $450.000"
          value={formData.price}
          onChange={(e) => handleChange('price', e.target.value)}
          required
          error={errors.price}
          disabled={loading}
        />

        <div className={styles.selectWrapper}>
          <label className={styles.label}>
            Estado <span className={styles.required}>*</span>
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className={`${styles.select} ${errors.status ? styles.error : ''}`}
            disabled={loading}
            required
          >
            <option value="Reacondicionada">Reacondicionada</option>
            <option value="Nueva">Nueva</option>
            <option value="Usada">Usada</option>
          </select>
          {errors.status && <span className={styles.errorMessage}>{errors.status}</span>}
        </div>
      </div>

      <div className={styles.imagesSection}>
        <label className={styles.label}>
          Imágenes
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
          disabled={loading}
        />
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className={styles.fileButton}
        >
          Seleccionar Imágenes
        </Button>

        {allImages.length > 0 && (
          <div className={styles.imagePreview}>
            {allImages.map((item, idx) => {
              if (item.isExisting) {
                const isRemoved = imagesToRemove.includes(item.url)
                return (
                  <div key={`existing-${idx}`} className={styles.imageItem}>
                    <img src={item.url} alt="Preview" className={styles.previewImage} />
                    {isRemoved ? (
                      <button
                        type="button"
                        onClick={() => restoreExistingImage(item.url)}
                        className={styles.restoreButton}
                        disabled={loading}
                      >
                        Restaurar
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeExistingImage(item.url)}
                        className={styles.removeButton}
                        disabled={loading}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                )
              } else {
                const previewUrl = URL.createObjectURL(item.file)
                return (
                  <div key={`new-${item.index}`} className={styles.imageItem}>
                    <img src={previewUrl} alt="Preview" className={styles.previewImage} />
                    <button
                      type="button"
                      onClick={() => removeNewImage(item.index)}
                      className={styles.removeButton}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
        >
          {washer ? 'Actualizar' : 'Guardar'} Lavadora
        </Button>
      </div>
    </form>
  )
}
