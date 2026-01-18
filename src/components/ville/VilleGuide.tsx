import React from 'react'
import { Ville } from '@/types/ville'

interface VilleGuideProps {
  ville: Ville
}

/**
 * VilleGuide - Guide d'utilisation de la page pour les novices
 */
export default function VilleGuide({ ville }: VilleGuideProps) {
  return (
    <section id="guide" className="py-8 bg-gradient-to-b from-primary-50 to-white border-b-2 border-primary-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-md border-2 border-primary-300 p-6">
          {/* Titre principal */}
          <div className="mb-5">
            <h2 className="text-xl font-bold text-neutral-900 mb-1 flex items-center gap-2">
              <span className="text-2xl">👋</span>
              Comment utiliser cette page ?
            </h2>
            <p className="text-sm text-neutral-600">
              3 étapes pour évaluer le potentiel d'investissement à {ville.nom}
            </p>
          </div>

          {/* 3 étapes claires - plus compactes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {/* Étape 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-neutral-900 text-sm">
                  Vérifiez le score
                </h3>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Le score (0-100) classe {ville.nom} parmi 134 villes. Un score élevé indique de bons critères d'investissement.
              </p>
            </div>

            {/* Étape 2 */}
            <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-neutral-900 text-sm">
                  Comparez les prix
                </h3>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Prix au m² pour appartements et maisons. Estimez votre budget d'achat selon le type de bien visé.
              </p>
            </div>

            {/* Étape 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-neutral-900 text-sm">
                  Ciblez un quartier
                </h3>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Chaque quartier est noté. Descendez en bas de page pour identifier les meilleurs secteurs.
              </p>
            </div>
          </div>

          {/* CTA actionnable */}
          <div className="bg-primary-600 rounded-lg p-4 text-center">
            <p className="text-sm text-white font-medium">
              💡 Débutant en investissement ? Commencez par regarder le score et les prix médians
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
