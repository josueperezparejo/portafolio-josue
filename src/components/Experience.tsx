import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../hooks/useScrollReveal'
import { Briefcase } from 'lucide-react'

type Job = {
  title: string
  company: string
  period: string
  location: string
  description: string
  tags: string[]
}

const jobs: Job[] = [
  {
    title: 'Freelance Fullstack Developer',
    company: 'Freelance',
    period: 'May 2025 — Present',
    location: 'Colombia',
    description:
      'Working independently building web applications from front to back. Collaborating with clients to deliver scalable, responsive, and efficient solutions using modern technologies such as NestJS and Next.js.',
    tags: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'Frontend Developer',
    company: 'MUTA',
    period: 'Sep 2024 — May 2025',
    location: 'Colombia',
    description:
      'Part of a team transforming businesses toward a circular economy in the recycling industry. Built modern, scalable, high-performance interfaces. Translated Figma designs into functional interfaces with focus on Screaming Architecture, SOLID, DRY, and unit testing with Jest.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Jest', 'Framer Motion'],
  },
  {
    title: 'Backend Developer',
    company: 'Horus Smart Energy',
    period: 'Jan 2024 — Sep 2024',
    location: 'Barranquilla, Colombia',
    description:
      'Built and maintained robust backend systems for an IoT and energy efficiency company. Developed efficient APIs and optimized databases. Collaborated with multidisciplinary teams to integrate services driving innovation and energy savings.',
    tags: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Docker', 'TypeScript'],
  },
  {
    title: 'Frontend Developer',
    company: 'Vini',
    period: 'Jul 2023 — Dec 2023',
    location: 'Barranquilla, Colombia',
    description:
      'Contributed to a wine-focused e-commerce platform connecting enthusiasts with their perfect choice. Ensured every UX/UI aspect was thoughtfully designed, balancing functionality and aesthetics.',
    tags: ['React', 'UX/UI', 'E-commerce', 'Figma'],
  },
  {
    title: 'Multimedia Frontend Developer',
    company: 'Teleperformance',
    period: 'Jan 2023 — Jul 2023',
    location: 'Bogota, Colombia',
    description:
      'Worked on ongoing projects providing support and maintenance to enhance functionality and design during internship. This experience inspired continued growth and pursuit of new opportunities.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Multimedia'],
  },
  {
    title: 'Frontend Developer',
    company: 'Nexus-IT.co (Genomax)',
    period: 'Feb 2023 — Jun 2023',
    location: 'Barranquilla, Colombia',
    description:
      'Transformed creative concepts into engaging user interfaces. Focused on optimizing performance, usability, and cross-platform adaptability for seamless user experiences.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Performance'],
  },
  {
    title: 'Aeronautical Firefighter — Military Service',
    company: 'Colombian Air Force (CACOM 3)',
    period: 'Apr 2017 — Apr 2018',
    location: 'Colombia',
    description:
      'Served as an aeronautical firefighter. Responsibilities included flight assistance, ground movement coordination, fuel supply operations, and emergency response. Also supported operations at Ernesto Cortissoz International Airport.',
    tags: ['Leadership', 'Pressure', 'Operations', 'Safety'],
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
            className="space-y-8"
          >
            {jobs.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                variants={fadeInUp}
                custom={i}
                className="group relative flex gap-6"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-col items-center pt-1.5">
                  <div className="relative z-10 w-10 h-10 rounded-full border-2 border-border bg-bg flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                    <Briefcase size={16} className="text-text-muted group-hover:text-accent transition-colors duration-300" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 group relative p-6 rounded-2xl border border-border bg-bg-card/30 backdrop-blur-sm hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="font-semibold text-text text-lg">{job.title}</h3>
                        <p className="text-accent text-sm font-medium">{job.company}</p>
                      </div>
                      <div className="text-xs text-text-muted sm:text-right shrink-0">
                        <p>{job.period}</p>
                        <p>{job.location}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                      {job.description}
                    </p>

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
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
