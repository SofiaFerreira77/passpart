import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if URL is valid (not a placeholder)
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export function createClient(): SupabaseClient {
  if (!isValidUrl(supabaseUrl) || !supabaseAnonKey || supabaseAnonKey.includes('your_')) {
    // Return a mock client for build time / when env vars are missing
    // This allows the app to build without Supabase credentials
    console.warn('Supabase credentials not configured')
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Not configured') }),
        signUp: async () => ({ data: { user: null, session: null }, error: new Error('Not configured') }),
        signInWithOAuth: async () => ({ data: { provider: '', url: '' }, error: new Error('Not configured') }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ data: {}, error: null }),
      },
      from: () => ({
        select: () => ({ single: async () => ({ data: null, error: null }), eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ error: null }) }),
        insert: () => ({ error: null }),
      }),
    } as unknown as SupabaseClient
  }

  return createBrowserClient(supabaseUrl!, supabaseAnonKey!)
}

// Singleton instance for client-side usage
let clientInstance: SupabaseClient | null = null

export function getClient(): SupabaseClient {
  if (!clientInstance) {
    clientInstance = createClient()
  }
  return clientInstance
}
