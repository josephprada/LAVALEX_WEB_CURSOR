import { useState } from 'react'
import styles from './Accordion.module.css'
import { AccordionProps } from '../../../types'

export const Accordion = ({ items, className = '' }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <div key={item.id} className={styles.item}>
            <button
              className={`${styles.question} ${isOpen ? styles.open : ''}`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`answer-${item.id}`}
            >
              <span>{item.question}</span>
              <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div
                id={`answer-${item.id}`}
                className={styles.answerWrapper}
              >
                <div className={styles.answer}>{item.answer}</div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

