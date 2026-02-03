'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { translations, type Locale, type TranslationKeys } from './translations'

interface I18nContextValue {
  locale: Locale
  t: TranslationKeys
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

const LOCALE_STORAGE_KEY = 'passpart-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'pt')) {
      setLocaleState(savedLocale)
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('pt')) {
        setLocaleState('pt')
      }
    }
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
  }, [])

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'en' ? 'pt' : 'en'
    setLocale(newLocale)
  }, [locale, setLocale])

  const t = translations[locale]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: 'en', t: translations.en, setLocale, toggleLocale }}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// Shorthand hook for just translations
export function useTranslations() {
  const { t } = useI18n()
  return t
}
