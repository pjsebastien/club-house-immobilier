import React from 'react'
import { Ville } from '@/types/ville'
import { getVilleDVF } from '@/lib/data'

interface VilleDVFProps {
  ville: Ville
}

/**
 * VilleDVF - Affiche les données DVF (prix immobiliers) de la ville
 */
export default function VilleDVF({ ville }: VilleDVFProps) {
  const dvf = getVilleDVF(ville)
  const isEstimated = dvf.is_estimated === true

  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPrice = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(num) + ' €'
  }

  const getQualiteBadgeColor = (qualite: string | null) => {
    if (!qualite) return 'bg-neutral-50 text-neutral-700 border-neutral-200'
    switch (qualite.toLowerCase()) {
      case 'estimation':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'bon':
      case 'bonne':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'moyen':
      case 'moyenne':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'faible':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200'
    }
  }

  return (
    <section id="prix" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          💵 Prix au m² {isEstimated ? '(Estimés)' : `(DVF ${dvf.annee})`}
        </h2>
        <p className="text-sm text-neutral-600">
          {isEstimated ? (
            <>⚠️ Estimations basées sur villes comparables - Données DVF non disponibles</>
          ) : (
            <>{formatNumber(dvf.nb_ventes_total)} transactions officielles enregistrées</>
          )}
        </p>
      </div>

      {/* Vue synthétique compacte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Appartements */}
          {dvf.appartements && (
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">Appartements</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${getQualiteBadgeColor(dvf.appartements.qualite_donnees || dvf.qualite_donnees)}`}>
                  {dvf.appartements.qualite_donnees || dvf.qualite_donnees || 'N/A'}
                </span>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="text-xs text-blue-600 font-semibold mb-1">Prix médian</div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatNumber(dvf.appartements.prix_m2_median)} €
                </div>
                <div className="text-sm text-neutral-600">par m²</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-neutral-500 mb-1">25% des ventes</div>
                  <div className="font-bold text-neutral-900">
                    ≤ {formatNumber(dvf.appartements.prix_m2_p25 || dvf.appartements.prix_m2_q1)} €/m²
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1">75% des ventes</div>
                  <div className="font-bold text-neutral-900">
                    ≤ {formatNumber(dvf.appartements.prix_m2_p75 || dvf.appartements.prix_m2_q3)} €/m²
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Nb de ventes</div>
                  <div className="font-bold text-neutral-900">
                    {formatNumber(dvf.appartements.nb_ventes)}
                  </div>
                </div>
                {dvf.appartements.surface_mediane && (
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Surface médiane</div>
                    <div className="font-bold text-neutral-900">
                      {formatNumber(dvf.appartements.surface_mediane)} m²
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Maisons */}
          {dvf.maisons && (
            <div className="bg-white rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">Maisons</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${getQualiteBadgeColor(dvf.maisons.qualite_donnees || dvf.qualite_donnees)}`}>
                  {dvf.maisons.qualite_donnees || dvf.qualite_donnees || 'N/A'}
                </span>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="text-xs text-green-600 font-semibold mb-1">Prix médian</div>
                <div className="text-3xl font-bold text-green-600">
                  {formatNumber(dvf.maisons.prix_m2_median)} €
                </div>
                <div className="text-sm text-neutral-600">par m²</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-neutral-500 mb-1">25% des ventes</div>
                  <div className="font-bold text-neutral-900">
                    ≤ {formatNumber(dvf.maisons.prix_m2_p25 || dvf.maisons.prix_m2_q1)} €/m²
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1">75% des ventes</div>
                  <div className="font-bold text-neutral-900">
                    ≤ {formatNumber(dvf.maisons.prix_m2_p75 || dvf.maisons.prix_m2_q3)} €/m²
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Nb de ventes</div>
                  <div className="font-bold text-neutral-900">
                    {formatNumber(dvf.maisons.nb_ventes)}
                  </div>
                </div>
                {dvf.maisons.surface_mediane && (
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Surface médiane</div>
                    <div className="font-bold text-neutral-900">
                      {formatNumber(dvf.maisons.surface_mediane)} m²
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
      </div>

      {/* Légende qualité données */}
      <div className="bg-neutral-100 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold text-neutral-700">Qualité des données</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
            Bon ≥30 ventes
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
            Moyen 10-29
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
            Faible &lt;10
          </span>
          {isEstimated && (
            <span className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
              Estimation
            </span>
          )}
        </div>
      </div>
    </div>
    </section>
  )
}
