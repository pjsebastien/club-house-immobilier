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
 *    - Prix médian au m² (basé sur données ville)
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
 *    - Qualité des données disponibles
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
 * Note: Les données de prix au niveau quartier ne sont pas disponibles,
 * le score est basé sur le taux de vacance et la composition du parc immobilier
 */
function calculateAccessibiliteMarche(quartier: Quartier, allQuartiers: Quartier[]): number {
  const stats = quartier.stats_insee

  // Taux de vacance faible = marché plus tendu = moins accessible (0-10 points)
  // Taux de vacance élevé = plus d'opportunités = plus accessible
  const tauxVacance = stats.taux_vacance_pct || 5
  let scoreVacance = 0
  if (tauxVacance < 3) {
    scoreVacance = 5 // Marché très tendu
  } else if (tauxVacance < 6) {
    scoreVacance = 7 // Marché équilibré
  } else if (tauxVacance < 10) {
    scoreVacance = 9 // Bonnes opportunités
  } else {
    scoreVacance = 10 // Beaucoup d'opportunités (mais attention aux risques)
  }

  // Part de résidences principales = indicateur de stabilité du marché (0-10 points)
  const totalLogements = stats.logements?.total || 1
  const resPrincipales = stats.logements?.residences_principales || 0
  const pctResPrincipales = (resPrincipales / totalLogements) * 100

  let scoreResidences = 0
  if (pctResPrincipales >= 80) {
    scoreResidences = 10 // Très résidentiel, marché stable
  } else if (pctResPrincipales >= 70) {
    scoreResidences = 8
  } else if (pctResPrincipales >= 60) {
    scoreResidences = 6
  } else {
    scoreResidences = 4 // Beaucoup de résidences secondaires/vacantes
  }

  // Taille du marché local (0-5 points)
  const nbLogements = stats.logements?.total || 0
  let scoreTaille = 0
  if (nbLogements >= 2000) {
    scoreTaille = 5
  } else if (nbLogements >= 1000) {
    scoreTaille = 4
  } else if (nbLogements >= 500) {
    scoreTaille = 3
  } else {
    scoreTaille = 2
  }

  return scoreVacance + scoreResidences + scoreTaille
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

  // Nombre de logements : profondeur du marché (échelle absolue, 0-9 points)
  const nbLogements = stats.logements.total
  let scoreLogements = 0

  if (nbLogements < 300) {
    scoreLogements = 4
  } else if (nbLogements < 600) {
    scoreLogements = 5.5
  } else if (nbLogements < 1000) {
    scoreLogements = 7
  } else if (nbLogements < 2000) {
    scoreLogements = 8
  } else {
    scoreLogements = 9
  }

  // Population : indicateur de dynamisme du quartier (0-6 points)
  const population = stats.population || 0
  let scorePopulation = 0

  if (population < 500) {
    scorePopulation = 2
  } else if (population < 1000) {
    scorePopulation = 3
  } else if (population < 2000) {
    scorePopulation = 4
  } else if (population < 5000) {
    scorePopulation = 5
  } else {
    scorePopulation = 6
  }

  return scoreLogements + scorePopulation
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
 * @param villeScore - Score de la ville (0-100) pour pondérer le score quartier
 * Un quartier dans une ville à score 50 ne peut pas dépasser ~70
 */
export function calculateQuartierScore(
  quartier: Quartier,
  allQuartiersVille: Quartier[],
  villeScore: number = 70
): ScoreQuartierDetail {
  const accessibilite_marche = calculateAccessibiliteMarche(quartier, allQuartiersVille)
  const potentiel_locatif = calculatePotentielLocatif(quartier, allQuartiersVille)
  const demographie = calculateDemographie(quartier, allQuartiersVille)
  const volume_qualite = calculateVolumeQualite(quartier, allQuartiersVille)
  const stabilite = calculateStabilite(quartier, allQuartiersVille)

  const score_brut = accessibilite_marche +
    potentiel_locatif +
    demographie +
    volume_qualite +
    stabilite

  // Pondération par le score ville
  // Formule: score_final = score_brut * (0.4 + 0.6 * villeScore / 100)
  // Ville score 100 → multiplicateur 1.0
  // Ville score 50 → multiplicateur 0.7 → quartiers max ~70
  const multiplicateur = 0.4 + 0.6 * (villeScore / 100)
  const score_total = Math.round(score_brut * multiplicateur)

  return {
    score_total,
    accessibilite_marche: Math.round(accessibilite_marche * multiplicateur * 10) / 10,
    potentiel_locatif: Math.round(potentiel_locatif * multiplicateur * 10) / 10,
    demographie: Math.round(demographie * multiplicateur * 10) / 10,
    volume_qualite: Math.round(volume_qualite * multiplicateur * 10) / 10,
    stabilite: Math.round(stabilite * multiplicateur * 10) / 10,
  }
}

/**
 * Calcule les scores pour tous les quartiers d'une ville et retourne le classement
 * @param villeScore - Score de la ville pour pondérer les scores quartiers
 */
export function calculateAllQuartiersScores(
  quartiers: Quartier[],
  villeScore: number = 70
): Array<{ quartier: Quartier; score: ScoreQuartierDetail }> {
  const results = quartiers.map(quartier => ({
    quartier,
    score: calculateQuartierScore(quartier, quartiers, villeScore)
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
 * @param villeScore - Score de la ville pour pondérer les scores quartiers
 */
export function getTopQuartiers(
  quartiers: Quartier[],
  limit: number = 10,
  villeScore: number = 70
): Array<{ quartier: Quartier; score: ScoreQuartierDetail }> {
  const allScores = calculateAllQuartiersScores(quartiers, villeScore)
  return allScores.slice(0, Math.min(limit, quartiers.length))
}

/**
 * Récupère le score d'un quartier spécifique avec son rang
 * @param villeScore - Score de la ville pour pondérer les scores quartiers
 */
export function getQuartierScore(
  quartier: Quartier,
  allQuartiersVille: Quartier[],
  villeScore: number = 70
): ScoreQuartierDetail {
  const allScores = calculateAllQuartiersScores(allQuartiersVille, villeScore)
  const result = allScores.find(r => r.quartier.iris_id === quartier.iris_id)
  return result ? result.score : calculateQuartierScore(quartier, allQuartiersVille, villeScore)
}

/**
 * Interface pour les raisons factuelles d'éviter un quartier
 */
export interface RaisonEviter {
  type: 'vacance' | 'population' | 'score' | 'residences' | 'pression' | 'seniors' | 'stabilite'
  label: string
  valeur: string
  description: string
}

/**
 * Interface pour un quartier à éviter avec ses raisons
 */
export interface QuartierAEviter {
  quartier: Quartier
  score: ScoreQuartierDetail
  raisons: RaisonEviter[]
  nbCriteres: number
}

/**
 * Génère les raisons factuelles pour lesquelles un quartier présente
 * des indicateurs moins favorables pour l'investissement
 */
function generateRaisonsEviter(quartier: Quartier, score: ScoreQuartierDetail): RaisonEviter[] {
  const raisons: RaisonEviter[] = []
  const stats = quartier.stats_insee

  // Taux de vacance élevé
  if (stats.taux_vacance_pct > 12) {
    raisons.push({
      type: 'vacance',
      label: 'Taux de vacance élevé',
      valeur: `${stats.taux_vacance_pct.toFixed(1)}%`,
      description: 'Un taux supérieur à 12% peut indiquer une offre excédentaire par rapport à la demande locative.'
    })
  } else if (stats.taux_vacance_pct > 10) {
    raisons.push({
      type: 'vacance',
      label: 'Taux de vacance supérieur à la moyenne',
      valeur: `${stats.taux_vacance_pct.toFixed(1)}%`,
      description: 'Un taux entre 10% et 12% suggère un déséquilibre potentiel entre offre et demande.'
    })
  }

  // Population faible
  if (stats.population && stats.population < 500) {
    raisons.push({
      type: 'population',
      label: 'Population limitée',
      valeur: `${stats.population} habitants`,
      description: 'Une population réduite peut signifier moins de commerces, services et transports à proximité.'
    })
  }

  // Score global bas
  if (score.score_total < 50) {
    raisons.push({
      type: 'score',
      label: 'Score d\'investissement bas',
      valeur: `${score.score_total}/100`,
      description: 'Le score composite intègre plusieurs indicateurs : accessibilité, potentiel locatif, démographie et liquidité.'
    })
  }

  // Faible part de résidences principales
  const totalLogements = stats.logements?.total || 0
  const resPrincipales = stats.logements?.residences_principales || 0
  const pctResPrincipales = totalLogements > 0 ? (resPrincipales / totalLogements) * 100 : 100

  if (pctResPrincipales < 70 && totalLogements > 100) {
    raisons.push({
      type: 'residences',
      label: 'Faible part de résidences principales',
      valeur: `${pctResPrincipales.toFixed(1)}%`,
      description: 'Une proportion élevée de résidences secondaires ou vacantes peut indiquer un quartier moins dynamique.'
    })
  }

  // Faible pression résidentielle
  const pression = quartier.indicateurs_calcules?.pression_residentielle || 3
  if (pression < 2) {
    raisons.push({
      type: 'pression',
      label: 'Faible pression résidentielle',
      valeur: `${pression.toFixed(1)}/5`,
      description: 'Une faible pression indique peu de tension sur le marché locatif, potentiellement moins de demande.'
    })
  }

  // Forte proportion de 60+ ans
  const pct60Plus = stats.pct_60_plus_ans || 0
  if (pct60Plus > 35) {
    raisons.push({
      type: 'seniors',
      label: 'Forte proportion de seniors',
      valeur: `${pct60Plus.toFixed(1)}% de 60+ ans`,
      description: 'Un quartier vieillissant peut avoir moins de demande locative de la part des actifs et jeunes ménages.'
    })
  }

  // Faible stabilité résidentielle
  const stabilite = quartier.indicateurs_calcules?.stabilite_residentielle?.toLowerCase() || ''
  if (stabilite.includes('faible')) {
    raisons.push({
      type: 'stabilite',
      label: 'Faible stabilité résidentielle',
      valeur: 'Turnover élevé',
      description: 'Un fort renouvellement de population peut indiquer un quartier peu attractif sur le long terme.'
    })
  }

  return raisons
}

/**
 * Identifie les quartiers présentant des indicateurs moins favorables
 * pour l'investissement immobilier, basé sur des critères factuels.
 *
 * Critères utilisés (au moins 2 doivent être remplis) :
 * - Taux de vacance > 10%
 * - Score d'investissement < 55/100
 * - Population < 500 habitants
 * - Part de résidences principales < 70%
 * - Pression résidentielle faible (< 2/5)
 * - Forte proportion de 60+ ans (> 35%)
 * - Faible stabilité résidentielle
 *
 * @param villeScore - Score de la ville pour pondérer les scores quartiers
 * Retourne au minimum 5 quartiers (complète avec les pires scores si nécessaire)
 */
export function getQuartiersAEviter(
  quartiers: Quartier[],
  limit: number = 50,
  villeScore: number = 70
): QuartierAEviter[] {
  const MIN_QUARTIERS = 5
  const allScores = calculateAllQuartiersScores(quartiers, villeScore)

  // Filtrer les quartiers avec au moins une population valide
  const quartiersValides = allScores.filter(
    ({ quartier }) => quartier.stats_insee.population && quartier.stats_insee.population > 0
  )

  // Calculer les données pour tous les quartiers
  const allQuartiersWithData = quartiersValides.map(({ quartier, score }) => {
    const stats = quartier.stats_insee
    const totalLogements = stats.logements?.total || 0
    const resPrincipales = stats.logements?.residences_principales || 0
    const pctResPrincipales = totalLogements > 0 ? (resPrincipales / totalLogements) * 100 : 100
    const pression = quartier.indicateurs_calcules?.pression_residentielle || 3
    const pct60Plus = stats.pct_60_plus_ans || 0
    const stabilite = quartier.indicateurs_calcules?.stabilite_residentielle?.toLowerCase() || ''

    // Compter le nombre de critères remplis
    const criteres = [
      stats.taux_vacance_pct > 10,                    // Vacance élevée
      score.score_total < 55,                          // Score bas
      (stats.population || 0) < 500,                   // Population faible
      pctResPrincipales < 70 && totalLogements > 100,  // Faible part résidences principales
      pression < 2,                                    // Faible pression résidentielle
      pct60Plus > 35,                                  // Forte proportion 60+ ans
      stabilite.includes('faible'),                    // Faible stabilité résidentielle
    ]

    const nbCriteres = criteres.filter(Boolean).length

    return {
      quartier,
      score,
      raisons: generateRaisonsEviter(quartier, score),
      nbCriteres
    }
  })

  // Séparer les quartiers qui remplissent les critères (>=2) et les autres
  const quartiersAvecCriteres = allQuartiersWithData
    .filter(item => item.nbCriteres >= 2)
    .sort((a, b) => {
      // Trier par nombre de critères (desc), puis par score (asc)
      if (b.nbCriteres !== a.nbCriteres) {
        return b.nbCriteres - a.nbCriteres
      }
      return a.score.score_total - b.score.score_total
    })

  // Si on a assez de quartiers avec critères, on les retourne
  if (quartiersAvecCriteres.length >= MIN_QUARTIERS) {
    return quartiersAvecCriteres.slice(0, limit)
  }

  // Sinon, compléter avec les quartiers ayant les pires scores
  const idsDejaInclus = new Set(quartiersAvecCriteres.map(q => q.quartier.iris_id))

  const quartiersComplementaires = allQuartiersWithData
    .filter(item => !idsDejaInclus.has(item.quartier.iris_id))
    .sort((a, b) => a.score.score_total - b.score.score_total) // Pires scores en premier

  // Ajouter des raisons pour les quartiers complémentaires (basées sur le score)
  const nbManquants = MIN_QUARTIERS - quartiersAvecCriteres.length
  const complementAvecRaisons = quartiersComplementaires
    .slice(0, nbManquants)
    .map(item => ({
      ...item,
      raisons: item.raisons.length > 0 ? item.raisons : [{
        type: 'score' as const,
        label: 'Score parmi les plus bas de la ville',
        valeur: `${item.score.score_total}/100`,
        description: 'Ce quartier fait partie des moins bien notés selon notre méthodologie de scoring.'
      }]
    }))

  return [...quartiersAvecCriteres, ...complementAvecRaisons].slice(0, limit)
}
