import React from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

/**
 * Footer - Composant footer avec liens de navigation et avertissements
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigationLinks = {
    explorer: [
      { href: '/villes', label: 'Villes' },
      { href: '/quartiers', label: 'Quartiers' },
      { href: '/investir', label: 'Investir' },
      { href: '/outils', label: 'Outils' },
    ],
    ressources: [
      { href: '/methodologie', label: 'Méthodologie' },
      { href: '/sources', label: 'Sources de données' },
    ],
    legal: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
    ],
  }

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container>
        {/* Avertissement Editorial */}
        <div className="py-12 border-b border-neutral-800">
          <div className="max-w-4xl">
            <h3 className="text-white font-semibold text-lg mb-4">
              Avertissement
            </h3>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                Club House Immobilier est un outil d'aide à la décision basé sur l'analyse de données publiques officielles.
                Les informations présentées sur ce site ne constituent en aucun cas des recommandations d'investissement,
                des conseils personnalisés ou des notations officielles de territoires.
              </p>
              <p>
                Chaque projet d'investissement immobilier comporte des risques et doit faire l'objet d'une analyse
                personnalisée tenant compte de votre situation, de vos objectifs et de votre tolérance au risque.
                Nous vous recommandons de consulter des professionnels qualifiés avant toute décision d'investissement.
              </p>
              <p>
                Les données présentées proviennent de sources officielles (INSEE, DVF/Etalab) et sont traitées
                de manière neutre et transparente. Elles constituent un support d'analyse parmi d'autres éléments
                à prendre en considération dans votre réflexion.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CH</span>
              </div>
              <span className="text-white font-semibold">
                Club House<br />Immobilier
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Analyse territoriale et outils d'aide à la décision pour investisseurs immobiliers.
            </p>
          </div>

          {/* Explorer */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explorer</h4>
            <ul className="space-y-3">
              {navigationLinks.explorer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <ul className="space-y-3">
              {navigationLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-3">
              {navigationLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-400">
              © {currentYear} Club House Immobilier. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <span>Sources : INSEE, DVF/Etalab</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
