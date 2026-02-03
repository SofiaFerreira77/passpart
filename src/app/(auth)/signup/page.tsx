'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Mail, Lock, Chrome, Check } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { useAuth } from '@/lib/hooks'
import { PageTransition } from '@/components/layout'

export default function SignupPage() {
  const router = useRouter()
  const { signUpWithEmail, signInWithGoogle, isSubmitting } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
    terms?: string
  }>({})

  const passwordRequirements = [
    { test: (p: string) => p.length >= 8, label: 'At least 8 characters' },
    { test: (p: string) => /[A-Z]/.test(p), label: 'One uppercase letter' },
    { test: (p: string) => /[a-z]/.test(p), label: 'One lowercase letter' },
    { test: (p: string) => /[0-9]/.test(p), label: 'One number' },
  ]

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (!passwordRequirements.every((req) => req.test(password))) {
      newErrors.password = 'Password does not meet requirements'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await signUpWithEmail(email, password)
      toast.success('Account created! Check your email to verify.')
      router.push('/onboarding')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create account')
    }
  }

  const handleGoogleSignup = async () => {
    if (!acceptTerms) {
      setErrors({ terms: 'You must accept the terms' })
      return
    }

    try {
      await signInWithGoogle()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to sign up with Google')
    }
  }

  return (
    <PageTransition variant="slideUp">
      <Card padding="lg" className="w-full">
        <form onSubmit={handleEmailSignup} className="space-y-4">
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

          <div>
            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              leftIcon={<Lock className="w-5 h-5" />}
              autoComplete="new-password"
            />
            {password && (
              <ul className="mt-2 space-y-1">
                {passwordRequirements.map((req, i) => (
                  <li
                    key={i}
                    className={`text-xs flex items-center gap-1.5 ${
                      req.test(password)
                        ? 'text-accent-600'
                        : 'text-foreground-muted'
                    }`}
                  >
                    <Check className={`w-3 h-3 ${req.test(password) ? 'opacity-100' : 'opacity-30'}`} />
                    {req.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            leftIcon={<Lock className="w-5 h-5" />}
            autoComplete="new-password"
          />

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-foreground-secondary">
              I agree to the{' '}
              <Link href="/terms" className="text-primary-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-600 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-sm text-error">{errors.terms}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isSubmitting}
          >
            Create Account
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
          onClick={handleGoogleSignup}
          leftIcon={<Chrome className="w-5 h-5" />}
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm text-foreground-muted mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </PageTransition>
  )
}
