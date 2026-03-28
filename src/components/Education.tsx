import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../hooks/useScrollReveal'
import { GraduationCap } from 'lucide-react'

const education = [
  {
    degree: 'Audiovisual Communication',
    institution: 'Universidad Autonoma del Caribe',
    year: '2022',
    field: 'Comunicador Audiovisual',
  },
  {
    degree: 'Multimedia Production Technologist',
    institution: 'Servicio Nacional de Aprendizaje SENA',
    year: '2021',
    field: 'Produccion de Multimedia — Comunicacion audiovisual',
  },
  {
    degree: 'Computer Equipment Maintenance Technician',
    institution: 'Servicio Nacional de Aprendizaje SENA',
    year: '2014',
    field: 'Tecnico en Mantenimiento de Equipos de Computos',
  },
]

export default function Education() {
  return (
    <section id="education" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            Education
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Professional{' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              studies
            </span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution + edu.degree}
              variants={fadeInUp}
              custom={i}
              className="group relative p-6 rounded-2xl border border-border bg-bg-card/30 backdrop-blur-sm hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <GraduationCap size={20} className="text-accent" />
                  </div>
                  <span className="text-xs text-text-muted font-mono bg-bg-card px-2 py-1 rounded-md">{edu.year}</span>
                </div>
                <h3 className="font-semibold text-text mb-1 text-sm leading-snug">{edu.degree}</h3>
                <p className="text-sm text-accent font-medium mb-1">{edu.institution}</p>
                <p className="text-xs text-text-muted">{edu.field}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
