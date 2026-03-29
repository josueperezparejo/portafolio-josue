import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Languages } from 'lucide-react'
import FalconLogo from './FalconLogo'
import { useLang } from '../context/LangContext'

type Theme = 'dark' | 'light'

export default function Navbar({ portfolioReady }: { portfolioReady: boolean }) {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme]           = useState<Theme>('dark')
  const { lang, setLang, t }        = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!portfolioReady) return
    const stored = localStorage.getItem('halcon-theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
  }, [portfolioReady])

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('halcon-theme', next)
      return next
    })
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'es' ? 'en' : 'es')
  }, [lang, setLang])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <FalconLogo size={26} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {t.nav.links.map(link => (
            <motion.a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-text-muted hover:text-text rounded-lg transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-4/5" />
            </motion.a>
          ))}

          <div className="ml-3 flex items-center gap-2">
            <motion.a
              href="#connect"
              className="px-4 py-2 text-sm font-medium bg-accent/10 text-accent-light border border-accent/20 rounded-lg hover:bg-accent/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nav.contact}
            </motion.a>

            {portfolioReady && (
              <>
                {/* Language toggle */}
                <motion.button
                  type="button"
                  onClick={toggleLang}
                  aria-label={`Switch to ${lang === 'es' ? 'English' : 'Español'}`}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-border text-text-muted hover:text-accent-light hover:bg-bg-card hover:border-accent/25 transition-all text-xs font-bold tracking-wider"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Languages size={14} strokeWidth={1.75} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                    >
                      {t.nav.toggleLang}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                {/* Theme toggle */}
                <motion.button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="p-2 rounded-lg border border-border text-text-muted hover:text-accent-light hover:bg-bg-card hover:border-accent/25 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Mobile right buttons */}
        <div className="md:hidden flex items-center gap-1">
          {portfolioReady && (
            <>
              <button
                type="button"
                onClick={toggleLang}
                className="px-2 py-2 rounded-lg text-text-muted hover:text-accent-light text-xs font-bold tracking-wider"
              >
                {t.nav.toggleLang}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 rounded-lg text-text-muted hover:text-accent-light"
              >
                {theme === 'dark' ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
              </button>
            </>
          )}
          <button
            className="text-text-muted hover:text-text p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {t.nav.links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm text-text-muted hover:text-text hover:bg-bg-card rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#connect"
                className="px-4 py-3 text-sm font-medium text-accent-light bg-accent/10 rounded-lg text-center"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav.contact}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
