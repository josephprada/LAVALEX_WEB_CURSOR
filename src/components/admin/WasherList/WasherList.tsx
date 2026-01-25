import { useState } from 'react'
import { deleteWasher } from '../../../services/washers'
import { Button } from '../../ui/Button/Button'
import { Card } from '../../ui/Card/Card'
import type { Washer } from '../../../types/washer'
import styles from './WasherList.module.css'

interface WasherListProps {
  washers: Washer[]
  onEdit: (washer: Washer) => void
  onRefresh: () => void
  loading?: boolean
}

export const WasherList = ({ washers, onEdit, onRefresh, loading }: WasherListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleDelete = async (washer: Washer) => {
    if (confirmDelete !== washer.id) {
      setConfirmDelete(washer.id)
      return
    }

    setDeletingId(washer.id)
    setConfirmDelete(null)

    const { error } = await deleteWasher(washer.id, washer.image_urls)

    if (error) {
      alert(`Error al eliminar: ${error.message}`)
      setDeletingId(null)
      return
    }

    setDeletingId(null)
    onRefresh()
  }

  const handleCancelDelete = () => {
    setConfirmDelete(null)
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Cargando lavadoras...</p>
      </div>
    )
  }

  if (washers.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No hay lavadoras registradas</p>
        <p className={styles.emptySubtext}>Haz clic en "Agregar Nueva Lavadora" para comenzar</p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {washers.map((washer) => (
        <Card key={washer.id} variant="elevated" className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.imageContainer}>
              {washer.image_urls && washer.image_urls.length > 0 ? (
                <img
                  src={washer.image_urls[0]}
                  alt={`${washer.brand} ${washer.model}`}
                  className={styles.image}
                />
              ) : (
                <div className={styles.placeholderImage}>🔄</div>
              )}
            </div>
            <div className={styles.info}>
              <h3 className={styles.brand}>{washer.brand}</h3>
              <h4 className={styles.model}>{washer.model}</h4>
              <p className={styles.price}>{washer.price}</p>
              <p className={styles.status}>{washer.status}</p>
              {washer.image_urls && washer.image_urls.length > 0 && (
                <p className={styles.imageCount}>
                  {washer.image_urls.length} {washer.image_urls.length === 1 ? 'imagen' : 'imágenes'}
                </p>
              )}
            </div>
            <div className={styles.actions}>
              <Button
                variant="outline"
                size="md"
                onClick={() => onEdit(washer)}
                disabled={deletingId === washer.id}
              >
                Editar
              </Button>
              {confirmDelete === washer.id ? (
                <div className={styles.confirmDelete}>
                  <p className={styles.confirmText}>¿Eliminar?</p>
                  <div className={styles.confirmButtons}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDelete(washer)}
                      loading={deletingId === washer.id}
                    >
                      Sí
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelDelete}
                      disabled={deletingId === washer.id}
                    >
                      No
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => handleDelete(washer)}
                  disabled={deletingId === washer.id}
                  className={styles.deleteButton}
                >
                  {deletingId === washer.id ? 'Eliminando...' : 'Eliminar'}
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
