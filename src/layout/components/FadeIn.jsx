import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{ ...fadeInUp.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
