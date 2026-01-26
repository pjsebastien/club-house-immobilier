import React from 'react'
import { Quartier } from '@/types/ville'
import { getTopQuartiers } from '@/lib/scoring-quartiers'
import Card from '@/components/ui/Card'

interface QuartiersTop10Props {
  quartiers: Quartier[]
  villeNom: string
  villeScore: number
}

/**
 * QuartiersTop10 - Affiche le top 10 des quartiers d'une ville par score d'investissement
 */
export default function QuartiersTop10({ quartiers, villeNom, villeScore }: QuartiersTop10Props) {
  const top10 = getTopQuartiers(quartiers, 10, villeScore)

  const getScoreBadgeColor = (score: number): string => {
    if (score >= 75) return 'bg-green-100 text-green-800 border-green-300'
    if (score >= 65) return 'bg-blue-100 text-blue-800 border-blue-300'
    if (score >= 55) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    return 'bg-orange-100 text-orange-800 border-orange-300'
  }

  const getMedalEmoji = (rang: number): string => {
    if (rang === 1) return '🥇'
    if (rang === 2) return '🥈'
    if (rang === 3) return '🥉'
    return ''
  }

  return (
    <Card className="mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          Top 10 des quartiers à {villeNom}
        </h3>
        <p className="text-sm text-neutral-600">
          Classement basé sur le score d'investissement calculé à partir des données INSEE
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {top10.map(({ quartier, score }, index) => {
          const medal = getMedalEmoji(score.rang || index + 1)

          return (
            <div
              key={quartier.iris_id}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                index < 3
                  ? 'border-primary-200 bg-primary-50/30'
                  : 'border-neutral-200 bg-white'
              }`}
            >
              {/* Rang ou médaille */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center font-bold text-neutral-700">
                {medal || `#${score.rang}`}
              </div>

              {/* Info quartier */}
              <div className="flex-grow min-w-0">
                <h4 className="font-semibold text-neutral-900 text-sm truncate">
                  {quartier.nom_quartier}
                </h4>
                <p className="text-xs text-neutral-500 truncate">
                  {(quartier.stats_insee.population || 0).toLocaleString('fr-FR')} habitants
                </p>
              </div>

              {/* Score */}
              <div className="flex-shrink-0">
                <div className={`px-2.5 py-1 rounded-full border font-bold text-sm ${getScoreBadgeColor(score.score_total)}`}>
                  {score.score_total}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-neutral-200">
        <p className="text-xs text-neutral-600">
          <strong>Note :</strong> Ce classement est comparatif et basé sur des données publiques.
          Il doit être complété par une visite terrain et une analyse personnalisée.
        </p>
      </div>
    </Card>
  )
}
