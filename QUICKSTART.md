# Guide de Démarrage Rapide

## 🚀 Lancer le Projet en 3 Minutes

### 1. Installation

```bash
cd clubhouseimmo
npm install
```

### 2. Lancement

```bash
npm run dev
```

Le site est accessible sur **http://localhost:3000**

### 3. Navigation

Explorez les pages disponibles :

- **/** - Home page complète
- **/villes** - Exploration des villes (squelette)
- **/quartiers** - Exploration des quartiers (squelette)
- **/outils** - Outils d'analyse (squelette)
- **/investir** - Ressources investissement (squelette)
- **/methodologie** - Méthodologie détaillée ✅
- **/sources** - Sources de données ✅

---

## 🎨 Modifier le Design

### Couleurs

Éditez [tailwind.config.js](tailwind.config.js) :

```js
colors: {
  primary: {
    600: '#2563eb', // Couleur principale
    700: '#1d4ed8', // Hover
    // ...
  }
}
```

### Typographie

Changez la font dans [src/app/layout.tsx](src/app/layout.tsx) :

```tsx
import { Inter } from 'next/font/google'
// Remplacez Inter par une autre font Google
```

---

## ✏️ Ajouter du Contenu

### Modifier la Home Page

Éditez les sections dans [src/components/sections/](src/components/sections/) :

- `HeroSection.tsx` - Titre et CTAs
- `AudienceSection.tsx` - Profils cibles
- `ToolsSection.tsx` - Liste des outils
- `HowItWorksSection.tsx` - Processus en 4 étapes
- `ResponsibleApproachSection.tsx` - Approche éthique

### Ajouter une Nouvelle Page

1. Créez un dossier dans `src/app/` :
```bash
mkdir src/app/ma-page
```

2. Créez `src/app/ma-page/page.tsx` :
```tsx
import Section from '@/components/ui/Section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ma Page',
  description: 'Description de ma page',
}

export default function MaPage() {
  return (
    <Section>
      <h1>Ma Page</h1>
      <p>Contenu de ma page</p>
    </Section>
  )
}
```

3. Ajoutez le lien dans le Header (`src/components/layout/Header.tsx`) :
```tsx
const navLinks = [
  // ...
  { href: '/ma-page', label: 'Ma Page' },
]
```

---

## 🧩 Utiliser les Composants UI

### Button

```tsx
import Button from '@/components/ui/Button'

<Button href="/villes" variant="primary" size="lg">
  Explorer
</Button>
```

### Card

```tsx
import Card from '@/components/ui/Card'

<Card hover>
  <h3>Titre de la carte</h3>
  <p>Contenu de la carte</p>
</Card>
```

### Section

```tsx
import Section from '@/components/ui/Section'

<Section background="gray">
  {/* Votre contenu */}
</Section>
```

---

## 📱 Test Responsive

Le design est optimisé pour :

- 📱 **Mobile** : < 768px
- 💻 **Tablet** : 768px - 1024px
- 🖥 **Desktop** : > 1024px

Testez avec les DevTools de votre navigateur (F12 > Toggle Device Toolbar).

---

## 🔧 Commandes Essentielles

```bash
# Développement
npm run dev              # Mode développement avec hot-reload

# Production
npm run build            # Compile le projet optimisé
npm start                # Lance la version de production

# Code quality
npm run lint             # Vérifie le code avec ESLint
```

---

## 📦 Prochaines Étapes Suggérées

### Phase 1 : Contenu Statique
- [ ] Compléter les mentions légales
- [ ] Compléter la politique de confidentialité
- [ ] Enrichir la page /investir avec du contenu
- [ ] Ajouter des illustrations / icônes personnalisées

### Phase 2 : Données Mockées
- [ ] Créer des données mockées de villes
- [ ] Créer un composant de liste de villes
- [ ] Créer une page de détail ville
- [ ] Ajouter des graphiques (Chart.js, Recharts)

### Phase 3 : Données Réelles
- [ ] Configurer l'API INSEE
- [ ] Configurer l'API DVF
- [ ] Créer les API routes Next.js
- [ ] Intégrer les vraies données

### Phase 4 : Fonctionnalités Avancées
- [ ] Système de recherche
- [ ] Filtres avancés
- [ ] Comparateur de territoires
- [ ] Export de rapports PDF

---

## 🆘 Besoin d'Aide ?

### Structure du Projet
Consultez [STRUCTURE.md](STRUCTURE.md) pour une vue détaillée de l'architecture.

### Documentation Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Routing](https://nextjs.org/docs/app/building-your-application/routing)

### Documentation Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Utility Classes](https://tailwindcss.com/docs/utility-first)

---

**Note** : Ce projet est conçu pour être évolutif. Commencez simple et enrichissez progressivement.

Bon développement ! 🚀
