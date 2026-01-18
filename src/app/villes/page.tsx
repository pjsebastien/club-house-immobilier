import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { getAllVilles, villeToSlug, getStatistiquesGlobales } from '@/lib/data'
import { getVilleScore } from '@/lib/scoring'
import VilleSearch from '@/components/ui/VilleSearch'

export const metadata: Metadata = {
  title: 'Meilleures villes où investir en France - Classement et analyse',
  description: 'Découvrez les meilleures villes françaises pour investir dans l\'immobilier. Classement des 134 villes de plus de 50 000 habitants avec analyse détaillée par quartier.',
  keywords: [
    'meilleures villes où investir en France',
    'classement villes investissement immobilier',
    'où investir immobilier France',
    'villes rentables investissement',
    'meilleure ville immobilier France',
    'investissement locatif ville France',
    'villes françaises',
    'analyse territoriale',
    'données INSEE',
    'DVF',
  ],
}

/**
 * Page Villes - Classement des meilleures villes où investir
 * SEO focus: "meilleures villes où investir en France"
 */
export default function VillesPage() {
  const villes = getAllVilles()
  const stats = getStatistiquesGlobales()

  // Calculer les scores et trier par rang
  const villesAvecScores = villes.map(ville => ({
    ville,
    score: getVilleScore(ville, villes)
  })).sort((a, b) => (a.score.rang || 999) - (b.score.rang || 999))

  // Top 10
  const top10 = villesAvecScores.slice(0, 10)

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-600 to-primary-700 pt-24 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <span className="text-2xl mr-2">🏆</span>
              {stats.nb_villes} villes analysées • {formatNumber(stats.nb_total_iris)} quartiers IRIS
            </div>

            {/* Titre principal - SEO optimisé */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Meilleures villes où investir en France
            </h1>

            <p className="text-xl text-primary-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Classement comparatif des {stats.nb_villes} villes françaises de plus de 50 000 habitants
              pour l'investissement immobilier. Données officielles INSEE et DVF.
            </p>

            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto mb-10">
              <VilleSearch
                placeholder="Rechercher une ville par nom, département ou région..."
                variant="hero"
              />
            </div>

            {/* Statistiques globales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">{stats.nb_villes}</div>
                <div className="text-sm text-primary-100">Villes classées</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">5</div>
                <div className="text-sm text-primary-100">Critères analysés</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-primary-100">Données officielles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 10 des meilleures villes */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Top 10 des meilleures villes où investir
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Le podium des villes françaises les plus attractives pour l'investissement immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {top10.map(({ ville, score }, index) => {
              const slug = villeToSlug(ville.nom)
              const rang = score.rang || index + 1

              // Couleur selon le rang
              let cardStyle = 'bg-white border-2 border-neutral-200'
              let badgeStyle = 'bg-primary-600 text-white'

              if (rang === 1) {
                cardStyle = 'bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-400 shadow-xl'
                badgeStyle = 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg'
              } else if (rang === 2) {
                cardStyle = 'bg-gradient-to-br from-gray-50 to-white border-2 border-gray-400 shadow-lg'
                badgeStyle = 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md'
              } else if (rang === 3) {
                cardStyle = 'bg-gradient-to-br from-orange-50 to-white border-2 border-orange-400 shadow-lg'
                badgeStyle = 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-md'
              } else if (rang <= 10) {
                cardStyle = 'bg-white border-2 border-primary-200'
                badgeStyle = 'bg-primary-600 text-white'
              }

              return (
                <Link
                  key={ville.code_insee}
                  href={`/villes/${slug}`}
                  className="block group"
                >
                  <div className={`${cardStyle} rounded-xl p-6 hover:shadow-2xl transition-all h-full`}>
                    {/* Badge rang */}
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-16 h-16 ${badgeStyle} rounded-full flex items-center justify-center text-2xl font-bold`}>
                        {rang <= 3 ? '🏆' : `#${rang}`}
                      </div>
                    </div>

                    {/* Nom ville */}
                    <h3 className="text-xl font-bold text-neutral-900 text-center mb-2 group-hover:text-primary-600 transition-colors">
                      {ville.nom}
                    </h3>

                    {/* Département */}
                    <p className="text-xs text-neutral-500 text-center mb-4">
                      {ville.departement.name} ({ville.departement.code})
                    </p>

                    {/* Score */}
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-primary-600 mb-1">
                        {score.score_total}
                      </div>
                      <div className="text-xs text-neutral-500">sur 100 points</div>
                    </div>

                    {/* Stats rapides */}
                    <div className="space-y-2 text-xs border-t border-neutral-200 pt-4">
                      <div className="flex items-center justify-between text-neutral-600">
                        <span>Population</span>
                        <span className="font-semibold">{formatNumber(ville.stats_agregees.population_totale)}</span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-600">
                        <span>Quartiers IRIS</span>
                        <span className="font-semibold">{ville.nb_quartiers_iris}</span>
                      </div>
                    </div>

                    {/* Flèche */}
                    <div className="mt-4 flex justify-center">
                      <svg className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Classement complet */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Classement complet des {stats.nb_villes} villes
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Toutes les villes classées par score d'investissement décroissant
            </p>
          </div>

          {/* Tableau responsive */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl overflow-hidden">
            {/* Header du tableau - Desktop */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 bg-primary-600 text-white px-6 py-4 font-semibold text-sm">
              <div className="col-span-1 text-center">Rang</div>
              <div className="col-span-4">Ville</div>
              <div className="col-span-1 text-center">Score</div>
              <div className="col-span-1 text-center">Access.</div>
              <div className="col-span-1 text-center">Locatif</div>
              <div className="col-span-1 text-center">Dynamisme</div>
              <div className="col-span-1 text-center">Démog.</div>
              <div className="col-span-1 text-center">Liquidité</div>
              <div className="col-span-1"></div>
            </div>

            {/* Lignes du tableau */}
            <div className="divide-y divide-neutral-200">
              {villesAvecScores.map(({ ville, score }, index) => {
                const slug = villeToSlug(ville.nom)
                const rang = score.rang || index + 1

                // Couleur selon le rang
                let rangeBadgeColor = 'bg-neutral-100 text-neutral-700'
                if (rang <= 3) {
                  rangeBadgeColor = 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white'
                } else if (rang <= 10) {
                  rangeBadgeColor = 'bg-primary-100 text-primary-700'
                }

                return (
                  <div
                    key={ville.code_insee}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors"
                  >
                    {/* Rang */}
                    <div className="col-span-1 flex items-center justify-center md:justify-center">
                      <div className={`w-10 h-10 ${rangeBadgeColor} rounded-lg flex items-center justify-center font-bold text-sm shadow-sm`}>
                        {rang <= 3 && '🏆'}
                        {rang > 3 && `#${rang}`}
                      </div>
                    </div>

                    {/* Ville */}
                    <div className="col-span-1 md:col-span-4 flex flex-col justify-center">
                      <Link
                        href={`/villes/${slug}`}
                        className="font-bold text-neutral-900 hover:text-primary-600 transition-colors"
                      >
                        {ville.nom}
                      </Link>
                      <div className="text-xs text-neutral-500">
                        {ville.departement.name} ({ville.departement.code}) • {formatNumber(ville.stats_agregees.population_totale)} hab.
                      </div>
                    </div>

                    {/* Score total */}
                    <div className="hidden md:flex md:col-span-1 items-center justify-center">
                      <div className="text-2xl font-bold text-primary-600">
                        {score.score_total}
                      </div>
                    </div>

                    {/* Critères - Desktop */}
                    <div className="hidden md:flex md:col-span-1 items-center justify-center">
                      <div className="text-sm text-neutral-700">
                        {(score.accessibilite_marche || 0).toFixed(1)}
                        <span className="text-xs text-neutral-400">/25</span>
                      </div>
                    </div>
                    <div className="hidden md:flex md:col-span-1 items-center justify-center">
                      <div className="text-sm text-neutral-700">
                        {(score.potentiel_locatif || 0).toFixed(1)}
                        <span className="text-xs text-neutral-400">/25</span>
                      </div>
                    </div>
                    <div className="hidden md:flex md:col-span-1 items-center justify-center">
                      <div className="text-sm text-neutral-700">
                        {(score.dynamisme_marche || 0).toFixed(1)}
                        <span className="text-xs text-neutral-400">/20</span>
                      </div>
                    </div>
                    <div className="hidden md:flex md:col-span-1 items-center justify-center">
                      <div className="text-sm text-neutral-700">
                        {(score.demographie || 0).toFixed(1)}
                        <span className="text-xs text-neutral-400">/20</span>
                      </div>
                    </div>
                    <div className="hidden md:flex md:col-span-1 items-center justify-center">
                      <div className="text-sm text-neutral-700">
                        {(score.volume_liquidite || 0).toFixed(1)}
                        <span className="text-xs text-neutral-400">/10</span>
                      </div>
                    </div>

                    {/* Bouton d'action */}
                    <div className="col-span-1 flex items-center justify-end">
                      <Link
                        href={`/villes/${slug}`}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Voir
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Score mobile */}
                    <div className="md:hidden col-span-1 flex items-center justify-between border-t border-neutral-100 pt-4 mt-4">
                      <div className="text-sm text-neutral-600">Score total</div>
                      <div className="text-3xl font-bold text-primary-600">
                        {score.score_total}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section SEO - Explications */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Comment choisir la meilleure ville pour investir ?
            </h2>

            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  Les 5 critères analysés
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      25
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Accessibilité du marché</div>
                      <div className="text-sm">Prix médian au m² et stabilité des prix (dispersion P75-P25)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      25
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Potentiel locatif</div>
                      <div className="text-sm">Taux de vacance, tension du marché et part des résidences principales</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      20
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Dynamisme du marché</div>
                      <div className="text-sm">Volume de transactions DVF et qualité des données disponibles</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      20
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Démographie</div>
                      <div className="text-sm">Structure par âge (15-29 ans, 60+ ans) et taille des ménages</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-bold text-sm">
                      10
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Volume et liquidité</div>
                      <div className="text-sm">Nombre de logements et ratio transactions/logements</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  Sources des données
                </h3>
                <p className="text-sm">
                  <strong className="text-neutral-900">INSEE Recensement</strong> (population, démographie),
                  {' '}<strong className="text-neutral-900">INSEE Base Logements</strong> (résidences principales, vacance),
                  {' '}<strong className="text-neutral-900">DVF/Etalab</strong> (transactions immobilières).
                </p>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-2 text-sm">
                      Avertissement important
                    </h4>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      Ce classement est un outil comparatif basé sur des données factuelles.
                      Il ne constitue en aucun cas une recommandation d'investissement.
                      Chaque projet immobilier doit faire l'objet d'une analyse personnalisée
                      avec des professionnels qualifiés (notaires, conseillers financiers).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA vers méthodologie */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Découvrez notre méthodologie complète
          </h2>
          <p className="text-neutral-600 mb-8">
            Comprenez en détail comment nous calculons ces scores et classements
          </p>
          <Link
            href="/methodologie"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">📊</span>
            Voir la méthodologie
          </Link>
        </div>
      </section>
    </>
  )
}
