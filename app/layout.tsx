// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FloatingIconsBackground } from '@/components/FloatingIconsBackground'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aumento de Seguidores',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${_geist.className} font-sans antialiased`}>
        <FloatingIconsBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
