'use client'

import React, { useState, useMemo } from 'react'
import { Ville, Quartier } from '@/types/ville'
import { calculateAllQuartiersScores } from '@/lib/scoring-quartiers'
import Card from '@/components/ui/Card'
import QuartiersTop10 from './QuartiersTop10'

interface VilleQuartiersEnhancedProps {
  ville: Ville
}

/**
 * VilleQuartiersEnhanced - Affichage avancé des quartiers avec pagination et recherche
 */
export default function VilleQuartiersEnhanced({ ville }: VilleQuartiersEnhancedProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'score' | 'nom' | 'population'>('score')

  const formatNumber = (num: number | null): string => {
    if (num === null) return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPercent = (num: number | null): string => {
    if (num === null) return 'N/A'
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num) + '%'
  }

  // Calculer les scores de tous les quartiers
  const quartiersWithScores = useMemo(() => {
    return calculateAllQuartiersScores(ville.quartiers)
  }, [ville.quartiers])

  // Filtrer et trier les quartiers
  const quartiersFiltered = useMemo(() => {
    // Filtrer par recherche
    let filtered = quartiersWithScores.filter(({ quartier: q }) => {
      // Filtrer les quartiers sans données
      if (!q.stats_insee.population) return false

      // Filtrer par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          q.nom_quartier?.toLowerCase().includes(query) ||
          q.nom_commune?.toLowerCase().includes(query) ||
          q.iris_id.toLowerCase().includes(query)
        )
      }
      return true
    })

    // Trier selon le critère choisi
    filtered.sort((a, b) => {
      if (sortBy === 'score') {
        return b.score.score_total - a.score.score_total // Déjà trié par défaut mais on s'assure
      } else if (sortBy === 'nom') {
        return a.quartier.nom_quartier.localeCompare(b.quartier.nom_quartier, 'fr')
      } else if (sortBy === 'population') {
        return b.quartier.stats_insee.population - a.quartier.stats_insee.population
      }
      return 0
    })

    return filtered
  }, [quartiersWithScores, searchQuery, sortBy])

  // Pagination
  const totalPages = Math.ceil(quartiersFiltered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const quartiersAffiches = quartiersFiltered.slice(startIndex, endIndex)

  // Reset page when changing items per page, search, or sort
  React.useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage, searchQuery, sortBy])

  const getScoreColor = (score: number): string => {
    if (score >= 75) return 'from-green-500 to-emerald-600'
    if (score >= 65) return 'from-blue-500 to-cyan-600'
    if (score >= 55) return 'from-yellow-500 to-orange-500'
    return 'from-orange-500 to-red-500'
  }

  const getScoreBadgeColor = (score: number): string => {
    if (score >= 75) return 'bg-green-100 text-green-700 border-green-300'
    if (score >= 65) return 'bg-blue-100 text-blue-700 border-blue-300'
    if (score >= 55) return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    return 'bg-orange-100 text-orange-700 border-orange-300'
  }

  const getVacanceBadgeColor = (niveau: string | null) => {
    if (!niveau) return 'bg-neutral-50 text-neutral-700 border-neutral-200'
    switch (niveau.toLowerCase()) {
      case 'faible':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'moyen':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'élevé':
      case 'eleve':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200'
    }
  }

  return (
    <section id="quartiers" className="py-12 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          🏘️ Quartiers IRIS
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-900 leading-relaxed">
              <strong>Qu'est-ce qu'un quartier IRIS ?</strong> L'IRIS (Îlots Regroupés pour l'Information Statistique)
              est le plus petit territoire pour lequel l'INSEE diffuse des données. Chaque IRIS compte environ 2 000 habitants.
              {ville.nom} en compte <strong>{ville.nb_quartiers_iris}</strong>, dont <strong>{quartiersFiltered.length} avec données disponibles</strong>.
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Recherche */}
          <div className="relative md:col-span-2">
            <input
              type="text"
              placeholder="Rechercher un quartier par nom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-neutral-400 hover:text-neutral-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Tri par */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-neutral-700 whitespace-nowrap">
              Trier par :
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'score' | 'nom' | 'population')}
              className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="score">Score d'investissement</option>
              <option value="nom">Nom (A-Z)</option>
              <option value="population">Population</option>
            </select>
          </div>
        </div>

        {/* Sélecteur nombre par page */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-neutral-700">
              Afficher :
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value={25}>25 quartiers</option>
              <option value={50}>50 quartiers</option>
              <option value={100}>100 quartiers</option>
              <option value={200}>200 quartiers</option>
              <option value={quartiersFiltered.length}>Tous ({quartiersFiltered.length})</option>
            </select>
          </div>

          {/* Info résultats */}
          <p className="text-sm text-neutral-600">
            {quartiersFiltered.length === 0 ? (
              'Aucun quartier trouvé'
            ) : (
              <>
                Affichage de <strong>{startIndex + 1}</strong> à{' '}
                <strong>{Math.min(endIndex, quartiersFiltered.length)}</strong> sur{' '}
                <strong>{quartiersFiltered.length}</strong> quartiers
              </>
            )}
          </p>
        </div>
      </div>

      {/* Top 10 des quartiers */}
      <QuartiersTop10 quartiers={ville.quartiers} villeNom={ville.nom} />

      {/* Grille des quartiers */}
      {quartiersFiltered.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-neutral-600">Aucun quartier ne correspond à votre recherche</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Réinitialiser la recherche
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quartiersAffiches.map(({ quartier, score }) => (
              <Card key={quartier.iris_id} hover className="relative">
                <div className="space-y-4">
                  {/* Score badge */}
                  <div className="absolute top-3 right-3">
                    <div className={`px-3 py-1.5 rounded-full border-2 font-bold text-sm ${getScoreBadgeColor(score.score_total)}`}>
                      {score.score_total}/100
                    </div>
                  </div>

                  {/* En-tête quartier */}
                  <div className="pr-20">
                    <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2">
                      {quartier.nom_quartier}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {quartier.nom_commune}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Rang: #{score.rang} / {ville.nb_quartiers_iris}
                    </p>
                  </div>

                  {/* Indicateurs clés */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-600">Population</span>
                      <span className="font-medium text-neutral-900">
                        {formatNumber(quartier.stats_insee.population)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-600">Ménages</span>
                      <span className="font-medium text-neutral-900">
                        {formatNumber(quartier.stats_insee.menages)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-600">Taille moyenne ménage</span>
                      <span className="font-medium text-neutral-900">
                        {quartier.stats_insee.taille_menage_moyenne
                          ? (quartier.stats_insee.taille_menage_moyenne || 0).toFixed(2)
                          : 'N/A'} pers.
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-600">Logements</span>
                      <span className="font-medium text-neutral-900">
                        {formatNumber(quartier.stats_insee.logements.total)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-600">Taux de vacance</span>
                      <span className="font-medium text-neutral-900">
                        {formatPercent(quartier.stats_insee.taux_vacance_pct)}
                      </span>
                    </div>

                    {/* Démographie */}
                    {(quartier.stats_insee.pct_15_29_ans || quartier.stats_insee.pct_60_plus_ans) && (
                      <div className="pt-2 border-t border-neutral-200">
                        <p className="text-xs text-neutral-500 mb-2">Démographie</p>
                        <div className="space-y-1 text-xs">
                          {quartier.stats_insee.pct_15_29_ans && (
                            <div className="flex justify-between">
                              <span className="text-neutral-600">15-29 ans</span>
                              <span className="text-neutral-900">{formatPercent(quartier.stats_insee.pct_15_29_ans)}</span>
                            </div>
                          )}
                          {quartier.stats_insee.pct_60_plus_ans && (
                            <div className="flex justify-between">
                              <span className="text-neutral-600">60 ans et +</span>
                              <span className="text-neutral-900">{formatPercent(quartier.stats_insee.pct_60_plus_ans)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Badges indicateurs */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-200">
                    {quartier.indicateurs_calcules.niveau_vacance && (
                      <span className={`text-xs px-2 py-1 rounded-full border ${getVacanceBadgeColor(quartier.indicateurs_calcules.niveau_vacance)}`}>
                        {quartier.indicateurs_calcules.niveau_vacance}
                      </span>
                    )}
                    {quartier.indicateurs_calcules.profil_demographique && (
                      <span className="text-xs px-2 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                        {quartier.indicateurs_calcules.profil_demographique}
                      </span>
                    )}
                  </div>

                  {/* Prix DVF si disponibles */}
                  {quartier.dvf_appartements && (
                    <div className="pt-2 border-t border-neutral-200">
                      <p className="text-xs text-neutral-500 mb-2">Prix médian appartements</p>
                      <p className="text-lg font-bold text-primary-600">
                        {formatNumber(quartier.dvf_appartements.prix_m2_median)} € /m²
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {quartier.dvf_appartements.nb_ventes} ventes • {quartier.dvf_appartements.qualite_donnees}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 7) {
                    pageNum = i + 1
                  } else if (currentPage <= 4) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i
                  } else {
                    pageNum = currentPage - 3 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'border border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {/* Explications pédagogiques */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
            <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Comprendre le taux de vacance
          </h4>
          <p className="text-sm text-neutral-600 leading-relaxed mb-3">
            Le <strong>taux de vacance</strong> indique le pourcentage de logements inoccupés dans un quartier.
          </p>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span><strong>Faible (&lt;5%)</strong> : Marché tendu, forte demande</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span><strong>Moyen (5-10%)</strong> : Marché équilibré</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span><strong>Élevé (&gt;10%)</strong> : Offre importante, marché moins tendu</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-white">
          <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
            <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Profils démographiques
          </h4>
          <p className="text-sm text-neutral-600 leading-relaxed mb-3">
            Le <strong>profil démographique</strong> caractérise la composition de la population :
          </p>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Familial</strong> : Forte présence de familles avec enfants</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span><strong>Senior</strong> : Population majoritairement âgée de 60 ans et plus</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2">•</span>
              <span><strong>Jeune</strong> : Forte proportion de 15-29 ans (étudiants, jeunes actifs)</span>
            </li>
          </ul>
        </Card>
      </div>
      </div>
    </section>
  )
}
