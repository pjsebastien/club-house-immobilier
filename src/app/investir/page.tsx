import React from 'react'
import Section from '@/components/ui/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investir dans l\'immobilier',
  description: 'Guides et ressources pour comprendre l\'investissement immobilier territorial en France.',
}

/**
 * Investir Page - Page ressources sur l'investissement immobilier
 */
export default function InvestirPage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-neutral-900 mb-6">
          Investir dans l'immobilier
        </h1>
        <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
          Ressources et guides pour comprendre les enjeux de l'investissement immobilier territorial.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
          <p className="text-primary-900">
            🚧 Page en construction - Contenus à venir
          </p>
        </div>
      </div>
    </Section>
  )
}
