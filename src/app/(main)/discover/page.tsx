'use client'

import { Compass } from 'lucide-react'
import { Skeleton } from '@/components/ui'
import { PageTransition } from '@/components/layout'

export default function DiscoverPage() {
  return (
    <PageTransition variant="fade">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-6">
          <Compass className="w-10 h-10 text-primary-600" />
        </div>

        <h1 className="text-2xl font-bold font-serif text-foreground mb-2">
          Discover New Experiences
        </h1>

        <p className="text-foreground-muted max-w-sm mb-8">
          Find trending exhibitions, hidden gems, and see what your friends are exploring.
          Your next cultural adventure awaits.
        </p>

        {/* Preview skeleton of discovery feed */}
        <div className="w-full max-w-md space-y-4">
          <Skeleton variant="rectangular" height={160} className="rounded-2xl" />
          <div className="flex gap-3 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={140}
                height={100}
                className="rounded-xl flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-foreground-muted mt-8">
          Discovery feed coming soon...
        </p>
      </div>
    </PageTransition>
  )
}
