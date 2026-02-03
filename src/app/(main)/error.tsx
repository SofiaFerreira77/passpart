'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-error" />
      </div>

      <h2 className="text-xl font-bold font-serif text-foreground mb-2">
        Something went wrong
      </h2>

      <p className="text-foreground-muted max-w-sm mb-6">
        We encountered an error while loading this page. Please try again or contact support if the problem persists.
      </p>

      <div className="flex gap-3">
        <Button onClick={reset} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Try Again
        </Button>
        <Button
          variant="secondary"
          onClick={() => window.location.href = '/map'}
        >
          Go to Map
        </Button>
      </div>

      {error.digest && (
        <p className="text-xs text-foreground-muted mt-6">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  )
}
