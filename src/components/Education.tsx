import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import GlowCard from './GlowCard'
import TextReveal from './TextReveal'

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
    <AnimatedSection id="education" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-3"
          >
            Education
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <TextReveal text="Professional" />
            {' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              <TextReveal text="studies" delay={0.15} />
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution + edu.degree}
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlowCard className="h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.3, type: 'spring', stiffness: 200 }}
                      className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"
                    >
                      <GraduationCap size={20} className="text-accent" />
                    </motion.div>
                    <span className="text-xs text-text-muted font-mono bg-bg-card px-2 py-1 rounded-md">{edu.year}</span>
                  </div>
                  <h3 className="font-semibold text-text mb-1 text-sm leading-snug">{edu.degree}</h3>
                  <p className="text-sm text-accent font-medium mb-1">{edu.institution}</p>
                  <p className="text-xs text-text-muted">{edu.field}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
