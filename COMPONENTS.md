# Guide des Composants

Documentation complète des composants UI réutilisables du projet.

---

## 🎨 Composants UI de Base

### Button

**Localisation** : [src/components/ui/Button.tsx](src/components/ui/Button.tsx)

Bouton polyvalent avec support lien et plusieurs variants.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu du bouton (requis) |
| `href` | `string` | - | URL pour transformer en lien |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Style du bouton |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `onClick` | `() => void` | - | Callback click (mode bouton) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Type HTML |

#### Exemples

```tsx
// Bouton lien primary (défaut)
<Button href="/villes">Explorer les villes</Button>

// Bouton outline large
<Button href="/outils" variant="outline" size="lg">
  Découvrir les outils
</Button>

// Bouton avec action
<Button
  variant="secondary"
  onClick={() => console.log('clicked')}
>
  Action
</Button>
```

#### Variants

- **primary** : Fond bleu, texte blanc (action principale)
- **secondary** : Fond noir, texte blanc (action secondaire)
- **outline** : Bordure noire, texte noir, fond transparent

---

### Card

**Localisation** : [src/components/ui/Card.tsx](src/components/ui/Card.tsx)

Carte avec bordure, ombre et effet hover optionnel.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu de la carte (requis) |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `hover` | `boolean` | `false` | Active l'effet hover |

#### Exemples

```tsx
// Carte simple
<Card>
  <h3>Titre</h3>
  <p>Contenu de la carte</p>
</Card>

// Carte avec effet hover
<Card hover>
  <h3>Ville de Paris</h3>
  <p>Population : 2.2M habitants</p>
</Card>

// Carte avec classes personnalisées
<Card className="bg-primary-50 border-primary-200">
  <p>Carte avec fond coloré</p>
</Card>
```

---

### Container

**Localisation** : [src/components/ui/Container.tsx](src/components/ui/Container.tsx)

Wrapper pour centrer et limiter la largeur du contenu.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu (requis) |
| `className` | `string` | `''` | Classes CSS additionnelles |

#### Exemples

```tsx
// Container de base
<Container>
  <h1>Mon contenu centré</h1>
</Container>

// Container avec padding
<Container className="py-12">
  <p>Contenu avec padding vertical</p>
</Container>
```

#### Styles Appliqués

- `max-width: 1280px` (responsive)
- `margin: 0 auto` (centrage)
- `padding: 0 1rem` (mobile) → `0 2rem` (desktop)

---

### Section

**Localisation** : [src/components/ui/Section.tsx](src/components/ui/Section.tsx)

Section de page avec padding vertical automatique et Container intégré.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu (requis) |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `background` | `'white' \| 'gray'` | `'white'` | Couleur de fond |
| `id` | `string` | - | ID HTML pour ancres |

#### Exemples

```tsx
// Section fond blanc (défaut)
<Section>
  <h2>Ma Section</h2>
  <p>Contenu de la section</p>
</Section>

// Section fond gris
<Section background="gray">
  <h2>Section Alternative</h2>
</Section>

// Section avec ID pour navigation
<Section id="outils" background="gray">
  <h2>Nos Outils</h2>
</Section>
```

#### Styles Appliqués

- Padding vertical : `4rem` (mobile) → `8rem` (desktop)
- Container intégré automatiquement
- Background : `white` ou `neutral-50`

---

## 🏗 Composants Layout

### Header

**Localisation** : [src/components/layout/Header.tsx](src/components/layout/Header.tsx)

Header sticky avec navigation responsive.

#### Fonctionnalités

- Navigation principale avec liens
- Menu hamburger sur mobile
- Effet sticky au scroll
- Logo cliquable
- CTA "Explorer" mis en avant

#### Navigation

Éditez le tableau `navLinks` pour modifier les liens :

```tsx
const navLinks = [
  { href: '/villes', label: 'Villes' },
  { href: '/quartiers', label: 'Quartiers' },
  // Ajoutez vos liens ici
]
```

---

### Footer

**Localisation** : [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)

Footer complet avec avertissement, navigation et mentions légales.

#### Sections

1. **Avertissement éditorial** : Disclaimer légal important
2. **Navigation** : 4 colonnes (Brand, Explorer, Ressources, Légal)
3. **Bottom bar** : Copyright et sources

#### Personnalisation

Les liens sont organisés par catégories dans l'objet `navigationLinks` :

```tsx
const navigationLinks = {
  explorer: [...],
  ressources: [...],
  legal: [...],
}
```

---

## 📄 Composants Sections (Home Page)

### HeroSection

**Localisation** : [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx)

Section hero avec titre principal, sous-titre et CTAs.

#### Structure

- H1 principal (bénéfice utilisateur)
- Sous-titre explicatif
- 2 CTAs (primary + outline)
- Trust indicators (sources de données)

---

### AudienceSection

**Localisation** : [src/components/sections/AudienceSection.tsx](src/components/sections/AudienceSection.tsx)

Présentation des 3 profils cibles.

#### Structure

- Titre de section
- 3 cartes (grid responsive)
- Chaque carte : icône, titre, description

---

### ToolsSection

**Localisation** : [src/components/sections/ToolsSection.tsx](src/components/sections/ToolsSection.tsx)

Présentation des 6 outils d'analyse.

#### Structure

- Titre de section
- 6 cartes (grid 3 colonnes desktop)
- Chaque carte : icône, titre, description
- Note de bas de page (développement futur)

---

### HowItWorksSection

**Localisation** : [src/components/sections/HowItWorksSection.tsx](src/components/sections/HowItWorksSection.tsx)

Processus en 4 étapes.

#### Structure

- Titre de section
- 4 étapes numérotées (01, 02, 03, 04)
- Connecteurs visuels entre les étapes (desktop)
- Info box en bas (aucun compte requis)

---

### ResponsibleApproachSection

**Localisation** : [src/components/sections/ResponsibleApproachSection.tsx](src/components/sections/ResponsibleApproachSection.tsx)

Principes éthiques et approche responsable.

#### Structure

- Titre de section
- 4 cartes de principes (grid 2 colonnes)
- Card d'avertissement important (fond coloré)

---

## 🎨 Conventions de Style

### Spacing

Utilisez les classes Tailwind standards :

- **Marges** : `m-4`, `mt-8`, `mb-12`, etc.
- **Padding** : `p-4`, `px-6`, `py-8`, etc.
- **Gaps** : `gap-4`, `gap-8`, etc.

### Typography

```tsx
// Titres
<h1 className="text-4xl md:text-5xl lg:text-6xl">

// Paragraphes
<p className="text-lg text-neutral-600 leading-relaxed">

// Petit texte
<p className="text-sm text-neutral-500">
```

### Responsive

Utilisez les breakpoints Tailwind :

```tsx
// Mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Cacher sur mobile
<div className="hidden md:block">

// Espacement responsive
<div className="py-8 md:py-16 lg:py-24">
```

---

## 🔧 Créer un Nouveau Composant

### Template

```tsx
import React from 'react'

interface MonComposantProps {
  // Définir les props ici
  title: string
  children?: React.ReactNode
}

/**
 * MonComposant - Description courte du composant
 */
export default function MonComposant({ title, children }: MonComposantProps) {
  return (
    <div className="/* classes Tailwind */">
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

### Bonnes Pratiques

1. **Props typées** avec TypeScript
2. **Documentation JSDoc** en haut du composant
3. **Props par défaut** quand pertinent
4. **Composition** : Préférer les composants composables
5. **Responsive by default** : Mobile first

---

## 📚 Ressources

- [React Documentation](https://react.dev)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Dernière mise à jour** : Janvier 2026
