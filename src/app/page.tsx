import React from 'react'
import { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AudienceSection from '@/components/sections/AudienceSection'
import ToolsSection from '@/components/sections/ToolsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ResponsibleApproachSection from '@/components/sections/ResponsibleApproachSection'

export const metadata: Metadata = {
  title: 'Club House Immobilier - Où investir dans l\'immobilier en France',
  description: 'Trouvez où investir dans l\'immobilier en France. Analyse de 134 villes et 6 577 quartiers avec données INSEE et DVF : prix au m², scores et classements.',
  alternates: {
    canonical: '/',
  },
}

/**
 * Home Page - Page d'accueil du site Club House Immobilier
 * Présente la mission, les outils et l'approche du site
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AudienceSection />
      <ToolsSection />
      <HowItWorksSection />
      <ResponsibleApproachSection />
    </>
  )
}
