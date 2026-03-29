import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MapPin, Cloud, Code2, Lightbulb } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { FalconMark } from './FalconLogo'
import { useLang } from '../context/LangContext'


export default function Hero() {
  const { t, lang } = useLang()
  const [roleIndex, setRoleIndex]   = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const heroY        = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale    = useTransform(scrollYProgress, [0, 0.6], [1, 0.9])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // Reset typewriter when language changes
  useEffect(() => {
    const id = setTimeout(() => {
      setRoleIndex(0)
      setDisplayText('')
      setIsDeleting(false)
    }, 0)
    return () => clearTimeout(id)
  }, [lang])

  useEffect(() => {
    const currentRole = t.hero.roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex(prev => (prev + 1) % t.hero.roles.length)
      }, 0)
    } else {
      const speed = isDeleting ? 30 : 60
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1),
        )
      }, speed)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex, t.hero.roles])

  const nameText    = 'Josue Perez'
  const nameLetters = nameText.split('')

  const tagIcons = [MapPin, Cloud, Code2, Lightbulb]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Falcon watermark — very subtle */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{
          left: '85%', top: '85%', x: '-50%', y: '-50%',
          opacity: useTransform(scrollYProgress, [0, 0.5], [0.055, 0]),
          rotate:  useTransform(scrollYProgress, [0, 1], [0, 8]),
        }}
      >
        <FalconMark size={350} variant="white" />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 80, height: 200 + i * 80,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(8,145,178,0.06)' : 'rgba(99,102,241,0.04)'}, transparent 70%)`,
              left: `${10 + i * 18}%`, top: `${10 + i * 15}%`,
            }}
            animate={{ x: [0, 40*(i%2===0?1:-1), -30*(i%2===0?1:-1), 0], y: [0, -50*(i%2===0?1:-1), 30*(i%2===0?1:-1), 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
        >
          {/* Badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8 } } }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border bg-bg-card/50 backdrop-blur-sm text-sm text-text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            {t.hero.badge}
          </motion.div>

          {/* Name */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7 } } }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            {t.hero.greeting}{' '}
            <span className="inline-block">
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block bg-linear-to-r from-accent via-accent-light to-gradient-end bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 40, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7 } } }}
            className="mt-4 text-lg sm:text-xl text-text-muted font-medium"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Typewriter */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
            className="mt-4 h-8 flex items-center justify-center"
          >
            <span className="text-base sm:text-lg text-accent-light font-mono">
              {'> '}{displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-0.5 h-5 bg-accent ml-0.5 align-middle"
              />
            </span>
          </motion.div>

          {/* Tags */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-text-muted"
          >
            {t.hero.tags.map((label, i) => {
              const Icon = tagIcons[i]
              return (
                <motion.span
                  key={label}
                  className="inline-flex items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
                >
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-border mr-1.5" />}
                  <Icon size={14} className="text-accent" />
                  {label}
                </motion.span>
              )
            })}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, delay: 0.1 } } }}
            className="mt-8 text-text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
          >
            {t.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton
              href="#experience"
              className="group relative inline-flex px-6 py-3 bg-linear-to-r from-accent to-accent-dark text-white font-medium rounded-xl overflow-hidden transition-shadow hover:shadow-lg hover:shadow-accent/25"
            >
              <span className="relative z-10">{t.hero.cta1}</span>
              <div className="absolute inset-0 bg-linear-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
            <MagneticButton
              href="#connect"
              className="inline-flex px-6 py-3 border border-border text-text-muted hover:text-text hover:border-border-hover font-medium rounded-xl transition-all hover:bg-bg-card"
            >
              {t.hero.cta2}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-muted/40"
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
