import { lazy, Suspense, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import SectionDivider from './components/SectionDivider'
import TechStack from './components/TechStack'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Connect from './components/Connect'
import Footer from './components/Footer'
import FloatingSoundToggle from './components/FloatingSoundToggle'
import LoadingScreen, { type UserSettings } from './components/LoadingScreen'
import { LangProvider } from './context/LangContext'
import type { Lang } from './i18n/translations'

const ThreeBackground = lazy(() => import('./components/ThreeBackground'))

export default function App() {
  const [screenDone, setScreenDone] = useState(false)
  const [initialLang] = useState<Lang>(
    () => (localStorage.getItem('halcon-lang') as Lang | null) ?? 'es'
  )

  const handleComplete = useCallback((s: UserSettings) => {
    localStorage.setItem('halcon-lang', s.lang)
    localStorage.setItem('halcon-sound', s.soundEnabled ? '1' : '0')
    setScreenDone(true)
  }, [])

  return (
    <LangProvider initialLang={initialLang}>
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <ScrollProgress />
      <Navbar portfolioReady={screenDone} />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Connect />
      </main>
      <Footer />
      <FloatingSoundToggle visible={screenDone} />

      <AnimatePresence>
        {!screenDone && (
          <LoadingScreen key="loader" onComplete={handleComplete} />
        )}
      </AnimatePresence>
    </LangProvider>
  )
}
