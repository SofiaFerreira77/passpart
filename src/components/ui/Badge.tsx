'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'error'
  size?: 'sm' | 'md'
  icon?: ReactNode
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  icon,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-medium rounded-full whitespace-nowrap'

  const variants = {
    default: 'bg-primary-100 text-primary-700',
    success: 'bg-accent-100 text-accent-700',
    warning: 'bg-primary-200 text-primary-800',
    info: 'bg-info/10 text-info',
    error: 'bg-error/10 text-error',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
  }

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
