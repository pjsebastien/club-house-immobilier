# Guide des Images - Club House Immobilier

## 📸 Images Nécessaires pour le Site

### 🎨 Priorité 1 : Identité Visuelle

#### Logo
- **Fichier** : `public/images/logo.svg` ou `logo.png`
- **Dimensions** : 200x200px minimum (SVG préféré)
- **Usage** : Header, Footer, favicon
- **Style** : Professionnel, épuré, symbole lié à l'immobilier/données
- **Couleurs** : Primary blue (#2563eb) + neutral

#### Favicon
- **Fichier** : `public/favicon.ico`
- **Dimensions** : 32x32px, 16x16px
- **Format** : .ico (multi-tailles) ou .png
- **Outil** : https://favicon.io/ ou https://realfavicongenerator.net/

#### Apple Touch Icon
- **Fichier** : `public/apple-touch-icon.png`
- **Dimensions** : 180x180px
- **Format** : PNG

---

### 🖼 Priorité 2 : Illustrations Home Page

#### Hero Section
- **Fichier** : `public/images/hero-illustration.svg` ou `hero-illustration.png`
- **Dimensions** : 800x600px (paysage)
- **Sujet** :
  - Carte de France stylisée avec points de données
  - Graphiques et analytics
  - Dashboard immobilier moderne
- **Style** : Flat design, minimaliste, couleurs cohérentes

#### Section "À qui s'adresse le site"
3 illustrations pour les profils :

1. **Débutants**
   - `public/images/investor-beginner.svg`
   - Personne avec loupe analysant des documents
   - 400x300px

2. **Expérimentés**
   - `public/images/investor-experienced.svg`
   - Personne avec multiples graphiques
   - 400x300px

3. **Curieux**
   - `public/images/analyst-curious.svg`
   - Personne explorant une carte interactive
   - 400x300px

#### Section "Les Outils"
6 icônes illustrées (optionnel, on utilise déjà des SVG inline) :

- `public/icons/tool-city-analysis.svg`
- `public/icons/tool-district-analysis.svg`
- `public/icons/tool-comparison.svg`
- `public/icons/tool-indicators.svg`
- `public/icons/tool-scores.svg`
- `public/icons/tool-filters.svg`

---

### 🏙 Priorité 3 : Pages de Contenu

#### Page Villes
- **Photos de villes françaises** (à ajouter plus tard)
- Format : 1200x800px
- Exemples : Paris, Lyon, Marseille, Bordeaux, etc.
- Source : Unsplash, Pexels (libres de droits)

#### Page Méthodologie
- `public/images/data-process.svg`
- Schéma du processus de traitement des données
- Style infographie

#### Page Sources
- Logos officiels :
  - `public/images/logo-insee.png`
  - `public/images/logo-etalab.png`
  - (télécharger depuis les sites officiels)

---

## 🌐 Sources d'Images Gratuites et Libres de Droits

### Illustrations & Icônes

**undraw.co** ⭐ Recommandé
- URL : https://undraw.co/illustrations
- Style : Flat design, personnalisable
- Format : SVG
- Licence : Open source
- Parfait pour : Hero, profils utilisateurs

**Storyset by Freepik** ⭐ Recommandé
- URL : https://storyset.com/
- Style : Moderne, coloré
- Format : SVG animé ou statique
- Licence : Gratuit avec attribution

**Heroicons**
- URL : https://heroicons.com/
- Icônes : 292 icônes SVG
- Style : Outline et solid
- Licence : MIT (libre)

**Lucide Icons**
- URL : https://lucide.dev/
- Icônes : 1000+ icônes
- Format : SVG
- Licence : ISC (libre)

### Photos

**Unsplash**
- URL : https://unsplash.com/
- Recherche : "french city", "paris", "architecture", "urban"
- Licence : Gratuit, usage commercial OK

**Pexels**
- URL : https://pexels.com/
- Similaire à Unsplash
- Licence : Gratuit

**Pixabay**
- URL : https://pixabay.com/
- Licence : Gratuit

---

## 🛠 Outils de Création

### Logo & Favicon

**Canva**
- URL : https://www.canva.com/
- Templates de logos professionnels
- Export SVG/PNG

**Figma**
- URL : https://www.figma.com/
- Design pro
- Gratuit pour usage personnel

**Favicon Generator**
- URL : https://favicon.io/
- Génère tous les formats nécessaires

### Optimisation d'Images

**TinyPNG**
- URL : https://tinypng.com/
- Compression PNG/JPG sans perte de qualité

**SVGOMG**
- URL : https://jakearchibald.github.io/svgomg/
- Optimisation SVG

---

## 📐 Dimensions Recommandées

| Type | Dimensions | Format | Poids Max |
|------|-----------|--------|-----------|
| Logo header | 200x60px | SVG/PNG | 50kb |
| Favicon | 32x32px | ICO/PNG | 10kb |
| Hero illustration | 800x600px | SVG/WebP | 200kb |
| Profil illustration | 400x300px | SVG/WebP | 100kb |
| Photo ville | 1200x800px | WebP/JPG | 300kb |
| Icône outil | 64x64px | SVG | 10kb |
| Open Graph | 1200x630px | JPG/PNG | 200kb |

---

## 🚀 Intégration dans Next.js

### Utilisation du Composant Image

```tsx
import Image from 'next/image'

// Image statique
<Image
  src="/images/hero-illustration.svg"
  alt="Analyse territoriale"
  width={800}
  height={600}
  priority // Pour le hero
/>

// Image responsive
<Image
  src="/images/paris.jpg"
  alt="Vue de Paris"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Optimisation Automatique

Next.js optimise automatiquement :
- Conversion en WebP
- Responsive images
- Lazy loading
- Blur placeholder

---

## 📋 Checklist Images à Ajouter

### Immédiat
- [ ] Logo principal (SVG)
- [ ] Favicon (32x32 + 16x16)
- [ ] Apple touch icon (180x180)
- [ ] Hero illustration

### Court terme
- [ ] 3 illustrations profils utilisateurs
- [ ] Image Open Graph (partage social)
- [ ] Image méthodologie

### Plus tard
- [ ] Photos de villes françaises
- [ ] Illustrations outils
- [ ] Graphiques et visualisations

---

## 🎨 Suggestions de Concepts Visuels

### Style Global
- **Minimaliste** : Épuré, beaucoup d'espace blanc
- **Data-driven** : Graphiques, cartes, analytics
- **Professionnel** : Pas de clipart, style moderne
- **Cohérent** : Palette de couleurs uniforme

### Palette pour Illustrations
- Primary : #2563eb (bleu)
- Secondary : #71717a (gris)
- Accent : #10b981 (vert pour indicateurs positifs)
- Warning : #f59e0b (orange pour attention)

### Exemples de Recherche Unsplash
```
"french architecture minimal"
"paris aerial view"
"data visualization"
"real estate modern"
"city skyline blue hour"
"urban planning"
```

---

## 🔧 Configuration Next.js pour Images

```js
// next.config.js
module.exports = {
  images: {
    domains: ['unsplash.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

---

## 📝 Notes Importantes

1. **Copyright** : Toujours vérifier les licences
2. **Attribution** : Créditer si nécessaire (footer)
3. **Optimisation** : Toujours compresser avant upload
4. **Alt text** : Crucial pour SEO et accessibilité
5. **Format** : Préférer SVG pour illustrations, WebP pour photos

---

## 🎯 Prochaines Actions

1. Créer/télécharger le logo
2. Générer le favicon
3. Télécharger 1-2 illustrations sur undraw.co
4. Les placer dans `public/images/`
5. Mettre à jour les composants avec les images

---

**Besoin d'aide pour choisir ou créer des images ? Consultez ce guide à chaque ajout visuel.**
