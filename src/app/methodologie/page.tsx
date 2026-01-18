import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Méthodologie - Score d\'investissement immobilier',
  description: 'Découvrez notre méthodologie de calcul du score d\'investissement basée sur 5 critères objectifs : accessibilité, potentiel locatif, dynamisme, démographie et liquidité.',
  keywords: [
    'méthodologie investissement immobilier',
    'score investissement ville',
    'critères investissement locatif',
    'analyse territoriale méthodologie',
  ],
}

/**
 * Page Méthodologie - Explication détaillée du calcul des scores
 */
export default function MethodologiePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-600 to-primary-700 pt-24 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <span className="text-2xl mr-2">📊</span>
              Méthodologie • Transparence totale
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Notre méthodologie de calcul
            </h1>

            <p className="text-xl text-primary-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Découvrez comment nous analysons les 134 villes françaises
              avec des critères objectifs et des données officielles.
            </p>
          </div>
        </div>
      </section>

      {/* Vue d'ensemble du score */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Score d'investissement sur 100 points
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Un score comparatif basé sur 5 critères pondérés pour évaluer le potentiel d'investissement de chaque ville
            </p>
          </div>

          {/* Barres de score */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    1. Accessibilité du marché
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Prix médian au m² et stabilité des prix
                  </p>
                </div>
                <div className="text-4xl font-bold text-blue-600">
                  25<span className="text-xl text-neutral-400">/100</span>
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    2. Potentiel locatif
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Taux de vacance, tension du marché et résidences principales
                  </p>
                </div>
                <div className="text-4xl font-bold text-green-600">
                  25<span className="text-xl text-neutral-400">/100</span>
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    3. Dynamisme du marché
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Volume de transactions et qualité des données DVF
                  </p>
                </div>
                <div className="text-4xl font-bold text-purple-600">
                  20<span className="text-xl text-neutral-400">/100</span>
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    4. Démographie
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Structure par âge et taille des ménages
                  </p>
                </div>
                <div className="text-4xl font-bold text-orange-600">
                  20<span className="text-xl text-neutral-400">/100</span>
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    5. Volume et liquidité
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Nombre de logements et ratio transactions/logements
                  </p>
                </div>
                <div className="text-4xl font-bold text-teal-600">
                  10<span className="text-xl text-neutral-400">/100</span>
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Détail de chaque critère */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Détail des 5 critères
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Méthodologie complète de calcul pour chaque composante du score
            </p>
          </div>

          <div className="space-y-8">
            {/* Critère 1 */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Accessibilité du marché (25 points)
                  </h3>
                  <p className="text-neutral-600">
                    Évalue la facilité d'entrée sur le marché immobilier local
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    📍 Prix médian au m² (15 points)
                  </div>
                  <p>
                    Favorise les prix accessibles pour l'investissement (1 500 - 12 000 €/m²).
                    Score inversé : prix bas = score élevé. Pénalité de 20% si données estimées.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    📊 Dispersion des prix P75-P25 (10 points)
                  </div>
                  <p>
                    Favorise les marchés stables avec faible dispersion (500 - 4 000 €/m²).
                    Faible dispersion = marché prévisible et moins risqué.
                  </p>
                </div>

                <div className="text-xs text-neutral-500 italic pt-2 border-t border-neutral-200">
                  Source : DVF/Etalab (Demandes de Valeurs Foncières)
                </div>
              </div>
            </div>

            {/* Critère 2 */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Potentiel locatif (25 points)
                  </h3>
                  <p className="text-neutral-600">
                    Mesure l'attractivité du marché locatif local
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    🏠 Taux de vacance (10 points)
                  </div>
                  <p>
                    Favorise les faibles taux de vacance indiquant une forte demande locative.
                    Zone optimale : 5-8% (marché sain). Pénalités si trop tendu (&lt;5%) ou trop relâché (&gt;8%).
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    📈 Tension du marché (8 points)
                  </div>
                  <p>
                    Ratio logements/population × 1000 (350-550 logements/1000 hab.).
                    Indique l'équilibre offre/demande du marché local.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    🔑 Part des résidences principales (7 points)
                  </div>
                  <p>
                    Favorise les marchés stables avec forte part de résidences principales (70-95%).
                    Garantit une demande locative durable.
                  </p>
                </div>

                <div className="text-xs text-neutral-500 italic pt-2 border-t border-neutral-200">
                  Source : INSEE Base Logements
                </div>
              </div>
            </div>

            {/* Critère 3 */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Dynamisme du marché (20 points)
                  </h3>
                  <p className="text-neutral-600">
                    Évalue l'activité et la fiabilité du marché immobilier
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    💰 Volume de transactions (12 points)
                  </div>
                  <p>
                    Nombre annuel de ventes (50-3000 transactions/an).
                    Volume élevé = marché actif et attractif.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    ✅ Qualité des données DVF (8 points)
                  </div>
                  <p>
                    Score selon fiabilité : Bonne (8 pts), Moyenne (6 pts), Faible (4 pts), Estimation (3 pts).
                    Garantit la qualité de l'analyse.
                  </p>
                </div>

                <div className="text-xs text-neutral-500 italic pt-2 border-t border-neutral-200">
                  Source : DVF/Etalab (Demandes de Valeurs Foncières)
                </div>
              </div>
            </div>

            {/* Critère 4 */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Démographie (20 points)
                  </h3>
                  <p className="text-neutral-600">
                    Analyse la structure démographique favorable à l'investissement
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    👨‍🎓 Part des 15-29 ans (8 points)
                  </div>
                  <p>
                    Favorise les villes jeunes (12-25%). Population de locataires potentiels (étudiants, jeunes actifs).
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    👴 Part des 60+ ans (6 points)
                  </div>
                  <p>
                    Favorise un équilibre (15-20%). Stabilité et pouvoir d'achat, sans vieillissement excessif.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    👨‍👩‍👧 Taille des ménages (6 points)
                  </div>
                  <p>
                    Favorise la diversité (1.8-2.5 personnes/ménage). Indique le type de biens recherchés.
                  </p>
                </div>

                <div className="text-xs text-neutral-500 italic pt-2 border-t border-neutral-200">
                  Source : INSEE Recensement (Démographie par quartier IRIS)
                </div>
              </div>
            </div>

            {/* Critère 5 */}
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    Volume et liquidité (10 points)
                  </h3>
                  <p className="text-neutral-600">
                    Mesure la profondeur du marché et la facilité de revente
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    🏢 Nombre de logements (6 points)
                  </div>
                  <p>
                    Profondeur du marché (10 000 - 100 000 logements).
                    Plus de logements = plus d'opportunités et de choix.
                  </p>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="font-bold text-neutral-900 mb-2">
                    🔄 Ratio transactions/logements (4 points)
                  </div>
                  <p>
                    Facilité de revente (0.5-3% du parc par an).
                    Taux élevé = marché liquide, revente facilitée.
                  </p>
                </div>

                <div className="text-xs text-neutral-500 italic pt-2 border-t border-neutral-200">
                  Source : INSEE Base Logements + DVF/Etalab (Transactions)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sources et transparence */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Sources des données
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              100% de données publiques officielles, zéro estimation subjective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6">
              <div className="text-3xl mb-4">🏛️</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                INSEE
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Recensement (population, démographie), Base Logements (résidences principales, vacance)
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                DVF / Etalab
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Demandes de Valeurs Foncières (prix au m², volumes de transactions, quartiles)
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-xl p-6">
              <div className="text-3xl mb-4">🗺️</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                geo.api.gouv.fr
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Données administratives (codes INSEE, départements, régions, quartiers IRIS)
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Engagement de transparence
                </h3>
                <div className="text-sm text-neutral-700 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-neutral-900">✅ Sources vérifiables :</strong> Toutes nos données proviennent de sources publiques officielles (INSEE, DVF/Etalab, API Gouvernement).
                  </p>
                  <p>
                    <strong className="text-neutral-900">✅ Méthodologie documentée :</strong> Chaque critère et sa pondération sont expliqués en détail sur cette page.
                  </p>
                  <p>
                    <strong className="text-neutral-900">✅ Calculs reproductibles :</strong> Nos algorithmes de scoring sont basés sur des formules mathématiques simples et transparentes.
                  </p>
                  <p>
                    <strong className="text-neutral-900">✅ Aucune estimation cachée :</strong> Quand des données sont estimées (faute de disponibilité DVF), nous l'indiquons clairement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avertissement */}
      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  Avertissement important
                </h3>
                <div className="text-sm text-neutral-700 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-neutral-900">Ce score est un outil comparatif, non une recommandation.</strong> Il ne tient pas compte de :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Votre situation personnelle (budget, objectifs, fiscalité)</li>
                    <li>Votre stratégie d'investissement (rendement, plus-value, défiscalisation)</li>
                    <li>Les spécificités locales (transport, équipements, sécurité)</li>
                    <li>Les évolutions futures du marché (projets urbains, économie locale)</li>
                  </ul>
                  <p className="pt-3 border-t border-orange-200">
                    <strong className="text-neutral-900">Consultez toujours des professionnels qualifiés</strong> (notaires, conseillers en gestion de patrimoine, agents immobiliers locaux) avant toute décision d'investissement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA vers classement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Découvrez le classement complet
          </h2>
          <p className="text-neutral-600 mb-8">
            Consultez les 134 villes classées selon cette méthodologie
          </p>
          <Link
            href="/villes"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">🏆</span>
            Voir le classement
          </Link>
        </div>
      </section>
    </>
  )
}
