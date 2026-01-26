import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { Metadata } from 'next'
import { getAllVilles, villeToSlug } from '@/lib/data'
import { getQuartiersAEviter } from '@/lib/scoring-quartiers'
import { calculateInvestmentScore } from '@/lib/scoring'

export const metadata: Metadata = {
  title: 'Explorer les quartiers - Analyse par ville',
  description: 'Analysez les quartiers français en détail. Découvrez les quartiers à surveiller pour vos investissements immobiliers dans les 134 plus grandes villes de France.',
}

/**
 * Quartiers Page - Page d'exploration des quartiers
 */
export default function QuartiersPage() {
  const villes = getAllVilles()

  // Grouper les villes par région
  const villesParRegion = villes.reduce((acc, ville) => {
    const region = ville.region.name
    if (!acc[region]) {
      acc[region] = []
    }
    acc[region].push(ville)
    return acc
  }, {} as Record<string, typeof villes>)

  // Trier les régions par nom
  const regionsTriees = Object.keys(villesParRegion).sort()

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Explorer les quartiers
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Analysez les quartiers des 134 plus grandes villes de France.
              Accédez aux données locales pour affiner votre stratégie d'investissement.
            </p>
          </div>
        </Container>
      </section>

      {/* Section quartiers à surveiller */}
      <Section background="white">
        <Container>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Quartiers à surveiller par ville
            </h2>
            <p className="text-neutral-600 max-w-3xl">
              Pour chaque ville, découvrez les quartiers présentant des indicateurs moins favorables
              pour l'investissement immobilier. Analyse basée sur les données officielles INSEE.
            </p>
          </div>

          {/* Liste par région */}
          <div className="space-y-10">
            {regionsTriees.map((region) => (
              <div key={region}>
                <h3 className="text-lg font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-200">
                  {region}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {villesParRegion[region]
                    .sort((a, b) => a.nom.localeCompare(b.nom))
                    .map((ville) => {
                      const villeScore = calculateInvestmentScore(ville, villes)
                      const nbQuartiersAEviter = getQuartiersAEviter(ville.quartiers, 50, villeScore.score_total).length
                      return (
                        <Link
                          key={ville.code_insee}
                          href={`/villes/${villeToSlug(ville.nom)}/quartiers-a-eviter`}
                          className="group bg-white border border-neutral-200 rounded-lg p-3 hover:border-orange-300 hover:shadow-md transition-all"
                        >
                          <div className="font-medium text-neutral-900 group-hover:text-orange-600 transition-colors text-sm">
                            {ville.nom}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs text-neutral-500">
                              {ville.nb_quartiers_iris} quartiers
                            </div>
                            {nbQuartiersAEviter > 0 && (
                              <div className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                                {nbQuartiersAEviter} à éviter
                              </div>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Explication */}
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-neutral-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                Comment interpréter ces données ?
              </h3>
              <div className="space-y-4 text-neutral-700">
                <p>
                  Les pages "quartiers à surveiller" identifient les zones présentant des indicateurs
                  statistiques moins favorables pour l'investissement locatif classique. Un quartier est signalé
                  s'il remplit au moins 2 des critères suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Taux de vacance élevé</strong> : plus de 10% de logements inoccupés</li>
                  <li><strong>Score d'investissement bas</strong> : inférieur à 55/100</li>
                  <li><strong>Population limitée</strong> : moins de 500 habitants</li>
                  <li><strong>Faible part de résidences principales</strong> : moins de 70% du parc immobilier</li>
                  <li><strong>Pression résidentielle faible</strong> : score inférieur à 2/5</li>
                  <li><strong>Forte proportion de seniors</strong> : plus de 35% de 60 ans et plus</li>
                  <li><strong>Faible stabilité résidentielle</strong> : forte rotation des habitants</li>
                </ul>
                <p className="text-sm text-neutral-500 mt-6">
                  Ces informations sont fournies à titre indicatif et ne constituent pas un conseil en investissement.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
