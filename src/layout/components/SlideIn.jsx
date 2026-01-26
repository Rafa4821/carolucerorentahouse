import { motion } from 'framer-motion'

function SlideIn({ children, direction = 'left', delay = 0, className = '' }) {
  const variants = {
    left: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 }
    },
    right: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 }
    }
  }

  const selectedVariant = variants[direction]

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      transition={{ duration: 0.35, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default SlideIn
