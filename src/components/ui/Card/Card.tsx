import styles from './Card.module.css'
import { CardProps } from '../../../types'

export const Card = ({
  variant = 'default',
  children,
  className = '',
  header,
  footer,
}: CardProps) => {
  const cardClassName = [
    styles.card,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClassName}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

