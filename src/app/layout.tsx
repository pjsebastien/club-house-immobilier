import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import JsonLd from '@/components/seo/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.clubhouseimmobilier.com'),
  title: {
    default: 'Club House Immobilier - Où investir dans l\'immobilier en France',
    template: '%s | Club House Immobilier'
  },
  description: 'Trouvez où investir dans l\'immobilier en France. Analyse de 134 villes et 6 577 quartiers avec données officielles INSEE et DVF : prix, scores et classements.',
  authors: [{ name: 'Club House Immobilier' }],
  creator: 'Club House Immobilier',
  publisher: 'Club House Immobilier',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Club House Immobilier',
    title: 'Club House Immobilier - Où investir dans l\'immobilier en France',
    description: 'Trouvez où investir dans l\'immobilier en France. Analyse de 134 villes et 6 577 quartiers avec données officielles INSEE et DVF.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Club House Immobilier - Investissement immobilier en France',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Club House Immobilier',
    description: 'Trouvez où investir dans l\'immobilier en France. Analyse de 134 villes avec données officielles INSEE et DVF.',
    images: ['/images/og-default.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Club House Immobilier',
            url: 'https://www.clubhouseimmobilier.com',
            description: 'Trouvez où investir dans l\'immobilier en France. Analyse de 134 villes et 6 577 quartiers avec données officielles INSEE et DVF.',
            inLanguage: 'fr-FR',
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Club House Immobilier',
            url: 'https://www.clubhouseimmobilier.com',
            logo: 'https://www.clubhouseimmobilier.com/images/logo.png',
            description: 'Analyse territoriale et outils d\'aide à la décision pour investisseurs immobiliers.',
          }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
