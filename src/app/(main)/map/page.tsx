'use client'

import { Map } from 'lucide-react'
import { Skeleton } from '@/components/ui'
import { PageTransition } from '@/components/layout'

export default function MapPage() {
  return (
    <PageTransition variant="fade">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mb-6">
          <Map className="w-10 h-10 text-primary-600" />
        </div>

        <h1 className="text-2xl font-bold font-serif text-foreground mb-2">
          Discover Art Near You
        </h1>

        <p className="text-foreground-muted max-w-sm mb-8">
          Explore museums, galleries, and street art on an interactive map.
          Find hidden gems and track your cultural journey.
        </p>

        {/* Preview skeleton of what's coming */}
        <div className="w-full max-w-md space-y-4">
          <Skeleton variant="rectangular" height={200} className="rounded-2xl" />
          <div className="flex gap-2">
            <Skeleton variant="rectangular" height={80} className="flex-1 rounded-xl" />
            <Skeleton variant="rectangular" height={80} className="flex-1 rounded-xl" />
          </div>
        </div>

        <p className="text-sm text-foreground-muted mt-8">
          Map experience coming soon...
        </p>
      </div>
    </PageTransition>
  )
}
