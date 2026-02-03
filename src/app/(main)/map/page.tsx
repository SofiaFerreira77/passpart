'use client'

import { useState } from 'react'
import { Map, MapPin, Navigation, Search, Filter, Locate } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input, Badge, Button } from '@/components/ui'
import { PageTransition, Header } from '@/components/layout'
import { VenueCard } from '@/components/discover'
import { useTranslations } from '@/lib/i18n'
import { MOCK_VENUES, getUniqueCities, VENUE_TYPE_CONFIG } from '@/lib/data/mockData'
import type { VenueType } from '@/types'

export default function MapPage() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<VenueType | null>(null)
  const [showList, setShowList] = useState(false)

  const cities = getUniqueCities()

  // Filter venues based on search and type
  const filteredVenues = MOCK_VENUES.filter(venue => {
    const matchesSearch = !searchQuery ||
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = !selectedType || venue.type === selectedType

    return matchesSearch && matchesType
  })

  // Group venues by city for display
  const venuesByCity = filteredVenues.reduce((acc, venue) => {
    if (!acc[venue.city]) {
      acc[venue.city] = []
    }
    acc[venue.city].push(venue)
    return acc
  }, {} as Record<string, typeof filteredVenues>)

  return (
    <PageTransition variant="fade">
      <Header title={t.nav.map} showSearch={false} showLanguage />

      <div className="flex flex-col h-[calc(100vh-3.5rem-5rem)]">
        {/* Map Preview Area */}
        <div className="relative flex-1 bg-primary-50">
          {/* Map placeholder with interactive look */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Simulated map grid */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B7355" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Venue markers on simulated map */}
            <div className="absolute inset-0">
              {MOCK_VENUES.slice(0, 6).map((venue, index) => {
                // Distribute markers across the map area
                const positions = [
                  { top: '20%', left: '30%' },
                  { top: '35%', left: '60%' },
                  { top: '50%', left: '25%' },
                  { top: '45%', left: '70%' },
                  { top: '65%', left: '45%' },
                  { top: '30%', left: '50%' },
                ]
                const pos = positions[index]
                const typeConfig = VENUE_TYPE_CONFIG[venue.type]

                return (
                  <motion.div
                    key={venue.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute cursor-pointer"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className="relative group">
                      <div className={`w-10 h-10 rounded-full ${typeConfig.bgColor} flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform`}>
                        <MapPin className={`w-5 h-5 ${typeConfig.color}`} />
                      </div>
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-surface rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="text-xs font-medium text-foreground">{venue.name}</p>
                        <p className="text-[10px] text-foreground-muted">{venue.city}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Search overlay */}
          <div className="absolute top-4 left-4 right-4">
            <Input
              type="search"
              placeholder={t.map.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              className="shadow-lg"
            />
          </div>

          {/* Type filter chips */}
          <div className="absolute top-20 left-4 right-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedType(null)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-colors ${
                  !selectedType
                    ? 'bg-primary-500 text-white'
                    : 'bg-surface text-foreground-secondary hover:bg-primary-100'
                }`}
              >
                {t.common.all}
              </button>
              {(Object.keys(VENUE_TYPE_CONFIG) as VenueType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type === selectedType ? null : type)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-colors ${
                    selectedType === type
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface text-foreground-secondary hover:bg-primary-100'
                  }`}
                >
                  {t.discover.types[type as keyof typeof t.discover.types] || VENUE_TYPE_CONFIG[type].label}
                </button>
              ))}
            </div>
          </div>

          {/* Center on me button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-surface shadow-lg flex items-center justify-center"
            aria-label={t.map.centerOnMe}
          >
            <Locate className="w-5 h-5 text-primary-600" />
          </motion.button>

          {/* Toggle list view button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowList(!showList)}
            className="absolute bottom-4 left-4 px-4 py-3 rounded-full bg-surface shadow-lg flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-foreground">
              {filteredVenues.length} {t.map.nearbyVenues.toLowerCase()}
            </span>
          </motion.button>
        </div>

        {/* Bottom sheet with nearby venues */}
        <motion.div
          initial={{ y: showList ? 0 : '70%' }}
          animate={{ y: showList ? 0 : '70%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute bottom-20 left-0 right-0 bg-surface rounded-t-3xl shadow-2xl max-h-[60vh] overflow-hidden"
          style={{ minHeight: '30vh' }}
        >
          {/* Drag handle */}
          <div
            onClick={() => setShowList(!showList)}
            className="sticky top-0 bg-surface pt-3 pb-2 cursor-pointer"
          >
            <div className="w-12 h-1 bg-primary-200 rounded-full mx-auto" />
          </div>

          {/* Venues list */}
          <div className="px-4 pb-6 overflow-y-auto max-h-[calc(60vh-3rem)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold font-serif text-foreground">
                {t.map.nearbyVenues}
              </h2>
              <Badge variant="default" size="sm">{filteredVenues.length}</Badge>
            </div>

            {filteredVenues.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
                <p className="text-foreground-muted">{t.map.noVenuesNearby}</p>
                <p className="text-sm text-foreground-muted mt-1">{t.map.beFirst}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(venuesByCity).map(([city, venues]) => (
                  <div key={city}>
                    <h3 className="text-sm font-medium text-foreground-muted mb-2 flex items-center gap-2">
                      <Navigation className="w-3 h-3" />
                      {city}
                    </h3>
                    <div className="space-y-3">
                      {venues.map(venue => (
                        <VenueCard key={venue.id} venue={venue} variant="compact" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
