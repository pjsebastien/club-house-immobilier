import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getVilleBySlug, getAllVilleSlugs, villeToSlug } from '@/lib/data'
import VilleHeader from '@/components/ville/VilleHeader'
import VilleNavigation from '@/components/ville/VilleNavigation'
import VilleGuide from '@/components/ville/VilleGuide'
import VilleStats from '@/components/ville/VilleStats'
import VilleScoreInvestissement from '@/components/ville/VilleScoreInvestissement'
import VillePresentationInvestissement from '@/components/ville/VillePresentationInvestissement'
import VilleDVF from '@/components/ville/VilleDVF'
import VilleContentSEO from '@/components/ville/VilleContentSEO'
import VilleMeilleursQuartiers from '@/components/ville/VilleMeilleursQuartiers'
import VilleQuartiersEnhanced from '@/components/ville/VilleQuartiersEnhanced'
import MaillageInterneVilles from '@/components/ville/MaillageInterneVilles'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

interface VillePageProps {
  params: {
    slug: string
  }
}

/**
 * Génère les métadonnées SEO pour chaque page ville
 */
export async function generateMetadata({ params }: VillePageProps): Promise<Metadata> {
  const ville = getVilleBySlug(params.slug)

  if (!ville) {
    return {
      title: 'Ville non trouvée',
    }
  }

  const title = `Investir à ${ville.nom} : Analyse immobilière à partir des données officielles`
  const description = `Analyse immobilière de ${ville.nom} à partir des données INSEE et DVF : marché local, quartiers, indicateurs et comparaisons pour éclairer un projet d'investissement.`

  return {
    title,
    description,
    alternates: {
      canonical: `/villes/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/**
 * Génère les routes statiques pour toutes les villes
 */
export async function generateStaticParams() {
  const slugs = getAllVilleSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

/**
 * Page ville individuelle
 */
export default function VillePage({ params }: VillePageProps) {
  const ville = getVilleBySlug(params.slug)

  if (!ville) {
    notFound()
  }

  // Définir les sections pour la navigation
  const sections = [
    { id: 'guide', label: 'Guide', icon: '👋' },
    { id: 'score', label: 'Score', icon: '📊' },
    { id: 'presentation', label: 'Analyse', icon: '📍' },
    { id: 'prix', label: 'Prix', icon: '💵' },
    { id: 'stats', label: 'Données', icon: '📈' },
    { id: 'investir', label: 'Investir', icon: '💼' },
    { id: 'meilleurs-quartiers', label: 'Top Quartiers', icon: '🏆' },
    { id: 'quartiers', label: 'Tous les quartiers', icon: '🏘️' },
  ]

  return (
    <>
      {/* Header avec titre et infos principales */}
      <VilleHeader ville={ville} />

      {/* Navigation sticky interactive */}
      <VilleNavigation sections={sections} />

      {/* Guide d'utilisation pour novices */}
      <VilleGuide ville={ville} />

      {/* Score d'investissement */}
      <VilleScoreInvestissement ville={ville} />

      {/* Présentation investissement immobilier */}
      <VillePresentationInvestissement ville={ville} />

      {/* Prix immobiliers DVF */}
      <VilleDVF ville={ville} />

      {/* Statistiques agrégées */}
      <VilleStats ville={ville} />

      {/* Contenu SEO : Investir à {ville} */}
      <VilleContentSEO ville={ville} />

      {/* Meilleurs quartiers pour investir */}
      <VilleMeilleursQuartiers ville={ville} />

      {/* Lien vers quartiers à éviter */}
      <section className="py-8 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href={`/villes/${villeToSlug(ville.nom)}/quartiers-a-eviter`}
            className="flex items-center justify-between bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-orange-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-orange-700 transition-colors">
                  Quartiers à surveiller à {ville.nom}
                </h3>
                <p className="text-sm text-neutral-600">
                  Analyse factuelle des quartiers présentant des indicateurs moins favorables
                </p>
              </div>
            </div>
            <div className="text-neutral-400 group-hover:text-orange-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </section>

      {/* Section quartiers avec recherche et pagination */}
      <VilleQuartiersEnhanced ville={ville} />

      {/* Maillage interne - liens vers autres villes */}
      <MaillageInterneVilles ville={ville} type="investir" />

      {/* Avertissement */}
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-neutral-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Avertissement
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Les données présentées sont issues de sources officielles (INSEE, DVF/Etalab) et ont un caractère
                    purement factuel. Elles ne constituent en aucun cas une recommandation d'investissement. Chaque
                    projet immobilier doit faire l'objet d'une analyse personnalisée tenant compte de votre situation
                    et de vos objectifs spécifiques.
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
