import React from 'react'
import { Ville } from '@/types/ville'
import { getQuartiersAEviter, QuartierAEviter } from '@/lib/scoring-quartiers'
import { villeToSlug, getAllVilles } from '@/lib/data'
import { calculateInvestmentScore } from '@/lib/scoring'
import Link from 'next/link'

interface QuartiersAEviterSectionProps {
  ville: Ville
}

/**
 * QuartiersAEviterSection - Affiche les quartiers présentant des indicateurs
 * moins favorables pour l'investissement immobilier avec analyse détaillée
 */
export default function QuartiersAEviterSection({ ville }: QuartiersAEviterSectionProps) {
  // Calculer le score de la ville pour pondérer les scores quartiers
  const allVilles = getAllVilles()
  const villeScore = calculateInvestmentScore(ville, allVilles)
  const allQuartiersAEviter = getQuartiersAEviter(ville.quartiers, 50, villeScore.score_total)
  const quartiersPrincipaux = allQuartiersAEviter.slice(0, 12)
  const quartiersSecondaires = allQuartiersAEviter.slice(12)

  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPercent = (num: number | null | undefined, decimals: number = 1): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
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
      case 'score': return '📊'
      case 'residences': return '🏠'
      case 'pression': return '📈'
      case 'seniors': return '👴'
      case 'stabilite': return '🔄'
      default: return '•'
    }
  }

  const getVacanceLevel = (taux: number): { label: string; color: string } => {
    if (taux > 15) return { label: 'Très élevé', color: 'text-red-600' }
    if (taux > 12) return { label: 'Élevé', color: 'text-red-500' }
    if (taux > 10) return { label: 'Supérieur à la moyenne', color: 'text-orange-600' }
    if (taux > 8) return { label: 'Modéré', color: 'text-yellow-600' }
    if (taux > 5) return { label: 'Normal', color: 'text-green-600' }
    return { label: 'Très faible', color: 'text-green-700' }
  }

  const getPressionLevel = (pression: number): { label: string; color: string } => {
    if (pression >= 4) return { label: 'Forte tension', color: 'text-green-600' }
    if (pression >= 3) return { label: 'Tension modérée', color: 'text-blue-600' }
    if (pression >= 2) return { label: 'Tension faible', color: 'text-yellow-600' }
    return { label: 'Très faible tension', color: 'text-orange-600' }
  }

  /**
   * Génère une analyse textuelle accessible pour chaque quartier
   */
  const generateAnalyseQuartier = (item: QuartierAEviter): string => {
    const { quartier, score: scoreDetail, raisons } = item
    const stats = quartier.stats_insee
    const indicateurs = quartier.indicateurs_calcules

    const nomQuartier = quartier.nom_quartier || quartier.nom
    const parties: string[] = []

    // Introduction basée sur le nombre de critères
    if (raisons.length >= 3) {
      parties.push(`Le quartier ${nomQuartier} cumule plusieurs indicateurs qui méritent votre attention avant d'investir.`)
    } else if (raisons.length === 2) {
      parties.push(`Le quartier ${nomQuartier} présente deux signaux d'alerte à prendre en compte pour un investissement.`)
    } else {
      parties.push(`Le quartier ${nomQuartier} affiche un indicateur qui peut influencer votre décision d'investissement.`)
    }

    // Analyse du taux de vacance
    if (stats.taux_vacance_pct > 15) {
      parties.push(`Avec ${stats.taux_vacance_pct.toFixed(1)}% de logements vacants, ce quartier connaît des difficultés à attirer ou retenir des locataires. Cela peut signifier une demande locative faible, ce qui augmente le risque de périodes sans loyer.`)
    } else if (stats.taux_vacance_pct > 10) {
      parties.push(`Le taux de vacance de ${stats.taux_vacance_pct.toFixed(1)}% est supérieur à la moyenne nationale (environ 8%). Cela suggère un marché locatif moins dynamique que dans d'autres quartiers.`)
    }

    // Analyse de la population
    if (stats.population && stats.population < 500) {
      parties.push(`Avec seulement ${formatNumber(stats.population)} habitants, ce quartier est peu densément peuplé. Cela peut se traduire par moins de commerces, de services et de transports à proximité, ce qui le rend moins attractif pour les locataires.`)
    }

    // Analyse des résidences principales
    const totalLogements = stats.logements?.total || 0
    const resPrincipales = stats.logements?.residences_principales || 0
    const pctResPrincipales = totalLogements > 0 ? (resPrincipales / totalLogements) * 100 : 100

    if (pctResPrincipales < 60 && totalLogements > 100) {
      parties.push(`Moins de 60% des logements sont des résidences principales. Cette forte proportion de résidences secondaires ou de logements vacants indique un quartier où la vie permanente est moins présente, ce qui peut compliquer la location à l'année.`)
    } else if (pctResPrincipales < 70 && totalLogements > 100) {
      parties.push(`Seulement ${pctResPrincipales.toFixed(0)}% des logements servent de résidence principale. Le reste est composé de résidences secondaires ou de logements vacants, ce qui peut refléter un quartier moins dynamique au quotidien.`)
    }

    // Analyse de la pression résidentielle
    const pression = indicateurs?.pression_residentielle || 3
    if (pression < 2) {
      parties.push(`La pression résidentielle est faible (${pression.toFixed(1)}/5), ce qui signifie que l'offre de logements dépasse largement la demande. Dans ce contexte, trouver des locataires peut prendre plus de temps et les loyers peuvent être sous pression.`)
    }

    // Analyse démographique
    const pct60Plus = stats.pct_60_plus_ans || 0
    if (pct60Plus > 40) {
      parties.push(`Plus de 40% de la population a plus de 60 ans. Ce vieillissement démographique important suggère une demande locative orientée vers un public spécifique, et potentiellement un renouvellement de population à anticiper dans les années à venir.`)
    } else if (pct60Plus > 35) {
      parties.push(`La population est vieillissante avec ${pct60Plus.toFixed(0)}% de 60 ans et plus. Les jeunes actifs et familles, qui constituent souvent le cœur de la demande locative, sont moins présents dans ce quartier.`)
    }

    // Analyse de la stabilité
    const stabilite = indicateurs?.stabilite_residentielle?.toLowerCase() || ''
    if (stabilite.includes('faible')) {
      parties.push(`La stabilité résidentielle est faible, ce qui signifie que les habitants changent fréquemment. Ce turnover élevé peut indiquer un quartier où les gens ne souhaitent pas s'installer durablement, ce qui peut augmenter la rotation des locataires.`)
    }

    // Note sur le score si élevé
    if (scoreDetail.score_total >= 60) {
      parties.push(`Malgré un score de ${scoreDetail.score_total}/100 qui peut sembler correct, ce quartier figure parmi ceux à surveiller car il cumule au moins deux indicateurs défavorables par rapport aux autres quartiers de ${ville.nom}.`)
    }

    return parties.join(' ')
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
          <div className="space-y-8">
            {quartiersPrincipaux.map((item: QuartierAEviter, index: number) => {
              const { quartier, score: scoreDetail, raisons } = item
              const stats = quartier.stats_insee
              const indicateurs = quartier.indicateurs_calcules

              // Calculer les données
              const totalLogements = stats.logements?.total || 0
              const resPrincipales = stats.logements?.residences_principales || 0
              const resSecondaires = stats.logements?.residences_secondaires || 0
              const logVacants = stats.logements?.logements_vacants || 0
              const pctResPrincipales = totalLogements > 0 ? (resPrincipales / totalLogements) * 100 : null
              const pctResSecondaires = totalLogements > 0 ? (resSecondaires / totalLogements) * 100 : null
              const pctVacants = totalLogements > 0 ? (logVacants / totalLogements) * 100 : null

              const vacanceInfo = getVacanceLevel(stats.taux_vacance_pct)
              const pressionInfo = indicateurs?.pression_residentielle
                ? getPressionLevel(indicateurs.pression_residentielle)
                : null

              return (
                <div
                  key={quartier.iris_id}
                  className="bg-white border-2 border-neutral-200 rounded-xl overflow-hidden hover:border-orange-200 transition-all"
                >
                  {/* Header du quartier */}
                  <div className="bg-gradient-to-r from-neutral-50 to-orange-50 p-6 border-b border-neutral-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-orange-500 text-lg">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-neutral-900 m-0">
                              {quartier.nom_quartier || quartier.nom}
                            </h3>
                            <p className="text-sm text-neutral-500 m-0">
                              IRIS {quartier.iris_id}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-4 py-2 rounded-full border-2 font-bold ${getScoreBadgeColor(scoreDetail.score_total)}`}>
                          {scoreDetail.score_total}/100
                        </div>
                        {scoreDetail.score_total >= 60 && (
                          <div className="text-xs text-neutral-500 mt-1 max-w-[120px]">
                            Score élevé mais critères défavorables
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Analyse textuelle accessible */}
                    <div className="mb-6 p-5 bg-neutral-50 border-l-4 border-orange-400 rounded-r-lg">
                      <p className="text-neutral-700 leading-relaxed m-0">
                        {generateAnalyseQuartier(item)}
                      </p>
                    </div>

                    {/* Raisons factuelles */}
                    {raisons.length > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6">
                        <div className="text-sm font-semibold text-orange-800 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Points d'attention ({raisons.length})
                        </div>
                        <div className="space-y-4">
                          {raisons.map((raison, raisonIndex) => (
                            <div key={raisonIndex} className="flex items-start gap-3">
                              <span className="text-xl flex-shrink-0 mt-0.5">{getRaisonIcon(raison.type)}</span>
                              <div>
                                <div className="font-medium text-neutral-900">
                                  {raison.label} : <span className="text-orange-700 font-semibold">{raison.valeur}</span>
                                </div>
                                <p className="text-sm text-neutral-600 mt-1 m-0">
                                  {raison.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Analyse détaillée */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Démographie */}
                      <div className="bg-neutral-50 rounded-xl p-5">
                        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2 text-base m-0">
                          <span className="text-lg">👥</span> Démographie
                        </h4>
                        <div className="space-y-3">
                          {stats.population && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Population</span>
                              <span className="font-semibold text-neutral-900">{formatNumber(stats.population)} hab.</span>
                            </div>
                          )}
                          {stats.taille_menage_moyenne && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Taille moyenne des ménages</span>
                              <span className="font-semibold text-neutral-900">{stats.taille_menage_moyenne.toFixed(1)} pers.</span>
                            </div>
                          )}
                          {stats.pct_15_29_ans !== undefined && stats.pct_15_29_ans > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">15-29 ans (actifs jeunes)</span>
                              <span className="font-semibold text-neutral-900">{formatPercent(stats.pct_15_29_ans)}</span>
                            </div>
                          )}
                          {stats.pct_60_plus_ans !== undefined && stats.pct_60_plus_ans > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">60 ans et plus</span>
                              <span className={`font-semibold ${stats.pct_60_plus_ans > 35 ? 'text-orange-600' : 'text-neutral-900'}`}>
                                {formatPercent(stats.pct_60_plus_ans)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Logements */}
                      <div className="bg-neutral-50 rounded-xl p-5">
                        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2 text-base m-0">
                          <span className="text-lg">🏠</span> Logements
                        </h4>
                        <div className="space-y-3">
                          {totalLogements > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Total logements</span>
                              <span className="font-semibold text-neutral-900">{formatNumber(totalLogements)}</span>
                            </div>
                          )}
                          {pctResPrincipales !== null && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Résidences principales</span>
                              <span className={`font-semibold ${pctResPrincipales < 70 ? 'text-orange-600' : 'text-neutral-900'}`}>
                                {formatPercent(pctResPrincipales)}
                              </span>
                            </div>
                          )}
                          {pctResSecondaires !== null && pctResSecondaires > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Résidences secondaires</span>
                              <span className="font-semibold text-neutral-900">{formatPercent(pctResSecondaires)}</span>
                            </div>
                          )}
                          {pctVacants !== null && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Logements vacants</span>
                              <span className={`font-semibold ${pctVacants > 10 ? 'text-orange-600' : 'text-neutral-900'}`}>
                                {formatPercent(pctVacants)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Indicateurs marché */}
                      <div className="bg-neutral-50 rounded-xl p-5">
                        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2 text-base m-0">
                          <span className="text-lg">📊</span> Indicateurs marché
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-600">Taux de vacance</span>
                            <div className="text-right">
                              <span className={`font-semibold ${vacanceInfo.color}`}>
                                {formatPercent(stats.taux_vacance_pct)}
                              </span>
                              <div className={`text-xs ${vacanceInfo.color}`}>{vacanceInfo.label}</div>
                            </div>
                          </div>
                          {indicateurs?.pression_residentielle && pressionInfo && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Pression résidentielle</span>
                              <div className="text-right">
                                <span className={`font-semibold ${pressionInfo.color}`}>
                                  {indicateurs.pression_residentielle.toFixed(1)}/5
                                </span>
                                <div className={`text-xs ${pressionInfo.color}`}>{pressionInfo.label}</div>
                              </div>
                            </div>
                          )}
                          {indicateurs?.stabilite_residentielle && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-neutral-600">Stabilité résidentielle</span>
                              <span className={`font-semibold ${
                                indicateurs.stabilite_residentielle.toLowerCase().includes('faible')
                                  ? 'text-orange-600'
                                  : 'text-neutral-900'
                              }`}>
                                {indicateurs.stabilite_residentielle}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Détail du score */}
                      <div className="bg-neutral-50 rounded-xl p-5">
                        <h4 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2 text-base m-0">
                          <span className="text-lg">🎯</span> Détail du score
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-600">Accessibilité marché</span>
                            <span className="font-medium text-neutral-800">{scoreDetail.accessibilite_marche}/25</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-600">Potentiel locatif</span>
                            <span className="font-medium text-neutral-800">{scoreDetail.potentiel_locatif}/30</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-600">Démographie</span>
                            <span className="font-medium text-neutral-800">{scoreDetail.demographie}/25</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-600">Volume & qualité</span>
                            <span className="font-medium text-neutral-800">{scoreDetail.volume_qualite}/15</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-neutral-600">Stabilité</span>
                            <span className="font-medium text-neutral-800">{scoreDetail.stabilite}/5</span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-neutral-200 flex justify-between items-center">
                            <span className="text-sm font-semibold text-neutral-700">Score total</span>
                            <span className={`font-bold ${getScoreBadgeColor(scoreDetail.score_total).split(' ')[1]}`}>
                              {scoreDetail.score_total}/100
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommandation */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                      <span className="text-blue-600 text-xl">💡</span>
                      <p className="text-sm text-blue-800 m-0">
                        <strong>Notre recommandation :</strong> Avant d'investir dans ce quartier, nous vous conseillons de visiter
                        les lieux, de consulter un agent immobilier local et de vérifier les projets d'aménagement en cours.
                        Ces indicateurs statistiques ne remplacent pas une analyse terrain approfondie.
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quartiers secondaires (au-delà des 12 premiers) */}
          {quartiersSecondaires.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-neutral-700 mb-4">
                Autres quartiers à surveiller ({quartiersSecondaires.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quartiersSecondaires.map((item: QuartierAEviter) => {
                  const { quartier, score: scoreDetail, raisons } = item
                  const stats = quartier.stats_insee

                  return (
                    <div
                      key={quartier.iris_id}
                      className="bg-neutral-50 border border-neutral-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-800 text-sm m-0">
                            {quartier.nom_quartier || quartier.nom}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-1 m-0">
                            IRIS {quartier.iris_id}
                          </p>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full border font-medium ${getScoreBadgeColor(scoreDetail.score_total)}`}>
                          {scoreDetail.score_total}/100
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-neutral-600">
                        <span>Vacance: {formatPercent(stats.taux_vacance_pct)}</span>
                        {stats.population && <span>Pop: {formatNumber(stats.population)}</span>}
                        {raisons.length > 0 && (
                          <span className="text-orange-600">{raisons.length} alerte{raisons.length > 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Section nuances */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4 mt-0">
              Contexte et nuances importantes
            </h3>
            <div className="space-y-4 text-blue-800">
              <p className="m-0">
                Les indicateurs présentés ci-dessus sont des <strong>données statistiques objectives</strong> issues
                de sources publiques (INSEE). Ils ne portent aucun jugement sur la qualité de vie ou les habitants de ces quartiers.
              </p>
              <p className="m-0">
                Certains de ces quartiers peuvent présenter des opportunités pour des profils d'investisseurs spécifiques :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 my-3">
                <li>Quartiers en cours de rénovation urbaine avec potentiel de plus-value à moyen terme</li>
                <li>Zones où les prix bas permettent des rendements locatifs bruts élevés</li>
                <li>Secteurs adaptés à la location sociale ou conventionnée (APL)</li>
                <li>Opportunités pour les investisseurs acceptant un risque de vacance plus élevé</li>
              </ul>
              <p className="font-medium m-0">
                Une visite sur place et l'avis de professionnels locaux (agents immobiliers, notaires, gestionnaires)
                restent indispensables avant toute décision d'investissement.
              </p>
            </div>
          </div>

          {/* Liens connexes */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href={`/villes/${villeToSlug(ville.nom)}`}
              className="flex-1 bg-primary-600 text-white text-center py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors no-underline"
            >
              Voir l'analyse complète de {ville.nom}
            </Link>
            <Link
              href="/outils/comparateur"
              className="flex-1 bg-neutral-100 text-neutral-900 text-center py-4 px-6 rounded-xl font-semibold hover:bg-neutral-200 transition-colors no-underline"
            >
              Comparer avec d'autres villes
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
