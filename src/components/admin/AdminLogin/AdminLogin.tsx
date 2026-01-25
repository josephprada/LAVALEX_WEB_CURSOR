import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../ui/Button/Button'
import { Input } from '../../ui/Input/Input'
import styles from './AdminLogin.module.css'

interface AdminLoginProps {
  isOpen: boolean
  onClose: () => void
}

export const AdminLogin = ({ isOpen, onClose }: AdminLoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { signIn, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setEmail('')
      setPassword('')
      setError(null)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    const { success, error: signInError } = await signIn(email, password)

    if (!success) {
      setError(signInError || 'Error al iniciar sesión')
      return
    }

    // Redirigir a /admin
    navigate('/admin')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <div className={styles.content}>
          <h2 className={styles.title}>Acceso Administrativo</h2>
          <p className={styles.subtitle}>Ingresa tus credenciales para continuar</p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type="email"
              label="Email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              error={error && !email ? 'Campo requerido' : undefined}
            />
            
            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              error={error && !password ? 'Campo requerido' : undefined}
            />

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className={styles.submitButton}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
