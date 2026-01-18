import React from 'react'
import Section from '@/components/ui/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles.',
}

/**
 * Politique de Confidentialité Page
 */
export default function PolitiqueConfidentialitePage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-neutral-900 mb-6">
          Politique de confidentialité
        </h1>

        <div className="prose prose-neutral max-w-none">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 mb-8">
            <p className="text-primary-900 m-0">
              🔒 Cette page sera complétée avec la politique de confidentialité conforme au RGPD.
            </p>
          </div>

          <h2>Collecte des données</h2>
          <p className="text-neutral-600">
            Informations sur les données collectées, leur finalité et leur durée de conservation.
          </p>

          <h2>Utilisation des données</h2>
          <p className="text-neutral-600">
            Explication de l'utilisation des données personnelles collectées.
          </p>

          <h2>Cookies</h2>
          <p className="text-neutral-600">
            Information sur l'utilisation des cookies et technologies similaires.
          </p>

          <h2>Vos droits</h2>
          <p className="text-neutral-600">
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
            d'effacement et de portabilité de vos données personnelles.
          </p>

          <h2>Contact</h2>
          <p className="text-neutral-600">
            Pour toute question relative à la protection de vos données personnelles,
            vous pouvez nous contacter à l'adresse : [email à définir]
          </p>
        </div>
      </div>
    </Section>
  )
}
