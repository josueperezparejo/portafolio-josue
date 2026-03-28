import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../hooks/useScrollReveal'
import { Code2, Cloud, Brain, Users, Shield, Zap } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Developer',
    desc: 'From UI to backend APIs and cloud deployments — end to end experience',
  },
  {
    icon: Cloud,
    title: 'Cloud — AWS',
    desc: 'EC2, S3, IAM, RDS, Lambda, Serverless, CI/CD pipelines',
  },
  {
    icon: Brain,
    title: 'AI & System Design',
    desc: 'Clean architecture, scalable and cost-efficient solutions',
  },
  {
    icon: Users,
    title: 'Team Leadership',
    desc: 'Cross-functional collaboration, writing clean and maintainable code',
  },
  {
    icon: Shield,
    title: 'Quality First',
    desc: 'SOLID, DRY, unit testing with Jest, Cypress, Playwright',
  },
  {
    icon: Zap,
    title: 'Innovation',
    desc: 'Shipping features that improve performance, reliability, and UX',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            About me
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            A bit more about{' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              who I am
            </span>
          </motion.h2>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto mb-16 space-y-6"
        >
          <motion.p variants={fadeInUp} className="text-text-muted text-base sm:text-lg leading-relaxed">
            Full-Stack Software Engineer with experience building and delivering web applications end to end,
            from UI development to backend APIs and cloud deployments. I've worked with React/Next.js and
            TypeScript on the front end, and Node.js/Express with PostgreSQL/SQL (as well as GraphQL and
            WebSockets when needed) on the back end.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-text-muted text-base sm:text-lg leading-relaxed">
            I also focus on AWS cloud solutions, designing scalable, secure, and cost-efficient architectures.
            I enjoy collaborating with cross-functional teams, writing clean and maintainable code, and shipping
            features that improve performance, reliability, and the user experience.
          </motion.p>
        </motion.div>

        {/* Quote card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative p-8 rounded-2xl border border-border bg-bg-card/50 backdrop-blur-sm">
            <div className="absolute top-4 left-6 text-5xl text-accent/20 font-serif">"</div>
            <p className="text-text-muted text-base sm:text-lg leading-relaxed italic pl-6">
              I pay attention to the small details — the ones most people skip over.
              I believe that's where the real quality lives, whether it's in code,
              communication, or how you treat the people you work with.
            </p>
          </div>
        </motion.div>

        {/* Highlights grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              custom={i}
              className="group relative p-6 rounded-2xl border border-border bg-bg-card/30 backdrop-blur-sm hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
