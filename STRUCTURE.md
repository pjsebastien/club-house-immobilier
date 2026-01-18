# Structure du Projet Club House Immobilier

## 📐 Architecture Globale

Le projet suit l'architecture Next.js App Router avec une séparation claire entre pages, composants et logique.

## 📂 Détail des Dossiers

### `/src/app` - Pages et Routes

Chaque dossier dans `/src/app` correspond à une route de l'application.

```
src/app/
├── layout.tsx                       # Layout racine avec Header/Footer
├── page.tsx                         # Home page (/)
├── globals.css                      # Styles globaux + Tailwind
│
├── villes/                          # Route /villes
│   └── page.tsx                     # Page d'exploration des villes
│
├── quartiers/                       # Route /quartiers
│   └── page.tsx                     # Page d'exploration des quartiers
│
├── investir/                        # Route /investir
│   └── page.tsx                     # Page ressources investissement
│
├── outils/                          # Route /outils
│   └── page.tsx                     # Page outils d'analyse
│
├── methodologie/                    # Route /methodologie
│   └── page.tsx                     # Page méthodologie détaillée
│
├── sources/                         # Route /sources
│   └── page.tsx                     # Page sources de données
│
├── mentions-legales/                # Route /mentions-legales
│   └── page.tsx                     # Mentions légales
│
└── politique-confidentialite/       # Route /politique-confidentialite
    └── page.tsx                     # Politique de confidentialité
```

### `/src/components` - Composants React

Organisation par catégorie de composants.

```
src/components/
│
├── layout/                          # Composants de mise en page
│   ├── Header.tsx                   # Header avec navigation
│   └── Footer.tsx                   # Footer avec liens et avertissements
│
├── ui/                              # Composants UI réutilisables
│   ├── Button.tsx                   # Bouton avec variants (primary, secondary, outline)
│   ├── Card.tsx                     # Carte avec effet hover optionnel
│   ├── Container.tsx                # Container pour centrer le contenu
│   └── Section.tsx                  # Section wrapper avec padding
│
└── sections/                        # Sections de la home page
    ├── HeroSection.tsx              # Hero avec titre, sous-titre et CTAs
    ├── AudienceSection.tsx          # "À qui s'adresse le site"
    ├── ToolsSection.tsx             # Présentation des outils
    ├── HowItWorksSection.tsx        # "Comment ça marche" - 4 étapes
    └── ResponsibleApproachSection.tsx  # Approche responsable et éthique
```

## 🎨 Design System

### Composants UI

#### **Button**
```tsx
<Button href="/villes" variant="primary" size="lg">
  Explorer les villes
</Button>
```
- **Variants** : `primary` (bleu), `secondary` (noir), `outline` (bordure)
- **Sizes** : `sm`, `md`, `lg`
- Support lien interne (href) ou bouton (onClick)

#### **Card**
```tsx
<Card hover>
  {/* Contenu */}
</Card>
```
- Bordure et ombre subtile
- Option `hover` pour effet au survol

#### **Container**
```tsx
<Container className="py-12">
  {/* Contenu centré et limité en largeur */}
</Container>
```
- Centrage automatique
- Padding horizontal responsive

#### **Section**
```tsx
<Section background="gray" id="tools">
  {/* Contenu */}
</Section>
```
- Wrapper pour sections de page
- Backgrounds : `white` ou `gray`
- Padding vertical automatique

### Couleurs

- **Primary** : Bleu
  - `primary-600` : #2563eb (principal)
  - `primary-700` : #1d4ed8 (hover)
  - `primary-50` : #eff6ff (backgrounds)

- **Neutral** : Gris
  - `neutral-900` : #18181b (texte principal)
  - `neutral-600` : #52525b (texte secondaire)
  - `neutral-50` : #fafafa (backgrounds clairs)

### Typographie

- **Font** : Inter (Google Fonts)
- **Headings** : Font-semibold, tracking-tight
- **Responsive** : Tailles adaptatives (text-4xl md:text-5xl lg:text-6xl)

## 🧩 Structure de la Home Page

La home page est composée de 5 sections principales :

1. **HeroSection** - Message principal et CTAs
2. **AudienceSection** - 3 profils cibles (cartes)
3. **ToolsSection** - 6 outils présentés
4. **HowItWorksSection** - 4 étapes du processus
5. **ResponsibleApproachSection** - Principes éthiques

Chaque section est un composant autonome importé dans `/src/app/page.tsx`.

## 🔧 Configuration

### Tailwind (`tailwind.config.js`)

- Palette de couleurs personnalisée (primary, neutral)
- Font family avec variable CSS
- Scan des fichiers dans `src/`

### TypeScript (`tsconfig.json`)

- Mode strict activé
- Path aliases : `@/*` → `./src/*`
- Support JSX preserve pour Next.js

### Next.js (`next.config.js`)

- React Strict Mode activé
- Configuration minimale pour l'instant

## 📱 Responsive Design

Tous les composants sont responsive par défaut :

- **Mobile first** : Base styles pour mobile
- **Breakpoints Tailwind** :
  - `sm:` 640px
  - `md:` 768px
  - `lg:` 1024px
  - `xl:` 1280px

## 🎯 Conventions de Code

### Naming

- **Composants** : PascalCase (`Button.tsx`, `HeroSection.tsx`)
- **Fichiers utils** : camelCase
- **CSS classes** : kebab-case (Tailwind)

### Structure de Composant

```tsx
import React from 'react'
import { Metadata } from 'next' // Pour les pages

export const metadata: Metadata = { /* ... */ } // Pages uniquement

interface ComponentProps {
  // Props typées
}

/**
 * ComponentName - Description courte
 */
export default function ComponentName({ props }: ComponentProps) {
  return (
    // JSX
  )
}
```

### Commentaires

- JSDoc pour les composants principaux
- Commentaires inline pour la logique complexe
- Props documentées via TypeScript

## 🚀 Commandes Utiles

```bash
# Développement
npm run dev              # Lance le serveur de dev (port 3000)

# Production
npm run build            # Compile le projet
npm start                # Lance en mode production

# Qualité
npm run lint             # Vérification ESLint
```

## 📦 Prochaines Étapes Techniques

1. **Intégration données** : API routes pour INSEE/DVF
2. **Recherche** : Composant de recherche avec autocomplete
3. **Filtres** : Système de filtres avancés
4. **Visualisations** : Intégration de charts (Chart.js, Recharts)
5. **Performance** : Optimisation images, lazy loading
6. **SEO** : Sitemap, robots.txt, structured data
7. **Tests** : Jest + React Testing Library

## 🔐 Sécurité & Conformité

- [ ] Finaliser mentions légales
- [ ] Finaliser politique RGPD
- [ ] Cookie consent banner
- [ ] Variables d'environnement sécurisées
- [ ] Rate limiting API (future)

---

**Note** : Cette structure est évolutive et sera enrichie au fur et à mesure du développement.
