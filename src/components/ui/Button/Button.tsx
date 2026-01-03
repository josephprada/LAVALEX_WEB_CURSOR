import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'
import { ButtonProps } from '../../../types'

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  className = '',
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner}></span>}
      <span className={loading ? styles.hidden : ''}>{children}</span>
    </button>
  )
}

