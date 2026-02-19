import React from 'react'
import { Ville } from '@/types/ville'
import { getVilleDVF } from '@/lib/data'

interface VilleContentSEOProps {
  ville: Ville
}

/**
 * VilleContentSEO - Contenu SEO optimisé pour "investir à {ville}"
 */
export default function VilleContentSEO({ ville }: VilleContentSEOProps) {
  const dvf = getVilleDVF(ville)
  const stats = ville.stats_agregees
  const prixMedian = dvf.prix_m2_median_global || 0

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const formatPrice = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num) + ' €'
  }

  return (
    <section id="investir" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="prose prose-lg max-w-none">
          {/* Section 1 : Investir à {ville} */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Guide d'investissement immobilier à {ville.nom}
            </h2>

            <div className="text-base text-neutral-700 leading-relaxed space-y-4">
              <p>
                <strong>Investir à {ville.nom}</strong> représente une opportunité intéressante sur le marché immobilier de {ville.region.name}.
                Avec une population de {formatNumber(stats.population_totale)} habitants et {formatNumber(stats.nb_logements)} logements,
                cette ville du département {ville.departement.name} ({ville.departement.code}) offre un marché structuré pour
                l'investissement locatif.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Pourquoi investir à {ville.nom} ?
              </h3>

              <p>
                Le marché immobilier à {ville.nom} se caractérise par un <strong>prix médian de {formatPrice(prixMedian)} par m²</strong>,
                ce qui positionne la ville comme {prixMedian < 2500 ? 'très accessible' : prixMedian < 4000 ? 'accessible' : 'attractive'}
                pour les investisseurs. {dvf.nb_ventes_total ?
                `Avec ${formatNumber(dvf.nb_ventes_total)} transactions enregistrées annuellement, le marché démontre une liquidité ${dvf.nb_ventes_total > 1000 ? 'excellente' : dvf.nb_ventes_total > 500 ? 'très bonne' : 'correcte'}.` :
                'Le marché présente des opportunités pour les investisseurs avisés.'}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg">
                <h4 className="text-lg font-bold text-blue-900 mb-3">
                  Points clés pour investir à {ville.nom}
                </h4>
                <ul className="space-y-2 text-blue-900">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>Marché locatif :</strong> Taux de vacance de {(stats.taux_vacance_moyen_pct || 0).toFixed(1)}%
                    {stats.taux_vacance_moyen_pct && stats.taux_vacance_moyen_pct < 6 ? ', indiquant une forte demande locative' :
                     stats.taux_vacance_moyen_pct && stats.taux_vacance_moyen_pct < 9 ? ', reflétant un marché équilibré' :
                     ', offrant des opportunités de négociation'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>Stabilité :</strong> {(((stats.nb_residences_principales || 0) / (stats.nb_logements || 1)) * 100).toFixed(0)}%
                    de résidences principales garantissent la stabilité du marché</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>Diversité :</strong> {ville.nb_quartiers_iris} quartiers IRIS permettent de cibler précisément votre investissement</span>
                  </li>
                  {dvf.appartements && (
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">✓</span>
                      <span><strong>Appartements :</strong> Prix médian de {formatPrice(dvf.appartements.prix_m2_median)}/m²
                      avec {formatNumber(dvf.appartements.nb_ventes)} transactions</span>
                    </li>
                  )}
                  {dvf.maisons && (
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">✓</span>
                      <span><strong>Maisons :</strong> Prix médian de {formatPrice(dvf.maisons.prix_m2_median)}/m²
                      avec {formatNumber(dvf.maisons.nb_ventes)} transactions</span>
                    </li>
                  )}
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Quel type de bien pour investir à {ville.nom} ?
              </h3>

              <p>
                Le choix du type de bien dépend de votre stratégie d'investissement à {ville.nom}.
                {dvf.appartements && dvf.maisons && (
                  <>
                    Les appartements, avec un prix médian de {formatPrice(dvf.appartements.prix_m2_median)}/m²,
                    représentent {dvf.appartements.prix_m2_median < dvf.maisons.prix_m2_median ?
                    'une option plus accessible que les maisons' :
                    'un investissement premium comparé aux maisons'}
                    (prix médian {formatPrice(dvf.maisons.prix_m2_median)}/m²).
                  </>
                )}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {dvf.appartements && (
                  <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🏢</span>
                      Investir dans un appartement à {ville.nom}
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li>• Budget plus accessible dès {formatPrice((dvf.appartements.prix_m2_p25 || dvf.appartements.prix_m2_q1 || 0) * 40)}</li>
                      <li>• Forte demande locative en centre-ville</li>
                      <li>• Gestion simplifiée et charges prévisibles</li>
                      <li>• Idéal pour location étudiante ou jeunes actifs</li>
                    </ul>
                  </div>
                )}
                {dvf.maisons && (
                  <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🏡</span>
                      Investir dans une maison à {ville.nom}
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li>• Surface moyenne de {formatNumber(dvf.maisons.surface_mediane || 0)} m²</li>
                      <li>• Attractif pour les familles</li>
                      <li>• Potentiel de valorisation à long terme</li>
                      <li>• Rendement locatif stable et durable</li>
                    </ul>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                Rentabilité locative à {ville.nom}
              </h3>

              <p>
                Pour optimiser votre rentabilité en investissant à {ville.nom}, le choix du quartier constitue un facteur déterminant.
                Avec un taux de vacance de {(stats.taux_vacance_moyen_pct || 0).toFixed(1)}%,
                {stats.taux_vacance_moyen_pct && stats.taux_vacance_moyen_pct < 6 ?
                "le marché est tendu, ce qui favorise les propriétaires-bailleurs avec des taux d'occupation élevés" :
                stats.taux_vacance_moyen_pct && stats.taux_vacance_moyen_pct < 9 ?
                "le marché est équilibré, offrant un bon compromis entre rendement et facilité de location" :
                "il existe des opportunités pour négocier les prix d'achat et améliorer votre rendement brut"}.
              </p>

              <p>
                Les {ville.nb_quartiers_iris} quartiers de {ville.nom} présentent des profils différents en termes de
                démographie, prix immobiliers et demande locative. Notre analyse détaillée de chaque quartier IRIS
                vous permet d'identifier précisément où investir à {ville.nom} pour optimiser votre stratégie.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-6 rounded-r-lg">
                <p className="text-xs text-orange-900">
                  <strong>Disclaimer :</strong> Les données présentées sont issues de sources officielles (INSEE, DVF) et ont un caractère purement informatif.
                  Elles ne constituent en aucun cas un conseil en investissement. Chaque projet immobilier doit faire l'objet d'une analyse personnalisée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
