'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Palette, Calendar, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Artwork, Venue } from '@/types'

interface ArtworkCardProps {
  artwork: Artwork
  venue?: Venue
  variant?: 'default' | 'compact'
  className?: string
}

export function ArtworkCard({ artwork, venue, variant = 'default', className }: ArtworkCardProps) {
  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          'flex gap-3 p-3 rounded-xl bg-surface border border-primary-100',
          className
        )}
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          {artwork.image_url ? (
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-100 flex items-center justify-center">
              <Palette className="w-6 h-6 text-primary-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{artwork.title}</h4>
          <p className="text-sm text-foreground-muted truncate">{artwork.artist || 'Unknown artist'}</p>
          {artwork.year && (
            <p className="text-xs text-foreground-muted">{artwork.year}</p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-2xl bg-surface border border-primary-100 overflow-hidden hover:shadow-md transition-all',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/5]">
        {artwork.image_url ? (
          <Image
            src={artwork.image_url}
            alt={artwork.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <Palette className="w-12 h-12 text-primary-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-1 line-clamp-1 font-serif">
          {artwork.title}
        </h4>

        <p className="text-sm text-foreground-secondary mb-2">
          {artwork.artist || 'Unknown artist'}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-foreground-muted">
          {artwork.year && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{artwork.year}</span>
            </div>
          )}
          {artwork.medium && (
            <div className="flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{artwork.medium}</span>
            </div>
          )}
        </div>

        {venue && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-primary-100 text-sm text-foreground-muted">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{venue.name}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
