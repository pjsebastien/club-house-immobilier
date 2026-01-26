import { Metadata } from 'next'
import ComparateurVilles from '@/components/outils/ComparateurVilles'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Comparateur de villes pour investissement immobilier',
  description: 'Comparez objectivement 2 à 5 villes françaises pour votre investissement immobilier. Données INSEE et DVF : population, logements, prix, taux de vacance.',
  keywords: [
    'comparateur villes investissement',
    'comparer villes immobilier',
    'investissement locatif comparaison',
    'meilleure ville investir',
    'comparatif immobilier France',
  ],
  openGraph: {
    title: 'Comparateur de villes pour investissement immobilier',
    description: 'Comparez objectivement 2 à 5 villes françaises pour votre investissement immobilier.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function ComparateurPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white py-12">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full text-sm mb-4">
              <span>Outil</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Comparateur de villes
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Comparez objectivement 2 à 5 villes françaises pour éclairer votre décision d'investissement.
              Toutes les données proviennent de sources officielles (INSEE, DVF).
            </p>
          </div>
        </Container>
      </section>

      {/* Outil de comparaison */}
      <ComparateurVilles />

      {/* Aide à la lecture */}
      <Section background="gray">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">
              Comment lire ce comparatif ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  Population et ménages
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Une population importante indique généralement plus de services et d'infrastructures.
                  Le nombre de ménages et leur taille moyenne permettent d'estimer la demande locative
                  selon les typologies (studios, T2, familiaux...).
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">🏠</span>
                  Taux de vacance
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Un taux de vacance faible (&lt;5%) peut indiquer un marché tendu avec forte demande.
                  Un taux élevé (&gt;10%) peut signifier une offre excédentaire ou un marché moins dynamique.
                  La moyenne nationale est d'environ 8%.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  Prix au m²
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Les prix médians permettent de comparer l'accessibilité des marchés.
                  L'écart entre P25 et P75 (quartiles) indique la dispersion des prix :
                  un écart important signifie des opportunités variées selon les quartiers.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  Résidences principales
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Un fort pourcentage de résidences principales (&gt;85%) indique un marché stable
                  avec des habitants permanents. Un pourcentage plus faible peut indiquer
                  une forte proportion de résidences secondaires (zones touristiques).
                </p>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">⚠️</div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Rappel important</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Ce comparateur présente des données factuelles pour faciliter votre analyse.
                    Il ne constitue pas une recommandation d'investissement. Chaque projet doit
                    faire l'objet d'une étude approfondie incluant une visite sur place et
                    l'avis de professionnels qualifiés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
