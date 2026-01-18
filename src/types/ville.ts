/**
 * Types pour les données territoriales
 */

export interface Coordonnees {
  latitude: number
  longitude: number
}

export interface Departement {
  code: string
  name: string
}

export interface Region {
  code: string
  name: string
}

export interface StatsAgregees {
  population_totale: number
  nb_menages: number
  nb_logements: number
  nb_residences_principales: number
  nb_residences_secondaires: number
  nb_logements_vacants: number
  taux_vacance_moyen_pct: number
}

export interface Logements {
  total: number
  residences_principales: number
  residences_secondaires: number
  logements_vacants: number
}

export interface StatsInsee {
  population: number
  menages: number
  taille_menage_moyenne: number
  pct_15_29_ans: number
  pct_60_plus_ans: number
  logements: Logements
  taux_vacance_pct: number
  annee_population: number
  annee_logements: number
  source: string
}

export interface IndicateursCalcules {
  pression_residentielle: number
  niveau_vacance: string
  profil_demographique: string
  stabilite_residentielle: string
}

export interface DVFStats {
  nb_ventes: number
  prix_m2_median: number
  prix_m2_moyen: number
  prix_m2_p25: number
  prix_m2_p75: number
  prix_m2_q1?: number // Pour compatibilité (alias de p25)
  prix_m2_q3?: number // Pour compatibilité (alias de p75)
  surface_mediane?: number | null
  qualite_donnees: string
}

export interface Quartier {
  iris_id: string
  nom: string
  coordonnees: Coordonnees
  stats_insee: StatsInsee
  indicateurs_calcules: IndicateursCalcules
  nom_quartier: string
  nom_commune: string
  dvf_appartements?: DVFStats
  dvf_maisons?: DVFStats
}

export interface DVFVille {
  nb_ventes_total: number | null
  prix_m2_median_global: number | null
  prix_m2_moyen_global: number | null
  prix_m2_p25: number | null
  prix_m2_p75: number | null
  appartements: DVFStats | null
  maisons: DVFStats | null
  qualite_donnees: string | null
  source: string
  annee: number
  is_estimated?: boolean
}

export interface Ville {
  nom: string
  code_insee: string
  departement: Departement
  region: Region
  codes_postaux: string[]
  coordonnees: Coordonnees
  stats_agregees: StatsAgregees
  nb_quartiers_iris: number
  quartiers: Quartier[]
  dvf?: DVFVille
}

export interface ApiTerritoriale {
  metadata: {
    titre: string
    description: string
    version: string
    annee_reference: number
    date_generation: string
    sources: string[]
  }
  statistiques_globales: {
    nb_villes: number
    nb_total_iris: number
    population_totale_couverte: number
    total_ventes_dvf: number
  }
  villes: Ville[]
}
