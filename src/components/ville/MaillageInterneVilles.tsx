import Link from 'next/link'
import { Ville } from '@/types/ville'
import { getAllVilles, villeToSlug } from '@/lib/data'
import { calculateInvestmentScore } from '@/lib/scoring'

interface MaillageInterneVillesProps {
  ville: Ville
  type: 'quartiers-a-eviter' | 'investir'
}

/**
 * Composant de maillage interne pour les pages villes
 * Affiche des liens vers :
 * - La page mère (classement des villes)
 * - Les villes à proximité (même département/région)
 * - Les villes populaires
 * Minimum 9 liens pour un bon SEO
 */
export default function MaillageInterneVilles({ ville, type }: MaillageInterneVillesProps) {
  const allVilles = getAllVilles()

  // Calculer les scores pour le classement
  const villesWithScores = allVilles.map(v => ({
    ville: v,
    score: calculateInvestmentScore(v, allVilles)
  })).sort((a, b) => b.score.score_total - a.score.score_total)

  // Villes du même département (exclure la ville actuelle)
  const villesDepartement = allVilles
    .filter(v => v.departement.code === ville.departement.code && v.nom !== ville.nom)
    .slice(0, 4)

  // Villes de la même région (hors département, pour diversifier)
  const villesRegion = allVilles
    .filter(v =>
      v.region.code === ville.region.code &&
      v.departement.code !== ville.departement.code &&
      v.nom !== ville.nom
    )
    .sort((a, b) => b.stats_agregees.population_totale - a.stats_agregees.population_totale)
    .slice(0, 4)

  // Villes populaires (top classement, exclure celles déjà listées)
  const villesDejaListees = new Set([
    ville.nom,
    ...villesDepartement.map(v => v.nom),
    ...villesRegion.map(v => v.nom)
  ])

  const villesPopulaires = villesWithScores
    .filter(({ ville: v }) => !villesDejaListees.has(v.nom))
    .slice(0, 5)
    .map(({ ville: v }) => v)

  // Construire l'URL selon le type de page
  const buildUrl = (v: Ville) => {
    const slug = villeToSlug(v.nom)
    return type === 'quartiers-a-eviter'
      ? `/villes/${slug}/quartiers-a-eviter`
      : `/villes/${slug}`
  }

  // Titre selon le type
  const titre = type === 'quartiers-a-eviter'
    ? 'Quartiers à éviter dans d\'autres villes'
    : 'Découvrir d\'autres villes où investir'

  const sousTitre = type === 'quartiers-a-eviter'
    ? 'Analysez les quartiers à surveiller dans les villes proches et populaires'
    : 'Comparez les opportunités d\'investissement dans d\'autres villes'

  return (
    <section className="py-12 bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {titre}
        </h2>
        <p className="text-neutral-600 mb-8">
          {sousTitre}
        </p>

        {/* Lien vers la page mère */}
        <div className="mb-8">
          <Link
            href={type === 'quartiers-a-eviter' ? '/quartiers' : '/villes'}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {type === 'quartiers-a-eviter'
              ? 'Voir toutes les villes avec quartiers à éviter'
              : 'Voir le classement complet des villes'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Villes du même département */}
          {villesDepartement.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                <span className="text-lg">📍</span>
                {ville.departement.name}
              </h3>
              <p className="text-sm text-neutral-500 mb-4">Villes du département</p>
              <ul className="space-y-2">
                {villesDepartement.map(v => (
                  <li key={v.code_insee}>
                    <Link
                      href={buildUrl(v)}
                      className="text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1"
                    >
                      <span>{type === 'quartiers-a-eviter' ? 'Quartiers à éviter à' : 'Investir à'}</span>
                      <span className="font-medium">{v.nom}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Villes de la même région */}
          {villesRegion.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
                <span className="text-lg">🗺️</span>
                {ville.region.name}
              </h3>
              <p className="text-sm text-neutral-500 mb-4">Villes de la région</p>
              <ul className="space-y-2">
                {villesRegion.map(v => (
                  <li key={v.code_insee}>
                    <Link
                      href={buildUrl(v)}
                      className="text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1"
                    >
                      <span>{type === 'quartiers-a-eviter' ? 'Quartiers à éviter à' : 'Investir à'}</span>
                      <span className="font-medium">{v.nom}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Villes populaires */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-neutral-900 mb-1 flex items-center gap-2">
              <span className="text-lg">⭐</span>
              Villes populaires
            </h3>
            <p className="text-sm text-neutral-500 mb-4">Les mieux classées</p>
            <ul className="space-y-2">
              {villesPopulaires.map(v => (
                <li key={v.code_insee}>
                  <Link
                    href={buildUrl(v)}
                    className="text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1"
                  >
                    <span>{type === 'quartiers-a-eviter' ? 'Quartiers à éviter à' : 'Investir à'}</span>
                    <span className="font-medium">{v.nom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Liens supplémentaires vers la page mère de la ville actuelle */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 mb-3">
            Retourner à l'analyse complète :
          </p>
          <div className="flex flex-wrap gap-3">
            {type === 'quartiers-a-eviter' && (
              <Link
                href={`/villes/${villeToSlug(ville.nom)}`}
                className="inline-flex items-center gap-2 bg-white border border-neutral-300 px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:border-primary-300 hover:text-primary-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Investir à {ville.nom}
              </Link>
            )}
            <Link
              href="/villes"
              className="inline-flex items-center gap-2 bg-white border border-neutral-300 px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:border-primary-300 hover:text-primary-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Classement des villes
            </Link>
            <Link
              href="/quartiers"
              className="inline-flex items-center gap-2 bg-white border border-neutral-300 px-4 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:border-primary-300 hover:text-primary-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Quartiers à éviter par ville
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
