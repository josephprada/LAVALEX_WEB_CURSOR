export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'textarea'
  label?: string
  placeholder?: string
  value?: string
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  className?: string
  name?: string
}

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined'
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
}

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'secondary'
}

