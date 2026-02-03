'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Star, MapPin, Calendar, Heart, Filter, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge, Button } from '@/components/ui'
import { PageTransition, Header } from '@/components/layout'
import { useTranslations } from '@/lib/i18n'
import { MOCK_VENUES, MOCK_ARTWORKS, MOCK_ACHIEVEMENTS, VENUE_TYPE_CONFIG } from '@/lib/data/mockData'

// Simulated user stamps (in a real app, this would come from the database)
const MOCK_STAMPS = [
  {
    id: '1',
    venue_id: 'louvre',
    artwork_id: 'mona-lisa',
    visited_at: '2024-01-15',
    rating: 5,
    is_favorite: true,
    note: 'Incredible experience seeing the Mona Lisa in person!',
  },
  {
    id: '2',
    venue_id: 'rijksmuseum',
    artwork_id: 'night-watch',
    visited_at: '2024-01-20',
    rating: 5,
    is_favorite: true,
    note: 'The Night Watch is even more impressive in person.',
  },
  {
    id: '3',
    venue_id: 'uffizi',
    artwork_id: 'birth-of-venus',
    visited_at: '2024-02-05',
    rating: 4,
    is_favorite: false,
    note: 'Beautiful gallery with amazing Renaissance art.',
  },
  {
    id: '4',
    venue_id: 'street-art-lisbon',
    visited_at: '2024-02-10',
    rating: 4,
    is_favorite: false,
    note: 'Great walking tour through the street art.',
  },
]

type FilterType = 'all' | 'favorites' | 'museum' | 'gallery' | 'street_art'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function PassportPage() {
  const t = useTranslations()
  const [filter, setFilter] = useState<FilterType>('all')

  // Calculate stats
  const totalStamps = MOCK_STAMPS.length
  const uniqueVenues = new Set(MOCK_STAMPS.map(s => s.venue_id)).size
  const uniqueCities = new Set(
    MOCK_STAMPS.map(s => {
      const venue = MOCK_VENUES.find(v => v.id === s.venue_id)
      return venue?.city
    }).filter(Boolean)
  ).size
  const uniqueCountries = new Set(
    MOCK_STAMPS.map(s => {
      const venue = MOCK_VENUES.find(v => v.id === s.venue_id)
      return venue?.country
    }).filter(Boolean)
  ).size

  // Determine level
  const getLevel = () => {
    if (totalStamps >= 100) return { name: t.passport.level.master, color: 'text-accent-600' }
    if (totalStamps >= 50) return { name: t.passport.level.connoisseur, color: 'text-primary-600' }
    if (totalStamps >= 10) return { name: t.passport.level.explorer, color: 'text-primary-500' }
    return { name: t.passport.level.novice, color: 'text-foreground-secondary' }
  }

  const level = getLevel()

  // Filter stamps
  const filteredStamps = MOCK_STAMPS.filter(stamp => {
    if (filter === 'all') return true
    if (filter === 'favorites') return stamp.is_favorite
    const venue = MOCK_VENUES.find(v => v.id === stamp.venue_id)
    return venue?.type === filter
  })

  // Get stamp details with venue/artwork info
  const stampsWithDetails = filteredStamps.map(stamp => ({
    ...stamp,
    venue: MOCK_VENUES.find(v => v.id === stamp.venue_id),
    artwork: MOCK_ARTWORKS.find(a => a.id === stamp.artwork_id),
  }))

  // Unlocked achievements
  const unlockedAchievements = MOCK_ACHIEVEMENTS.filter(a => {
    if (a.id === 'first_steps') return totalStamps >= 1
    if (a.id === 'art_lover') return totalStamps >= 10
    if (a.id === 'city_hopper') return uniqueCities >= 3
    return false
  })

  return (
    <PageTransition variant="fade">
      <Header title={t.passport.title} showSearch={false} showLanguage />

      <div className="px-4 pb-24">
        {/* Passport Cover Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 mb-6 text-white shadow-xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm opacity-80">PASSPART</span>
              </div>
              <h2 className="text-xl font-bold font-serif">{t.passport.title}</h2>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium ${level.color} bg-white/20 px-3 py-1 rounded-full`}>
                {level.name}
              </span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold font-serif">{totalStamps}</p>
              <p className="text-xs opacity-80">{t.passport.stats.stamps}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-serif">{uniqueVenues}</p>
              <p className="text-xs opacity-80">{t.passport.stats.venues}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-serif">{uniqueCities}</p>
              <p className="text-xs opacity-80">{t.passport.stats.cities}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold font-serif">{uniqueCountries}</p>
              <p className="text-xs opacity-80">{t.passport.stats.countries}</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements preview */}
        {unlockedAchievements.length > 0 && (
          <motion.section
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground-secondary">{t.profile.achievements}</h3>
              <Link href="/profile" className="text-xs text-primary-600 flex items-center gap-1">
                {t.common.viewAll}
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex gap-2">
              {unlockedAchievements.slice(0, 4).map(achievement => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.05 }}
                  className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center text-2xl"
                  title={achievement.name}
                >
                  {achievement.icon}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Filter tabs */}
        <div className="mb-6 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setFilter('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-background-secondary text-foreground-secondary hover:bg-primary-100'
              }`}
            >
              {t.passport.filters.all}
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                filter === 'favorites'
                  ? 'bg-accent-500 text-white'
                  : 'bg-background-secondary text-foreground-secondary hover:bg-accent-100'
              }`}
            >
              <Heart className="w-3 h-3" />
              {t.passport.filters.favorites}
            </button>
            {(['museum', 'gallery', 'street_art'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === type
                    ? 'bg-primary-500 text-white'
                    : `${VENUE_TYPE_CONFIG[type].bgColor} ${VENUE_TYPE_CONFIG[type].color} hover:opacity-80`
                }`}
              >
                {t.discover.types[type]}
              </button>
            ))}
          </div>
        </div>

        {/* Stamps grid */}
        {stampsWithDetails.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-12"
          >
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-primary-400" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">{t.passport.empty.title}</h3>
            <p className="text-foreground-muted mb-6">{t.passport.empty.subtitle}</p>
            <Link href="/map">
              <Button leftIcon={<MapPin className="w-4 h-4" />}>
                {t.passport.empty.cta}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {stampsWithDetails.map((stamp, index) => (
              <motion.div
                key={stamp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface rounded-xl overflow-hidden shadow-md border border-primary-100"
              >
                {/* Stamp image */}
                <div className="relative aspect-square">
                  {stamp.artwork?.image_url || stamp.venue?.cover_image ? (
                    <Image
                      src={stamp.artwork?.image_url || stamp.venue?.cover_image || ''}
                      alt={stamp.artwork?.title || stamp.venue?.name || ''}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary-600" />
                    </div>
                  )}

                  {/* Stamp overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Favorite badge */}
                  {stamp.is_favorite && (
                    <div className="absolute top-2 right-2">
                      <Heart className="w-5 h-5 text-accent-500 fill-accent-500" />
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < stamp.rating ? 'text-accent-400 fill-accent-400' : 'text-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stamp info */}
                <div className="p-3">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {stamp.artwork?.title || stamp.venue?.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-foreground-muted mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{stamp.venue?.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-foreground-muted mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(stamp.visited_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
