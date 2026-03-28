import { motion } from 'framer-motion'
import { staggerContainer } from '../hooks/useScrollReveal'
import { Code2, Cloud, Brain, Users, Shield, Zap } from 'lucide-react'
import AnimatedSection from './AnimatedSection'
import GlowCard from './GlowCard'
import TextReveal from './TextReveal'

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
    <AnimatedSection id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-3"
          >
            About me
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <TextReveal text="A bit more about" />
            {' '}
            <span className="bg-gradient-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              <TextReveal text="who I am" delay={0.3} />
            </span>
          </h2>
        </div>

        {/* Bio text */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-text-muted text-base sm:text-lg leading-relaxed"
          >
            Full-Stack Software Engineer with experience building and delivering web applications end to end,
            from UI development to backend APIs and cloud deployments. I've worked with React/Next.js and
            TypeScript on the front end, and Node.js/Express with PostgreSQL/SQL (as well as GraphQL and
            WebSockets when needed) on the back end.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-text-muted text-base sm:text-lg leading-relaxed"
          >
            I also focus on AWS cloud solutions, designing scalable, secure, and cost-efficient architectures.
            I enjoy collaborating with cross-functional teams, writing clean and maintainable code, and shipping
            features that improve performance, reliability, and the user experience.
          </motion.p>
        </div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <GlowCard className="p-0">
            <div className="relative p-8">
              <div className="absolute top-4 left-6 text-5xl text-accent/20 font-serif">"</div>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed italic pl-6">
                I pay attention to the small details — the ones most people skip over.
                I believe that's where the real quality lives, whether it's in code,
                communication, or how you treat the people you work with.
              </p>
            </div>
          </GlowCard>
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
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <GlowCard className="h-full">
                <div className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
