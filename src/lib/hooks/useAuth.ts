'use client'

import { useState, useCallback } from 'react'
import { getClient } from '@/lib/supabase/client'
import { useAuthContext } from '@/components/providers/AuthProvider'
import type { Profile } from '@/types'

export function useAuth() {
  const { user, profile, isLoading, isAuthenticated, refreshProfile } =
    useAuthContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = getClient()

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setIsSubmitting(true)
      setError(null)

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setIsSubmitting(false)

      if (signInError) {
        setError(signInError.message)
        throw signInError
      }
    },
    [supabase]
  )

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      setIsSubmitting(true)
      setError(null)

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      setIsSubmitting(false)

      if (signUpError) {
        setError(signUpError.message)
        throw signUpError
      }
    },
    [supabase]
  )

  const signInWithGoogle = useCallback(async () => {
    setIsSubmitting(true)
    setError(null)

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setIsSubmitting(false)

    if (googleError) {
      setError(googleError.message)
      throw googleError
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    setIsSubmitting(true)
    setError(null)

    const { error: signOutError } = await supabase.auth.signOut()

    setIsSubmitting(false)

    if (signOutError) {
      setError(signOutError.message)
      throw signOutError
    }
  }, [supabase])

  const updateProfile = useCallback(
    async (data: Partial<Profile>) => {
      if (!user) throw new Error('Not authenticated')

      setIsSubmitting(true)
      setError(null)

      // Extract only the updatable fields
      const updateData: Record<string, unknown> = {}
      if (data.username !== undefined) updateData.username = data.username
      if (data.display_name !== undefined) updateData.display_name = data.display_name
      if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url
      if (data.bio !== undefined) updateData.bio = data.bio
      if (data.favorite_art_styles !== undefined) updateData.favorite_art_styles = data.favorite_art_styles
      if (data.explorer_level !== undefined) updateData.explorer_level = data.explorer_level

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)

      setIsSubmitting(false)

      if (updateError) {
        setError(updateError.message)
        throw updateError
      }

      await refreshProfile()
    },
    [user, supabase, refreshProfile]
  )

  const resetPassword = useCallback(
    async (email: string) => {
      setIsSubmitting(true)
      setError(null)

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      )

      setIsSubmitting(false)

      if (resetError) {
        setError(resetError.message)
        throw resetError
      }
    },
    [supabase]
  )

  return {
    user,
    profile,
    isLoading,
    isAuthenticated,
    isSubmitting,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    updateProfile,
    resetPassword,
    refreshProfile,
  }
}
