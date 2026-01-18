import React from 'react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sources de données',
  description: 'Découvrez les sources de données officielles utilisées par Club House Immobilier.',
}

/**
 * Sources Page - Présentation des sources de données
 */
export default function SourcesPage() {
  return (
    <>
      <Section>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-neutral-900 mb-6">
            Sources de données
          </h1>
          <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
            Toutes les données présentées sur Club House Immobilier proviennent de sources
            officielles et publiques, garantissant fiabilité et transparence.
          </p>

          <div className="space-y-6">
            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-primary-600">IN</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    INSEE
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    L'Institut national de la statistique et des études économiques fournit
                    les données démographiques, économiques et sociales des territoires français.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Population et démographie
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Revenus et niveau de vie
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Emploi et activité économique
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-primary-600">DV</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    DVF / Etalab
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    Demande de Valeurs Foncières : base de données open data des transactions
                    immobilières en France, mise à disposition par Etalab.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Prix de vente immobiliers
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Volume de transactions
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      Évolution des marchés locaux
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-neutral-50">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Mises à jour
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                Les données sont mises à jour régulièrement selon les calendriers de publication
                des organismes officiels. La date de dernière mise à jour sera indiquée pour
                chaque indicateur.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
