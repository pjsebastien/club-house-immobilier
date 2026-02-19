import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import { Metadata } from 'next'
import { getStatistiquesGlobales, getAllVilles, villeToSlug } from '@/lib/data'
import { getVilleScore } from '@/lib/scoring'

export const metadata: Metadata = {
  title: 'Investir dans l\'immobilier en France - Guide et analyses',
  description: 'Guide complet pour investir dans l\'immobilier en France. Analyses de 134 villes, données officielles INSEE et DVF, scores d\'investissement et comparatifs pour trouver où investir.',
  alternates: {
    canonical: '/investir',
  },
  openGraph: {
    title: 'Investir dans l\'immobilier en France - Guide et analyses',
    description: 'Guide complet pour investir dans l\'immobilier en France avec données officielles.',
    type: 'article',
    locale: 'fr_FR',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Investir dans l\'immobilier - Club House Immobilier',
      },
    ],
  },
}

export default function InvestirPage() {
  const stats = getStatistiquesGlobales()
  const allVilles = getAllVilles()

  const villesAvecScores = allVilles.map(ville => ({
    ville,
    score: getVilleScore(ville, allVilles)
  })).sort((a, b) => (a.score.rang || 999) - (b.score.rang || 999))

  const top5 = villesAvecScores.slice(0, 5)

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-600 to-primary-700 pt-24 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Investir dans l'immobilier en France
            </h1>
            <p className="text-xl text-primary-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Utilisez les données officielles INSEE et DVF pour identifier les meilleures opportunités
              d'investissement immobilier parmi {stats.nb_villes} villes et {formatNumber(stats.nb_total_iris)} quartiers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/villes"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-lg"
              >
                Voir le classement des villes
              </Link>
              <Link
                href="/outils/comparateur"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border-2 border-white/30"
              >
                Comparer des villes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi investir dans l'immobilier */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Pourquoi investir dans l'immobilier ?
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-700 space-y-4">
              <p>
                L'investissement immobilier reste l'un des placements les plus populaires en France.
                Que ce soit pour constituer un patrimoine, préparer sa retraite ou générer des revenus
                complémentaires, l'immobilier offre plusieurs avantages : effet de levier du crédit,
                revenus locatifs réguliers et potentiel de plus-value à long terme.
              </p>
              <p>
                Cependant, <strong>le choix de la ville et du quartier</strong> est déterminant pour la
                réussite d'un investissement. Les écarts de performance entre deux villes ou deux quartiers
                peuvent être considérables. C'est pourquoi nous analysons {stats.nb_villes} villes
                françaises de plus de 50 000 habitants avec des données officielles.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Les critères à analyser */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Les critères clés pour investir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Prix au m²</h3>
                <p className="text-sm text-neutral-600">
                  Le prix d'achat détermine votre rendement. Un prix accessible permet un meilleur
                  ratio loyer/prix et un retour sur investissement plus rapide.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Demande locative</h3>
                <p className="text-sm text-neutral-600">
                  Le taux de vacance et la part de résidences principales indiquent la tension
                  du marché locatif. Un marché tendu garantit des revenus réguliers.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Dynamisme du marché</h3>
                <p className="text-sm text-neutral-600">
                  Le volume de transactions reflète l'activité du marché. Un marché actif
                  facilite la revente et réduit le risque de moins-value.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Démographie</h3>
                <p className="text-sm text-neutral-600">
                  La structure de la population (âge, taille des ménages) influence directement
                  le type de biens demandés et la pérennité de la demande locative.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/methodologie"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Découvrir notre méthodologie complète
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Top 5 villes */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Top 5 des villes où investir
            </h2>
            <p className="text-neutral-600 mb-8">
              Les villes les mieux classées selon notre score d'investissement basé sur 5 critères objectifs.
            </p>
            <div className="space-y-4">
              {top5.map(({ ville, score }) => {
                const slug = villeToSlug(ville.nom)
                const rang = score.rang || 0
                return (
                  <Link
                    key={ville.code_insee}
                    href={`/villes/${slug}`}
                    className="flex items-center justify-between bg-white border-2 border-neutral-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                        #{rang}
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                          Investir à {ville.nom}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {ville.departement.name} ({ville.departement.code}) - {formatNumber(ville.stats_agregees.population_totale)} hab.
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">{score.score_total}</div>
                      <div className="text-xs text-neutral-500">sur 100</div>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/villes"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Voir le classement complet des {stats.nb_villes} villes
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Outils disponibles */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">
              Nos outils pour vous aider à investir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/outils/comparateur" className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group">
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600">Comparateur de villes</h3>
                <p className="text-sm text-neutral-600">Comparez jusqu'à 5 villes sur tous les critères d'investissement.</p>
              </Link>
              <Link href="/outils/budget" className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group">
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600">Simulateur budget</h3>
                <p className="text-sm text-neutral-600">Trouvez les villes accessibles selon votre budget d'investissement.</p>
              </Link>
              <Link href="/quartiers" className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group">
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600">Quartiers à surveiller</h3>
                <p className="text-sm text-neutral-600">Identifiez les quartiers présentant des indicateurs moins favorables.</p>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Avertissement */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Avertissement
              </h2>
              <div className="text-sm text-neutral-700 space-y-3 leading-relaxed">
                <p>
                  Les informations présentées sur Club House Immobilier sont basées sur des
                  données publiques officielles (INSEE, DVF/Etalab) et sont fournies à titre indicatif.
                  Elles ne constituent en aucun cas des recommandations d'investissement personnalisées.
                </p>
                <p>
                  Tout projet d'investissement immobilier comporte des risques et doit faire l'objet
                  d'une analyse approfondie avec des professionnels qualifiés : notaires, conseillers
                  en gestion de patrimoine, agents immobiliers et conseillers financiers.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
