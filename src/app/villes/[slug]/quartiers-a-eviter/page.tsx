import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getVilleBySlug, getAllVilleSlugs, villeToSlug, getVilleDVF, getAllVilles } from '@/lib/data'
import { getQuartiersAEviter } from '@/lib/scoring-quartiers'
import { calculateInvestmentScore } from '@/lib/scoring'
import QuartiersAEviterSection from '@/components/ville/QuartiersAEviterSection'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

interface PageProps {
  params: {
    slug: string
  }
}

/**
 * Génère les métadonnées SEO pour chaque page quartiers à éviter
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ville = getVilleBySlug(params.slug)

  if (!ville) {
    return {
      title: 'Ville non trouvée',
    }
  }

  const title = `Quartiers à éviter à ${ville.nom} : Analyse des zones moins favorables`
  const description = `Découvrez les quartiers à éviter pour investir à ${ville.nom}. Analyse factuelle basée sur les données INSEE : taux de vacance, démographie, stabilité résidentielle. Guide pour éviter les mauvais investissements.`

  return {
    title,
    description,
    keywords: [
      `quartiers à éviter ${ville.nom}`,
      `quartier à éviter ${ville.nom}`,
      `où ne pas investir ${ville.nom}`,
      `mauvais quartiers ${ville.nom}`,
      `quartiers dangereux ${ville.nom}`,
      `éviter ${ville.nom}`,
      `investissement immobilier ${ville.nom}`,
      ville.departement.name,
      ville.region.name,
    ],
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
 * Page quartiers à éviter pour une ville
 */
export default function QuartiersAEviterPage({ params }: PageProps) {
  const ville = getVilleBySlug(params.slug)

  if (!ville) {
    notFound()
  }

  // Calculer le score de la ville pour pondérer les scores quartiers
  const allVilles = getAllVilles()
  const villeScore = calculateInvestmentScore(ville, allVilles)
  const quartiersAEviter = getQuartiersAEviter(ville.quartiers, 50, villeScore.score_total)
  const dvfData = getVilleDVF(ville)
  const stats = ville.stats_agregees

  // Fonctions de formatage
  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPrice = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(num)
  }

  const formatPercent = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) return 'N/A'
    return num.toFixed(1) + '%'
  }

  // Calculer quelques stats supplémentaires
  const pctQuartiersAEviter = ((quartiersAEviter.length / ville.nb_quartiers_iris) * 100).toFixed(1)
  const tauxVacanceMoyen = stats.taux_vacance_moyen_pct

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2 text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/villes" className="hover:text-white transition-colors">
                  Villes
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/villes/${villeToSlug(ville.nom)}`} className="hover:text-white transition-colors">
                  {ville.nom}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">Quartiers à surveiller</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Quartiers à éviter pour investir à {ville.nom}
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl">
            Découvrez les quartiers à éviter à {ville.nom} ({ville.departement.name}) pour votre investissement locatif.
            Analyse basée sur les données officielles INSEE.
          </p>

          {/* Stats rapides */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-neutral-400 text-sm">Quartiers analysés</span>
              <span className="ml-2 font-bold">{ville.nb_quartiers_iris}</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-neutral-400 text-sm">Quartiers identifiés</span>
              <span className="ml-2 font-bold">{quartiersAEviter.length}</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-neutral-400 text-sm">Source</span>
              <span className="ml-2 font-bold">INSEE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer principal */}
      <section className="bg-amber-50 border-b border-amber-200 py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-amber-900 mb-1">
                Information importante
              </h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                Cette analyse présente les quartiers de {ville.nom} dont certains indicateurs statistiques
                sont moins favorables pour l'investissement locatif. Les données proviennent exclusivement
                de sources officielles (INSEE, DVF/Etalab) et sont présentées de manière factuelle,
                <strong> sans jugement de valeur</strong> sur les quartiers ou leurs habitants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte sur la ville */}
      <section className="bg-white py-10 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            {ville.nom} en quelques chiffres
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-neutral-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-primary-600">{formatNumber(stats.population_totale)}</div>
              <div className="text-sm text-neutral-600 mt-1">Habitants</div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-primary-600">{formatNumber(stats.nb_logements)}</div>
              <div className="text-sm text-neutral-600 mt-1">Logements</div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-primary-600">{ville.nb_quartiers_iris}</div>
              <div className="text-sm text-neutral-600 mt-1">Quartiers IRIS</div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4 text-center">
              <div className={`text-3xl font-bold ${tauxVacanceMoyen > 10 ? 'text-orange-600' : tauxVacanceMoyen > 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                {formatPercent(tauxVacanceMoyen)}
              </div>
              <div className="text-sm text-neutral-600 mt-1">Taux de vacance</div>
            </div>
          </div>

          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-700 leading-relaxed">
              <strong>{ville.nom}</strong> est une commune située dans le département {ville.departement.name} en région {ville.region.name}.
              Avec <strong>{formatNumber(stats.population_totale)} habitants</strong> répartis sur <strong>{ville.nb_quartiers_iris} quartiers IRIS</strong>,
              la ville présente un taux de vacance moyen de <strong>{formatPercent(tauxVacanceMoyen)}</strong>.
            </p>

            {dvfData && dvfData.prix_m2_median_global && (
              <p className="text-neutral-700 leading-relaxed mt-4">
                Le prix médian au m² à {ville.nom} est de <strong>{formatPrice(dvfData.prix_m2_median_global)}/m²</strong>
                {dvfData.appartements?.prix_m2_median && (
                  <> ({formatPrice(dvfData.appartements.prix_m2_median)}/m² pour les appartements</>
                )}
                {dvfData.maisons?.prix_m2_median && (
                  <>, {formatPrice(dvfData.maisons.prix_m2_median)}/m² pour les maisons</>
                )}
                {dvfData.appartements?.prix_m2_median && <>)</>}.
                {dvfData.is_estimated && <span className="text-neutral-500 text-sm"> (estimation)</span>}
              </p>
            )}

            <p className="text-neutral-700 leading-relaxed mt-4">
              Sur les {ville.nb_quartiers_iris} quartiers analysés, <strong>{quartiersAEviter.length} quartiers ({pctQuartiersAEviter}%)</strong> présentent
              des indicateurs moins favorables pour l'investissement locatif selon notre méthodologie.
              {quartiersAEviter.length <= 5 && (
                <> Ce faible nombre indique que {ville.nom} offre globalement de bonnes opportunités d'investissement.</>
              )}
              {quartiersAEviter.length > 10 && (
                <> Il est recommandé de bien étudier chaque quartier avant tout investissement.</>
              )}
            </p>
          </div>

          {/* Répartition des logements */}
          <div className="mt-8 bg-neutral-50 rounded-xl p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Répartition des logements à {ville.nom}</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{formatNumber(stats.nb_residences_principales)}</div>
                <div className="text-xs text-neutral-600">Résidences principales</div>
                <div className="text-xs text-neutral-500">({((stats.nb_residences_principales / stats.nb_logements) * 100).toFixed(1)}%)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{formatNumber(stats.nb_residences_secondaires)}</div>
                <div className="text-xs text-neutral-600">Résidences secondaires</div>
                <div className="text-xs text-neutral-500">({((stats.nb_residences_secondaires / stats.nb_logements) * 100).toFixed(1)}%)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{formatNumber(stats.nb_logements_vacants)}</div>
                <div className="text-xs text-neutral-600">Logements vacants</div>
                <div className="text-xs text-neutral-500">({formatPercent(tauxVacanceMoyen)})</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-neutral-50 py-8 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            Comment identifions-nous les quartiers à éviter ?
          </h2>
          <p className="text-neutral-700 mb-4">
            Notre analyse se base sur des <strong>critères objectifs et mesurables</strong>. Un quartier est signalé
            lorsqu'il cumule <strong>au moins 2 des indicateurs</strong> suivants :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="text-2xl mb-2">🏚️</div>
              <div className="font-medium text-neutral-900">Taux de vacance &gt; 10%</div>
              <div className="text-sm text-neutral-600">Plus de logements inoccupés que la moyenne nationale</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-neutral-900">Score &lt; 55/100</div>
              <div className="text-sm text-neutral-600">Score d'investissement en dessous de la moyenne</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium text-neutral-900">Population &lt; 500</div>
              <div className="text-sm text-neutral-600">Quartier peu dense, services limités</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-medium text-neutral-900">Résidences principales &lt; 70%</div>
              <div className="text-sm text-neutral-600">Forte proportion de logements secondaires ou vacants</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-medium text-neutral-900">Pression résidentielle &lt; 2/5</div>
              <div className="text-sm text-neutral-600">Faible tension sur le marché locatif</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="text-2xl mb-2">👴</div>
              <div className="font-medium text-neutral-900">60+ ans &gt; 35%</div>
              <div className="text-sm text-neutral-600">Population vieillissante, moins de demande locative</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <div className="text-2xl mb-2">🔄</div>
              <div className="font-medium text-neutral-900">Faible stabilité résidentielle</div>
              <div className="text-sm text-neutral-600">Fort turnover des habitants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des quartiers */}
      <QuartiersAEviterSection ville={ville} />

      {/* Avertissement final */}
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
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    Les données présentées sont issues de sources officielles (INSEE) et ont un caractère
                    purement factuel. Elles ne constituent en aucun cas une recommandation d'investissement ni un
                    jugement sur la qualité de vie dans ces quartiers.
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Chaque projet immobilier doit faire l'objet d'une analyse personnalisée incluant une
                    <strong> visite sur place</strong>, une étude du marché local, et l'avis de professionnels
                    qualifiés (agents immobiliers, notaires, conseillers en gestion de patrimoine).
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
