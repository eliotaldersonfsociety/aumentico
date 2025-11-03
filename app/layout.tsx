// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FloatingIconsBackground } from '@/components/FloatingIconsBackground'
import { SpeedInsights } from "@vercel/speed-insights/next"

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Aumento de Seguidores',
    template: '%s | Aumento de Seguidores',
  },
  description:
    'Obtén seguidores reales en tus redes sociales de forma rápida, segura y al mejor precio. Compatible con Instagram, TikTok, Facebook y más.',
  generator: 'Next.js',
  applicationName: 'Aumento de Seguidores',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'seguidores',
    'aumento de seguidores',
    'comprar seguidores',
    'Instagram',
    'TikTok',
    'Facebook',
    'Twitter',
    'YouTube',
    'redes sociales',
    'crecimiento orgánico',
    'marketing digital',
  ],
  authors: [{ url: 'https://aumentodeseguidores.com' }],
  publisher: 'Aumento de Seguidores',
  metadataBase: new URL('https://aumentodeseguidores.com'),

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://aumentodeseguidores.com',
    title: 'Aumento de Seguidores',
    description:
      'Aumenta tus seguidores en redes sociales con herramientas seguras y efectivas. Instagram, TikTok, Facebook y más.',
    siteName: 'Aumento de Seguidores',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Aumento de Seguidores - Portada',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Aumento de Seguidores',
    description:
      'Herramienta para aumentar tus seguidores en redes sociales de manera efectiva y segura.',
    creator: '@aumentodeseguidores',
    images: ['/1.webp'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/1.webp',
  },

  manifest: '/site.webmanifest',

  alternates: {
    canonical: 'https://aumentodeseguidores.com',
    languages: {
      'es-ES': 'https://aumentodeseguidores.com/es',
      'en-US': 'https://aumentodeseguidores.com/en',
    },
  },

  category: 'marketing digital',
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
        <SpeedInsights />
      </body>
    </html>
  )
}
