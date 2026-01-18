import React from 'react'
import Image from 'next/image'

/**
 * AudienceSection - Section "À qui s'adresse le site"
 */
export default function AudienceSection() {
  const audiences = [
    {
      title: 'Débutants',
      emoji: '🌱',
      description: 'Vous débutez en investissement immobilier et cherchez à comprendre les dynamiques locales pour votre premier achat.',
      color: 'from-blue-50 to-white border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Expérimentés',
      emoji: '💼',
      description: 'Vous développez votre patrimoine et affinez vos analyses territoriales avec des données structurées.',
      color: 'from-green-50 to-white border-green-200',
      iconColor: 'text-green-600',
    },
    {
      title: 'Analystes',
      emoji: '🔍',
      description: 'Vous explorez les dynamiques territoriales et démographiques françaises de manière accessible.',
      color: 'from-purple-50 to-white border-purple-200',
      iconColor: 'text-purple-600',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <Image
              src="/images/investir dans l'immobilier, conseils.jpg"
              alt="Investir dans l'immobilier - conseils"
              fill
              className="object-cover"
            />
          </div>

          {/* Contenu */}
          <div className="order-1 lg:order-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                À qui s'adresse ce site ?
              </h2>
              <p className="text-lg text-neutral-600">
                Club House Immobilier accompagne tous les profils intéressés par l'analyse territoriale
              </p>
            </div>

            <div className="space-y-4">
              {audiences.map((audience, index) => (
                <div key={index} className={`bg-gradient-to-br ${audience.color} border-2 rounded-xl p-5 hover:shadow-lg transition-all`}>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">
                      {audience.emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">
                        {audience.title}
                      </h3>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {audience.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
