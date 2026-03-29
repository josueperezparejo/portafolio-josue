import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'
import GlowCard from './GlowCard'
import TextReveal from './TextReveal'
import { useLang } from '../context/LangContext'

export default function TechStack() {
  const { t } = useLang()
  const [active, setActive] = useState(0)

  return (
    <AnimatedSection id="stack" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-3"
          >
            {t.techstack.label}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <TextReveal text={t.techstack.h1} />
            {' '}
            <span className="bg-linear-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              <TextReveal text={t.techstack.h2} delay={0.2} />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-text-muted max-w-xl mx-auto"
          >
            {t.techstack.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {t.techstack.categories.map((cat, i) => (
            <motion.button
              key={cat.name} onClick={() => setActive(i)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                active === i
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'text-text-muted hover:text-text bg-bg-card/50 hover:bg-bg-card border border-border'
              }`}
            >
              {cat.name}
              {active === i && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-accent rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="min-h-75">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            >
              {t.techstack.categories[active].items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <GlowCard className="h-full">
                    <div className="p-4">
                      <h4 className="font-medium text-text text-sm">{item.name}</h4>
                      <p className="text-xs text-text-muted mt-1">{item.detail}</p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AnimatedSection>
  )
}
