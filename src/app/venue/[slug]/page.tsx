'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Clock,
  Globe,
  Star,
  Share2,
  Navigation,
  Palette,
} from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { ArtworkCard } from '@/components/discover'
import { getVenueBySlug, getArtworksByVenue, VENUE_TYPE_CONFIG } from '@/lib/data/mockData'

interface VenuePageProps {
  params: Promise<{ slug: string }>
}

export default function VenuePage({ params }: VenuePageProps) {
  const { slug } = use(params)
  const venue = getVenueBySlug(slug)

  if (!venue) {
    notFound()
  }

  const artworks = getArtworksByVenue(venue.id)
  const typeConfig = VENUE_TYPE_CONFIG[venue.type]

  // Get today's opening hours
  const getTodayHours = () => {
    if (!venue.opening_hours) return null
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const today = days[new Date().getDay()]
    return venue.opening_hours[today as keyof typeof venue.opening_hours]
  }

  const todayHours = getTodayHours()

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: venue.name,
        text: venue.description || `Check out ${venue.name} on Passpart`,
        url: window.location.href,
      })
    }
  }

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96">
        {venue.cover_image ? (
          <Image
            src={venue.cover_image}
            alt={venue.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Link href="/discover">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Verified badge */}
        {venue.is_verified && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <Badge className="bg-accent-500 text-white border-none">
              <Star className="w-3 h-3 mr-1 fill-white" />
              Verified
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 -mt-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl shadow-lg p-6"
        >
          {/* Type badge */}
          <Badge size="sm" className={`${typeConfig.bgColor} ${typeConfig.color} mb-3`}>
            {typeConfig.label}
          </Badge>

          {/* Name */}
          <h1 className="text-2xl font-bold font-serif text-foreground mb-2">
            {venue.name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-2 text-foreground-muted mb-4">
            <MapPin className="w-4 h-4" />
            <span>{venue.address}, {venue.city}, {venue.country}</span>
          </div>

          {/* Description */}
          {venue.description && (
            <p className="text-foreground-secondary mb-6">
              {venue.description}
            </p>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Opening hours */}
            <div className="p-3 rounded-xl bg-background-secondary">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-foreground-muted" />
                <span className="text-sm font-medium text-foreground">Today</span>
              </div>
              <p className={`text-sm ${todayHours ? 'text-accent-600' : 'text-foreground-muted'}`}>
                {todayHours
                  ? `${todayHours.open} - ${todayHours.close}`
                  : 'Closed'}
              </p>
            </div>

            {/* Website */}
            {venue.website && (
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-background-secondary hover:bg-primary-50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-foreground-muted" />
                  <span className="text-sm font-medium text-foreground">Website</span>
                </div>
                <p className="text-sm text-primary-600 truncate">
                  Visit site
                </p>
              </a>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleDirections}
              variant="secondary"
              className="flex-1"
              leftIcon={<Navigation className="w-4 h-4" />}
            >
              Directions
            </Button>
            <Button className="flex-1">
              I'm Here - Stamp!
            </Button>
          </div>
        </motion.div>

        {/* Artworks section */}
        {artworks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-semibold font-serif text-foreground">
                Highlights
              </h2>
              <Badge variant="default" size="sm">{artworks.length}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {artworks.map(artwork => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Map preview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h2 className="text-lg font-semibold font-serif text-foreground mb-4">
            Location
          </h2>

          <div
            onClick={handleDirections}
            className="relative h-48 rounded-2xl overflow-hidden bg-primary-100 cursor-pointer hover:opacity-90 transition-opacity"
          >
            {/* Static map placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                <p className="text-sm text-foreground-muted">
                  {venue.city}, {venue.country}
                </p>
                <p className="text-xs text-foreground-muted mt-1">
                  Tap to open in Maps
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Opening hours full */}
        {venue.opening_hours && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <h2 className="text-lg font-semibold font-serif text-foreground mb-4">
              Opening Hours
            </h2>

            <div className="space-y-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                const hours = venue.opening_hours?.[day.toLowerCase() as keyof typeof venue.opening_hours]
                const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day

                return (
                  <div
                    key={day}
                    className={`flex justify-between py-2 px-3 rounded-lg ${
                      isToday ? 'bg-primary-50' : ''
                    }`}
                  >
                    <span className={`text-sm ${isToday ? 'font-medium text-foreground' : 'text-foreground-secondary'}`}>
                      {day}
                      {isToday && <span className="text-primary-600 ml-2">(Today)</span>}
                    </span>
                    <span className={`text-sm ${hours ? 'text-foreground' : 'text-foreground-muted'}`}>
                      {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
