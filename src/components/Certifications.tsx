import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn } from '../hooks/useScrollReveal'
import { Award, Cloud, Code2, Server, Smartphone, MonitorPlay, Layers } from 'lucide-react'

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
    <section id="certifications" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            Certifications & Skills
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Always{' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              learning
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.h3
              variants={fadeInUp}
              className="text-lg font-semibold text-text mb-6 flex items-center gap-2"
            >
              <Award size={20} className="text-accent" />
              Certifications & Training
            </motion.h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  variants={fadeInUp}
                  custom={i}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-bg-card/30 hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors mt-0.5">
                    <cert.icon size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-text-muted group-hover:text-text transition-colors font-medium">
                        {cert.name}
                      </span>
                      {cert.inProgress && (
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-accent/15 text-accent-light border border-accent/20 font-medium uppercase tracking-wider">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted/60 mt-0.5">{cert.source}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.h3
              variants={fadeInUp}
              className="text-lg font-semibold text-text mb-6 flex items-center gap-2"
            >
              <Code2 size={20} className="text-accent" />
              Key Skills
            </motion.h3>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  variants={scaleIn}
                  custom={i}
                  className="px-3 py-1.5 text-sm rounded-lg bg-bg-card/50 border border-border text-text-muted hover:text-text hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
