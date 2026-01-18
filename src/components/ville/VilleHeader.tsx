import React from 'react'
import { Ville } from '@/types/ville'
import Container from '@/components/ui/Container'
import { getVilleScore } from '@/lib/scoring'
import { getAllVilles } from '@/lib/data'

interface VilleHeaderProps {
  ville: Ville
}

/**
 * VilleHeader - En-tête de la page ville avec titre et infos clés
 */
export default function VilleHeader({ ville }: VilleHeaderProps) {
  const allVilles = getAllVilles()
  const score = getVilleScore(ville, allVilles)
  return (
    <section className="bg-gradient-to-b from-primary-600 to-primary-700 pt-16 pb-12 text-white">
      <Container>
        <div className="max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-primary-100">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <a href="/villes" className="hover:text-white transition-colors">
                  Villes
                </a>
              </li>
              <li>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-white font-medium">{ville.nom}</li>
            </ol>
          </nav>

          {/* Titre principal avec contexte */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {ville.nom}
                  </h1>
                  <p className="text-lg text-primary-100">
                    Analyse complète pour investir dans l'immobilier locatif
                  </p>
                </div>

                {/* Score badge visible sur mobile */}
                <div className="lg:hidden flex-shrink-0">
                  <div className="bg-white rounded-xl p-4 text-center shadow-lg min-w-[100px]">
                    <div className="text-sm font-semibold text-primary-600 mb-1">Score</div>
                    <div className="text-4xl font-bold text-primary-600">{score.score_total}</div>
                    <div className="text-xs text-neutral-500">#{score.rang}/134</div>
                  </div>
                </div>
              </div>

              {/* Tags informatifs compacts */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {ville.departement.name} ({ville.departement.code})
                </div>
                <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  {ville.region.name}
                </div>
                <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {ville.nb_quartiers_iris} quartiers
                </div>
              </div>

              {/* Chiffres clés inline sur desktop */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-xs text-primary-100 mb-1">Population</div>
                  <div className="text-lg font-bold text-white">
                    {new Intl.NumberFormat('fr-FR', { notation: 'compact', compactDisplay: 'short' }).format(ville.stats_agregees.population_totale)}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-xs text-primary-100 mb-1">Logements</div>
                  <div className="text-lg font-bold text-white">
                    {new Intl.NumberFormat('fr-FR', { notation: 'compact', compactDisplay: 'short' }).format(ville.stats_agregees.nb_logements)}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-xs text-primary-100 mb-1">Taux vacance</div>
                  <div className="text-lg font-bold text-white">
                    {(ville.stats_agregees.taux_vacance_moyen_pct || 0).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Score d'investissement - visible desktop */}
            <div className="hidden lg:block flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-xl min-w-[200px]">
                <div className="text-center">
                  <div className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
                    Score d'investissement
                  </div>
                  <div className="text-6xl font-bold text-primary-600 mb-2">
                    {score.score_total}
                  </div>
                  <div className="text-sm text-neutral-500 mb-4">
                    sur 100 points
                  </div>
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="text-xs text-neutral-500 mb-1">Classement national</div>
                    <div className="text-2xl font-bold text-neutral-900">
                      #{score.rang}
                    </div>
                    <div className="text-xs text-neutral-500">sur 134 villes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
