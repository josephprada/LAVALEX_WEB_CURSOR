import { useState } from 'react'
import AnimatedContent from 'react-bits/src/content/Animations/AnimatedContent/AnimatedContent'
import styles from './Accordion.module.css'
import { AccordionProps } from '../../../types'

export const Accordion = ({ items, className = '' }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item, index) => {
        const isOpen = openId === item.id

        return (
          <AnimatedContent key={item.id} delay={0.1 * (index + 1)} direction="vertical" distance={30}>
            <div className={styles.item}>
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
          </AnimatedContent>
        )
      })}
    </div>
  )
}

