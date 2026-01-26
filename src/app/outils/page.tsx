import React from 'react'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Outils d\'analyse immobilière | Comparateur et analyses',
  description: 'Outils d\'analyse territoriale et d\'aide à la décision pour investisseurs immobiliers. Comparateur de villes, analyses de quartiers.',
}

/**
 * Outils Page - Page présentant les outils d'analyse
 */
export default function OutilsPage() {
  const outils = [
    {
      href: '/outils/comparateur',
      title: 'Comparateur de villes',
      description: 'Comparez jusqu\'à 5 villes sur des critères d\'investissement : démographie, prix immobiliers, logements, accessibilité.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'primary',
    },
    {
      href: '/outils/budget',
      title: 'Simulateur budget',
      description: 'Découvrez dans quelles villes vous pouvez investir selon votre budget et le type de bien recherché.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green',
    },
    {
      href: '/quartiers',
      title: 'Quartiers à éviter',
      description: 'Identifiez les quartiers présentant des indicateurs défavorables dans chacune des 134 villes analysées.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: 'orange',
    },
  ]

  return (
    <Section>
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-neutral-900 mb-6">
            Outils d'analyse territoriale
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Accédez à l'ensemble des outils pour analyser, comparer et explorer les territoires français.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {outils.map((outil) => (
            <Link
              key={outil.href}
              href={outil.href}
              className={`block p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                outil.color === 'primary'
                  ? 'border-primary-200 bg-primary-50 hover:border-primary-400'
                  : outil.color === 'green'
                  ? 'border-green-200 bg-green-50 hover:border-green-400'
                  : 'border-orange-200 bg-orange-50 hover:border-orange-400'
              }`}
            >
              <div className={`inline-flex p-3 rounded-lg mb-4 ${
                outil.color === 'primary'
                  ? 'bg-primary-100 text-primary-600'
                  : outil.color === 'green'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-orange-100 text-orange-600'
              }`}>
                {outil.icon}
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                {outil.title}
              </h2>
              <p className="text-neutral-600">
                {outil.description}
              </p>
              <div className={`mt-4 inline-flex items-center font-medium ${
                outil.color === 'primary' ? 'text-primary-600' : outil.color === 'green' ? 'text-green-600' : 'text-orange-600'
              }`}>
                Accéder
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-2">D'autres outils à venir</h3>
          <p className="text-neutral-600 text-sm">
            Nous travaillons sur de nouveaux outils pour vous aider dans vos analyses : simulateur de rentabilité, alertes sur les opportunités, et plus encore.
          </p>
        </div>
      </div>
    </Section>
  )
}
