import { useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header/Header'
import { Button } from '../components/ui/Button/Button'
import styles from './NotFound404.module.css'
import errorImage from '../assets/bg/image (2).png'

export const NotFound404 = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <img
                src={errorImage}
                alt="404 Error - Página no encontrada"
                className={styles.errorImage}
                width={400}
                height={300}
              />
            </div>
            
            <div className={styles.textContent}>
              <h1 className={styles.title}>Página no encontrada</h1>
              <p className={styles.description}>
                Parece que la página que buscas se ha desvanecido como el agua en el ciclo de lavado.
              </p>
              
              <div className={styles.actions}>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleGoHome}
                  className={styles.homeButton}
                >
                  Volver al inicio
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.backgroundElements}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>
      </main>
    </div>
  )
}
