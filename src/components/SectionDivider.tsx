import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center px-6">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </div>
  )
}
