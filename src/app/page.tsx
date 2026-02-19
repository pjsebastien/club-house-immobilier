import React from 'react'
import { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AudienceSection from '@/components/sections/AudienceSection'
import ToolsSection from '@/components/sections/ToolsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ResponsibleApproachSection from '@/components/sections/ResponsibleApproachSection'

export const metadata: Metadata = {
  title: 'Club House Immobilier - Analyse territoriale pour investisseurs',
  description: 'Explorez et analysez les territoires français grâce à des données officielles INSEE et DVF. 134 villes et 6 577 quartiers IRIS pour éclairer vos décisions d\'investissement immobilier.',
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
