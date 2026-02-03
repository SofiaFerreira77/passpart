// Database types for Supabase

export type VenueType = 'museum' | 'gallery' | 'street_art' | 'popup' | 'public_art'
export type ExplorerLevel = 'novice' | 'explorer' | 'connoisseur' | 'master'

export interface OpeningHours {
  monday?: { open: string; close: string } | null
  tuesday?: { open: string; close: string } | null
  wednesday?: { open: string; close: string } | null
  thursday?: { open: string; close: string } | null
  friday?: { open: string; close: string } | null
  saturday?: { open: string; close: string } | null
  sunday?: { open: string; close: string } | null
}

// Core Types
export interface Profile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  favorite_art_styles: string[]
  total_stamps: number
  total_venues: number
  explorer_level: ExplorerLevel
  created_at: string
  updated_at: string
}

export interface Venue {
  id: string
  name: string
  slug: string
  type: VenueType
  description: string | null
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  cover_image: string | null
  website: string | null
  opening_hours: OpeningHours | null
  is_verified: boolean
  submitted_by: string | null
  created_at: string
}

export interface Artwork {
  id: string
  venue_id: string
  title: string
  artist: string | null
  year: string | null
  medium: string | null
  description: string | null
  image_url: string | null
  location_within_venue: string | null
  is_permanent: boolean
  created_at: string
}

export interface Stamp {
  id: string
  user_id: string
  artwork_id: string | null
  venue_id: string
  stamped_at: string
  location_verified: boolean
  photo_url: string | null
  personal_note: string | null
  rating: number | null
  is_favorite: boolean
  mood_tags: string[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requirement_type: string
  requirement_value: number
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
}

export interface Follow {
  follower_id: string
  following_id: string
  created_at: string
}

// Extended/Joined Types
export interface VenueWithDistance extends Venue {
  distance_km: number
}

export interface StampWithDetails extends Stamp {
  venue: Venue
  artwork: Artwork | null
}

export interface StampWithUser extends Stamp {
  user: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>
  venue: Venue
}

export interface ProfileWithStats extends Profile {
  followers_count: number
  following_count: number
}

export interface VenueWithStats extends Venue {
  stamps_count: number
  average_rating: number | null
  recent_stampers: Pick<Profile, 'id' | 'username' | 'avatar_url'>[]
}

// Activity types
export type ActivityType = 'stamp' | 'achievement' | 'follow' | 'first_stamp'

export interface Activity {
  id: string
  type: ActivityType
  user_id: string
  user: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>
  target_id: string
  metadata: Record<string, unknown>
  created_at: string
}

// Database schema type for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at' | 'total_stamps' | 'total_venues'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      venues: {
        Row: Venue
        Insert: Omit<Venue, 'id' | 'created_at'>
        Update: Partial<Omit<Venue, 'id' | 'created_at'>>
      }
      artworks: {
        Row: Artwork
        Insert: Omit<Artwork, 'id' | 'created_at'>
        Update: Partial<Omit<Artwork, 'id' | 'created_at'>>
      }
      stamps: {
        Row: Stamp
        Insert: Omit<Stamp, 'id' | 'stamped_at'>
        Update: Partial<Omit<Stamp, 'id' | 'user_id' | 'stamped_at'>>
      }
      achievements: {
        Row: Achievement
        Insert: Omit<Achievement, 'id'>
        Update: Partial<Omit<Achievement, 'id'>>
      }
      user_achievements: {
        Row: UserAchievement
        Insert: Omit<UserAchievement, 'id' | 'unlocked_at'>
        Update: never
      }
      follows: {
        Row: Follow
        Insert: Omit<Follow, 'created_at'>
        Update: never
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_nearby_venues: {
        Args: { lat: number; lng: number; radius_km: number }
        Returns: VenueWithDistance[]
      }
      check_achievements: {
        Args: { user_id: string }
        Returns: Achievement[]
      }
    }
    Enums: {
      venue_type: VenueType
      explorer_level: ExplorerLevel
    }
  }
}
