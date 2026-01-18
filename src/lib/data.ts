import { ApiTerritoriale, Ville, DVFVille } from '@/types/ville'
import apiData from '../../data/api_territoriale_v3.json'

/**
 * Utilitaires pour accéder aux données territoriales
 */

const data = apiData as ApiTerritoriale

/**
 * Base de connaissances des prix immobiliers pour les villes françaises
 * Basé sur les prix moyens réels observés en 2024
 */
const VILLE_PRICE_ESTIMATES: Record<string, {
  prix_m2_median: number
  appt_median: number
  maison_median: number
}> = {
  // Grandes métropoles
  'Paris': { prix_m2_median: 10500, appt_median: 10800, maison_median: 9200 },
  'Lyon': { prix_m2_median: 4800, appt_median: 5000, maison_median: 4200 },
  'Marseille': { prix_m2_median: 3800, appt_median: 4000, maison_median: 3200 },

  // Grandes villes attractives
  'Bordeaux': { prix_m2_median: 4600, appt_median: 4800, maison_median: 4000 },
  'Nice': { prix_m2_median: 5200, appt_median: 5500, maison_median: 4500 },
  'Strasbourg': { prix_m2_median: 3400, appt_median: 3500, maison_median: 3100 },
  'Nantes': { prix_m2_median: 3800, appt_median: 3900, maison_median: 3400 },
  'Lille': { prix_m2_median: 3200, appt_median: 3300, maison_median: 2800 },
  'Toulouse': { prix_m2_median: 3400, appt_median: 3500, maison_median: 3000 },
  'Montpellier': { prix_m2_median: 3900, appt_median: 4100, maison_median: 3400 },
  'Rennes': { prix_m2_median: 3600, appt_median: 3700, maison_median: 3200 },

  // Villes moyennes Île-de-France
  'Boulogne-Billancourt': { prix_m2_median: 8500, appt_median: 8800, maison_median: 7500 },
  'Montreuil': { prix_m2_median: 5500, appt_median: 5700, maison_median: 5000 },
  'Saint-Denis': { prix_m2_median: 4200, appt_median: 4300, maison_median: 3800 },
  'Argenteuil': { prix_m2_median: 3800, appt_median: 3900, maison_median: 3500 },
  'Nanterre': { prix_m2_median: 5200, appt_median: 5400, maison_median: 4700 },
  'Vitry-sur-Seine': { prix_m2_median: 4500, appt_median: 4600, maison_median: 4000 },
  'Créteil': { prix_m2_median: 4800, appt_median: 4900, maison_median: 4300 },
  'Asnières-sur-Seine': { prix_m2_median: 6200, appt_median: 6400, maison_median: 5500 },
  'Colombes': { prix_m2_median: 5500, appt_median: 5700, maison_median: 4900 },
  'Courbevoie': { prix_m2_median: 7500, appt_median: 7800, maison_median: 6500 },
  'Rueil-Malmaison': { prix_m2_median: 6800, appt_median: 7000, maison_median: 6000 },
  'Aubervilliers': { prix_m2_median: 4400, appt_median: 4500, maison_median: 3900 },
  'Aulnay-sous-Bois': { prix_m2_median: 3600, appt_median: 3700, maison_median: 3300 },
  'Champigny-sur-Marne': { prix_m2_median: 4200, appt_median: 4300, maison_median: 3800 },
  'Saint-Maur-des-Fossés': { prix_m2_median: 6500, appt_median: 6700, maison_median: 5800 },
  'Noisy-le-Grand': { prix_m2_median: 4500, appt_median: 4600, maison_median: 4000 },
  'Levallois-Perret': { prix_m2_median: 8200, appt_median: 8500, maison_median: 7200 },
  'Issy-les-Moulineaux': { prix_m2_median: 7800, appt_median: 8000, maison_median: 6800 },
  'Clichy': { prix_m2_median: 6500, appt_median: 6700, maison_median: 5700 },
  'Ivry-sur-Seine': { prix_m2_median: 5200, appt_median: 5400, maison_median: 4600 },
  'Antony': { prix_m2_median: 6200, appt_median: 6400, maison_median: 5600 },
  'Pantin': { prix_m2_median: 5500, appt_median: 5700, maison_median: 4900 },
  'Le Blanc-Mesnil': { prix_m2_median: 3500, appt_median: 3600, maison_median: 3200 },
  'Neuilly-sur-Seine': { prix_m2_median: 11000, appt_median: 11500, maison_median: 9500 },
  'Villejuif': { prix_m2_median: 5000, appt_median: 5200, maison_median: 4400 },
  'Maisons-Alfort': { prix_m2_median: 5500, appt_median: 5700, maison_median: 4900 },
  'Clamart': { prix_m2_median: 6000, appt_median: 6200, maison_median: 5400 },
  'Bobigny': { prix_m2_median: 3800, appt_median: 3900, maison_median: 3400 },
  'Épinay-sur-Seine': { prix_m2_median: 3600, appt_median: 3700, maison_median: 3200 },
  'Saint-Ouen-sur-Seine': { prix_m2_median: 5800, appt_median: 6000, maison_median: 5100 },
  'Fontenay-sous-Bois': { prix_m2_median: 5200, appt_median: 5400, maison_median: 4600 },
  'Sevran': { prix_m2_median: 3200, appt_median: 3300, maison_median: 2900 },
  'Bondy': { prix_m2_median: 3500, appt_median: 3600, maison_median: 3200 },
  'Gennevilliers': { prix_m2_median: 4200, appt_median: 4300, maison_median: 3800 },
  'Drancy': { prix_m2_median: 3800, appt_median: 3900, maison_median: 3400 },

  // Côte d'Azur
  'Cannes': { prix_m2_median: 6500, appt_median: 7000, maison_median: 5500 },
  'Antibes': { prix_m2_median: 5800, appt_median: 6200, maison_median: 5000 },
  'Aix-en-Provence': { prix_m2_median: 4800, appt_median: 5000, maison_median: 4200 },
  'Avignon': { prix_m2_median: 3200, appt_median: 3300, maison_median: 2800 },
  'Fréjus': { prix_m2_median: 4200, appt_median: 4500, maison_median: 3700 },
  'Hyères': { prix_m2_median: 4000, appt_median: 4300, maison_median: 3500 },
  'Cagnes-sur-Mer': { prix_m2_median: 5200, appt_median: 5600, maison_median: 4500 },
  'Arles': { prix_m2_median: 2800, appt_median: 2900, maison_median: 2500 },

  // Grand Est
  'Metz': { prix_m2_median: 2600, appt_median: 2700, maison_median: 2300 },
  'Mulhouse': { prix_m2_median: 2200, appt_median: 2300, maison_median: 2000 },
  'Colmar': { prix_m2_median: 2800, appt_median: 2900, maison_median: 2500 },

  // Bretagne
  'Brest': { prix_m2_median: 2400, appt_median: 2500, maison_median: 2200 },

  // Auvergne-Rhône-Alpes
  'Annecy': { prix_m2_median: 5200, appt_median: 5500, maison_median: 4500 },
  'Chambéry': { prix_m2_median: 3400, appt_median: 3600, maison_median: 3000 },

  // Nouvelle-Aquitaine
  'Angers': { prix_m2_median: 2900, appt_median: 3000, maison_median: 2600 },
  'Limoges': { prix_m2_median: 2000, appt_median: 2100, maison_median: 1800 },

  // Bourgogne-Franche-Comté
  'Besançon': { prix_m2_median: 2400, appt_median: 2500, maison_median: 2200 },

  // Occitanie
  'Béziers': { prix_m2_median: 2400, appt_median: 2500, maison_median: 2100 },
  'Albi': { prix_m2_median: 2200, appt_median: 2300, maison_median: 2000 },

  // Hauts-de-France
  'Amiens': { prix_m2_median: 2200, appt_median: 2300, maison_median: 2000 },
  'Beauvais': { prix_m2_median: 2400, appt_median: 2500, maison_median: 2200 },
  'Villeneuve-d\'Ascq': { prix_m2_median: 3000, appt_median: 3100, maison_median: 2700 },

  // Centre-Val de Loire
  'Bourges': { prix_m2_median: 1800, appt_median: 1900, maison_median: 1600 },

  // Pays de la Loire
  'Cholet': { prix_m2_median: 2000, appt_median: 2100, maison_median: 1800 },

  // DOM-TOM
  'Fort-de-France': { prix_m2_median: 3200, appt_median: 3300, maison_median: 2900 },
  'Cayenne': { prix_m2_median: 2800, appt_median: 2900, maison_median: 2600 },
  'Ajaccio': { prix_m2_median: 4200, appt_median: 4400, maison_median: 3800 },
  'Saint-André': { prix_m2_median: 3000, appt_median: 3200, maison_median: 2700 },
  'Les Abymes': { prix_m2_median: 2800, appt_median: 2900, maison_median: 2500 },
  'Nouméa': { prix_m2_median: 4500, appt_median: 4700, maison_median: 4000 },
  'Mamoudzou': { prix_m2_median: 2500, appt_median: 2600, maison_median: 2200 },
}

/**
 * Convertit un nom de ville en slug URL-friendly
 */
export function villeToSlug(nom: string): string {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Récupère toutes les villes
 */
export function getAllVilles(): Ville[] {
  return data.villes
}

/**
 * Récupère une ville par son slug
 */
export function getVilleBySlug(slug: string): Ville | null {
  const ville = data.villes.find(v => villeToSlug(v.nom) === slug)
  return ville || null
}

/**
 * Récupère une ville par son code INSEE
 */
export function getVilleByCode(codeInsee: string): Ville | null {
  const ville = data.villes.find(v => v.code_insee === codeInsee)
  return ville || null
}

/**
 * Génère les slugs de toutes les villes pour le routing statique
 */
export function getAllVilleSlugs(): string[] {
  return data.villes.map(v => villeToSlug(v.nom))
}

/**
 * Récupère les métadonnées de l'API
 */
export function getMetadata() {
  return data.metadata
}

/**
 * Récupère les statistiques globales
 */
export function getStatistiquesGlobales() {
  return data.statistiques_globales
}

/**
 * Recherche de villes par nom (pour autocomplete)
 */
export function searchVilles(query: string, limit: number = 10): Ville[] {
  const normalizedQuery = query.toLowerCase()
  return data.villes
    .filter(v =>
      v.nom.toLowerCase().includes(normalizedQuery) ||
      v.departement.name.toLowerCase().includes(normalizedQuery) ||
      v.region.name.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, limit)
}

/**
 * Estime les données DVF pour une ville basée sur les connaissances des prix du marché
 */
export function estimateDVFData(ville: Ville): DVFVille {
  // Chercher si on a une estimation spécifique pour cette ville
  const cityEstimate = VILLE_PRICE_ESTIMATES[ville.nom]

  let prix_m2_median: number
  let appt_median: number
  let maison_median: number

  if (cityEstimate) {
    // Utiliser les prix connus pour cette ville
    prix_m2_median = cityEstimate.prix_m2_median
    appt_median = cityEstimate.appt_median
    maison_median = cityEstimate.maison_median
  } else {
    // Fallback : estimation par défaut selon la région et taille
    const pop = ville.stats_agregees.population_totale
    const region = ville.region.name

    // Prix de base selon la région (connaissance générale du marché français)
    let basePrice = 2500 // Prix national moyen

    if (region === 'Île-de-France') {
      basePrice = 5000
    } else if (region === 'Provence-Alpes-Côte d\'Azur') {
      basePrice = 3800
    } else if (region === 'Bretagne' || region === 'Pays de la Loire') {
      basePrice = 2800
    } else if (region === 'Nouvelle-Aquitaine') {
      basePrice = 3000
    } else if (region === 'Occitanie') {
      basePrice = 2800
    } else if (region === 'Auvergne-Rhône-Alpes') {
      basePrice = 3200
    } else if (region === 'Hauts-de-France') {
      basePrice = 2200
    } else if (region === 'Grand Est') {
      basePrice = 2400
    } else if (region === 'Normandie') {
      basePrice = 2600
    } else if (region === 'Centre-Val de Loire') {
      basePrice = 2200
    } else if (region === 'Bourgogne-Franche-Comté') {
      basePrice = 2300
    }

    // Ajustement selon la population
    let multiplier = 1.0
    if (pop > 200000) {
      multiplier = 1.15
    } else if (pop > 100000) {
      multiplier = 1.05
    } else if (pop < 70000) {
      multiplier = 0.95
    }

    prix_m2_median = Math.round(basePrice * multiplier)
    appt_median = Math.round(prix_m2_median * 1.05) // Appartements légèrement plus chers au m²
    maison_median = Math.round(prix_m2_median * 0.90) // Maisons moins chères au m²
  }

  // Calcul des quartiles estimés (P25 = -15%, P75 = +20% du médian)
  const prix_m2_p25 = Math.round(prix_m2_median * 0.85)
  const prix_m2_p75 = Math.round(prix_m2_median * 1.20)
  const prix_m2_moyen = Math.round(prix_m2_median * 1.12) // Moyenne ~12% au-dessus de la médiane

  const appt_p25 = Math.round(appt_median * 0.85)
  const appt_p75 = Math.round(appt_median * 1.20)
  const maison_p25 = Math.round(maison_median * 0.85)
  const maison_p75 = Math.round(maison_median * 1.20)

  // Estimation du nombre de ventes basée sur la population
  const pop = ville.stats_agregees.population_totale
  const nb_ventes_estimated = Math.round(pop * 0.015) // ~1.5% de la population par an

  return {
    nb_ventes_total: nb_ventes_estimated,
    prix_m2_median_global: prix_m2_median,
    prix_m2_moyen_global: prix_m2_moyen,
    prix_m2_p25,
    prix_m2_p75,
    appartements: {
      prix_m2_median: appt_median,
      prix_m2_moyen: Math.round(appt_median * 1.10),
      prix_m2_p25: appt_p25,
      prix_m2_p75: appt_p75,
      nb_ventes: Math.round(nb_ventes_estimated * 0.65), // 65% d'appartements en moyenne
      surface_mediane: 55,
      qualite_donnees: 'Estimation'
    },
    maisons: {
      prix_m2_median: maison_median,
      prix_m2_moyen: Math.round(maison_median * 1.10),
      prix_m2_p25: maison_p25,
      prix_m2_p75: maison_p75,
      nb_ventes: Math.round(nb_ventes_estimated * 0.35), // 35% de maisons
      surface_mediane: 95,
      qualite_donnees: 'Estimation'
    },
    qualite_donnees: 'Estimation',
    source: 'Estimation basée sur connaissance du marché immobilier français',
    annee: 2024,
    is_estimated: true
  }
}

/**
 * Récupère les données DVF d'une ville (réelles ou estimées)
 */
export function getVilleDVF(ville: Ville): DVFVille & { is_estimated: boolean } {
  // Si la ville a des données DVF réelles
  if (ville.dvf && ville.dvf.nb_ventes_total && ville.dvf.nb_ventes_total > 0) {
    return {
      ...ville.dvf,
      is_estimated: ville.dvf.is_estimated || false
    }
  }

  // Sinon, retourner une estimation
  const estimatedData = estimateDVFData(ville)
  return {
    ...estimatedData,
    is_estimated: true
  }
}
