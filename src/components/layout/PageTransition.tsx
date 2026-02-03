'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

type TransitionVariant = 'fade' | 'slideUp' | 'slideLeft'

interface PageTransitionProps {
  children: ReactNode
  variant?: TransitionVariant
  className?: string
}

const variants: Record<TransitionVariant, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
}

export function PageTransition({
  children,
  variant = 'fade',
  className,
}: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
