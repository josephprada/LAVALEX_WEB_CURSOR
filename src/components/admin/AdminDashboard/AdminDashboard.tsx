import { useState } from 'react'
import { useWashers } from '../../../hooks/useWashers'
import { WasherList } from '../WasherList/WasherList'
import { WasherForm } from '../WasherForm/WasherForm'
import { Button } from '../../ui/Button/Button'
import type { Washer } from '../../../types/washer'
import styles from './AdminDashboard.module.css'

export const AdminDashboard = () => {
  const { washers, loading, refetch } = useWashers()
  const [showForm, setShowForm] = useState(false)
  const [editingWasher, setEditingWasher] = useState<Washer | null>(null)

  const handleAddNew = () => {
    setEditingWasher(null)
    setShowForm(true)
  }

  const handleEdit = (washer: Washer) => {
    setEditingWasher(washer)
    setShowForm(true)
  }

  const handleSave = () => {
    setShowForm(false)
    setEditingWasher(null)
    refetch()
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingWasher(null)
  }

  if (showForm) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {editingWasher ? 'Editar Lavadora' : 'Agregar Nueva Lavadora'}
          </h2>
        </div>
        <WasherForm
          washer={editingWasher}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Administración de Lavadoras</h2>
        <Button
          variant="primary"
          size="lg"
          onClick={handleAddNew}
        >
          Agregar Nueva Lavadora
        </Button>
      </div>
      <WasherList
        washers={washers}
        onEdit={handleEdit}
        onRefresh={refetch}
        loading={loading}
      />
    </div>
  )
}
