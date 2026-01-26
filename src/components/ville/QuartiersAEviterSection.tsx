import React from 'react'
import { Ville } from '@/types/ville'
import { getQuartiersAEviter, QuartierAEviter } from '@/lib/scoring-quartiers'
import { villeToSlug } from '@/lib/data'
import Link from 'next/link'

interface QuartiersAEviterSectionProps {
  ville: Ville
}

/**
 * QuartiersAEviterSection - Affiche les quartiers présentant des indicateurs
 * moins favorables pour l'investissement immobilier
 */
export default function QuartiersAEviterSection({ ville }: QuartiersAEviterSectionProps) {
  const allQuartiersAEviter = getQuartiersAEviter(ville.quartiers, 50)
  const quartiersPrincipaux = allQuartiersAEviter.slice(0, 12)
  const quartiersSecondaires = allQuartiersAEviter.slice(12)

  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPercent = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num) + '%'
  }

  const getScoreBadgeColor = (score: number): string => {
    if (score >= 75) return 'bg-green-100 text-green-700 border-green-300'
    if (score >= 65) return 'bg-blue-100 text-blue-700 border-blue-300'
    if (score >= 55) return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    return 'bg-orange-100 text-orange-700 border-orange-300'
  }

  const getRaisonIcon = (type: string): string => {
    switch (type) {
      case 'vacance': return '🏚️'
      case 'population': return '👥'
      case 'transactions': return '📉'
      case 'score': return '📊'
      case 'residences': return '🏠'
      default: return '•'
    }
  }

  if (allQuartiersAEviter.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-green-800 mb-2">
              Aucun quartier ne présente d'indicateurs particulièrement défavorables
            </h2>
            <p className="text-green-700">
              Tous les quartiers de {ville.nom} affichent des indicateurs dans les normes.
              Consultez la page principale pour découvrir les meilleurs quartiers où investir.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="prose prose-lg max-w-none">
          {/* Liste des quartiers principaux (12 premiers) */}
          <div className="space-y-6">
            {quartiersPrincipaux.map((item: QuartierAEviter, index: number) => {
              const { quartier, score: scoreDetail, raisons } = item
              const stats = quartier.stats_insee
              const nbLogements = stats.logements?.total
              const nbVentes = (quartier.dvf_appartements?.nb_ventes || 0) + (quartier.dvf_maisons?.nb_ventes || 0)

              return (
                <div
                  key={quartier.iris_id}
                  className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-orange-200 transition-all"
                >
                  {/* Header du quartier */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-neutral-400">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900">
                          {quartier.nom_quartier || quartier.nom}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600">
                        Code IRIS : {quartier.iris_id}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border-2 font-bold ${getScoreBadgeColor(scoreDetail.score_total)}`}>
                      Score : {scoreDetail.score_total}/100
                    </div>
                  </div>

                  {/* Statistiques clés */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="text-xs text-neutral-500 mb-1">Population</div>
                      <div className="text-lg font-bold text-neutral-900">
                        {formatNumber(stats.population)}
                      </div>
                    </div>
                    {nbLogements && (
                      <div className="bg-neutral-50 rounded-lg p-3">
                        <div className="text-xs text-neutral-500 mb-1">Logements</div>
                        <div className="text-lg font-bold text-neutral-900">
                          {formatNumber(nbLogements)}
                        </div>
                      </div>
                    )}
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="text-xs text-neutral-500 mb-1">Taux vacance</div>
                      <div className={`text-lg font-bold ${
                        stats.taux_vacance_pct > 12 ? 'text-red-600' :
                        stats.taux_vacance_pct > 10 ? 'text-orange-600' :
                        stats.taux_vacance_pct > 8 ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {formatPercent(stats.taux_vacance_pct)}
                      </div>
                    </div>
                    <div className="bg-neutral-50 rounded-lg p-3">
                      <div className="text-xs text-neutral-500 mb-1">Transactions DVF</div>
                      <div className={`text-lg font-bold ${nbVentes < 5 ? 'text-orange-600' : 'text-neutral-900'}`}>
                        {nbVentes}
                      </div>
                    </div>
                  </div>

                  {/* Raisons factuelles */}
                  {raisons.length > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="text-sm font-semibold text-orange-800 mb-3">
                        Indicateurs observés :
                      </div>
                      <div className="space-y-3">
                        {raisons.map((raison, raisonIndex) => (
                          <div key={raisonIndex} className="flex items-start gap-3">
                            <span className="text-lg flex-shrink-0">{getRaisonIcon(raison.type)}</span>
                            <div>
                              <div className="font-medium text-neutral-900">
                                {raison.label} : <span className="text-orange-700">{raison.valeur}</span>
                              </div>
                              <p className="text-sm text-neutral-600 mt-1">
                                {raison.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quartiers secondaires (au-delà des 12 premiers) */}
          {quartiersSecondaires.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-neutral-700 mb-4">
                Autres quartiers à surveiller ({quartiersSecondaires.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quartiersSecondaires.map((item: QuartierAEviter, index: number) => {
                  const { quartier, score: scoreDetail } = item
                  const stats = quartier.stats_insee
                  const nbVentes = (quartier.dvf_appartements?.nb_ventes || 0) + (quartier.dvf_maisons?.nb_ventes || 0)

                  return (
                    <div
                      key={quartier.iris_id}
                      className="bg-neutral-50 border border-neutral-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-800 text-sm">
                            {quartier.nom_quartier || quartier.nom}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-1">
                            {quartier.iris_id}
                          </p>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full border font-medium ${getScoreBadgeColor(scoreDetail.score_total)}`}>
                          {scoreDetail.score_total}/100
                        </div>
                      </div>
                      <div className="flex gap-4 mt-3 text-xs text-neutral-600">
                        <span>Vacance: {formatPercent(stats.taux_vacance_pct)}</span>
                        <span>DVF: {nbVentes} ventes</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Section nuances */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Contexte et nuances
            </h3>
            <div className="space-y-4 text-blue-800">
              <p>
                Les indicateurs présentés ci-dessus sont des données statistiques objectives.
                Ils ne portent aucun jugement sur la qualité de vie ou les habitants de ces quartiers.
              </p>
              <p>
                Certains de ces quartiers peuvent présenter des opportunités pour des profils
                d'investisseurs spécifiques :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Quartiers en cours de rénovation urbaine avec potentiel de plus-value</li>
                <li>Zones où les prix bas permettent des rendements locatifs élevés</li>
                <li>Secteurs adaptés à la location sociale ou conventionnée</li>
              </ul>
              <p className="font-medium">
                Une visite sur place et l'avis de professionnels locaux restent indispensables
                avant toute décision d'investissement.
              </p>
            </div>
          </div>

          {/* Liens connexes */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href={`/villes/${villeToSlug(ville.nom)}`}
              className="flex-1 bg-primary-600 text-white text-center py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Voir l'analyse complète de {ville.nom}
            </Link>
            <Link
              href="/villes"
              className="flex-1 bg-neutral-100 text-neutral-900 text-center py-4 px-6 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
            >
              Comparer avec d'autres villes
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
