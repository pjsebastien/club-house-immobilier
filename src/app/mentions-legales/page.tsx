import React from 'react'
import Section from '@/components/ui/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Club House Immobilier.',
}

/**
 * Mentions Légales Page
 */
export default function MentionsLegalesPage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-neutral-900 mb-6">
          Mentions légales
        </h1>

        <div className="prose prose-neutral max-w-none">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 mb-8">
            <p className="text-primary-900 m-0">
              📋 Cette page sera complétée avec les mentions légales conformes à la législation française.
            </p>
          </div>

          <h2>Éditeur du site</h2>
          <p className="text-neutral-600">
            Informations à compléter (raison sociale, adresse, SIRET, etc.)
          </p>

          <h2>Hébergement</h2>
          <p className="text-neutral-600">
            Informations à compléter (nom de l'hébergeur, adresse, coordonnées)
          </p>

          <h2>Propriété intellectuelle</h2>
          <p className="text-neutral-600">
            Le contenu de ce site (textes, images, graphiques, logos) est la propriété exclusive
            de Club House Immobilier, sauf mention contraire.
          </p>

          <h2>Données personnelles</h2>
          <p className="text-neutral-600">
            Voir notre <a href="/politique-confidentialite" className="text-primary-600 hover:text-primary-700">
            Politique de confidentialité
            </a> pour plus d'informations sur le traitement des données personnelles.
          </p>
        </div>
      </div>
    </Section>
  )
}
