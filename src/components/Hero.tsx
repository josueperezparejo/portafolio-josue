import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Cloud, Lightbulb, Code2 } from 'lucide-react'

const roles = [
  'Full-Stack Developer',
  'Cloud Developer (AWS)',
  'Problem Solver',
  'Passionate About Tech & Innovation',
  'NestJS · TypeScript · Next.js',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      const speed = isDeleting ? 30 : 60
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              background: `radial-gradient(circle, ${i === 0 ? 'rgba(8,145,178,0.08)' : i === 1 ? 'rgba(99,102,241,0.06)' : 'rgba(8,145,178,0.04)'}, transparent 70%)`,
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {/* Badge */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border bg-bg-card/50 backdrop-blur-sm text-sm text-text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Open to collaborate
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-accent via-accent-light to-gradient-end bg-clip-text text-transparent">
            Josue Perez
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-4 text-lg sm:text-xl text-text-muted font-medium"
        >
          Full-Stack Developer | Cloud Developer (AWS)
        </motion.p>

        {/* Typing animation */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-4 h-8 flex items-center justify-center"
        >
          <span className="text-base sm:text-lg text-accent-light font-mono">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-0.5 h-5 bg-accent ml-0.5 align-middle"
            />
          </span>
        </motion.div>

        {/* Location + tags */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-text-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-accent" />
            Bogota, Colombia
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Cloud size={14} className="text-accent" />
            AWS Cloud
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Code2 size={14} className="text-accent" />
            Full-Stack
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb size={14} className="text-accent" />
            Innovation
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-8 text-text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
        >
          Full-Stack Software Engineer with experience building and delivering web applications end to end,
          from UI development to backend APIs and cloud deployments. I design scalable, secure, and cost-efficient architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#experience"
            className="group relative px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-white font-medium rounded-xl overflow-hidden transition-shadow hover:shadow-lg hover:shadow-accent/25"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">View my experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
          <motion.a
            href="#connect"
            className="px-6 py-3 border border-border text-text-muted hover:text-text hover:border-border-hover font-medium rounded-xl transition-all hover:bg-bg-card"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-muted/40"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
