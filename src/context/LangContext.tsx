import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { translations, type Lang, type Translations } from '../i18n/translations'

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ initialLang, children }: { initialLang?: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (initialLang) return initialLang
    const stored = localStorage.getItem('halcon-lang')
    return stored === 'en' || stored === 'es' ? stored : 'es'
  })

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('halcon-lang', l)
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
