import React from 'react'

/**
 * HowItWorksSection - Section "Comment ça marche"
 */
export default function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      emoji: '🔎',
      title: 'Rechercher',
      description: 'Trouvez une ville parmi les 134 villes analysées grâce à la barre de recherche.',
    },
    {
      number: '2',
      emoji: '📊',
      title: 'Analyser',
      description: 'Consultez le score, les prix, les données démographiques et les quartiers IRIS.',
    },
    {
      number: '3',
      emoji: '🏘️',
      title: 'Comparer',
      description: 'Explorez les quartiers, identifiez les meilleurs secteurs selon votre stratégie.',
    },
    {
      number: '4',
      emoji: '✅',
      title: 'Décider',
      description: 'Prenez des décisions éclairées basées sur les données officielles.',
    },
  ]

  return (
    <section id="comment-ca-marche" className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            4 étapes simples pour analyser les territoires français
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white border-2 border-primary-200 rounded-xl p-6 text-center hover:shadow-lg transition-all hover:border-primary-400">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <div className="text-4xl mb-3">
                {step.emoji}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-semibold text-primary-900">
              100% gratuit • Aucun compte requis
            </p>
          </div>
          <p className="text-xs text-primary-800">
            Accédez immédiatement à toutes les données publiques officielles
          </p>
        </div>
      </div>
    </section>
  )
}
