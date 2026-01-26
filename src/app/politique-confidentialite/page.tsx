import React from 'react'
import Section from '@/components/ui/Section'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles de Club House Immobilier.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-neutral-900 mb-8">
          Politique de confidentialité
        </h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          {/* Introduction */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
            <p className="text-primary-900 m-0">
              La protection de vos données personnelles est importante pour nous.
              Cette politique explique comment nous collectons, utilisons et protégeons
              vos informations conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>

          {/* Responsable du traitement */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              1. Responsable du traitement
            </h2>
            <div className="text-neutral-600 space-y-2">
              <p className="m-0"><strong>Nom :</strong> Sébastien P.</p>
              <p className="m-0"><strong>Site web :</strong> www.clubhouseimmobilier.com</p>
              <p className="m-0 mt-3">
                Pour toute question relative à vos données personnelles, vous pouvez nous contacter
                via les mentions légales du site.
              </p>
            </div>
          </div>

          {/* Données collectées */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              2. Données collectées
            </h2>
            <div className="text-neutral-600 space-y-4">
              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Données de navigation</h3>
                <p className="m-0">
                  Lors de votre visite, des données techniques peuvent être collectées automatiquement :
                </p>
                <ul className="my-2 space-y-1">
                  <li>Adresse IP (anonymisée)</li>
                  <li>Type de navigateur et système d'exploitation</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Source de la visite (moteur de recherche, lien direct)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Données fournies volontairement</h3>
                <p className="m-0">
                  Ce site ne dispose pas de formulaire de contact ni de système d'inscription.
                  Aucune donnée personnelle n'est collectée directement auprès des utilisateurs.
                </p>
              </div>
            </div>
          </div>

          {/* Finalités */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              3. Finalités du traitement
            </h2>
            <div className="text-neutral-600">
              <p className="m-0 mb-3">Les données collectées sont utilisées pour :</p>
              <ul className="my-0 space-y-2">
                <li>
                  <strong>Améliorer le site :</strong> comprendre comment les visiteurs utilisent le site
                  pour en améliorer le contenu et l'ergonomie
                </li>
                <li>
                  <strong>Statistiques anonymes :</strong> mesurer l'audience du site de manière agrégée
                </li>
                <li>
                  <strong>Sécurité :</strong> détecter et prévenir les activités frauduleuses ou malveillantes
                </li>
              </ul>
            </div>
          </div>

          {/* Base légale */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              4. Base légale du traitement
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                <strong>Intérêt légitime :</strong> l'analyse des statistiques de fréquentation
                permet d'améliorer le service proposé aux utilisateurs.
              </p>
              <p className="m-0">
                <strong>Consentement :</strong> pour les cookies non essentiels, votre consentement
                est recueilli via la bannière de cookies lors de votre première visite.
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              5. Cookies
            </h2>
            <div className="text-neutral-600 space-y-4">
              <p className="m-0">
                Les cookies sont de petits fichiers texte stockés sur votre appareil
                lors de votre visite sur un site web.
              </p>

              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Cookies essentiels</h3>
                <p className="m-0">
                  Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés :
                </p>
                <ul className="my-2 space-y-1">
                  <li><code className="text-sm bg-neutral-100 px-1 rounded">cookie_consent</code> : mémorise votre choix concernant les cookies</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Cookies analytiques</h3>
                <p className="m-0">
                  Si vous les acceptez, ces cookies nous permettent de mesurer l'audience du site :
                </p>
                <ul className="my-2 space-y-1">
                  <li>Nombre de visiteurs</li>
                  <li>Pages les plus consultées</li>
                  <li>Parcours de navigation</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Gestion des cookies</h3>
                <p className="m-0">
                  Vous pouvez à tout moment modifier vos préférences en supprimant les cookies
                  de votre navigateur. La bannière de consentement réapparaîtra lors de votre prochaine visite.
                </p>
              </div>
            </div>
          </div>

          {/* Conservation */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              6. Durée de conservation
            </h2>
            <div className="text-neutral-600">
              <ul className="my-0 space-y-2">
                <li><strong>Cookies de consentement :</strong> 12 mois</li>
                <li><strong>Données de navigation :</strong> 26 mois maximum</li>
                <li><strong>Statistiques agrégées :</strong> conservées indéfiniment (données anonymisées)</li>
              </ul>
            </div>
          </div>

          {/* Partage des données */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              7. Partage des données
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                Vos données ne sont pas vendues ni louées à des tiers.
              </p>
              <p className="m-0">
                Elles peuvent être partagées avec :
              </p>
              <ul className="my-2 space-y-1">
                <li><strong>Vercel :</strong> hébergeur du site (États-Unis, conforme au RGPD)</li>
              </ul>
              <p className="m-0">
                En cas de transfert hors UE, des garanties appropriées sont mises en place
                (clauses contractuelles types de la Commission européenne).
              </p>
            </div>
          </div>

          {/* Vos droits */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              8. Vos droits
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="my-2 space-y-2">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> restreindre le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              </ul>
              <p className="m-0">
                Pour exercer ces droits, contactez-nous via les coordonnées indiquées
                dans les <Link href="/mentions-legales" className="text-primary-600 hover:text-primary-700">mentions légales</Link>.
              </p>
              <p className="m-0">
                Vous pouvez également introduire une réclamation auprès de la CNIL
                (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">www.cnil.fr</a>
              </p>
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              9. Sécurité des données
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
                pour protéger vos données :
              </p>
              <ul className="my-2 space-y-1">
                <li>Connexion sécurisée HTTPS</li>
                <li>Hébergement sur infrastructure sécurisée (Vercel)</li>
                <li>Accès limité aux données</li>
              </ul>
            </div>
          </div>

          {/* Modifications */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              10. Modifications de la politique
            </h2>
            <div className="text-neutral-600">
              <p className="m-0">
                Cette politique de confidentialité peut être mise à jour périodiquement.
                La date de dernière mise à jour est indiquée en bas de page.
                Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </div>
          </div>

          {/* Date de mise à jour */}
          <p className="text-sm text-neutral-500 text-center mt-8">
            Dernière mise à jour : Janvier 2025
          </p>
        </div>
      </div>
    </Section>
  )
}
