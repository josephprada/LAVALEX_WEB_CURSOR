import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../../constants'
import styles from './WhatsAppButton.module.css'

export const WhatsAppButton = () => {
  const handleClick = () => {
    const message = encodeURIComponent(WHATSAPP_MESSAGE)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <motion.button
      className={styles.button}
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className={styles.icon}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <FaWhatsapp />
      </motion.div>
      <motion.div
        className={styles.pulse}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  )
}

