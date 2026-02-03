'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Clock, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils/cn'
import { VENUE_TYPE_CONFIG } from '@/lib/data/mockData'
import type { Venue } from '@/types'

interface VenueCardProps {
  venue: Venue
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function VenueCard({ venue, variant = 'default', className }: VenueCardProps) {
  const typeConfig = VENUE_TYPE_CONFIG[venue.type]

  // Check if venue is currently open (simplified)
  const isOpen = () => {
    if (!venue.opening_hours) return null
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const today = days[new Date().getDay()]
    const hours = venue.opening_hours[today as keyof typeof venue.opening_hours]
    return hours !== null
  }

  const openStatus = isOpen()

  if (variant === 'compact') {
    return (
      <Link href={`/venue/${venue.slug}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'flex gap-3 p-3 rounded-xl bg-surface border border-primary-100 hover:border-primary-200 transition-colors',
            className
          )}
        >
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            {venue.cover_image ? (
              <Image
                src={venue.cover_image}
                alt={venue.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{venue.name}</h3>
            <p className="text-sm text-foreground-muted truncate">
              {venue.city}, {venue.country}
            </p>
            <Badge size="sm" className={cn(typeConfig.bgColor, typeConfig.color, 'mt-1')}>
              {typeConfig.label}
            </Badge>
          </div>
        </motion.div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={`/venue/${venue.slug}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className={cn(
            'relative rounded-2xl overflow-hidden group cursor-pointer',
            className
          )}
        >
          <div className="relative aspect-[4/3]">
            {venue.cover_image ? (
              <Image
                src={venue.cover_image}
                alt={venue.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-primary-500" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <Badge size="sm" className={cn(typeConfig.bgColor, typeConfig.color, 'w-fit mb-2')}>
                {typeConfig.label}
              </Badge>
              <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                {venue.name}
              </h3>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{venue.city}, {venue.country}</span>
              </div>
            </div>

            {/* Verified badge */}
            {venue.is_verified && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link href={`/venue/${venue.slug}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className={cn(
          'rounded-2xl bg-surface border border-primary-100 overflow-hidden hover:border-primary-200 hover:shadow-md transition-all',
          className
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10]">
          {venue.cover_image ? (
            <Image
              src={venue.cover_image}
              alt={venue.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-primary-400" />
            </div>
          )}

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <Badge size="sm" className={cn(typeConfig.bgColor, typeConfig.color)}>
              {typeConfig.label}
            </Badge>
          </div>

          {/* Verified badge */}
          {venue.is_verified && (
            <div className="absolute top-3 right-3">
              <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center shadow">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
            {venue.name}
          </h3>

          <div className="flex items-center gap-1.5 text-sm text-foreground-muted mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{venue.city}, {venue.country}</span>
          </div>

          {venue.description && (
            <p className="text-sm text-foreground-secondary line-clamp-2 mb-3">
              {venue.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            {openStatus !== null && (
              <div className="flex items-center gap-1.5 text-sm">
                <Clock className="w-3.5 h-3.5" />
                <span className={openStatus ? 'text-accent-600' : 'text-foreground-muted'}>
                  {openStatus ? 'Open today' : 'Closed today'}
                </span>
              </div>
            )}

            {venue.website && (
              <ExternalLink className="w-4 h-4 text-foreground-muted" />
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
