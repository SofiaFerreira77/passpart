'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  User,
  Settings,
  Trophy,
  BookOpen,
  Heart,
  MapPin,
  Calendar,
  ChevronRight,
  LogOut,
  Bell,
  Shield,
  Globe,
  Moon,
  Info,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Avatar, Badge, Button, LanguageSwitcher } from '@/components/ui'
import { PageTransition, Header } from '@/components/layout'
import { useTranslations, useI18n } from '@/lib/i18n'
import { MOCK_VENUES, MOCK_ARTWORKS, MOCK_ACHIEVEMENTS } from '@/lib/data/mockData'

// Mock user profile
const MOCK_USER = {
  id: 'user-1',
  username: 'artlover',
  display_name: 'Sofia Ferreira',
  avatar_url: null,
  bio: 'Art enthusiast exploring museums and galleries around the world. Currently based in Lisbon.',
  favorite_styles: ['Impressionism', 'Renaissance', 'Street Art'],
  created_at: '2024-01-01',
  stats: {
    stamps: 4,
    following: 23,
    followers: 18,
  },
}

// Mock recent stamps
const MOCK_RECENT_STAMPS = [
  { id: '1', venue_id: 'louvre', artwork_id: 'mona-lisa', visited_at: '2024-01-15' },
  { id: '2', venue_id: 'rijksmuseum', artwork_id: 'night-watch', visited_at: '2024-01-20' },
  { id: '3', venue_id: 'uffizi', artwork_id: 'birth-of-venus', visited_at: '2024-02-05' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function ProfilePage() {
  const t = useTranslations()
  const { locale } = useI18n()
  const [showSettings, setShowSettings] = useState(false)

  // Get recent stamps with details
  const recentStampsWithDetails = MOCK_RECENT_STAMPS.map(stamp => ({
    ...stamp,
    venue: MOCK_VENUES.find(v => v.id === stamp.venue_id),
    artwork: MOCK_ARTWORKS.find(a => a.id === stamp.artwork_id),
  }))

  // Get unlocked achievements
  const unlockedAchievements = MOCK_ACHIEVEMENTS.filter(a => {
    if (a.id === 'first_steps') return MOCK_USER.stats.stamps >= 1
    if (a.id === 'city_hopper') return true // Has visited multiple cities
    return false
  })

  const settingsItems = [
    { icon: Bell, label: t.profile.settings.notifications, href: '#' },
    { icon: Shield, label: t.profile.settings.privacy, href: '#' },
    { icon: Globe, label: t.profile.settings.language, href: '#', component: 'language' as const },
    { icon: Moon, label: t.profile.settings.theme, href: '#' },
    { icon: Info, label: t.profile.settings.about, href: '#' },
  ]

  return (
    <PageTransition variant="fade">
      <Header
        title={t.profile.title}
        showSettings
        showLanguage
        onSettingsClick={() => setShowSettings(!showSettings)}
      />

      <div className="px-4 pb-24">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-6"
        >
          {/* Avatar */}
          <div className="relative mb-4">
            {MOCK_USER.avatar_url ? (
              <Image
                src={MOCK_USER.avatar_url}
                alt={MOCK_USER.display_name}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {MOCK_USER.display_name.charAt(0)}
                </span>
              </div>
            )}
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg">
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Name and username */}
          <h1 className="text-xl font-bold font-serif text-foreground">{MOCK_USER.display_name}</h1>
          <p className="text-sm text-foreground-muted">@{MOCK_USER.username}</p>

          {/* Bio */}
          {MOCK_USER.bio && (
            <p className="text-sm text-foreground-secondary text-center mt-3 max-w-xs">
              {MOCK_USER.bio}
            </p>
          )}

          {/* Favorite styles */}
          {MOCK_USER.favorite_styles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {MOCK_USER.favorite_styles.map(style => (
                <Badge key={style} variant="success" size="sm">
                  {style}
                </Badge>
              ))}
            </div>
          )}

          {/* Member since */}
          <div className="flex items-center gap-1 text-xs text-foreground-muted mt-3">
            <Calendar className="w-3 h-3" />
            <span>
              {t.profile.joined} {new Date(MOCK_USER.created_at).toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex justify-around py-4 border-y border-primary-100 mb-6"
        >
          <div className="text-center">
            <p className="text-xl font-bold font-serif text-foreground">{MOCK_USER.stats.stamps}</p>
            <p className="text-xs text-foreground-muted">{t.profile.stats.stamps}</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold font-serif text-foreground">{MOCK_USER.stats.following}</p>
            <p className="text-xs text-foreground-muted">{t.profile.stats.following}</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold font-serif text-foreground">{MOCK_USER.stats.followers}</p>
            <p className="text-xs text-foreground-muted">{t.profile.stats.followers}</p>
          </div>
        </motion.div>

        {/* Edit Profile Button */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <Button variant="secondary" className="w-full" leftIcon={<User className="w-4 h-4" />}>
            {t.profile.editProfile}
          </Button>
        </motion.div>

        {/* Achievements Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent-600" />
              <h2 className="text-lg font-semibold font-serif text-foreground">{t.profile.achievements}</h2>
            </div>
            <Badge variant="default" size="sm">
              {unlockedAchievements.length}/{MOCK_ACHIEVEMENTS.length}
            </Badge>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {MOCK_ACHIEVEMENTS.slice(0, 8).map((achievement, index) => {
              const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id)
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 ${
                    isUnlocked
                      ? 'bg-accent-100 border-2 border-accent-300'
                      : 'bg-background-secondary opacity-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{achievement.icon}</span>
                  <span className="text-[10px] text-center text-foreground-secondary line-clamp-2">
                    {t.achievements.list[achievement.id as keyof typeof t.achievements.list]?.name || achievement.name}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Recent Stamps Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-semibold font-serif text-foreground">{t.profile.recentStamps}</h2>
            </div>
            <Link href="/passport" className="text-xs text-primary-600 flex items-center gap-1">
              {t.common.viewAll}
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {recentStampsWithDetails.map((stamp, index) => (
              <motion.div
                key={stamp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-32"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                  {stamp.artwork?.image_url ? (
                    <Image
                      src={stamp.artwork.image_url}
                      alt={stamp.artwork.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400" />
                  )}
                </div>
                <p className="text-xs font-medium text-foreground truncate">
                  {stamp.artwork?.title || stamp.venue?.name}
                </p>
                <p className="text-[10px] text-foreground-muted truncate">
                  {stamp.venue?.city}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Settings Section (expandable) */}
        {showSettings && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-foreground-muted" />
              <h2 className="text-lg font-semibold font-serif text-foreground">{t.profile.settings.title}</h2>
            </div>

            <div className="space-y-1">
              {settingsItems.map((item) => (
                <div key={item.label}>
                  {item.component === 'language' ? (
                    <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-background-secondary transition-colors">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-foreground-muted" />
                        <span className="text-sm text-foreground">{item.label}</span>
                      </div>
                      <LanguageSwitcher variant="toggle" />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-background-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-foreground-muted" />
                        <span className="text-sm text-foreground">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-foreground-muted" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Sign Out */}
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">{t.profile.settings.logout}</span>
            </button>
          </motion.section>
        )}
      </div>
    </PageTransition>
  )
}
