import React from 'react'
import Image from 'next/image'

/**
 * ResponsibleApproachSection - Section "Approche Responsable"
 * Explique la neutralité, les limites et l'approche éthique du site
 */
export default function ResponsibleApproachSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Notre approche
              </h2>
              <p className="text-lg text-neutral-600">
                Des données officielles, une présentation neutre, aucune recommandation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1">
                      Sources officielles
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      Données INSEE, DVF/Etalab et API publiques. Aucune estimation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚖️</div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1">
                      Neutralité totale
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      Présentation factuelle sans biais ni interprétation orientée.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🚫</div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1">
                      Aucune recommandation
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      Ce site ne fournit aucun conseil en investissement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1">
                      Scores non officiels
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      Les scores sont des synthèses calculées.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-2 text-sm">
                    Avertissement
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    L'investissement immobilier comporte des risques. Les données présentées sont purement factuelles
                    et ne constituent pas un conseil en investissement. Consultez des professionnels qualifiés
                    (notaires, conseillers financiers) avant toute décision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/ensemble immobilier.jpg"
              alt="Ensemble immobilier"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
