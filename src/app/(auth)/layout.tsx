export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-foreground">
            Passpart
          </h1>
          <p className="text-foreground-muted mt-2">
            Your digital passport for art
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
