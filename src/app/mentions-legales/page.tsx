import React from 'react'
import Section from '@/components/ui/Section'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Club House Immobilier.',
}

export default function MentionsLegalesPage() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-neutral-900 mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-neutral max-w-none space-y-8">
          {/* Éditeur */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              1. Éditeur du site
            </h2>
            <div className="text-neutral-600 space-y-2">
              <p className="m-0"><strong>Nom :</strong> Sébastien P.</p>
              <p className="m-0"><strong>Statut :</strong> Personne physique</p>
              <p className="m-0"><strong>Site web :</strong> www.clubhouseimmobilier.com</p>
              <p className="m-0 text-sm text-neutral-500 mt-4">
                Ce site est édité à titre personnel dans un but informatif.
                Il ne constitue pas une activité commerciale.
              </p>
            </div>
          </div>

          {/* Hébergement */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              2. Hébergement
            </h2>
            <div className="text-neutral-600 space-y-2">
              <p className="m-0"><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p className="m-0"><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p className="m-0"><strong>Site web :</strong> vercel.com</p>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              3. Propriété intellectuelle
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                L'ensemble des contenus présents sur ce site (textes, analyses, graphiques,
                mise en page, code source) est la propriété de l'éditeur, sauf mention contraire.
              </p>
              <p className="m-0">
                Toute reproduction, représentation, modification ou exploitation non autorisée
                de tout ou partie de ces éléments est interdite.
              </p>
              <p className="m-0">
                Les marques et logos éventuellement cités appartiennent à leurs propriétaires respectifs.
              </p>
            </div>
          </div>

          {/* Sources des données */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              4. Sources des données
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                Les données présentées sur ce site proviennent de sources publiques officielles :
              </p>
              <ul className="my-2 space-y-1">
                <li>INSEE (Institut National de la Statistique et des Études Économiques)</li>
                <li>DVF (Demandes de Valeurs Foncières) - data.gouv.fr</li>
                <li>Autres sources publiques mentionnées sur la page <Link href="/sources" className="text-primary-600 hover:text-primary-700">Sources</Link></li>
              </ul>
              <p className="m-0">
                Ces données sont fournies à titre informatif et ne sauraient engager
                la responsabilité de l'éditeur quant à leur exactitude ou leur exhaustivité.
              </p>
            </div>
          </div>

          {/* Responsabilité */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              5. Limitation de responsabilité
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                Les informations présentes sur ce site sont fournies à titre purement indicatif
                et ne constituent en aucun cas un conseil en investissement immobilier.
              </p>
              <p className="m-0">
                L'éditeur ne saurait être tenu responsable des décisions prises sur la base
                des informations présentées sur ce site. Toute décision d'investissement
                doit être prise après consultation de professionnels qualifiés.
              </p>
              <p className="m-0">
                L'éditeur s'efforce d'assurer l'exactitude des informations mais ne peut
                garantir l'absence d'erreurs ou d'omissions.
              </p>
            </div>
          </div>

          {/* Données personnelles */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              6. Données personnelles
            </h2>
            <div className="text-neutral-600">
              <p className="m-0">
                Pour toute information relative à la collecte et au traitement de vos données
                personnelles, veuillez consulter notre{' '}
                <Link href="/politique-confidentialite" className="text-primary-600 hover:text-primary-700">
                  Politique de confidentialité
                </Link>.
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              7. Cookies
            </h2>
            <div className="text-neutral-600 space-y-3">
              <p className="m-0">
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement.
                Pour plus d'informations, consultez notre{' '}
                <Link href="/politique-confidentialite" className="text-primary-600 hover:text-primary-700">
                  Politique de confidentialité
                </Link>.
              </p>
            </div>
          </div>

          {/* Droit applicable */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mt-0 mb-4">
              8. Droit applicable
            </h2>
            <div className="text-neutral-600">
              <p className="m-0">
                Les présentes mentions légales sont soumises au droit français.
                En cas de litige, les tribunaux français seront seuls compétents.
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
