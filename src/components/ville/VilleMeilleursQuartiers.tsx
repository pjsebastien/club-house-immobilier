import React from 'react'
import { Ville } from '@/types/ville'
import { calculateAllQuartiersScores } from '@/lib/scoring-quartiers'

interface VilleMeilleursQuartiersProps {
  ville: Ville
}

/**
 * VilleMeilleursQuartiers - Contenu SEO pour "meilleurs quartiers pour investir à {ville}"
 */
export default function VilleMeilleursQuartiers({ ville }: VilleMeilleursQuartiersProps) {
  const quartiersWithScores = calculateAllQuartiersScores(ville.quartiers)
  const quartiersValides = quartiersWithScores
    .filter(({ quartier }) => quartier.stats_insee.population && quartier.stats_insee.population > 0)
    .sort((a, b) => b.score.score_total - a.score.score_total)

  const top5Quartiers = quartiersValides.slice(0, 5)
  const statsGlobales = ville.stats_agregees

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

  return (
    <section id="meilleurs-quartiers" className="py-12 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="prose prose-lg max-w-none">
          {/* Titre principal H2 pour SEO */}
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Les meilleurs quartiers pour investir à {ville.nom}
          </h2>

          <div className="text-base text-neutral-700 leading-relaxed space-y-4 mb-8">
            <p>
              Identifier les <strong>meilleurs quartiers pour investir à {ville.nom}</strong> permet de mieux comprendre
              le marché locatif local. {ville.nom} compte {ville.nb_quartiers_iris} quartiers IRIS, chacun avec ses propres
              caractéristiques démographiques, son niveau de prix, et ses spécificités.
            </p>

            <p>
              Cette analyse se base sur les données officielles de l'INSEE et des fichiers DVF (Demandes de Valeurs Foncières)
              pour comparer objectivement les quartiers de {ville.nom}. Chaque quartier est évalué selon plusieurs critères :
              démographie, taux de vacance, prix au m², et dynamisme du marché. Ces informations sont fournies à titre indicatif
              et ne constituent pas un conseil en investissement.
            </p>
          </div>

          {/* Top 5 des meilleurs quartiers */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Top 5 des quartiers à {ville.nom}
            </h3>

            <div className="space-y-4">
              {top5Quartiers.map(({ quartier, score: scoreDetail }, index) => {
                const stats = quartier.stats_insee
                const rang = index + 1
                const score = scoreDetail.score_total

                // Calculer les valeurs dérivées
                const tauxVacance = stats.taux_vacance_pct
                const pctResidencesPrincipales = stats.logements && stats.logements.total > 0
                  ? (stats.logements.residences_principales / stats.logements.total) * 100
                  : null
                const nbLogements = stats.logements?.total

                return (
                  <div key={quartier.iris_id} className="bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-primary-300 transition-all hover:shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                            rang === 1 ? 'bg-yellow-500' :
                            rang === 2 ? 'bg-gray-400' :
                            rang === 3 ? 'bg-orange-600' :
                            'bg-primary-500'
                          }`}>
                            {rang}
                          </div>
                          <h4 className="text-xl font-bold text-neutral-900">
                            {quartier.nom_quartier || quartier.nom}
                          </h4>
                        </div>
                        <p className="text-sm text-neutral-600">
                          Code IRIS : {quartier.iris_id}
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full border-2 font-bold ${getScoreBadgeColor(score)}`}>
                        Score : {(score || 0).toFixed(1)}/100
                      </div>
                    </div>

                    {/* Description du quartier */}
                    <div className="mb-4">
                      <p className="text-neutral-700 leading-relaxed">
                        <strong>{quartier.nom_quartier || quartier.nom}</strong> arrive en <strong>position #{rang}</strong> dans notre classement des meilleurs quartiers pour investir à {ville.nom}.
                        {stats.population && ` Ce quartier compte ${formatNumber(stats.population)} habitants`}
                        {tauxVacance !== null && tauxVacance < 6 && ' et bénéficie d\'un marché locatif très tendu'}
                        {stats.pct_15_29_ans !== null && stats.pct_15_29_ans > 20 && ', avec une forte proportion de jeunes actifs et étudiants'}
                        {pctResidencesPrincipales !== null && pctResidencesPrincipales > 85 && ', garantissant la stabilité du marché locatif'}.
                      </p>
                    </div>

                    {/* Statistiques clés du quartier - Grid amélioré */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
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
                      {tauxVacance !== null && (
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <div className="text-xs text-neutral-500 mb-1">Taux vacance</div>
                          <div className={`text-lg font-bold ${
                            tauxVacance < 6 ? 'text-green-600' :
                            tauxVacance < 9 ? 'text-yellow-600' :
                            'text-orange-600'
                          }`}>
                            {formatPercent(tauxVacance)}
                          </div>
                        </div>
                      )}
                      {stats.pct_15_29_ans !== null && (
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <div className="text-xs text-neutral-500 mb-1">Jeunes 15-29 ans</div>
                          <div className={`text-lg font-bold ${stats.pct_15_29_ans > 18 ? 'text-primary-600' : 'text-neutral-900'}`}>
                            {formatPercent(stats.pct_15_29_ans)}
                          </div>
                        </div>
                      )}
                      {pctResidencesPrincipales !== null && (
                        <div className="bg-neutral-50 rounded-lg p-3">
                          <div className="text-xs text-neutral-500 mb-1">Rés. principales</div>
                          <div className={`text-lg font-bold ${pctResidencesPrincipales > 85 ? 'text-green-600' : 'text-neutral-900'}`}>
                            {formatPercent(pctResidencesPrincipales)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Critères de notation détaillés */}
                    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="text-xs font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pourquoi investir dans ce quartier ?
                      </div>
                      <div className="space-y-2 text-xs">
                        {tauxVacance !== null && tauxVacance < 6 && (
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold text-sm">✓</span>
                            <span className="text-neutral-700">
                              <strong className="text-green-700">Très forte demande locative</strong> - Le taux de vacance de seulement {formatPercent(tauxVacance)} signifie que les biens se louent rapidement. Vous minimisez les périodes de vacance locative et maximisez votre rendement.
                            </span>
                          </div>
                        )}
                        {tauxVacance !== null && tauxVacance >= 6 && tauxVacance < 9 && (
                          <div className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold text-sm">✓</span>
                            <span className="text-neutral-700">
                              <strong className="text-blue-700">Marché locatif équilibré</strong> - Un taux de vacance de {formatPercent(tauxVacance)} indique un marché sain où l'offre et la demande s'équilibrent, favorisant des loyers stables.
                            </span>
                          </div>
                        )}
                        {stats.pct_15_29_ans !== null && stats.pct_15_29_ans > 20 && (
                          <div className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold text-sm">✓</span>
                            <span className="text-neutral-700">
                              <strong className="text-purple-700">Population jeune dynamique</strong> - Avec {formatPercent(stats.pct_15_29_ans)} de 15-29 ans (étudiants, jeunes actifs), ce quartier offre une forte demande pour les petites surfaces (studios, T1, T2). Idéal pour de la location meublée courte durée ou étudiante.
                            </span>
                          </div>
                        )}
                        {stats.population && stats.population > 3000 && (
                          <div className="flex items-start gap-2">
                            <span className="text-indigo-600 font-bold text-sm">✓</span>
                            <span className="text-neutral-700">
                              <strong className="text-indigo-700">Quartier populeux et vivant</strong> - {formatNumber(stats.population)} habitants garantissent la présence de commerces, services et transports. Un quartier animé attire les locataires et maintient la valeur de votre bien.
                            </span>
                          </div>
                        )}
                        {pctResidencesPrincipales !== null && pctResidencesPrincipales > 85 && (
                          <div className="flex items-start gap-2">
                            <span className="text-teal-600 font-bold text-sm">✓</span>
                            <span className="text-neutral-700">
                              <strong className="text-teal-700">Stabilité du marché immobilier</strong> - {formatPercent(pctResidencesPrincipales)} de résidences principales (vs secondaires) montrent que les habitants vivent réellement ici. Cela assure une demande locative pérenne et limite la spéculation.
                            </span>
                          </div>
                        )}
                        {nbLogements && nbLogements > 1000 && (
                          <div className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold text-sm">✓</span>
                            <span className="text-neutral-700">
                              <strong className="text-orange-700">Large offre de biens</strong> - {formatNumber(nbLogements)} logements dans le quartier signifient diversité architecturale et opportunités d'achat variées (anciens, neufs, différentes surfaces).
                            </span>
                          </div>
                        )}
                        {stats.population && stats.population <= 3000 && stats.population > 1500 && (
                          <div className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold text-sm">✓</span>
                            <span className="text-neutral-700">
                              <strong className="text-amber-700">Quartier résidentiel calme</strong> - Avec {formatNumber(stats.population)} habitants, ce secteur offre un cadre de vie paisible recherché par les familles et actifs.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

          {/* Guide pour choisir son quartier */}
          <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Comment choisir le bon quartier à {ville.nom} ?
            </h3>

            <div className="space-y-4 text-neutral-700">
              <p>
                Pour déterminer les <strong>meilleurs quartiers pour investir à {ville.nom}</strong>, plusieurs facteurs
                doivent être pris en compte selon votre stratégie d'investissement :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    Pour la location longue durée
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span>Privilégiez les quartiers avec faible taux de vacance (&lt;6%)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span>Ciblez une forte proportion de résidences principales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span>Recherchez la proximité des transports et commerces</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">📚</span>
                    Pour la location étudiante
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span>Visez les quartiers avec forte population 15-29 ans (&gt;20%)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span>Proximité des établissements d'enseignement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span>Préférez les petites surfaces (studios, T1, T2)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Analyse comparative */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Comparaison des quartiers de {ville.nom}
            </h3>
            <p className="text-neutral-700 mb-6">
              Notre analyse de {quartiersValides.length} quartiers à {ville.nom} révèle une grande diversité de profils.
              Alors que les meilleurs quartiers affichent des scores supérieurs à 70/100, l'ensemble du territoire offre
              des opportunités adaptées à différentes stratégies d'investissement.
            </p>

            <div className="bg-white border border-neutral-200 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {quartiersValides.length}
                  </div>
                  <div className="text-sm text-neutral-600">Quartiers analysés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {quartiersValides.filter(q => q.score.score_total >= 70).length}
                  </div>
                  <div className="text-sm text-neutral-600">Score ≥ 70/100</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-900 mb-1">
                    {formatNumber(statsGlobales.population_totale)}
                  </div>
                  <div className="text-sm text-neutral-600">Habitants total</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-900 mb-1">
                    {formatPercent(statsGlobales.taux_vacance_moyen_pct)}
                  </div>
                  <div className="text-sm text-neutral-600">Vacance moyenne</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA pour explorer tous les quartiers */}
          <div className="bg-primary-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Explorez tous les quartiers de {ville.nom}
            </h3>
            <p className="text-primary-100 mb-4">
              Consultez la liste complète des {ville.nb_quartiers_iris} quartiers IRIS ci-dessous avec leurs scores détaillés,
              statistiques démographiques et indicateurs d'investissement pour affiner votre choix.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium">
              <span>↓</span>
              <span>Voir la liste complète des quartiers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
