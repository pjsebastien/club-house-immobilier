import React from 'react'
import Section from '@/components/ui/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explorer les quartiers',
  description: 'Analysez les quartiers français en détail. Données locales pour affiner votre stratégie d\'investissement.',
}

/**
 * Quartiers Page - Page d'exploration des quartiers
 */
export default function QuartiersPage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-neutral-900 mb-6">
          Explorer les quartiers
        </h1>
        <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
          Descendez au niveau quartier pour une analyse territoriale fine et précise.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
          <p className="text-primary-900">
            🚧 Page en construction - Les données et outils seront intégrés prochainement
          </p>
        </div>
      </div>
    </Section>
  )
}
