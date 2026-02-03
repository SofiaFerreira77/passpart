'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'featured'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  header?: ReactNode
  footer?: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      header,
      footer,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-2xl bg-surface border border-primary-100'

    const variants = {
      default: 'shadow-sm',
      interactive:
        'shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer active:scale-[0.99]',
      featured:
        'shadow-lg border-primary-300 ring-1 ring-primary-200/50',
    }

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {header && (
          <div
            className={cn(
              'border-b border-primary-100',
              padding !== 'none' && paddings[padding]
            )}
          >
            {header}
          </div>
        )}
        <div className={padding !== 'none' ? paddings[padding] : ''}>
          {children}
        </div>
        {footer && (
          <div
            className={cn(
              'border-t border-primary-100',
              padding !== 'none' && paddings[padding]
            )}
          >
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
