import { useState, useEffect } from 'react'

export type Theme = 'dark' | 'light'

/** Reads the current data-theme attribute from <html> and re-renders on change. */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark'
    return (document.documentElement.getAttribute('data-theme') as Theme) || 'dark'
  })

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute('data-theme') as Theme
      setTheme(t || 'dark')
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return theme
}
