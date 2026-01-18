import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * ToolsSection - Section présentant les outils disponibles
 */
export default function ToolsSection() {
  const tools = [
    {
      title: 'Score d\'investissement',
      emoji: '📊',
      description: 'Score sur 100 points basé sur 5 critères clés pour évaluer rapidement chaque ville.',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Prix immobiliers DVF',
      emoji: '💵',
      description: 'Données officielles de transactions : prix médian, quartiles, volumes de ventes.',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Analyse par quartier',
      emoji: '🏘️',
      description: '6 577 quartiers IRIS analysés avec démographie, logements et taux de vacance.',
      color: 'bg-purple-50 border-purple-200',
    },
    {
      title: 'Données démographiques',
      emoji: '👥',
      description: 'Population, structure par âge, évolution et densité selon l\'INSEE.',
      color: 'bg-orange-50 border-orange-200',
    },
    {
      title: 'Marché locatif',
      emoji: '🔑',
      description: 'Taux de vacance, résidences principales, logements sociaux par territoire.',
      color: 'bg-pink-50 border-pink-200',
    },
    {
      title: 'Classements',
      emoji: '🏆',
      description: 'Top 10 des villes et meilleurs quartiers pour cibler vos recherches.',
      color: 'bg-teal-50 border-teal-200',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Texte et outils */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Données et analyses disponibles
              </h2>
              <p className="text-lg text-neutral-600">
                Explorez des indicateurs complets pour chaque ville et quartier
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {tools.map((tool, index) => (
                <div key={index} className={`${tool.color} border-2 rounded-xl p-4 hover:shadow-lg transition-all`}>
                  <div className="text-3xl mb-2">
                    {tool.emoji}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/villes"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🔍</span>
                Commencer l'exploration
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/outil d'aide à l'investissement immobilier.jpg"
              alt="Outil d'aide à l'investissement immobilier"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
