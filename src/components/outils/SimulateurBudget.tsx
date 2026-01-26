'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { getAllVilles, getVilleDVF, villeToSlug } from '@/lib/data'
import { Ville } from '@/types/ville'

type TypeBien = 'appartement' | 'maison'

interface VilleAccessible {
  ville: Ville
  prixM2: number
  surfaceEstimee: number
  isEstimated: boolean
}

const BUDGETS_PREDEFINIS = [
  50000, 75000, 100000, 125000, 150000, 175000, 200000, 250000, 300000, 400000, 500000
]

const SURFACE_MIN: Record<TypeBien, number> = {
  appartement: 20, // Studio minimum
  maison: 40, // Petit T2 minimum
}

export default function SimulateurBudget() {
  const [budget, setBudget] = useState<number>(150000)
  const [budgetInput, setBudgetInput] = useState<string>('150000')
  const [typeBien, setTypeBien] = useState<TypeBien>('appartement')
  const [triPar, setTriPar] = useState<'surface' | 'prix' | 'population'>('surface')

  const allVilles = useMemo(() => getAllVilles(), [])

  const villesAccessibles = useMemo(() => {
    const surfaceMin = SURFACE_MIN[typeBien]

    const results: VilleAccessible[] = []

    for (const ville of allVilles) {
      const dvf = getVilleDVF(ville)

      // Récupérer le prix selon le type de bien
      const prixM2Raw = typeBien === 'appartement'
        ? (dvf.appartements?.prix_m2_median ?? dvf.prix_m2_median_global)
        : (dvf.maisons?.prix_m2_median ?? dvf.prix_m2_median_global)

      // Si pas de prix disponible, ignorer
      if (!prixM2Raw || prixM2Raw <= 0) continue

      const prixM2 = prixM2Raw

      // Calculer la surface estimée
      const surfaceEstimee = Math.floor(budget / prixM2)

      // Vérifier si la surface est suffisante
      if (surfaceEstimee >= surfaceMin) {
        results.push({
          ville,
          prixM2,
          surfaceEstimee,
          isEstimated: dvf.is_estimated,
        })
      }
    }

    // Trier selon le critère choisi
    if (triPar === 'surface') {
      results.sort((a, b) => b.surfaceEstimee - a.surfaceEstimee)
    } else if (triPar === 'prix') {
      results.sort((a, b) => a.prixM2 - b.prixM2)
    } else {
      results.sort((a, b) => b.ville.stats_agregees.population_totale - a.ville.stats_agregees.population_totale)
    }

    return results
  }, [allVilles, budget, typeBien, triPar])

  const handleBudgetInputChange = (value: string) => {
    setBudgetInput(value)
    const numValue = parseInt(value.replace(/\s/g, ''), 10)
    if (!isNaN(numValue) && numValue > 0) {
      setBudget(numValue)
    }
  }

  const formatNumber = (n: number): string => {
    return n.toLocaleString('fr-FR')
  }

  const formatBudget = (n: number): string => {
    if (n >= 1000000) {
      return `${(n / 1000000).toFixed(1).replace('.0', '')} M€`
    }
    return `${formatNumber(n)} €`
  }

  // Statistiques
  const stats = useMemo(() => {
    if (villesAccessibles.length === 0) return null

    const surfaces = villesAccessibles.map(v => v.surfaceEstimee)
    const prix = villesAccessibles.map(v => v.prixM2)

    return {
      nbVilles: villesAccessibles.length,
      surfaceMin: Math.min(...surfaces),
      surfaceMax: Math.max(...surfaces),
      prixMin: Math.min(...prix),
      prixMax: Math.max(...prix),
    }
  }, [villesAccessibles])

  return (
    <div className="space-y-8">
      {/* Formulaire de saisie */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Budget maximum
            </label>
            <div className="relative">
              <input
                type="text"
                value={budgetInput}
                onChange={(e) => handleBudgetInputChange(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="150000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">€</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {BUDGETS_PREDEFINIS.slice(0, 6).map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setBudget(b)
                    setBudgetInput(b.toString())
                  }}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    budget === b
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {formatBudget(b)}
                </button>
              ))}
            </div>
          </div>

          {/* Type de bien */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Type de bien
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setTypeBien('appartement')}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                  typeBien === 'appartement'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="text-2xl mb-1">🏢</div>
                <div className="font-medium">Appartement</div>
              </button>
              <button
                onClick={() => setTypeBien('maison')}
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                  typeBien === 'maison'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="text-2xl mb-1">🏠</div>
                <div className="font-medium">Maison</div>
              </button>
            </div>
          </div>

          {/* Tri */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Trier par
            </label>
            <select
              value={triPar}
              onChange={(e) => setTriPar(e.target.value as typeof triPar)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="surface">Surface (plus grande en premier)</option>
              <option value="prix">Prix au m² (moins cher en premier)</option>
              <option value="population">Population (plus grande en premier)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Résumé */}
      {stats && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-700">{stats.nbVilles}</div>
              <div className="text-sm text-primary-600">villes accessibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-700">
                {stats.surfaceMin} - {stats.surfaceMax} m²
              </div>
              <div className="text-sm text-primary-600">surfaces estimées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-700">
                {formatNumber(stats.prixMin)} €
              </div>
              <div className="text-sm text-primary-600">prix/m² le plus bas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-700">
                {formatNumber(stats.prixMax)} €
              </div>
              <div className="text-sm text-primary-600">prix/m² le plus haut</div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des villes */}
      {villesAccessibles.length === 0 ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Aucune ville trouvée
          </h3>
          <p className="text-neutral-600">
            Avec un budget de {formatBudget(budget)}, aucune ville ne permet d'acquérir
            un {typeBien} d'au moins {SURFACE_MIN[typeBien]} m².
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            Essayez d'augmenter votre budget ou de changer de type de bien.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">
                    Ville
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">
                    Région
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-neutral-700">
                    Prix/m²
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-neutral-700">
                    Surface estimée
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-neutral-700">
                    Population
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {villesAccessibles.map((item, index) => (
                  <tr
                    key={item.ville.code_insee}
                    className={`border-b border-neutral-100 hover:bg-neutral-50 ${
                      index < 10 ? 'bg-green-50/30' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/villes/${villeToSlug(item.ville.nom)}`}
                        className="font-medium text-neutral-900 hover:text-primary-600"
                      >
                        {item.ville.nom}
                      </Link>
                      <div className="text-xs text-neutral-500">
                        {item.ville.departement.name} ({item.ville.departement.code})
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {item.ville.region.name}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium text-neutral-900">
                        {formatNumber(item.prixM2)} €/m²
                      </span>
                      {item.isEstimated && (
                        <span className="ml-1 text-xs text-amber-600" title="Prix estimé">
                          *
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-bold ${
                        item.surfaceEstimee >= 80
                          ? 'text-green-600'
                          : item.surfaceEstimee >= 50
                          ? 'text-primary-600'
                          : 'text-neutral-700'
                      }`}>
                        {item.surfaceEstimee} m²
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-neutral-600">
                      {formatNumber(item.ville.stats_agregees.population_totale)} hab.
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/villes/${villeToSlug(item.ville.nom)}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        Voir →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Légende */}
          <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-500">
            <span className="text-amber-600">*</span> Prix estimé à partir des moyennes régionales (données DVF insuffisantes)
            <span className="mx-3">•</span>
            Les 10 premières lignes sont surlignées en vert
          </div>
        </div>
      )}

      {/* Informations complémentaires */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-3">Comprendre les résultats</h3>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-600">●</span>
              <span>Surface ≥ 80 m² : potentiellement un T3/T4 ou grande maison</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">●</span>
              <span>Surface 50-79 m² : potentiellement un T2/T3</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-600">●</span>
              <span>Surface 20-49 m² : studio ou petit T2</span>
            </li>
          </ul>
        </div>

        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-3">Limites de l'outil</h3>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li>• Ne tient pas compte des frais de notaire (~7-8%)</li>
            <li>• Ne tient pas compte des éventuels travaux</li>
            <li>• Basé sur des prix médians, pas sur des offres réelles</li>
            <li>• Ne garantit pas la disponibilité de biens</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
