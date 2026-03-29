import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function SectionDivider() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="relative flex items-center justify-center px-6 py-4">
      <motion.div
        style={{ scaleX, opacity }}
        className="w-full max-w-6xl h-px origin-center"
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </motion.div>
      {/* Center dot */}
      <motion.div
        style={{ opacity, scale: scaleX }}
        className="absolute w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(8,145,178,0.5)]"
      />
    </div>
  )
}
