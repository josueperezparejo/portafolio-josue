import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <p>
          © {new Date().getFullYear()}{' '}
          <span className="text-text font-medium">Josue Perez</span>. Bogotá, Colombia 🇨🇴
        </p>
        <p className="text-text-muted/60">
          Built with React + Vite + Framer Motion
        </p>
      </div>
    </motion.footer>
  )
}
