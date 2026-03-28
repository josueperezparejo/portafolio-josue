import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../hooks/useScrollReveal'
import { Briefcase, Shield } from 'lucide-react'

type Job = {
  title: string
  company: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
  isMilitary?: boolean
}

const jobs: Job[] = [
  {
    title: 'Full-Stack Developer | Cloud Solutions Architect (AWS)',
    company: 'Terrawind Global Protection',
    period: '2025 — 2026',
    location: 'Colombia',
    bullets: [
      'Continued delivering scalable AWS cloud solutions and backend services for ongoing projects.',
      'Built and maintained APIs with Node.js, Express, and PostgreSQL, collaborating with cross-functional teams.',
      'Worked with partner companies, including Arkho (AWS Partner), collaborating on cloud solutions and API development.',
    ],
    tags: ['AWS', 'Node.js', 'Express', 'PostgreSQL', 'Cloud Architecture'],
  },
  {
    title: 'Full-Stack Developer | Cloud Solutions Architect (AWS)',
    company: 'Mainsoft',
    period: '2025 — 2026',
    location: 'Colombia',
    bullets: [
      'Worked as a consultant for Terrawind, delivering cloud-native AWS solutions for enterprise clients.',
      'Designed scalable and secure architectures aligned with business and operational requirements.',
      'Led end-to-end delivery (requirements, architecture, implementation), optimizing performance and cost.',
    ],
    tags: ['AWS', 'Cloud-Native', 'Architecture', 'Consulting', 'Enterprise'],
  },
  {
    title: 'Front-End Developer',
    company: 'MUTA',
    period: '2024 — 2025',
    location: 'Colombia',
    bullets: [
      'Built scalable and responsive user interfaces using Next.js, React, TypeScript, and Tailwind CSS, integrating APIs with React Query and managing state with Redux Toolkit.',
      'Translated Figma designs into clean, reusable components, improving maintainability by applying SOLID, DRY, and Clean Architecture principles, and adding unit tests with Jest.',
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Jest'],
  },
  {
    title: 'Back-End Developer',
    company: 'Horus Smart Energy',
    period: '2024',
    location: 'Barranquilla, Colombia',
    bullets: [
      'Developed and maintained REST and GraphQL APIs for an IoT platform using Node.js, Express, and PostgreSQL, implementing new features and enhancing business logic with a focus on performance and scalability.',
      'Worked with AWS services and backend best practices (clean code, testing, and monitoring) to ensure reliable production deployments and strong collaboration with front-end and product teams.',
    ],
    tags: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Docker', 'AWS', 'IoT'],
  },
  {
    title: 'Front-End Developer',
    company: 'Vini App S.A.S.',
    period: '2023',
    location: 'Barranquilla, Colombia',
    bullets: [
      'Implemented new features and pages based on Figma design specifications, ensuring responsive layouts and consistent UI behavior across devices.',
      'Managed tasks independently, from requirements through QA, delivering improvements efficiently with a proactive and autonomous approach.',
    ],
    tags: ['React', 'Figma', 'E-commerce', 'UX/UI', 'Responsive'],
  },
  {
    title: 'Front-End Developer',
    company: 'Genomax Nexus Information Technologies S.A.S.',
    period: '2022',
    location: 'Barranquilla, Colombia',
    bullets: [
      'Collaborated with a development team to build user interfaces using HTML, CSS, and JavaScript, transforming concepts into production-ready screens.',
      'Improved performance, usability, and cross-browser compatibility, contributing to a smoother and more maintainable front-end experience.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Performance', 'Cross-browser'],
  },
  {
    title: 'Aeronautical Firefighter — Military Service',
    company: 'Colombian Air Force (CACOM 3)',
    period: 'Apr 2017 — Apr 2018',
    location: 'Colombia',
    bullets: [
      'Served as an aeronautical firefighter. Responsibilities included flight assistance, ground coordination, fuel supply operations, and emergency response.',
      'Also supported operations at Ernesto Cortissoz International Airport in Barranquilla.',
    ],
    tags: ['Leadership', 'Pressure', 'Operations', 'Safety'],
    isMilitary: true,
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
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
            Experience
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Where I've{' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              worked
            </span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-border to-transparent hidden sm:block" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {jobs.map((job, i) => {
              const Icon = job.isMilitary ? Shield : Briefcase
              return (
                <motion.div
                  key={`${job.company}-${job.period}`}
                  variants={fadeInUp}
                  custom={i}
                  className="group relative flex gap-6"
                >
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center pt-1.5">
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-border bg-bg flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                      <Icon size={16} className="text-text-muted group-hover:text-accent transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 group relative p-6 rounded-2xl border border-border bg-bg-card/30 backdrop-blur-sm hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="font-semibold text-text text-base sm:text-lg leading-snug">{job.title}</h3>
                          <p className="text-accent text-sm font-medium">{job.company}</p>
                        </div>
                        <div className="text-xs text-text-muted sm:text-right shrink-0 mt-1 sm:mt-0">
                          <p className="font-medium">{job.period}</p>
                          <p>{job.location}</p>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2 mb-4">
                        {job.bullets.map((bullet, bi) => (
                          <li key={bi} className="text-sm text-text-muted leading-relaxed flex gap-2">
                            <span className="text-accent mt-1.5 shrink-0">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs rounded-md bg-accent/10 text-accent-light border border-accent/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
