import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Passpart - Your Digital Passport for Art',
    template: '%s | Passpart',
  },
  description:
    'Document your cultural journey. Discover art nearby, stamp your visits, and connect with fellow art lovers.',
  keywords: ['art', 'museum', 'gallery', 'passport', 'travel', 'culture', 'stamps'],
  authors: [{ name: 'Passpart' }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Passpart',
    title: 'Passpart - Your Digital Passport for Art',
    description:
      'Document your cultural journey. Discover art nearby, stamp your visits, and connect with fellow art lovers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passpart - Your Digital Passport for Art',
    description:
      'Document your cultural journey. Discover art nearby, stamp your visits, and connect with fellow art lovers.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#D4A574',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#FFFFFF',
                color: '#2C2416',
                border: '1px solid #F2DCC4',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#4A6B52',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#C77B8B',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
