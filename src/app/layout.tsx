import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Club House Immobilier - Analyse territoriale pour investisseurs',
    template: '%s | Club House Immobilier'
  },
  description: 'Explorez et analysez les territoires français grâce à des données officielles. Outils d\'aide à la décision pour investisseurs immobiliers.',
  keywords: ['immobilier', 'investissement', 'analyse territoriale', 'données INSEE', 'DVF', 'villes françaises', 'quartiers'],
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
    title: 'Club House Immobilier - Analyse territoriale pour investisseurs',
    description: 'Explorez et analysez les territoires français grâce à des données officielles.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Club House Immobilier',
    description: 'Explorez et analysez les territoires français grâce à des données officielles.',
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
