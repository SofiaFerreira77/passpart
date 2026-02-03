'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Map, BookOpen, Compass, User } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface NavItem {
  href: string
  icon: typeof Map
  label: string
  isCenter?: boolean
}

const navItems: NavItem[] = [
  { href: '/map', icon: Map, label: 'Map' },
  { href: '/passport', icon: BookOpen, label: 'Passport' },
  { href: '/discover', icon: Compass, label: 'Discover', isCenter: true },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-primary-100 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -mt-6"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors duration-200',
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'bg-accent-600 text-white hover:bg-accent-700'
                  )}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <span className="sr-only">{item.label}</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      'h-6 w-6 transition-colors duration-200',
                      isActive ? 'text-primary-600' : 'text-foreground-muted'
                    )}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium transition-colors duration-200',
                    isActive ? 'text-primary-600' : 'text-foreground-muted'
                  )}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
