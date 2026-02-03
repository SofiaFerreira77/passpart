'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Mail, Lock, Chrome } from 'lucide-react'
import { Button, Input, Card, Skeleton } from '@/components/ui'
import { useAuth } from '@/lib/hooks'
import { PageTransition } from '@/components/layout'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/map'

  const { signInWithEmail, signInWithGoogle, isSubmitting } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await signInWithEmail(email, password)
      toast.success('Welcome back!')
      router.push(redirect)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to sign in')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to sign in with Google')
    }
  }

  return (
    <PageTransition variant="slideUp">
      <Card padding="lg" className="w-full">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            leftIcon={<Mail className="w-5 h-5" />}
            autoComplete="email"
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            leftIcon={<Lock className="w-5 h-5" />}
            autoComplete="current-password"
          />

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary-100" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface text-foreground-muted">
              or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full"
          size="lg"
          onClick={handleGoogleLogin}
          leftIcon={<Chrome className="w-5 h-5" />}
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm text-foreground-muted mt-6">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </PageTransition>
  )
}

function LoginFormSkeleton() {
  return (
    <Card padding="lg" className="w-full">
      <div className="space-y-4">
        <Skeleton variant="rectangular" height={44} />
        <Skeleton variant="rectangular" height={44} />
        <Skeleton variant="rectangular" height={44} />
      </div>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}
