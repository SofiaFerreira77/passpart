import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make your app vulnerable.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protected routes - require authentication
  const protectedPaths = ['/map', '/passport', '/discover', '/profile', '/activity']
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  // Auth routes - redirect if already authenticated
  const authPaths = ['/login', '/signup']
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath && !user) {
    // Redirect to login if trying to access protected route without auth
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPath && user) {
    // Redirect to map if already authenticated
    const url = request.nextUrl.clone()
    url.pathname = '/map'
    return NextResponse.redirect(url)
  }

  // Check if user needs onboarding (profile incomplete)
  if (user && isProtectedPath && pathname !== '/onboarding') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()

    if (!profile?.username) {
      const url = request.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
