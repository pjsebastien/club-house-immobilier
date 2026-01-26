import React from 'react'
import { Metadata } from 'next'
import Section from '@/components/ui/Section'
import SimulateurBudget from '@/components/outils/SimulateurBudget'

export const metadata: Metadata = {
  title: 'Simulateur budget immobilier | Villes accessibles selon votre budget',
  description: 'Découvrez dans quelles villes françaises vous pouvez investir selon votre budget et le type de bien recherché. Estimations basées sur données DVF.',
  keywords: ['budget immobilier', 'investissement', 'villes accessibles', 'prix immobilier France'],
}

export default function BudgetPage() {
  return (
    <Section>
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-10">
          <h1 className="text-neutral-900 mb-4">
            Où investir selon votre budget ?
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Visualisez les villes où vous pouvez potentiellement investir en fonction de votre budget et du type de bien recherché.
          </p>
        </div>

        <SimulateurBudget />

        {/* Méthodologie et avertissements */}
        <div className="mt-12 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Avertissement
            </h3>
            <ul className="text-sm text-amber-800 space-y-2">
              <li>• Ces résultats sont des <strong>estimations indicatives</strong> basées sur les prix médians observés.</li>
              <li>• Les prix réels varient selon le quartier, l'état du bien, l'étage, etc.</li>
              <li>• Ces données ne constituent pas un conseil en investissement.</li>
              <li>• Consultez toujours un professionnel avant tout achat immobilier.</li>
            </ul>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
            <h3 className="font-semibold text-neutral-900 mb-3">Méthodologie</h3>
            <div className="text-sm text-neutral-600 space-y-2">
              <p>
                <strong>Calcul de la surface accessible :</strong> Budget ÷ Prix médian au m² = Surface estimée
              </p>
              <p>
                <strong>Sources des prix :</strong> Données issues des transactions immobilières (DVF - Demandes de Valeurs Foncières)
                et estimations basées sur les moyennes régionales pour les villes sans données suffisantes.
              </p>
              <p>
                <strong>Surfaces minimales :</strong> Seules les villes permettant d'acquérir une surface minimale
                (studio de 20m² pour un appartement, T2 de 40m² pour une maison) sont affichées.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Guide de lecture</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Surface estimée :</strong> Surface théorique que vous pourriez acquérir avec votre budget
                au prix médian de la ville.
              </p>
              <p>
                <strong>Prix au m² :</strong> Prix médian observé pour le type de bien sélectionné.
                La mention "Estimation" indique un prix calculé à partir des moyennes régionales.
              </p>
              <p>
                <strong>Population :</strong> Nombre d'habitants, indicateur de la taille et du dynamisme de la ville.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
