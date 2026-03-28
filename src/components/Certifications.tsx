import { motion } from 'framer-motion'
import { scaleIn } from '../hooks/useScrollReveal'
import { Award, Cloud, Code2, Server, Smartphone, MonitorPlay, Layers } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import GlowCard from './GlowCard'
import TextReveal from './TextReveal'

type Cert = {
  name: string
  source: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  inProgress?: boolean
}

const certifications: Cert[] = [
  { name: 'AWS Certified Cloud Practitioner', source: 'AWS Skill Builder', icon: Cloud, inProgress: true },
  { name: 'Cloud Practitioner Essentials', source: 'AWS Skill Builder', icon: Cloud },
  { name: 'Cloud Quest: Cloud Practitioner', source: 'AWS Skill Builder', icon: Cloud },
  { name: 'Claude Code in Action', source: 'Anthropic', icon: MonitorPlay },
  { name: 'Backend: Node.js, SQL/PostgreSQL, PHP & MySQL', source: 'Udemy', icon: Server },
  { name: 'Frontend: JavaScript (ES7+), React (Hooks/MERN), Next.js, React Testing', source: 'Udemy', icon: Layers },
  { name: 'Mobile: React Native (iOS/Android)', source: 'Udemy', icon: Smartphone },
]

const skills = [
  'Amazon Web Services (AWS)',
  'TypeScript',
  'NestJS',
  'Next.js',
  'React / React Native',
  'Node.js / Express',
  'GraphQL',
  'WebSockets',
  'PostgreSQL / SQL',
  'DynamoDB / NoSQL',
  'Docker',
  'Serverless',
  'CI/CD Pipelines',
  'Git / GitHub',
  'Tailwind CSS',
  'Jest / Cypress / Playwright',
  'Artificial Intelligence',
  'Team Leadership',
]

export default function Certifications() {
  return (
    <AnimatedSection id="certifications" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-3"
          >
            Certifications & Skills
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <TextReveal text="Always" />
            {' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              <TextReveal text="learning" delay={0.15} />
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold text-text mb-6 flex items-center gap-2"
            >
              <Award size={20} className="text-accent" />
              Certifications & Training
            </motion.h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <GlowCard>
                    <div className="flex items-start gap-4 p-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <cert.icon size={18} className="text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-text-muted font-medium">
                            {cert.name}
                          </span>
                          {cert.inProgress && (
                            <motion.span
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5, type: 'spring' }}
                              className="px-2 py-0.5 text-[10px] rounded-full bg-accent/15 text-accent-light border border-accent/20 font-medium uppercase tracking-wider"
                            >
                              In Progress
                            </motion.span>
                          )}
                        </div>
                        <p className="text-xs text-text-muted/60 mt-0.5">{cert.source}</p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold text-text mb-6 flex items-center gap-2"
            >
              <Code2 size={20} className="text-accent" />
              Key Skills
            </motion.h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-sm rounded-lg bg-bg-card/50 border border-border text-text-muted hover:text-text hover:border-accent/30 hover:bg-accent/5 transition-colors duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
