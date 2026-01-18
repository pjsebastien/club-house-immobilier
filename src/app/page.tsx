import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AudienceSection from '@/components/sections/AudienceSection'
import ToolsSection from '@/components/sections/ToolsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ResponsibleApproachSection from '@/components/sections/ResponsibleApproachSection'

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
