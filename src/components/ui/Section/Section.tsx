import styles from './Section.module.css'
import { SectionProps } from '../../../types'

export const Section = ({
  id,
  children,
  className = '',
  variant = 'default',
}: SectionProps) => {
  const sectionClassName = [
    styles.section,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={sectionClassName}>
      {children}
    </section>
  )
}

