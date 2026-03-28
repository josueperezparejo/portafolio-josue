import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../hooks/useScrollReveal'
import { Code2, Cloud, Brain, Users, Shield, Zap } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Fullstack Developer',
    desc: 'Front-end & Back-end experience across multiple companies and industries',
  },
  {
    icon: Cloud,
    title: 'Cloud — AWS',
    desc: 'EC2, Lambda, S3, RDS, IAM, API Gateway — actively certified',
  },
  {
    icon: Brain,
    title: 'AI & System Design',
    desc: 'Clean architecture, DDD patterns, AI-powered workflows',
  },
  {
    icon: Users,
    title: 'Team Leadership',
    desc: 'Committed, responsible, able to work under pressure without losing focus',
  },
  {
    icon: Shield,
    title: 'Quality First',
    desc: 'SOLID, DRY, unit testing, scalable architecture principles',
  },
  {
    icon: Zap,
    title: 'Innovation',
    desc: 'Passionate about creating impactful multimedia applications',
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
            I'm a technology enthusiast who specializes in building robust applications with simple yet effective solutions.
            I've worked as both a Front-end and Back-end Developer, giving me a comprehensive view of development.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-text-muted text-base sm:text-lg leading-relaxed">
            My passion lies in creating impactful multimedia applications, always prioritizing innovation and quality.
            I value continuous learning and teamwork collaboration.
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
