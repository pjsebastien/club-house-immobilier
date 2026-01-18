import { Quartier } from '@/types/ville'

/**
 * MÉTHODOLOGIE DE CALCUL DU SCORE D'INVESTISSEMENT QUARTIER (0-100)
 *
 * Score comparatif au sein d'une ville, non officiel, non prédictif.
 * Utilise des échelles absolues cohérentes avec le scoring ville.
 *
 * Basé sur 5 critères pondérés :
 *
 * 1. ACCESSIBILITÉ DU MARCHÉ (25 points)
 *    - Prix médian au m² DVF (appartements/maisons)
 *    - Stabilité des prix (dispersion P75-P25)
 *
 * 2. POTENTIEL LOCATIF (30 points)
 *    - Taux de vacance du quartier
 *    - Pression résidentielle (logements/population)
 *    - Part de résidences principales
 *
 * 3. DÉMOGRAPHIE (25 points)
 *    - Part des 15-29 ans (demande locative jeune)
 *    - Part des 60+ ans (stabilité)
 *    - Taille moyenne des ménages
 *
 * 4. VOLUME ET QUALITÉ (15 points)
 *    - Nombre de logements (profondeur du marché local)
 *    - Volume de transactions DVF
 *    - Qualité des données
 *
 * 5. STABILITÉ RÉSIDENTIELLE (5 points)
 *    - Indicateur de stabilité résidentielle
 */

export interface ScoreQuartierDetail {
  score_total: number // 0-100
  accessibilite_marche: number // 0-25
  potentiel_locatif: number // 0-30
  demographie: number // 0-25
  volume_qualite: number // 0-15
  stabilite: number // 0-5
  rang?: number // Rang dans la ville
}

/**
 * Normalise une valeur entre min et max vers un score entre 0 et points_max
 * Utilise des échelles ABSOLUES pour cohérence avec scoring ville
 */
function normalize(
  value: number,
  min: number,
  max: number,
  pointsMax: number,
  inverse: boolean = false
): number {
  if (max === min) return pointsMax * 0.6 // Score neutre plutôt favorable

  let normalized = (value - min) / (max - min)
  normalized = Math.max(0, Math.min(1, normalized))

  if (inverse) {
    normalized = 1 - normalized
  }

  // Ajustement: ramener vers 60% du max au minimum pour éviter les scores trop bas
  return (normalized * 0.7 + 0.3) * pointsMax
}

/**
 * Calcule le score d'accessibilité du marché pour un quartier (0-25 points)
 */
function calculateAccessibiliteMarche(quartier: Quartier, allQuartiers: Quartier[]): number {
  const dvfAppt = quartier.dvf_appartements
  const dvfMaison = quartier.dvf_maisons

  if (!dvfAppt && !dvfMaison) {
    // Pas de données DVF, score neutre
    return 13
  }

  // Calculer prix médian du quartier
  let prixMedian = 0
  let count = 0

  if (dvfAppt && dvfAppt.prix_m2_median) {
    prixMedian += dvfAppt.prix_m2_median
    count++
  }
  if (dvfMaison && dvfMaison.prix_m2_median) {
    prixMedian += dvfMaison.prix_m2_median
    count++
  }

  if (count === 0) return 13

  prixMedian = prixMedian / count

  // Utiliser des échelles ABSOLUES nationales (pas relatives à la ville)
  // Prix accessibles = meilleur score (inverse = true)
  const scorePrix = normalize(prixMedian, 1500, 12000, 15, true)

  // Dispersion des prix (stabilité)
  let dispersion = 0
  let dispersionCount = 0

  if (dvfAppt && dvfAppt.prix_m2_p75 && dvfAppt.prix_m2_p25) {
    dispersion += dvfAppt.prix_m2_p75 - dvfAppt.prix_m2_p25
    dispersionCount++
  }
  if (dvfMaison && dvfMaison.prix_m2_p75 && dvfMaison.prix_m2_p25) {
    dispersion += dvfMaison.prix_m2_p75 - dvfMaison.prix_m2_p25
    dispersionCount++
  }

  if (dispersionCount > 0) {
    dispersion = dispersion / dispersionCount
    // Faible dispersion = marché stable = meilleur score
    const scoreDispersion = normalize(dispersion, 300, 4000, 10, true)
    return scorePrix + scoreDispersion
  }

  return scorePrix + 6 // Score neutre pour dispersion
}

/**
 * Calcule le score de potentiel locatif (0-30 points)
 */
function calculatePotentielLocatif(quartier: Quartier, allQuartiers: Quartier[]): number {
  const stats = quartier.stats_insee

  // Taux de vacance optimal : 5-8%
  const tauxVacance = stats.taux_vacance_pct
  let scoreVacance = 0

  if (tauxVacance < 3) {
    scoreVacance = 10 // Trop tendu
  } else if (tauxVacance <= 5) {
    scoreVacance = 13 // Excellent
  } else if (tauxVacance <= 8) {
    scoreVacance = 12 // Très bon
  } else if (tauxVacance <= 12) {
    scoreVacance = 10 - (tauxVacance - 8) * 0.4
  } else {
    scoreVacance = Math.max(6, 10 - (tauxVacance - 8) * 0.5)
  }

  // Pression résidentielle (1-5, plus élevé = meilleur)
  const pressionScore = normalize(
    quartier.indicateurs_calcules.pression_residentielle,
    1,
    5,
    10,
    false
  )

  // Part des résidences principales
  const totalLogements = stats.logements.total
  const residencesPrincipales = stats.logements.residences_principales
  const pctResidencesPrincipales = totalLogements > 0
    ? (residencesPrincipales / totalLogements) * 100
    : 80

  const scoreStabilite = normalize(pctResidencesPrincipales, 65, 95, 7, false)

  return scoreVacance + pressionScore + scoreStabilite
}

/**
 * Calcule le score démographique (0-25 points)
 */
function calculateDemographie(quartier: Quartier, allQuartiers: Quartier[]): number {
  const stats = quartier.stats_insee

  // Part des 15-29 ans : locataires potentiels (optimal: 18-25%)
  const pct15_29 = stats.pct_15_29_ans || 18
  let scoreJeunes = 0

  if (pct15_29 < 15) {
    scoreJeunes = normalize(pct15_29, 10, 18, 8, false)
  } else if (pct15_29 <= 25) {
    scoreJeunes = 10 // Zone optimale
  } else {
    scoreJeunes = Math.max(7, 10 - (pct15_29 - 25) * 0.15)
  }

  // Part des 60+ ans : stabilité (optimal: 15-25%)
  const pct60Plus = stats.pct_60_plus_ans || 20
  let scoreSeniors = 0

  if (pct60Plus < 12) {
    scoreSeniors = 6
  } else if (pct60Plus <= 25) {
    scoreSeniors = 8 // Zone optimale
  } else if (pct60Plus <= 35) {
    scoreSeniors = 7
  } else {
    scoreSeniors = Math.max(5, 8 - (pct60Plus - 35) * 0.2)
  }

  // Taille des ménages : diversité (optimal: 2.0-2.5)
  const tailleMenage = stats.taille_menage_moyenne || 2.2
  let scoreMenage = 0

  if (tailleMenage < 1.8) {
    scoreMenage = 5
  } else if (tailleMenage <= 2.5) {
    scoreMenage = 7 // Zone optimale
  } else {
    scoreMenage = normalize(tailleMenage, 2.5, 3.5, 7, false)
  }

  return scoreJeunes + scoreSeniors + scoreMenage
}

/**
 * Calcule le score de volume et qualité (0-15 points)
 */
function calculateVolumeQualite(quartier: Quartier, allQuartiers: Quartier[]): number {
  const stats = quartier.stats_insee

  // Nombre de logements : profondeur du marché (échelle absolue)
  const nbLogements = stats.logements.total
  let scoreLogements = 0

  if (nbLogements < 300) {
    scoreLogements = 3
  } else if (nbLogements < 600) {
    scoreLogements = 4
  } else if (nbLogements < 1000) {
    scoreLogements = 5
  } else if (nbLogements < 2000) {
    scoreLogements = 5.5
  } else {
    scoreLogements = 6
  }

  // Volume de transactions DVF
  let nbVentes = 0
  if (quartier.dvf_appartements?.nb_ventes) {
    nbVentes += quartier.dvf_appartements.nb_ventes
  }
  if (quartier.dvf_maisons?.nb_ventes) {
    nbVentes += quartier.dvf_maisons.nb_ventes
  }

  let scoreVolume = 0
  if (nbVentes === 0) {
    scoreVolume = 2
  } else if (nbVentes < 10) {
    scoreVolume = 3
  } else if (nbVentes < 30) {
    scoreVolume = 4.5
  } else if (nbVentes < 60) {
    scoreVolume = 5.5
  } else {
    scoreVolume = 6
  }

  // Qualité des données
  let scoreQualite = 3 // Par défaut

  const qualiteAppt = quartier.dvf_appartements?.qualite_donnees?.toLowerCase() || ''
  const qualiteMaison = quartier.dvf_maisons?.qualite_donnees?.toLowerCase() || ''

  if (qualiteAppt.includes('bon') || qualiteMaison.includes('bon')) {
    scoreQualite = 3
  } else if (qualiteAppt.includes('moyen') || qualiteMaison.includes('moyen')) {
    scoreQualite = 2.5
  } else if (qualiteAppt.includes('faible') || qualiteMaison.includes('faible')) {
    scoreQualite = 2
  } else if (!quartier.dvf_appartements && !quartier.dvf_maisons) {
    scoreQualite = 1.5
  }

  return scoreLogements + scoreVolume + scoreQualite
}

/**
 * Calcule le score de stabilité résidentielle (0-5 points)
 */
function calculateStabilite(quartier: Quartier, allQuartiers: Quartier[]): number {
  const stabilite = quartier.indicateurs_calcules.stabilite_residentielle?.toLowerCase() || ''

  if (stabilite.includes('très stable') || stabilite.includes('forte')) {
    return 5
  } else if (stabilite.includes('stable') || stabilite.includes('moyenne')) {
    return 4
  } else if (stabilite.includes('modérée')) {
    return 3
  } else if (stabilite.includes('faible')) {
    return 2
  }

  return 3 // Score neutre par défaut
}

/**
 * Calcule le score d'investissement complet pour un quartier
 */
export function calculateQuartierScore(
  quartier: Quartier,
  allQuartiersVille: Quartier[]
): ScoreQuartierDetail {
  const accessibilite_marche = calculateAccessibiliteMarche(quartier, allQuartiersVille)
  const potentiel_locatif = calculatePotentielLocatif(quartier, allQuartiersVille)
  const demographie = calculateDemographie(quartier, allQuartiersVille)
  const volume_qualite = calculateVolumeQualite(quartier, allQuartiersVille)
  const stabilite = calculateStabilite(quartier, allQuartiersVille)

  const score_total = Math.round(
    accessibilite_marche +
    potentiel_locatif +
    demographie +
    volume_qualite +
    stabilite
  )

  return {
    score_total,
    accessibilite_marche: Math.round(accessibilite_marche * 10) / 10,
    potentiel_locatif: Math.round(potentiel_locatif * 10) / 10,
    demographie: Math.round(demographie * 10) / 10,
    volume_qualite: Math.round(volume_qualite * 10) / 10,
    stabilite: Math.round(stabilite * 10) / 10,
  }
}

/**
 * Calcule les scores pour tous les quartiers d'une ville et retourne le classement
 */
export function calculateAllQuartiersScores(
  quartiers: Quartier[]
): Array<{ quartier: Quartier; score: ScoreQuartierDetail }> {
  const results = quartiers.map(quartier => ({
    quartier,
    score: calculateQuartierScore(quartier, quartiers)
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
 * Récupère le top N des quartiers d'une ville
 */
export function getTopQuartiers(
  quartiers: Quartier[],
  limit: number = 10
): Array<{ quartier: Quartier; score: ScoreQuartierDetail }> {
  const allScores = calculateAllQuartiersScores(quartiers)
  return allScores.slice(0, Math.min(limit, quartiers.length))
}

/**
 * Récupère le score d'un quartier spécifique avec son rang
 */
export function getQuartierScore(
  quartier: Quartier,
  allQuartiersVille: Quartier[]
): ScoreQuartierDetail {
  const allScores = calculateAllQuartiersScores(allQuartiersVille)
  const result = allScores.find(r => r.quartier.iris_id === quartier.iris_id)
  return result ? result.score : calculateQuartierScore(quartier, allQuartiersVille)
}
