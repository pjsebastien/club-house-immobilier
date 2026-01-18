import React from 'react'
import { Ville } from '@/types/ville'
import { getVilleScore } from '@/lib/scoring'
import { getAllVilles } from '@/lib/data'

interface VilleScoreInvestissementProps {
  ville: Ville
}

export default function VilleScoreInvestissement({ ville }: VilleScoreInvestissementProps) {
  const allVilles = getAllVilles()
  const score = getVilleScore(ville, allVilles)

  return (
    <section id="score" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Score total + Breakdown des critères */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {/* Score total */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 border-2 border-primary-700 rounded-xl p-4 text-white col-span-2 md:col-span-1 flex flex-col justify-center items-center">
            <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-90">
              Score Total
            </div>
            <div className="text-5xl font-bold mb-1">
              {score.score_total}
            </div>
            <div className="text-xs opacity-90">
              sur 100 pts
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 w-full text-center">
              <div className="text-xs opacity-90">Rang</div>
              <div className="text-2xl font-bold">
                #{score.rang}
              </div>
              <div className="text-xs opacity-90">/ 134</div>
            </div>
          </div>

          {/* Critères détaillés */}
          <CriteriaScore
            label="Accessibilité"
            score={score.accessibilite_marche}
            max={25}
            description="Prix & stabilité"
          />
          <CriteriaScore
            label="Potentiel locatif"
            score={score.potentiel_locatif}
            max={25}
            description="Demande & tension"
          />
          <CriteriaScore
            label="Dynamisme"
            score={score.dynamisme_marche}
            max={20}
            description="Volume transactions"
          />
          <CriteriaScore
            label="Démographie"
            score={score.demographie}
            max={20}
            description="Profil population"
          />
          <CriteriaScore
            label="Liquidité"
            score={score.volume_liquidite}
            max={10}
            description="Facilité revente"
          />
        </div>
      </div>
    </section>
  )
}

function CriteriaScore({
  label,
  score,
  max,
  description
}: {
  label: string
  score: number
  max: number
  description: string
}) {
  const percentage = (score / max) * 100

  return (
    <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 rounded-xl p-4">
      <div className="mb-3">
        <div className="text-2xl font-bold text-primary-600 mb-0.5">
          {(score || 0).toFixed(1)}
        </div>
        <div className="text-xs text-neutral-500 font-medium">
          sur {max} pts
        </div>
      </div>
      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-primary-600 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="font-bold text-neutral-900 mb-1 text-sm">
        {label}
      </div>
      <div className="text-xs text-neutral-600">
        {description}
      </div>
    </div>
  )
}
