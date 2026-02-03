'use client'

import { User } from 'lucide-react'
import { Skeleton, SkeletonAvatar } from '@/components/ui'
import { PageTransition } from '@/components/layout'

export default function ProfilePage() {
  return (
    <PageTransition variant="fade">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center mb-6">
          <User className="w-10 h-10 text-accent-600" />
        </div>

        <h1 className="text-2xl font-bold font-serif text-foreground mb-2">
          Your Profile
        </h1>

        <p className="text-foreground-muted max-w-sm mb-8">
          Track your progress, view achievements, and connect with other art enthusiasts.
          Your journey, your story.
        </p>

        {/* Preview skeleton of profile */}
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center gap-4">
            <SkeletonAvatar size="lg" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>

          <div className="flex justify-around">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-1">
                <Skeleton variant="text" width={40} className="mx-auto" />
                <Skeleton variant="text" width={60} className="mx-auto" />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                variant="circular"
                width={48}
                height={48}
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-foreground-muted mt-8">
          Profile customization coming soon...
        </p>
      </div>
    </PageTransition>
  )
}
