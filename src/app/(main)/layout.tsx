import { BottomNav } from '@/components/layout'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  )
}
