import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './Input.module.css'
import { InputProps } from '../../../types'

type InputElement = HTMLInputElement | HTMLTextAreaElement
type InputChangeEvent = React.ChangeEvent<InputElement>

export const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  error,
  success = false,
  disabled = false,
  required = false,
  onChange,
  className = '',
  name,
  ...props
}: InputProps & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>)) => {
  const inputId = `input-${name || Math.random().toString(36).substr(2, 9)}`
  const hasError = !!error
  const inputClassName = [
    styles.input,
    type === 'textarea' && styles.textarea,
    hasError && styles.error,
    success && !hasError && styles.success,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const InputComponent = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <InputComponent
        id={inputId}
        type={type === 'textarea' ? undefined : type}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        onChange={onChange as any}
        name={name}
        {...(props as any)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

