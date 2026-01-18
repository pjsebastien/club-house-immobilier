import React from 'react'
import { Ville } from '@/types/ville'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'

interface VilleQuartiersProps {
  ville: Ville
}

/**
 * VilleQuartiers - Affiche les quartiers IRIS de la ville
 */
export default function VilleQuartiers({ ville }: VilleQuartiersProps) {
  // Limiter l'affichage aux 12 premiers quartiers pour la démo
  const quartiersAffiches = ville.quartiers.slice(0, 12)
  const hasMore = ville.quartiers.length > 12

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPercent = (num: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num) + '%'
  }

  // Fonction pour déterminer la couleur du badge selon le niveau de vacance
  const getVacanceBadgeColor = (niveau: string | null) => {
    if (!niveau) return 'bg-neutral-50 text-neutral-700 border-neutral-200'

    switch (niveau.toLowerCase()) {
      case 'faible':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'moyen':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'élevé':
      case 'eleve':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-neutral-50 text-neutral-700 border-neutral-200'
    }
  }

  return (
    <Section background="gray">
      <div className="mb-12">
        <h2 className="text-neutral-900 mb-4">
          Quartiers IRIS
        </h2>
        <p className="text-lg text-neutral-600 mb-6">
          {ville.nom} compte {ville.nb_quartiers_iris} quartiers IRIS (Îlots Regroupés pour l'Information Statistique).
          Explorez les indicateurs par quartier pour affiner votre analyse territoriale.
        </p>
        {hasMore && (
          <p className="text-sm text-neutral-500">
            Affichage de {quartiersAffiches.length} quartiers sur {ville.nb_quartiers_iris}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quartiersAffiches.map((quartier) => (
          <Card key={quartier.iris_id} hover>
            <div className="space-y-4">
              {/* En-tête quartier */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2">
                  {quartier.nom_quartier}
                </h3>
                <p className="text-xs text-neutral-500">
                  {quartier.nom_commune}
                </p>
              </div>

              {/* Indicateurs clés */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">Population</span>
                  <span className="font-medium text-neutral-900">
                    {formatNumber(quartier.stats_insee.population)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">Ménages</span>
                  <span className="font-medium text-neutral-900">
                    {formatNumber(quartier.stats_insee.menages)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">Logements</span>
                  <span className="font-medium text-neutral-900">
                    {formatNumber(quartier.stats_insee.logements.total)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">Taux de vacance</span>
                  <span className="font-medium text-neutral-900">
                    {formatPercent(quartier.stats_insee.taux_vacance_pct)}
                  </span>
                </div>
              </div>

              {/* Badges indicateurs */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-200">
                {quartier.indicateurs_calcules.niveau_vacance && (
                  <span className={`text-xs px-2 py-1 rounded-full border ${getVacanceBadgeColor(quartier.indicateurs_calcules.niveau_vacance)}`}>
                    Vacance : {quartier.indicateurs_calcules.niveau_vacance}
                  </span>
                )}
                {quartier.indicateurs_calcules.profil_demographique && (
                  <span className="text-xs px-2 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
                    {quartier.indicateurs_calcules.profil_demographique}
                  </span>
                )}
              </div>

              {/* Prix DVF si disponibles */}
              {quartier.dvf_appartements && (
                <div className="pt-2 border-t border-neutral-200">
                  <p className="text-xs text-neutral-500 mb-2">Prix médian appartements (DVF)</p>
                  <p className="text-lg font-bold text-primary-600">
                    {formatNumber(quartier.dvf_appartements.prix_m2_median)} € /m²
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {quartier.dvf_appartements.nb_ventes} ventes • {quartier.dvf_appartements.qualite_donnees}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-700">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">
              {ville.nb_quartiers_iris - quartiersAffiches.length} autres quartiers disponibles
            </span>
          </div>
        </div>
      )}

      {/* Note méthodologique */}
      <div className="mt-8 p-4 bg-white border border-neutral-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-neutral-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-neutral-600 leading-relaxed space-y-2">
            <p>
              <strong>Qu'est-ce qu'un quartier IRIS ?</strong> L'IRIS (Îlots Regroupés pour l'Information Statistique)
              est la brique de base de la diffusion des données infra-communales de l'INSEE. Il compte environ 2 000 habitants.
            </p>
            <p>
              <strong>Prix DVF :</strong> Les prix au m² proviennent des transactions immobilières officielles (DVF/Etalab 2024).
              La qualité des données varie selon le nombre de ventes observées.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
