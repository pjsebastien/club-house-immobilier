import { Ville } from '@/types/ville'
import { getVilleDVF } from './data'

/**
 * MÉTHODOLOGIE DE CALCUL DU SCORE D'INVESTISSEMENT (0-100)
 *
 * Score comparatif, non officiel, non prédictif, à but informatif.
 * Basé sur 5 critères pondérés :
 *
 * 1. ACCESSIBILITÉ DU MARCHÉ (25 points)
 *    - Prix médian au m² : favorise les prix accessibles pour l'investissement
 *    - Dispersion des prix (P75-P25) : favorise les marchés stables
 *
 * 2. DYNAMISME DU MARCHÉ (20 points)
 *    - Volume de transactions (nb_ventes_total)
 *    - Qualité des données DVF (fiabilité)
 *
 * 3. POTENTIEL LOCATIF (25 points)
 *    - Taux de vacance : favorise les faibles taux (forte demande locative)
 *    - Ratio logements/population : indique la tension du marché
 *    - Part de résidences principales : stabilité du marché locatif
 *
 * 4. DÉMOGRAPHIE (20 points)
 *    - Part des 15-29 ans : locataires potentiels
 *    - Part des 60+ ans : stabilité, pouvoir d'achat
 *    - Taille des ménages : type de biens recherchés
 *
 * 5. VOLUME ET LIQUIDITÉ (10 points)
 *    - Nombre de logements total : profondeur du marché
 *    - Nombre de transactions : facilité de revente
 */

export interface ScoreDetail {
  score_total: number // 0-100
  accessibilite_marche: number // 0-25
  dynamisme_marche: number // 0-20
  potentiel_locatif: number // 0-25
  demographie: number // 0-20
  volume_liquidite: number // 0-10
  rang?: number // Sera calculé lors du classement
}

/**
 * Normalise une valeur entre min et max vers un score entre 0 et points_max
 * @param value - Valeur à normaliser
 * @param min - Valeur minimale de référence
 * @param max - Valeur maximale de référence
 * @param pointsMax - Points maximum attribuables
 * @param inverse - Si true, inverse le score (valeurs basses = meilleur score)
 */
function normalize(
  value: number,
  min: number,
  max: number,
  pointsMax: number,
  inverse: boolean = false
): number {
  if (max === min) return pointsMax / 2

  let normalized = (value - min) / (max - min)
  normalized = Math.max(0, Math.min(1, normalized))

  if (inverse) {
    normalized = 1 - normalized
  }

  return normalized * pointsMax
}

/**
 * Calcule le score d'accessibilité du marché (0-25 points)
 */
function calculateAccessibiliteMarche(ville: Ville, allVilles: Ville[]): number {
  const dvf = getVilleDVF(ville)

  // Si données estimées, pénalité de 20%
  const penaltyEstimation = dvf.is_estimated ? 0.8 : 1.0

  // Prix médian : favorise les prix accessibles (2000-8000 €/m²)
  // Prix bas = meilleur score pour investissement
  const prixMedian = dvf.prix_m2_median_global || 3000
  const scorePrix = normalize(prixMedian, 1500, 12000, 15, true)

  // Dispersion des prix (P75 - P25) : favorise les marchés stables
  // Faible dispersion = marché plus prévisible
  const dispersion = (dvf.prix_m2_p75 || 0) - (dvf.prix_m2_p25 || 0)
  const scoreDispersion = normalize(dispersion, 500, 4000, 10, true)

  const result = (scorePrix + scoreDispersion) * penaltyEstimation

  // Protection contre NaN
  return isNaN(result) ? 12.5 : result
}

/**
 * Calcule le score de dynamisme du marché (0-20 points)
 */
function calculateDynamismeMarche(ville: Ville, allVilles: Ville[]): number {
  const dvf = getVilleDVF(ville)

  // Volume de transactions : indique un marché actif
  const nbVentes = dvf.nb_ventes_total || 0
  const scoreVolume = normalize(nbVentes, 50, 3000, 12, false)

  // Qualité des données : fiabilité de l'analyse
  let scoreQualite = 0
  const qualite = dvf.qualite_donnees?.toLowerCase() || ''

  if (dvf.is_estimated) {
    scoreQualite = 3 // Estimation = score minimal
  } else if (qualite.includes('bon')) {
    scoreQualite = 8
  } else if (qualite.includes('moyen')) {
    scoreQualite = 6
  } else if (qualite.includes('faible')) {
    scoreQualite = 4
  } else {
    scoreQualite = 5
  }

  const result = scoreVolume + scoreQualite

  // Protection contre NaN
  return isNaN(result) ? 10 : result
}

/**
 * Calcule le score de potentiel locatif (0-25 points)
 */
function calculatePotentielLocatif(ville: Ville, allVilles: Ville[]): number {
  const stats = ville.stats_agregees

  // Taux de vacance : favorise les faibles taux (forte demande)
  // Taux optimal : 5-8% (marché sain)
  const tauxVacance = stats.taux_vacance_moyen_pct
  let scoreVacance = 0

  if (!isNaN(tauxVacance) && tauxVacance != null) {
    if (tauxVacance < 5) {
      scoreVacance = 8 - (5 - tauxVacance) * 0.5 // Pénalité si trop tendu
    } else if (tauxVacance <= 8) {
      scoreVacance = 10 // Zone optimale
    } else {
      scoreVacance = Math.max(0, 10 - (tauxVacance - 8) * 0.8)
    }
  } else {
    scoreVacance = 5 // Score neutre par défaut
  }

  // Tension du marché : ratio logements/population
  const tensionMarche = (stats.nb_logements / stats.population_totale) * 1000
  const scoreTension = normalize(tensionMarche, 350, 550, 8, false)

  // Part des résidences principales : stabilité du marché
  const pctResidencesPrincipales = (stats.nb_residences_principales / stats.nb_logements) * 100
  const scoreStabilite = normalize(pctResidencesPrincipales, 70, 95, 7, false)

  const result = scoreVacance + scoreTension + scoreStabilite

  // Protection contre NaN
  return isNaN(result) ? 12.5 : result
}

/**
 * Calcule le score démographique (0-20 points)
 */
function calculateDemographie(ville: Ville, allVilles: Ville[]): number {
  // Utiliser les stats du premier quartier comme proxy (agrégation ville pas toujours dispo)
  if (!ville.quartiers || ville.quartiers.length === 0) {
    return 10 // Score neutre par défaut
  }

  // Moyenne des stats démographiques de tous les quartiers
  let total15_29 = 0
  let total60Plus = 0
  let totalTailleMenage = 0
  let count = 0

  ville.quartiers.forEach(q => {
    if (q.stats_insee) {
      const val15_29 = q.stats_insee.pct_15_29_ans
      const val60Plus = q.stats_insee.pct_60_plus_ans
      const valTailleMenage = q.stats_insee.taille_menage_moyenne

      // Vérifier que les valeurs sont valides (pas NaN, pas null, pas undefined)
      if (val15_29 != null && !isNaN(val15_29)) {
        total15_29 += val15_29
      }
      if (val60Plus != null && !isNaN(val60Plus)) {
        total60Plus += val60Plus
      }
      if (valTailleMenage != null && !isNaN(valTailleMenage)) {
        totalTailleMenage += valTailleMenage
      }
      count++
    }
  })

  if (count === 0) return 10

  const pct15_29 = total15_29 / count
  const pct60Plus = total60Plus / count
  const tailleMenage = totalTailleMenage / count

  // Vérification supplémentaire
  if (isNaN(pct15_29) || isNaN(pct60Plus) || isNaN(tailleMenage)) {
    return 10 // Score neutre par défaut si données invalides
  }

  // Part des 15-29 ans : locataires potentiels, dynamisme
  const scoreJeunes = normalize(pct15_29, 12, 25, 8, false)

  // Part des 60+ ans : stabilité, pouvoir d'achat (score modéré optimal)
  let scoreSeniors = 0
  if (pct60Plus < 20) {
    scoreSeniors = normalize(pct60Plus, 15, 25, 6, false)
  } else {
    scoreSeniors = Math.max(0, 6 - (pct60Plus - 20) * 0.2)
  }

  // Taille des ménages : diversité de la demande
  const scoreMenage = normalize(tailleMenage, 1.8, 2.5, 6, false)

  const result = scoreJeunes + scoreSeniors + scoreMenage

  // Protection finale contre NaN
  return isNaN(result) ? 10 : result
}

/**
 * Calcule le score de volume et liquidité (0-10 points)
 */
function calculateVolumeLiquidite(ville: Ville, allVilles: Ville[]): number {
  const stats = ville.stats_agregees
  const dvf = getVilleDVF(ville)

  // Nombre de logements : profondeur du marché
  const scoreLogements = normalize(stats.nb_logements, 10000, 100000, 6, false)

  // Ratio transactions/logements : facilité de revente (liquidité)
  const nbVentes = dvf.nb_ventes_total || 0
  const ratioTransactions = (nbVentes / stats.nb_logements) * 100
  const scoreLiquidite = normalize(ratioTransactions, 0.5, 3, 4, false)

  const result = scoreLogements + scoreLiquidite

  // Protection contre NaN
  return isNaN(result) ? 5 : result
}

/**
 * Calcule le score d'investissement complet pour une ville
 */
export function calculateInvestmentScore(ville: Ville, allVilles: Ville[]): ScoreDetail {
  const accessibilite_marche = calculateAccessibiliteMarche(ville, allVilles)
  const dynamisme_marche = calculateDynamismeMarche(ville, allVilles)
  const potentiel_locatif = calculatePotentielLocatif(ville, allVilles)
  const demographie = calculateDemographie(ville, allVilles)
  const volume_liquidite = calculateVolumeLiquidite(ville, allVilles)

  const score_total = Math.round(
    accessibilite_marche +
    dynamisme_marche +
    potentiel_locatif +
    demographie +
    volume_liquidite
  )

  // Protection finale contre NaN sur tous les scores
  return {
    score_total: isNaN(score_total) ? 50 : score_total,
    accessibilite_marche: isNaN(accessibilite_marche) ? 12.5 : Math.round(accessibilite_marche * 10) / 10,
    dynamisme_marche: isNaN(dynamisme_marche) ? 10 : Math.round(dynamisme_marche * 10) / 10,
    potentiel_locatif: isNaN(potentiel_locatif) ? 12.5 : Math.round(potentiel_locatif * 10) / 10,
    demographie: isNaN(demographie) ? 10 : Math.round(demographie * 10) / 10,
    volume_liquidite: isNaN(volume_liquidite) ? 5 : Math.round(volume_liquidite * 10) / 10,
  }
}

/**
 * Calcule les scores pour toutes les villes et retourne le classement
 */
export function calculateAllScores(villes: Ville[]): Array<{ ville: Ville; score: ScoreDetail }> {
  const results = villes.map(ville => ({
    ville,
    score: calculateInvestmentScore(ville, villes)
  }))

  // Trier par score décroissant
  results.sort((a, b) => b.score.score_total - a.score.score_total)

  // Ajouter le rang
  results.forEach((result, index) => {
    result.score.rang = index + 1
  })

  return results
}

/**
 * Récupère le top N des villes par score d'investissement
 */
export function getTopVilles(villes: Ville[], limit: number = 10): Array<{ ville: Ville; score: ScoreDetail }> {
  const allScores = calculateAllScores(villes)
  return allScores.slice(0, limit)
}

/**
 * Récupère le score d'une ville spécifique avec son rang
 */
export function getVilleScore(ville: Ville, allVilles: Ville[]): ScoreDetail {
  const allScores = calculateAllScores(allVilles)
  const result = allScores.find(r => r.ville.code_insee === ville.code_insee)
  return result ? result.score : calculateInvestmentScore(ville, allVilles)
}
