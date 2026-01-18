import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllVilles, getStatistiquesGlobales } from '@/lib/data'
import VilleSearch from '@/components/ui/VilleSearch'

/**
 * HeroSection - Section hero de la page d'accueil
 * Message principal et CTAs
 */
export default function HeroSection() {
  const stats = getStatistiquesGlobales()

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  return (
    <section className="relative bg-gradient-to-b from-primary-600 to-primary-700 pt-24 pb-16 text-white overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/vue immobilière.jpg"
          alt="Vue immobilière"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span className="text-2xl mr-2">🏘️</span>
            {stats.nb_villes} villes analysées • {formatNumber(stats.nb_total_iris)} quartiers IRIS
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Analysez les données immobilières<br />
            <span className="text-primary-200">ville par ville, quartier par quartier</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed max-w-3xl mx-auto">
            Explorez {stats.nb_villes} villes françaises et {formatNumber(stats.nb_total_iris)} quartiers IRIS.
            Données officielles INSEE et DVF pour éclairer vos décisions d'investissement.
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-10">
            <VilleSearch
              placeholder="Rechercher une ville (Paris, Lyon, Marseille...)"
              variant="hero"
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/villes"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">📊</span>
              Explorer toutes les villes
            </Link>
            <Link
              href="#comment-ca-marche"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border-2 border-white/30"
            >
              Comment ça marche ?
            </Link>
          </div>

          {/* Statistiques clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold mb-1">{stats.nb_villes}</div>
              <div className="text-sm text-primary-100">Villes analysées</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold mb-1">{formatNumber(stats.nb_total_iris)}</div>
              <div className="text-sm text-primary-100">Quartiers IRIS</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold mb-1">{((stats.population_totale_couverte || 0) / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-primary-100">Habitants</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm text-primary-100">Données officielles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-white/20">
        <div className="flex flex-wrap items-center justify-center gap-6 text-primary-100 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>INSEE 2022</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>DVF / Etalab 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Données publiques ouvertes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
