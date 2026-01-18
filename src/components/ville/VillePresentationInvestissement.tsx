import React from 'react'
import { Ville } from '@/types/ville'
import { getVilleDVF } from '@/lib/data'

interface VillePresentationInvestissementProps {
  ville: Ville
}

export default function VillePresentationInvestissement({ ville }: VillePresentationInvestissementProps) {
  const dvf = getVilleDVF(ville)
  const stats = ville.stats_agregees

  const generatePresentation = () => {
    const prixMedian = dvf.prix_m2_median_global || 0
    const tauxVacance = stats.taux_vacance_moyen_pct
    const nbVentes = dvf.nb_ventes_total || 0
    const population = stats.population_totale
    const pctResidencesPrincipales = (stats.nb_residences_principales / stats.nb_logements) * 100

    let pct15_29 = 0
    let count = 0
    ville.quartiers.forEach(q => {
      if (q.stats_insee) {
        pct15_29 += q.stats_insee.pct_15_29_ans || 0
        count++
      }
    })
    const moyPct15_29 = count > 0 ? pct15_29 / count : 0

    // Positionnement
    let positionnement = `${ville.nom}, située en ${ville.region.name}, compte ${new Intl.NumberFormat('fr-FR').format(population)} habitants. `

    if (prixMedian < 2500) {
      positionnement += `Le marché se caractérise par des prix accessibles (${new Intl.NumberFormat('fr-FR').format(prixMedian)} €/m²), offrant un point d'entrée attractif.`
    } else if (prixMedian < 5000) {
      positionnement += `Avec un prix médian de ${new Intl.NumberFormat('fr-FR').format(prixMedian)} €/m², le marché présente un équilibre entre accessibilité et potentiel.`
    } else {
      positionnement += `Le niveau de prix (${new Intl.NumberFormat('fr-FR').format(prixMedian)} €/m²) reflète l'attractivité de la ville.`
    }

    // Marché locatif
    let marcheLocatif = ''
    const tauxVacanceSafe = tauxVacance || 0
    if (tauxVacanceSafe < 6) {
      marcheLocatif = `Marché locatif tendu avec ${tauxVacanceSafe.toFixed(1)}% de vacance, indiquant une forte demande. `
    } else if (tauxVacanceSafe < 9) {
      marcheLocatif = `Taux de vacance équilibré (${tauxVacanceSafe.toFixed(1)}%), signalant un marché sain. `
    } else {
      marcheLocatif = `Taux de vacance de ${tauxVacanceSafe.toFixed(1)}%, offrant davantage de flexibilité. `
    }

    if (pctResidencesPrincipales > 85) {
      marcheLocatif += `${(pctResidencesPrincipales || 0).toFixed(0)}% de résidences principales assurent la stabilité.`
    }

    // Dynamisme
    let dynamisme = ''
    if (nbVentes > 1000) {
      dynamisme = `${new Intl.NumberFormat('fr-FR').format(nbVentes)} transactions annuelles témoignent d'un marché très actif offrant une excellente liquidité.`
    } else if (nbVentes > 300) {
      dynamisme = `${new Intl.NumberFormat('fr-FR').format(nbVentes)} ventes annuelles confirment le dynamisme du marché.`
    } else {
      dynamisme = `${new Intl.NumberFormat('fr-FR').format(nbVentes)} transactions par an caractérisent ce marché.`
    }

    return { positionnement, marcheLocatif, dynamisme }
  }

  const presentation = generatePresentation()

  return (
    <section id="presentation" className="py-12 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            📍 Pourquoi investir à {ville.nom} ?
          </h2>
          <p className="text-neutral-600">
            Analyse synthétique du marché immobilier local
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bloc 1 - Positionnement */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                Positionnement
              </h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {presentation.positionnement}
            </p>
          </div>

          {/* Bloc 2 - Marché locatif */}
          <div className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">🏠</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                Marché locatif
              </h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {presentation.marcheLocatif}
            </p>
          </div>

          {/* Bloc 3 - Dynamisme */}
          <div className="bg-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">📈</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                Dynamisme
              </h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {presentation.dynamisme}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
