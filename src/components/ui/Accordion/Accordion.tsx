import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`answer-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={styles.answerWrapper}
                >
                  <div className={styles.answer}>{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

