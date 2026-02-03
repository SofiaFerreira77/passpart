'use client'

import { BookOpen } from 'lucide-react'
import { Skeleton } from '@/components/ui'
import { PageTransition } from '@/components/layout'

export default function PassportPage() {
  return (
    <PageTransition variant="fade">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-accent-600" />
        </div>

        <h1 className="text-2xl font-bold font-serif text-foreground mb-2">
          Your Art Passport
        </h1>

        <p className="text-foreground-muted max-w-sm mb-8">
          Collect stamps from every artwork and venue you visit.
          Build your personal cultural journey one stamp at a time.
        </p>

        {/* Preview skeleton of stamp grid */}
        <div className="w-full max-w-md">
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                className="aspect-square rounded-xl"
              />
            ))}
          </div>
        </div>

        <p className="text-sm text-foreground-muted mt-8">
          Start collecting stamps to fill your passport...
        </p>
      </div>
    </PageTransition>
  )
}
