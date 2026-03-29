import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 20,
    opacity: Math.random() * 0.4 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent-light"
          style={{
            left: `${p.x}%`,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            opacity: 0,
            animation: `float-particle ${p.duration}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  )
}

function AuroraBeams({ isLight }: { isLight: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora blob 1 - cyan */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          opacity: isLight ? 0.18 : 0.07,
          background: 'radial-gradient(circle, #0891b2, transparent 70%)',
          animation: 'aurora-shift 20s ease-in-out infinite',
        }}
      />
      {/* Aurora blob 2 - indigo */}
      <div
        className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          opacity: isLight ? 0.13 : 0.05,
          background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          animation: 'aurora-shift-2 25s ease-in-out infinite',
        }}
      />
      {/* Aurora blob 3 - mixed */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          opacity: isLight ? 0.10 : 0.04,
          background: 'radial-gradient(circle, #0891b2, #6366f1 50%, transparent 70%)',
          animation: 'aurora-shift-3 18s ease-in-out infinite',
        }}
      />
    </div>
  )
}

function Beams() {
  const beams = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 15 + i * 14,
    width: Math.random() * 1 + 0.5,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.06 + 0.02,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beams.map((b) => (
        <div
          key={b.id}
          className="absolute h-[40vh]"
          style={{
            left: `${b.x}%`,
            top: 0,
            width: b.width,
            background: `linear-gradient(to bottom, transparent, rgba(8,145,178,${b.opacity}), transparent)`,
            animation: `beam-move ${b.duration}s ${b.delay}s infinite linear`,
          }}
        />
      ))}
    </div>
  )
}

export default function GridBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const theme = useTheme()
  const isLight = theme === 'light'

  const gridY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const auroraScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8])
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.6, 0.8, 0.4])

  const gridLine = isLight ? 'rgba(0,30,60,0.07)' : 'rgba(255,255,255,0.1)'
  const dotColor = isLight ? 'rgba(0,30,60,0.10)' : 'rgba(255,255,255,0.3)'
  const vignetteColor = isLight ? '#8b9db0' : '#09090b'

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated grid pattern with scroll parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: gridY,
          backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px),
                            linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Dot grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Aurora beams with scroll scale */}
      <motion.div style={{ scale: auroraScale, opacity: auroraOpacity }}>
        <AuroraBeams isLight={isLight} />
      </motion.div>

      {/* Vertical light beams */}
      <Beams />

      {/* Floating particles */}
      <Particles />

      {/* Vignette overlay — matches bg color so edges blend naturally */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, ${vignetteColor} 100%)`,
        }}
      />
    </div>
  )
}
