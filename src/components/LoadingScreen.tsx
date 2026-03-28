import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FalconMark } from './FalconLogo'

// ---------------------------------------------------------------------------
// Types & translations
// ---------------------------------------------------------------------------
export type UserSettings = { lang: 'es' | 'en'; theme: 'dark' | 'light' }

const T = {
  es: {
    langLabel: 'IDIOMA',
    themeLabel: 'MODO',
    es: 'ESPAÑOL', en: 'INGLÉS',
    dark: 'OSCURO', light: 'CLARO',
    launch: 'INICIAR',
    hint: '← → CAMBIAR   ↑ ↓ NAVEGAR   ↵ CONFIRMAR',
    skip: 'CLICK PARA OMITIR',
  },
  en: {
    langLabel: 'LANGUAGE',
    themeLabel: 'THEME',
    es: 'SPANISH', en: 'ENGLISH',
    dark: 'DARK', light: 'LIGHT',
    launch: 'LAUNCH',
    hint: '← → CHANGE   ↑ ↓ NAVIGATE   ↵ CONFIRM',
    skip: 'CLICK TO SKIP',
  },
}

// ---------------------------------------------------------------------------
// Boot sequence lines (short — 1.3 s total before selection appears)
// ---------------------------------------------------------------------------
const BOOT_LINES = [
  'CLOUD SOLUTIONS ARCHITECT   [OK]',
  'FULLSTACK DEVELOPER         [OK]',
  'AWS CERTIFIED               [OK]',
  'BOGOTÁ, COLOMBIA            [OK]',
]

// ---------------------------------------------------------------------------
// Scanlines overlay
// ---------------------------------------------------------------------------
const scanlineStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
  backgroundImage:
    'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)',
}

// ---------------------------------------------------------------------------
// Option row — two choices, selection cursor ►
// ---------------------------------------------------------------------------
function OptionRow<T extends string>({
  label, options, value, focused, onChange,
}: {
  label: string
  options: { key: T; label: string }[]
  value: T
  focused: boolean
  onChange: (v: T) => void
}) {
  const cyan = '#22d3ee'
  const dim = 'rgba(34,211,238,0.35)'
  const dimText = 'rgba(34,211,238,0.22)'

  return (
    <div style={{ marginBottom: 22 }}>
      {/* Row label */}
      <div style={{
        fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.3em',
        color: focused ? 'rgba(34,211,238,0.6)' : 'rgba(34,211,238,0.28)',
        marginBottom: 10,
        transition: 'color 0.2s',
      }}>
        {label}
      </div>

      {/* Separator */}
      <div style={{
        height: 1,
        background: focused
          ? 'linear-gradient(90deg, rgba(34,211,238,0.4), transparent)'
          : 'linear-gradient(90deg, rgba(34,211,238,0.1), transparent)',
        marginBottom: 12,
        transition: 'background 0.2s',
      }} />

      {/* Options */}
      <div style={{ display: 'flex', gap: 32 }}>
        {options.map(opt => {
          const selected = opt.key === value
          return (
            <motion.button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.15em',
                display: 'flex', alignItems: 'center', gap: 8,
                color: selected ? cyan : dim,
                textShadow: selected && focused
                  ? `0 0 12px ${cyan}, 0 0 24px rgba(34,211,238,0.4)`
                  : 'none',
                transition: 'color 0.15s, text-shadow 0.15s',
                padding: '4px 0',
              }}
            >
              <motion.span
                animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : -4 }}
                transition={{ duration: 0.15 }}
                style={{ color: focused ? cyan : dimText, width: 14, display: 'inline-block' }}
              >►</motion.span>
              <span style={{ fontWeight: selected ? 700 : 400 }}>{opt.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Boot screen content
// ---------------------------------------------------------------------------
function BootScreen({ lang }: { lang: 'es' | 'en' }) {
  const t = T[lang]
  return (
    <motion.div
      key="boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16, filter: 'blur(6px)', transition: { duration: 0.35 } }}
      style={{ width: 340 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <FalconMark size={52} variant="gradient" />
        </div>
        <div style={{
          fontFamily: 'monospace', fontSize: 20, fontWeight: 700,
          letterSpacing: '0.4em', color: '#22d3ee',
          textShadow: '0 0 18px rgba(34,211,238,0.55), 1px 0 rgba(99,102,241,0.6), -1px 0 rgba(34,211,238,0.35)',
        }}>
          HALCON OS
        </div>
        <div style={{
          fontFamily: 'monospace', fontSize: 10,
          color: 'rgba(34,211,238,0.38)', letterSpacing: '0.25em', marginTop: 4,
        }}>
          v2.0.26 — JOSUE PEREZ
        </div>
        <div style={{
          height: 1, marginTop: 16,
          background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.35),transparent)',
        }} />
      </div>

      {/* Boot lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {BOOT_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.22 + 0.05, duration: 0.15 }}
            style={{
              fontFamily: 'monospace', fontSize: 12,
              color: 'rgba(34,211,238,0.52)', letterSpacing: '0.04em',
            }}
          >
            <span style={{ color: 'rgba(34,211,238,0.35)' }}>▸ </span>{line}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          fontFamily: 'monospace', fontSize: 9, textAlign: 'center',
          color: 'rgba(34,211,238,0.3)', letterSpacing: '0.2em', marginTop: 36,
        }}
      >
        {t.skip}
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Selection screen content
// ---------------------------------------------------------------------------
type FocusGroup = 'lang' | 'theme' | 'launch'

function SelectScreen({
  lang, setLang, theme, setTheme, focused, setFocused, onLaunch,
}: {
  lang: 'es' | 'en'; setLang: (v: 'es' | 'en') => void
  theme: 'dark' | 'light'; setTheme: (v: 'dark' | 'light') => void
  focused: FocusGroup; setFocused: (g: FocusGroup) => void
  onLaunch: () => void
}) {
  const t = T[lang]
  const cyan = '#22d3ee'

  return (
    <motion.div
      key="select"
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.35 } }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 340 }}
    >
      {/* Mini logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
        <FalconMark size={28} variant="gradient" />
        <div style={{
          fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
          letterSpacing: '0.35em', color: cyan,
          textShadow: '0 0 12px rgba(34,211,238,0.4)',
        }}>
          HALCON OS
        </div>
      </div>

      {/* Language row */}
      <div onClick={() => setFocused('lang')}>
        <OptionRow
          label={t.langLabel}
          options={[{ key: 'es' as const, label: t.es }, { key: 'en' as const, label: t.en }]}
          value={lang}
          focused={focused === 'lang'}
          onChange={setLang}
        />
      </div>

      {/* Theme row */}
      <div onClick={() => setFocused('theme')} style={{ marginTop: 4 }}>
        <OptionRow
          label={t.themeLabel}
          options={[{ key: 'dark' as const, label: t.dark }, { key: 'light' as const, label: t.light }]}
          value={theme}
          focused={focused === 'theme'}
          onChange={setTheme}
        />
      </div>

      {/* Divider */}
      <div style={{
        height: 1, margin: '20px 0',
        background: 'linear-gradient(90deg,transparent,rgba(34,211,238,0.2),transparent)',
      }} />

      {/* Launch button */}
      <motion.button
        onClick={onLaunch}
        onMouseEnter={() => setFocused('launch')}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: '100%', padding: '12px 0', border: 'none', cursor: 'pointer',
          fontFamily: 'monospace', fontSize: 14, fontWeight: 700,
          letterSpacing: '0.35em', borderRadius: 2,
          background: focused === 'launch'
            ? 'linear-gradient(90deg, rgba(8,145,178,0.18), rgba(99,102,241,0.18))'
            : 'rgba(34,211,238,0.05)',
          color: focused === 'launch' ? cyan : 'rgba(34,211,238,0.5)',
          boxShadow: focused === 'launch'
            ? '0 0 20px rgba(34,211,238,0.15), inset 0 0 20px rgba(34,211,238,0.04)'
            : 'none',
          outline: `1px solid ${focused === 'launch' ? 'rgba(34,211,238,0.35)' : 'rgba(34,211,238,0.1)'}`,
          transition: 'all 0.2s',
        }}
      >
        [ {t.launch} ]
      </motion.button>

      {/* Keyboard hint */}
      <div style={{
        marginTop: 20, fontFamily: 'monospace', fontSize: 9,
        color: 'rgba(34,211,238,0.25)', textAlign: 'center', letterSpacing: '0.1em',
      }}>
        {t.hint}
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
type Phase = 'booting' | 'select' | 'exit'

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: (s: UserSettings) => void
}) {
  const [phase, setPhase] = useState<Phase>('booting')
  const [lang, setLangState] = useState<'es' | 'en'>('es')
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark')
  const [focused, setFocused] = useState<FocusGroup>('lang')

  // Apply theme preview immediately as user toggles
  const setTheme = useCallback((v: 'dark' | 'light') => {
    setThemeState(v)
    document.documentElement.setAttribute('data-theme', v)
  }, [])

  const setLang = useCallback((v: 'es' | 'en') => {
    setLangState(v)
  }, [])

  // Boot sequence → selection screen
  useEffect(() => {
    const t = setTimeout(() => setPhase('select'), 1400)
    return () => clearTimeout(t)
  }, [])

  const handleLaunch = useCallback(() => {
    setPhase('exit')
    setTimeout(() => onComplete({ lang, theme }), 650)
  }, [lang, theme, onComplete])

  // Keyboard navigation (only active during select phase)
  useEffect(() => {
    if (phase !== 'select') return
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'Tab':
          e.preventDefault()
          setFocused(f => f === 'lang' ? 'theme' : f === 'theme' ? 'launch' : 'lang')
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocused(f => f === 'lang' ? 'launch' : f === 'theme' ? 'lang' : 'theme')
          break
        case 'ArrowLeft':
          if (focused === 'lang') setLang('es')
          if (focused === 'theme') setTheme('dark')
          break
        case 'ArrowRight':
          if (focused === 'lang') setLang('en')
          if (focused === 'theme') setTheme('light')
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focused === 'launch') { handleLaunch(); break }
          if (focused === 'lang') setLang(lang === 'es' ? 'en' : 'es')
          if (focused === 'theme') setTheme(theme === 'dark' ? 'light' : 'dark')
          setFocused(f => f === 'lang' ? 'theme' : f === 'theme' ? 'launch' : 'lang')
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, focused, lang, theme, handleLaunch, setLang, setTheme])

  // Click anywhere to skip during boot
  const skipBoot = () => {
    if (phase === 'booting') setPhase('select')
  }

  if (phase === 'exit') return null

  return (
    <motion.div
      key="loading-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0, scale: 1.05, filter: 'blur(14px)',
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
      }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={scanlineStyle} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }} onClick={phase === 'booting' ? skipBoot : undefined}>
        <AnimatePresence mode="wait">
          {phase === 'booting' && <BootScreen lang={lang} />}
          {phase === 'select' && (
            <SelectScreen
              lang={lang} setLang={setLang}
              theme={theme} setTheme={setTheme}
              focused={focused} setFocused={setFocused}
              onLaunch={handleLaunch}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
