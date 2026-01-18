'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Ville } from '@/types/ville'
import { calculateAllScores } from '@/lib/scoring'
import { villeToSlug } from '@/lib/data'

interface VilleTop10Props {
  villes: Ville[]
}

export default function VilleTop10({ villes }: VilleTop10Props) {
  const [showAll, setShowAll] = useState(false)
  const allScores = calculateAllScores(villes)
  const displayedVilles = showAll ? allScores : allScores.slice(0, 10)

  return (
    <section className="py-32 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header élégant */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Analyse comparative
            </span>
          </div>
          <h2 className="text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Les villes où investir
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Classement basé sur 5 critères essentiels : accessibilité, potentiel locatif,
            dynamisme, démographie et liquidité du marché.
          </p>
        </div>

        {/* Toggle view moderne */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-neutral-200">
            <button
              onClick={() => setShowAll(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !showAll
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Top 10
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                showAll
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Toutes ({allScores.length})
            </button>
          </div>
        </div>

        {/* Liste des villes - Card moderne */}
        <div className="space-y-3">
          {displayedVilles.map((item, index) => {
            const { ville, score } = item
            const slug = villeToSlug(ville.nom)
            const isTop3 = (score.rang || 0) <= 3

            return (
              <Link
                key={ville.code_insee}
                href={`/villes/${slug}`}
                className="block group"
              >
                <div className={`
                  bg-white rounded-2xl p-6
                  border border-neutral-200
                  hover:border-neutral-900
                  hover:shadow-lg
                  transition-all duration-300
                  ${isTop3 ? 'ring-2 ring-neutral-900 ring-offset-2' : ''}
                `}>
                  <div className="flex items-center gap-6">
                    {/* Rang élégant */}
                    <div className="flex-shrink-0">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                        ${isTop3
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200'
                        }
                        transition-colors
                      `}>
                        {score.rang}
                      </div>
                    </div>

                    {/* Info ville */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-1 group-hover:text-neutral-700 transition-colors">
                        {ville.nom}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {ville.departement.name} · {ville.region.name}
                      </p>
                    </div>

                    {/* Score avec breakdown */}
                    <div className="flex items-center gap-8">
                      {/* Breakdown compact */}
                      <div className="hidden lg:flex items-center gap-4">
                        <ScoreIndicator
                          label="Access."
                          value={score.accessibilite_marche}
                          max={25}
                        />
                        <ScoreIndicator
                          label="Locatif"
                          value={score.potentiel_locatif}
                          max={25}
                        />
                        <ScoreIndicator
                          label="Dyn."
                          value={score.dynamisme_marche}
                          max={20}
                        />
                        <ScoreIndicator
                          label="Démo."
                          value={score.demographie}
                          max={20}
                        />
                        <ScoreIndicator
                          label="Liq."
                          value={score.volume_liquidite}
                          max={10}
                        />
                      </div>

                      {/* Score principal imposant */}
                      <div className="flex items-baseline gap-1 flex-shrink-0">
                        <span className="text-4xl font-bold text-neutral-900">
                          {score.score_total}
                        </span>
                        <span className="text-lg text-neutral-400 font-medium">
                          /100
                        </span>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile breakdown */}
                  <div className="lg:hidden mt-4 pt-4 border-t border-neutral-100">
                    <div className="flex items-center justify-between gap-2">
                      <ScoreIndicator
                        label="Access."
                        value={score.accessibilite_marche}
                        max={25}
                        compact
                      />
                      <ScoreIndicator
                        label="Locatif"
                        value={score.potentiel_locatif}
                        max={25}
                        compact
                      />
                      <ScoreIndicator
                        label="Dyn."
                        value={score.dynamisme_marche}
                        max={20}
                        compact
                      />
                      <ScoreIndicator
                        label="Démo."
                        value={score.demographie}
                        max={20}
                        compact
                      />
                      <ScoreIndicator
                        label="Liq."
                        value={score.volume_liquidite}
                        max={10}
                        compact
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Légende élégante */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6">
            Méthodologie
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Methodology
              title="Accessibilité"
              description="Analyse du prix médian au m² et de la stabilité des prix du marché immobilier local"
            />
            <Methodology
              title="Potentiel locatif"
              description="Évaluation du taux de vacance, de la tension du marché et de la demande locative"
            />
            <Methodology
              title="Dynamisme"
              description="Mesure du volume de transactions et de l'activité du marché immobilier"
            />
            <Methodology
              title="Démographie"
              description="Analyse de la structure démographique et du profil de la population"
            />
            <Methodology
              title="Liquidité"
              description="Évaluation de la profondeur du marché et de la facilité de revente"
            />
          </div>
        </div>

        {/* Disclaimer moderne */}
        <div className="mt-12 p-6 bg-neutral-900 rounded-2xl">
          <p className="text-sm text-neutral-400 leading-relaxed">
            <span className="text-white font-medium">Indice comparatif</span> ·
            Ce classement est basé sur des données publiques (INSEE, DVF) et une méthodologie propriétaire.
            Il ne constitue pas un conseil en investissement et ne garantit aucune rentabilité.
            Consultez un professionnel avant toute décision.
          </p>
        </div>
      </div>
    </section>
  )
}

// Indicateur de score minimaliste
function ScoreIndicator({
  label,
  value,
  max,
  compact = false
}: {
  label: string
  value: number
  max: number
  compact?: boolean
}) {
  const percentage = (value / max) * 100

  return (
    <div className={compact ? 'flex-1' : ''}>
      <div className="text-xs text-neutral-500 mb-2 font-medium">
        {label}
      </div>
      <div className="relative">
        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-900 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {!compact && (
          <div className="text-xs font-semibold text-neutral-900 mt-2">
            {(value || 0).toFixed(1)}
          </div>
        )}
      </div>
    </div>
  )
}

// Bloc méthodologie
function Methodology({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h4 className="font-semibold text-neutral-900 mb-2">
        {title}
      </h4>
      <p className="text-sm text-neutral-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
