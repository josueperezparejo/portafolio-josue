import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.footer
      ref={ref}
      style={{ y, opacity }}
      className="py-8 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-text font-medium">Josue Perez</span>. Bogota, Colombia
        </p>
        <p className="text-text-muted/60">
          Built with React + Vite + Framer Motion
        </p>
      </div>
    </motion.footer>
  )
}
