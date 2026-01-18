import React from 'react'
import Section from '@/components/ui/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outils d\'analyse',
  description: 'Outils d\'analyse territoriale et d\'aide à la décision pour investisseurs immobiliers.',
}

/**
 * Outils Page - Page présentant les outils d'analyse
 */
export default function OutilsPage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-neutral-900 mb-6">
          Outils d'analyse territoriale
        </h1>
        <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
          Accédez à l'ensemble des outils pour analyser, comparer et explorer les territoires français.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-8">
          <p className="text-primary-900">
            🚧 Page en construction - Outils à venir
          </p>
        </div>
      </div>
    </Section>
  )
}
