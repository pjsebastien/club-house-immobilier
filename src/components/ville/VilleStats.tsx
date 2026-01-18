import React from 'react'
import { Ville } from '@/types/ville'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'

interface VilleStatsProps {
  ville: Ville
}

/**
 * VilleStats - Affiche les statistiques agrégées de la ville
 */
export default function VilleStats({ ville }: VilleStatsProps) {
  const stats = ville.stats_agregees

  // Formater les nombres
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPercent = (num: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num) + ' %'
  }

  const indicateurs = [
    {
      label: 'Population totale',
      value: formatNumber(stats.population_totale),
      description: 'Habitants recensés',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Ménages',
      value: formatNumber(stats.nb_menages),
      description: 'Nombre de ménages',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Logements totaux',
      value: formatNumber(stats.nb_logements),
      description: 'Stock de logements',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: 'Résidences principales',
      value: formatNumber(stats.nb_residences_principales),
      description: 'Logements occupés',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: 'Logements vacants',
      value: formatNumber(stats.nb_logements_vacants),
      description: formatPercent(stats.taux_vacance_moyen_pct) + ' de vacance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Résidences secondaires',
      value: formatNumber(stats.nb_residences_secondaires),
      description: 'Logements de loisirs',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
  ]

  return (
    <section id="stats" className="py-12 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            📊 Données territoriales détaillées
          </h2>
          <p className="text-sm text-neutral-600">
            Recensement INSEE 2022 - Agrégation de {ville.nb_quartiers_iris} quartiers IRIS
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {indicateurs.map((indicateur, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0 text-primary-500">
                  {indicateur.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-neutral-500 font-medium">
                    {indicateur.label}
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">
                {indicateur.value}
              </p>
              <p className="text-xs text-neutral-600">
                {indicateur.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
