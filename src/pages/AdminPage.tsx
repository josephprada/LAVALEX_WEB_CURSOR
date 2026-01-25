import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AdminDashboard } from '../components/admin/AdminDashboard/AdminDashboard'
import { Button } from '../components/ui/Button/Button'
import styles from './AdminPage.module.css'

export const AdminPage = () => {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { success } = await signOut()
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>LAVALEX Admin</h1>
          <div className={styles.userInfo}>
            <span className={styles.userEmail}>{user?.email}</span>
            <Button
              variant="outline"
              size="md"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <AdminDashboard />
      </main>
    </div>
  )
}
