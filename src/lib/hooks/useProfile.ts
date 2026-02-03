'use client'

import { useState, useEffect, useCallback } from 'react'
import { getClient } from '@/lib/supabase/client'
import type { Profile, ProfileWithStats } from '@/types'

interface UseProfileOptions {
  userId?: string
  username?: string
  includeStats?: boolean
}

interface UseProfileReturn {
  profile: Profile | ProfileWithStats | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useProfile(options: UseProfileOptions = {}): UseProfileReturn {
  const { userId, username, includeStats = false } = options
  const [profile, setProfile] = useState<Profile | ProfileWithStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const supabase = getClient()

  const fetchProfile = useCallback(async () => {
    if (!userId && !username) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      let query = supabase.from('profiles').select('*')

      if (userId) {
        query = query.eq('id', userId)
      } else if (username) {
        query = query.eq('username', username)
      }

      const { data, error: queryError } = await query.single()

      if (queryError) {
        throw queryError
      }

      if (includeStats && data) {
        // Fetch follower/following counts
        const [followersResult, followingResult] = await Promise.all([
          supabase
            .from('follows')
            .select('*', { count: 'exact', head: true })
            .eq('following_id', data.id),
          supabase
            .from('follows')
            .select('*', { count: 'exact', head: true })
            .eq('follower_id', data.id),
        ])

        const profileWithStats: ProfileWithStats = {
          ...data,
          followers_count: followersResult.count ?? 0,
          following_count: followingResult.count ?? 0,
        }

        setProfile(profileWithStats)
      } else {
        setProfile(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profile'))
    } finally {
      setIsLoading(false)
    }
  }, [userId, username, includeStats, supabase])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  // Refetch on window focus
  useEffect(() => {
    const handleFocus = () => {
      fetchProfile()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [fetchProfile])

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  }
}

// Hook to check username availability
export function useUsernameAvailability() {
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const supabase = getClient()

  const checkUsername = useCallback(
    async (username: string): Promise<boolean> => {
      if (!username || username.length < 3) {
        setIsAvailable(null)
        return false
      }

      setIsChecking(true)

      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.toLowerCase())
        .maybeSingle()

      setIsChecking(false)

      const available = !data && !error
      setIsAvailable(available)
      return available
    },
    [supabase]
  )

  return {
    isChecking,
    isAvailable,
    checkUsername,
  }
}
