'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Search, Settings } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { LanguageSwitcher } from '@/components/ui'

interface HeaderProps {
  title?: string
  variant?: 'transparent' | 'solid'
  showBack?: boolean
  showSearch?: boolean
  showSettings?: boolean
  showLanguage?: boolean
  onSearchClick?: () => void
  onSettingsClick?: () => void
  className?: string
}

export function Header({
  title,
  variant = 'solid',
  showBack = false,
  showSearch = false,
  showSettings = false,
  showLanguage = false,
  onSearchClick,
  onSettingsClick,
  className,
}: HeaderProps) {
  const router = useRouter()

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between h-14 px-4 safe-area-inset-top',
        variant === 'solid' && 'bg-background border-b border-primary-100',
        variant === 'transparent' && 'bg-transparent',
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg hover:bg-background-secondary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        )}
        {title && (
          <h1 className="text-lg font-semibold text-foreground font-serif truncate">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        {showLanguage && <LanguageSwitcher variant="toggle" />}
        {showSearch && (
          <button
            onClick={onSearchClick}
            className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-foreground-secondary" />
          </button>
        )}
        {showSettings && (
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-foreground-secondary" />
          </button>
        )}
      </div>
    </header>
  )
}
