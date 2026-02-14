import { useEffect, useRef, useState } from 'react'
import { Container } from '../../layout/Container/Container'
import { Section } from '../../ui/Section/Section'
import BlurText from 'react-bits/src/content/TextAnimations/BlurText/BlurText'
import FadeContent from 'react-bits/src/content/Animations/FadeContent/FadeContent'
import { SERVICES } from '../../../constants'
import styles from './RepairMaintenance.module.css'

// Sketchfab API types
declare global {
  interface Window {
    Sketchfab: any
  }
}

interface SketchfabAPI {
  gotoAnnotation: (index: number) => void
  getAnnotations: (callback: (err: any, annotations: any[]) => void) => void
  start: () => void
  addEventListener: (event: string, callback: () => void) => void
}

const SKETCHFAB_MODEL_UID = 'c97197b3a6d64f78bb58404d29cf6a25'
const SKETCHFAB_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'

export const RepairMaintenance = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [api, setApi] = useState<SketchfabAPI | null>(null)
  const [isViewerReady, setIsViewerReady] = useState(false)
  const [loadingError, setLoadingError] = useState<string | null>(null)

  useEffect(() => {
    const initSketchfab = () => {
      if (!window.Sketchfab || !iframeRef.current) {
        return
      }

      try {
        const client = new window.Sketchfab('1.12.1', iframeRef.current)

        client.init(SKETCHFAB_MODEL_UID, {
          success: (apiInstance: SketchfabAPI) => {
            apiInstance.addEventListener('viewerready', () => {
              if (typeof apiInstance.gotoAnnotation === 'function') {
                setTimeout(() => {
                  setApi(apiInstance)
                  setIsViewerReady(true)
                }, 1500)
              } else {
                console.error('gotoAnnotation method not available')
                setLoadingError('Error: La API no está completamente cargada.')
              }
            })

            apiInstance.start()
          },
          error: (error: any) => {
            console.error('Sketchfab init error:', error)
            setLoadingError('Error al cargar el modelo 3D. Por favor, recarga la página.')
          },
          annotations_visible: 0,
          transparent: 1,
          ui_animations: 0,
          ui_infos: 0,
          ui_stop: 0,
          ui_inspector: 0,
          ui_watermark_link: 0,
          ui_watermark: 0,
          ui_ar: 0,
          ui_help: 0,
          ui_settings: 0,
          ui_vr: 0,
          ui_fullscreen: 0,
          ui_annotations: 0
        })
      } catch (error) {
        setLoadingError('Error al inicializar el visor 3D.')
        console.error('Sketchfab initialization error:', error)
      }
    }

    const runWhenReady = () => {
      if (window.Sketchfab && iframeRef.current) {
        initSketchfab()
        return true
      }
      return false
    }

    const loadSketchfabScript = (): Promise<void> => {
      if (window.Sketchfab) {
        return Promise.resolve()
      }
      const existing = document.querySelector(`script[src="${SKETCHFAB_SCRIPT_URL}"]`)
      if (existing) {
        return new Promise((resolve) => {
          const check = setInterval(() => {
            if (window.Sketchfab) {
              clearInterval(check)
              resolve()
            }
          }, 50)
        })
      }
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = SKETCHFAB_SCRIPT_URL
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Sketchfab script failed to load'))
        document.head.appendChild(script)
      })
    }

    let cancelled = false
    const initTimer = setTimeout(() => {
      loadSketchfabScript()
        .then(() => {
          if (cancelled) return
          if (!runWhenReady()) {
            const checkInterval = setInterval(() => {
              if (cancelled) {
                clearInterval(checkInterval)
                return
              }
              if (runWhenReady()) {
                clearInterval(checkInterval)
              }
            }, 100)
            setTimeout(() => clearInterval(checkInterval), 10000)
          }
        })
        .catch(() => {
          if (!cancelled) {
            setLoadingError('Error al cargar el visor 3D. Por favor, recarga la página.')
          }
        })
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(initTimer)
    }
  }, [])

  const handleAnnotationClick = (annotationIndex: number) => {
    if (api && isViewerReady) {
      try {
        console.log('Navigating to annotation:', annotationIndex)
        // Use the annotation index directly (0-based)
        api.gotoAnnotation(annotationIndex)
      } catch (error) {
        console.error('Error navigating to annotation:', error)
        // Try alternative method if gotoAnnotation fails
        try {
          // Some versions of the API might need different approach
          if (api.getAnnotations) {
            api.getAnnotations((err: any, annotations: any[]) => {
              if (!err && annotations && annotations[annotationIndex]) {
                // Try to navigate using the annotation object
                console.log('Using alternative navigation method')
              }
            })
          }
        } catch (altError) {
          console.error('Alternative navigation also failed:', altError)
        }
      }
    } else {
      console.warn('API not ready. isViewerReady:', isViewerReady, 'api:', !!api)
    }
  }

  // URL con todas las configuraciones para fondo transparente y sin controles
  const iframeUrl = `https://sketchfab.com/models/${SKETCHFAB_MODEL_UID}/embed?annotations_visible=0&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0`

  return (
    <Section id="reparacion" variant="secondary" className={styles.repairMaintenance}>
      {/* Fondo animado comentado para mejorar rendimiento */}
      {/* <div className={styles.caustics} /> */}
      {/* <div className={styles.bubbles}>
        {[...Array(12)].map((_, i) => (
          <div key={`bubble-${i}`} className={styles.bubble} />
        ))}
      </div> */}
      {/* <div className={styles.particles}>
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 6}s`
            }}
          />
        ))}
      </div> */}
      {/* Fondo simple estático (sin animaciones) */}
      <div className={styles.simpleBg} />

      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <BlurText text="Reparación y Mantenimiento" className={styles.title} />
          </h2>
          <FadeContent delay={0.2}>
            <p className={styles.description}>
              Una lavadora que falla no significa que necesitas comprar otra. El 85% de las fallas tienen reparación y cuestan menos de lo que imaginas. Diagnóstico gratuito en 24 horas.
            </p>
          </FadeContent>
        </div>

        <div className={styles.modelContainer}>
          <div className={styles.modelViewer}>
            {loadingError ? (
              <div className={styles.errorMessage}>
                <p>{loadingError}</p>
              </div>
            ) : (
              <>
                {!isViewerReady && (
                  <div className={styles.loadingMessage}>
                    <p>Cargando modelo 3D...</p>
                  </div>
                )}
                <iframe
                  key="sketchfab-model"
                  ref={iframeRef}
                  src={iframeUrl}
                  title="LAVADORA_ZOU_20_KG_2"
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
                  className={styles.sketchfabIframe}
                  style={{ background: 'transparent' }}
                  width={800}
                  height={450}
                />
              </>
            )}
          </div>

          <div className={styles.annotationsList}>
            <h3 className={styles.annotationsTitle}>Nuestros Servicios</h3>
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className={styles.annotationItem}
                onClick={() => handleAnnotationClick(service.annotationIndex)}
                role="button"
                tabIndex={0}
                aria-label={`Ver anotación ${service.annotationIndex + 1}: ${service.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleAnnotationClick(service.annotationIndex)
                  }
                }}
              >
                <span className={styles.annotationNumber}>{service.annotationIndex + 1}</span>
                <div className={styles.annotationContent}>
                  <h4 className={styles.annotationTitle}>{service.title}</h4>
                  <p className={styles.annotationDescription}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

