'use client'

import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null
  alt: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showBorder?: boolean
  borderColor?: 'primary' | 'success' | 'warning'
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  showBorder = false,
  borderColor = 'primary',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
    xl: 'h-20 w-20 text-xl',
  }

  const borderColors = {
    primary: 'ring-primary-500',
    success: 'ring-accent-500',
    warning: 'ring-warning',
  }

  const getInitials = (name: string) => {
    const words = name.trim().split(' ')
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const initials = fallback ? getInitials(fallback) : alt ? getInitials(alt) : '?'
  const showFallback = !src || imageError

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-primary-100 overflow-hidden flex-shrink-0',
        sizes[size],
        showBorder && 'ring-2 ring-offset-2 ring-offset-background',
        showBorder && borderColors[borderColor],
        className
      )}
    >
      {showFallback ? (
        <span className="font-medium text-primary-700 select-none">
          {initials}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
          {...props}
        />
      )}
    </div>
  )
}
