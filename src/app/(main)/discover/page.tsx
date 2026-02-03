'use client'

import { useState } from 'react'
import { Search, MapPin, Sparkles, TrendingUp, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input, Badge } from '@/components/ui'
import { PageTransition, Header } from '@/components/layout'
import { VenueCard, ArtworkCard } from '@/components/discover'
import { useTranslations } from '@/lib/i18n'
import {
  MOCK_VENUES,
  MOCK_ARTWORKS,
  getUniqueCities,
  VENUE_TYPE_CONFIG,
} from '@/lib/data/mockData'
import type { VenueType } from '@/types'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DiscoverPage() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<VenueType | null>(null)

  const cities = getUniqueCities()

  // Filter venues based on search, city, and type
  const filteredVenues = MOCK_VENUES.filter(venue => {
    const matchesSearch = !searchQuery ||
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.country.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCity = !selectedCity || venue.city === selectedCity
    const matchesType = !selectedType || venue.type === selectedType

    return matchesSearch && matchesCity && matchesType
  })

  // Featured venues (first 2)
  const featuredVenues = MOCK_VENUES.slice(0, 2)

  // Get artworks with their venues
  const artworksWithVenues = MOCK_ARTWORKS.map(artwork => ({
    artwork,
    venue: MOCK_VENUES.find(v => v.id === artwork.venue_id),
  }))

  return (
    <PageTransition variant="fade">
      <Header title={t.discover.title} showSearch={false} showLanguage />

      <div className="px-4 pb-24">
        {/* Search */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder={t.discover.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* City filters */}
        <div className="mb-6 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCity(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCity
                  ? 'bg-primary-500 text-white'
                  : 'bg-background-secondary text-foreground-secondary hover:bg-primary-100'
              }`}
            >
              {t.discover.filters.allCities}
            </button>
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city === selectedCity ? null : city)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCity === city
                    ? 'bg-primary-500 text-white'
                    : 'bg-background-secondary text-foreground-secondary hover:bg-primary-100'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Type filters */}
        <div className="mb-8 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedType(null)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !selectedType
                  ? 'bg-accent-600 text-white'
                  : 'bg-background-secondary text-foreground-secondary hover:bg-accent-100'
              }`}
            >
              {t.discover.filters.allTypes}
            </button>
            {(Object.keys(VENUE_TYPE_CONFIG) as VenueType[]).map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type === selectedType ? null : type)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-accent-600 text-white'
                    : `${VENUE_TYPE_CONFIG[type].bgColor} ${VENUE_TYPE_CONFIG[type].color} hover:opacity-80`
                }`}
              >
                {t.discover.types[type as keyof typeof t.discover.types] || VENUE_TYPE_CONFIG[type].label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {!searchQuery && !selectedCity && !selectedType && (
          <motion.section
            initial="initial"
            animate="animate"
            variants={stagger}
            className="mb-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-semibold font-serif text-foreground">{t.discover.featured}</h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {featuredVenues.map((venue, i) => (
                <motion.div key={venue.id} variants={fadeInUp}>
                  <VenueCard venue={venue} variant="featured" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Masterpieces Section */}
        {!searchQuery && !selectedCity && !selectedType && (
          <motion.section
            initial="initial"
            animate="animate"
            variants={stagger}
            className="mb-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-accent-600" />
              <h2 className="text-lg font-semibold font-serif text-foreground">{t.discover.famousArtworks}</h2>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {artworksWithVenues.slice(0, 5).map(({ artwork, venue }, i) => (
                <motion.div
                  key={artwork.id}
                  variants={fadeInUp}
                  className="flex-shrink-0 w-[200px]"
                >
                  <ArtworkCard artwork={artwork} venue={venue} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Venues / Filtered Results */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-foreground-muted" />
            <h2 className="text-lg font-semibold font-serif text-foreground">
              {searchQuery || selectedCity || selectedType ? t.discover.results : t.discover.exploreAll}
            </h2>
            <Badge variant="default" size="sm">{filteredVenues.length}</Badge>
          </motion.div>

          {filteredVenues.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              className="text-center py-12"
            >
              <MapPin className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">{t.discover.noResults}</p>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {filteredVenues.map((venue, i) => (
                <motion.div key={venue.id} variants={fadeInUp}>
                  <VenueCard venue={venue} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Stats */}
        {!searchQuery && !selectedCity && !selectedType && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 py-8 border-t border-primary-100"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold font-serif text-primary-600">{MOCK_VENUES.length}</p>
                <p className="text-xs text-foreground-muted">{t.discover.stats.venues}</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-serif text-accent-600">{MOCK_ARTWORKS.length}</p>
                <p className="text-xs text-foreground-muted">{t.discover.stats.artworks}</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-serif text-foreground-secondary">{cities.length}</p>
                <p className="text-xs text-foreground-muted">{t.discover.stats.cities}</p>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </PageTransition>
  )
}
