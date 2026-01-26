'use client'

import React, { useState, useMemo } from 'react'
import { getAllVilles, villeToSlug, getVilleDVF } from '@/lib/data'
import { Ville } from '@/types/ville'
import Link from 'next/link'

const MAX_VILLES = 5
const MIN_VILLES = 2

export default function ComparateurVilles() {
  const allVilles = getAllVilles()
  const [selectedVilles, setSelectedVilles] = useState<Ville[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Filtrer les villes selon la recherche
  const filteredVilles = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return allVilles
      .filter(v =>
        v.nom.toLowerCase().includes(query) ||
        v.departement.name.toLowerCase().includes(query) ||
        v.region.name.toLowerCase().includes(query)
      )
      .filter(v => !selectedVilles.find(sv => sv.code_insee === v.code_insee))
      .slice(0, 8)
  }, [searchQuery, allVilles, selectedVilles])

  const handleAddVille = (ville: Ville) => {
    if (selectedVilles.length < MAX_VILLES) {
      setSelectedVilles([...selectedVilles, ville])
      setSearchQuery('')
    }
  }

  const handleRemoveVille = (codeInsee: string) => {
    setSelectedVilles(selectedVilles.filter(v => v.code_insee !== codeInsee))
  }

  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return '-'
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPrice = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return '-'
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(num)
  }

  const formatPercent = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return '-'
    return num.toFixed(1) + '%'
  }

  // Calculer les min/max pour highlighting
  const getMinMax = (values: (number | null | undefined)[]) => {
    const validValues = values.filter((v): v is number => v !== null && v !== undefined && !isNaN(v))
    if (validValues.length === 0) return { min: null, max: null }
    return {
      min: Math.min(...validValues),
      max: Math.max(...validValues)
    }
  }

  // Préparer les données comparatives
  const comparativeData = useMemo(() => {
    return selectedVilles.map(ville => {
      const dvf = getVilleDVF(ville)
      const stats = ville.stats_agregees
      const pctResPrincipales = stats.nb_logements > 0
        ? (stats.nb_residences_principales / stats.nb_logements) * 100
        : null

      return {
        ville,
        dvf,
        stats,
        pctResPrincipales,
      }
    })
  }, [selectedVilles])

  // Données pour le highlighting
  const highlights = useMemo(() => {
    if (comparativeData.length < 2) return null

    return {
      population: getMinMax(comparativeData.map(d => d.stats.population_totale)),
      vacance: getMinMax(comparativeData.map(d => d.stats.taux_vacance_moyen_pct)),
      prix: getMinMax(comparativeData.map(d => d.dvf?.prix_m2_median_global)),
      logements: getMinMax(comparativeData.map(d => d.stats.nb_logements)),
    }
  }, [comparativeData])

  const getCellHighlight = (value: number | null | undefined, minMax: { min: number | null, max: number | null } | undefined, inverse = false) => {
    if (!minMax || value === null || value === undefined || minMax.min === null || minMax.max === null) return ''
    if (minMax.min === minMax.max) return ''

    if (inverse) {
      // Pour vacance : le min est mieux (vert), le max est pire (rouge)
      if (value === minMax.min) return 'bg-green-50 text-green-700'
      if (value === minMax.max) return 'bg-orange-50 text-orange-700'
    } else {
      // Pour prix/population : le max est mis en évidence (bleu)
      if (value === minMax.max) return 'bg-blue-50 text-blue-700'
      if (value === minMax.min) return 'bg-neutral-100 text-neutral-600'
    }
    return ''
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Sélecteur de villes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Sélectionnez les villes à comparer ({selectedVilles.length}/{MAX_VILLES})
          </h2>

          {/* Villes sélectionnées */}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedVilles.map(ville => (
              <div
                key={ville.code_insee}
                className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1.5 rounded-full"
              >
                <span className="font-medium">{ville.nom}</span>
                <button
                  onClick={() => handleRemoveVille(ville.code_insee)}
                  className="w-5 h-5 rounded-full bg-primary-200 hover:bg-primary-300 flex items-center justify-center transition-colors"
                  aria-label={`Retirer ${ville.nom}`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {selectedVilles.length === 0 && (
              <span className="text-neutral-500 text-sm">Aucune ville sélectionnée</span>
            )}
          </div>

          {/* Barre de recherche */}
          {selectedVilles.length < MAX_VILLES && (
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une ville..."
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Résultats de recherche */}
              {filteredVilles.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                  {filteredVilles.map(ville => (
                    <button
                      key={ville.code_insee}
                      onClick={() => handleAddVille(ville)}
                      className="w-full text-left px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-0"
                    >
                      <div className="font-medium text-neutral-900">{ville.nom}</div>
                      <div className="text-sm text-neutral-500">
                        {ville.departement.name} • {ville.region.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Message si pas assez de villes */}
        {selectedVilles.length < MIN_VILLES && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🏙️</div>
            <p className="text-neutral-600">
              Sélectionnez au moins {MIN_VILLES} villes pour afficher le comparatif
            </p>
          </div>
        )}

        {/* Tableau comparatif */}
        {selectedVilles.length >= MIN_VILLES && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="text-left p-4 font-semibold text-neutral-700 border-b border-neutral-200 sticky left-0 bg-neutral-100 min-w-[180px]">
                    Indicateur
                  </th>
                  {comparativeData.map(({ ville }) => (
                    <th key={ville.code_insee} className="p-4 font-semibold text-neutral-900 border-b border-neutral-200 min-w-[150px]">
                      <Link
                        href={`/villes/${villeToSlug(ville.nom)}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {ville.nom}
                      </Link>
                      <div className="text-xs font-normal text-neutral-500 mt-1">
                        {ville.departement.code}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Section Démographie */}
                <tr className="bg-neutral-50">
                  <td colSpan={selectedVilles.length + 1} className="p-3 font-semibold text-neutral-800 text-sm uppercase tracking-wide">
                    Démographie
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Population</td>
                  {comparativeData.map(({ ville, stats }) => (
                    <td key={ville.code_insee} className={`p-4 text-center border-b border-neutral-100 font-medium ${getCellHighlight(stats.population_totale, highlights?.population)}`}>
                      {formatNumber(stats.population_totale)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Ménages</td>
                  {comparativeData.map(({ ville, stats }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      {formatNumber(stats.nb_menages)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Quartiers IRIS</td>
                  {comparativeData.map(({ ville }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      {ville.nb_quartiers_iris}
                    </td>
                  ))}
                </tr>

                {/* Section Logements */}
                <tr className="bg-neutral-50">
                  <td colSpan={selectedVilles.length + 1} className="p-3 font-semibold text-neutral-800 text-sm uppercase tracking-wide">
                    Logements
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Total logements</td>
                  {comparativeData.map(({ ville, stats }) => (
                    <td key={ville.code_insee} className={`p-4 text-center border-b border-neutral-100 font-medium ${getCellHighlight(stats.nb_logements, highlights?.logements)}`}>
                      {formatNumber(stats.nb_logements)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Résidences principales</td>
                  {comparativeData.map(({ ville, stats, pctResPrincipales }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      <div>{formatNumber(stats.nb_residences_principales)}</div>
                      <div className="text-xs text-neutral-500">({formatPercent(pctResPrincipales)})</div>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Logements vacants</td>
                  {comparativeData.map(({ ville, stats }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      <div>{formatNumber(stats.nb_logements_vacants)}</div>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white font-medium">
                    Taux de vacance
                  </td>
                  {comparativeData.map(({ ville, stats }) => (
                    <td key={ville.code_insee} className={`p-4 text-center border-b border-neutral-100 font-medium ${getCellHighlight(stats.taux_vacance_moyen_pct, highlights?.vacance, true)}`}>
                      {formatPercent(stats.taux_vacance_moyen_pct)}
                    </td>
                  ))}
                </tr>

                {/* Section Prix immobiliers */}
                <tr className="bg-neutral-50">
                  <td colSpan={selectedVilles.length + 1} className="p-3 font-semibold text-neutral-800 text-sm uppercase tracking-wide">
                    Prix immobiliers (DVF)
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white font-medium">
                    Prix médian /m²
                  </td>
                  {comparativeData.map(({ ville, dvf }) => (
                    <td key={ville.code_insee} className={`p-4 text-center border-b border-neutral-100 font-medium ${getCellHighlight(dvf?.prix_m2_median_global, highlights?.prix)}`}>
                      {formatPrice(dvf?.prix_m2_median_global)}
                      {dvf?.is_estimated && <span className="text-xs text-neutral-400 block">(est.)</span>}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Appartements /m²</td>
                  {comparativeData.map(({ ville, dvf }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      {formatPrice(dvf?.appartements?.prix_m2_median)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Maisons /m²</td>
                  {comparativeData.map(({ ville, dvf }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      {formatPrice(dvf?.maisons?.prix_m2_median)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Fourchette prix (P25-P75)</td>
                  {comparativeData.map(({ ville, dvf }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100 text-sm">
                      {dvf?.prix_m2_p25 && dvf?.prix_m2_p75
                        ? `${formatPrice(dvf.prix_m2_p25)} - ${formatPrice(dvf.prix_m2_p75)}`
                        : '-'}
                    </td>
                  ))}
                </tr>

                {/* Section Localisation */}
                <tr className="bg-neutral-50">
                  <td colSpan={selectedVilles.length + 1} className="p-3 font-semibold text-neutral-800 text-sm uppercase tracking-wide">
                    Localisation
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Département</td>
                  {comparativeData.map(({ ville }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      {ville.departement.name}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-4 text-neutral-700 border-b border-neutral-100 sticky left-0 bg-white">Région</td>
                  {comparativeData.map(({ ville }) => (
                    <td key={ville.code_insee} className="p-4 text-center border-b border-neutral-100">
                      {ville.region.name}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            {/* Légende */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                <span>Valeur la plus favorable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
                <span>Valeur à surveiller</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                <span>Valeur la plus élevée</span>
              </div>
            </div>

            {/* Analyse des écarts */}
            <div className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-6">
              <h3 className="font-semibold text-primary-900 mb-4">Analyse des écarts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {highlights && (
                  <>
                    {highlights.population.max && highlights.population.min && highlights.population.max !== highlights.population.min && (
                      <div className="flex items-start gap-2">
                        <span className="text-primary-600">•</span>
                        <span className="text-primary-800">
                          Écart de population : <strong>×{(highlights.population.max / highlights.population.min).toFixed(1)}</strong> entre la plus grande et la plus petite ville
                        </span>
                      </div>
                    )}
                    {highlights.prix.max && highlights.prix.min && highlights.prix.max !== highlights.prix.min && (
                      <div className="flex items-start gap-2">
                        <span className="text-primary-600">•</span>
                        <span className="text-primary-800">
                          Écart de prix : <strong>{formatPrice(highlights.prix.max - highlights.prix.min)}/m²</strong> entre le marché le plus cher et le moins cher
                        </span>
                      </div>
                    )}
                    {highlights.vacance.max && highlights.vacance.min && highlights.vacance.max !== highlights.vacance.min && (
                      <div className="flex items-start gap-2">
                        <span className="text-primary-600">•</span>
                        <span className="text-primary-800">
                          Écart de vacance : <strong>{(highlights.vacance.max - highlights.vacance.min).toFixed(1)} points</strong> entre les taux extrêmes
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Liens vers les pages détaillées */}
            <div className="mt-8">
              <h3 className="font-semibold text-neutral-900 mb-4">Approfondir l'analyse</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedVilles.map(ville => (
                  <div key={ville.code_insee} className="bg-white border border-neutral-200 rounded-lg p-4">
                    <h4 className="font-medium text-neutral-900 mb-3">{ville.nom}</h4>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/villes/${villeToSlug(ville.nom)}`}
                        className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                      >
                        <span>Analyse complète</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link
                        href={`/villes/${villeToSlug(ville.nom)}/quartiers-a-eviter`}
                        className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
                      >
                        <span>Quartiers à éviter</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
