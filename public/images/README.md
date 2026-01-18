# Images du Projet

## 📁 Contenu Actuel

### ✅ Images Disponibles

- **placeholder-hero.svg** - Illustration temporaire pour la hero section (carte + graphiques animés)
- **placeholder-profile.svg** - Illustration temporaire pour les profils utilisateurs

### 🔄 À Remplacer avec Vos Images

Ces placeholders SVG animés sont là pour le développement. Remplacez-les par vos vraies images :

1. **Logo principal**
   - Nom suggéré : `logo.svg` ou `logo.png`
   - Dimensions : 200x60px minimum
   - Format : SVG (préféré) ou PNG transparent

2. **Hero illustration**
   - Nom suggéré : `hero-main.svg` ou `hero-main.png`
   - Dimensions : 800x600px
   - Sujet : Analyse territoriale, carte de France, data visualization

3. **Illustrations profils** (optionnel)
   - `investor-beginner.svg`
   - `investor-experienced.svg`
   - `analyst-curious.svg`
   - Dimensions : 400x300px chacune

## 🎨 Sources Recommandées

### Pour télécharger des illustrations gratuites :

1. **undraw.co** ⭐
   - https://undraw.co/illustrations
   - Rechercher : "data", "analytics", "real estate", "city"
   - Personnaliser la couleur : #2563eb (bleu primary)

2. **Storyset**
   - https://storyset.com/
   - Catégories : Business, Technology, Real Estate

3. **Lukasz Adam (Figma)**
   - https://www.figma.com/community
   - Rechercher : "isometric city" ou "data illustration"

## 📋 Checklist

- [x] Placeholder hero créé (SVG animé)
- [x] Placeholder profil créé
- [ ] Logo principal à créer/ajouter
- [ ] Favicon PNG à générer
- [ ] Apple touch icon à générer
- [ ] Hero illustration finale
- [ ] Photos de villes (plus tard)

## 🔧 Comment Utiliser

### Avec Next.js Image (recommandé)

```tsx
import Image from 'next/image'

<Image
  src="/images/hero-main.svg"
  alt="Analyse territoriale"
  width={800}
  height={600}
  priority
/>
```

### Avec le composant OptimizedImage

```tsx
import OptimizedImage from '@/components/ui/OptimizedImage'

<OptimizedImage
  src="/images/hero-main.svg"
  alt="Analyse territoriale"
  width={800}
  height={600}
  priority
/>
```

## 📏 Guidelines

- **Format** : SVG pour illustrations, WebP/JPG pour photos
- **Poids** : Max 200kb par image
- **Optimisation** : Utiliser TinyPNG ou SVGOMG avant upload
- **Alt text** : Toujours ajouter une description pour l'accessibilité
- **Naming** : kebab-case (hero-main.svg, investor-beginner.svg)

## 🚀 Optimisation

Avant d'ajouter une image :

1. **Compresser** : https://tinypng.com/ (PNG/JPG) ou https://jakearchibald.github.io/svgomg/ (SVG)
2. **Redimensionner** si nécessaire
3. **Vérifier le poids** (< 200kb)
4. **Ajouter** dans ce dossier
5. **Mettre à jour** le composant correspondant

---

**Note** : Les placeholders actuels sont parfaits pour le développement. Prenez le temps de trouver/créer des images de qualité pour la production.
