'use client'

import { Globe } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils/cn'

interface LanguageSwitcherProps {
  variant?: 'button' | 'toggle' | 'minimal'
  className?: string
}

export function LanguageSwitcher({ variant = 'toggle', className }: LanguageSwitcherProps) {
  const { locale, toggleLocale } = useI18n()

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleLocale}
        className={cn(
          'p-2 rounded-lg hover:bg-background-secondary transition-colors',
          className
        )}
        aria-label={`Switch to ${locale === 'en' ? 'Portuguese' : 'English'}`}
      >
        <span className="text-sm font-medium text-foreground-secondary uppercase">
          {locale}
        </span>
      </button>
    )
  }

  if (variant === 'button') {
    return (
      <button
        onClick={toggleLocale}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary hover:bg-primary-100 transition-colors',
          className
        )}
        aria-label={`Switch to ${locale === 'en' ? 'Portuguese' : 'English'}`}
      >
        <Globe className="w-4 h-4 text-foreground-secondary" />
        <span className="text-sm font-medium text-foreground">
          {locale === 'en' ? 'English' : 'Português'}
        </span>
      </button>
    )
  }

  // Toggle variant (default)
  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'flex items-center gap-1 px-2 py-1 rounded-full bg-background-secondary hover:bg-primary-100 transition-colors',
        className
      )}
      aria-label={`Switch to ${locale === 'en' ? 'Portuguese' : 'English'}`}
    >
      <span
        className={cn(
          'px-2 py-0.5 rounded-full text-xs font-medium transition-colors',
          locale === 'en' ? 'bg-primary-500 text-white' : 'text-foreground-secondary'
        )}
      >
        EN
      </span>
      <span
        className={cn(
          'px-2 py-0.5 rounded-full text-xs font-medium transition-colors',
          locale === 'pt' ? 'bg-primary-500 text-white' : 'text-foreground-secondary'
        )}
      >
        PT
      </span>
    </button>
  )
}
