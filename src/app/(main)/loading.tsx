import { Skeleton } from '@/components/ui'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-6">
      {/* Animated logo placeholder */}
      <div className="w-16 h-16 rounded-full bg-primary-200 animate-pulse-soft mb-6" />

      <Skeleton variant="text" width={200} className="mb-2" />
      <Skeleton variant="text" width={150} />
    </div>
  )
}
