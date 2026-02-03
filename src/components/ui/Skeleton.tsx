'use client'

import { cn } from '@/lib/utils/cn'

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className,
}: SkeletonProps) {
  const baseStyles = 'animate-shimmer'

  const variants = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-xl',
  }

  const style: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
      aria-hidden="true"
    />
  )
}

// Preset skeleton compositions
export function SkeletonCard() {
  return (
    <div className="p-4 rounded-2xl bg-surface border border-primary-100">
      <Skeleton variant="rectangular" height={120} className="mb-4" />
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="40%" />
    </div>
  )
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 56,
  }

  return <Skeleton variant="circular" width={sizes[size]} height={sizes[size]} />
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}
