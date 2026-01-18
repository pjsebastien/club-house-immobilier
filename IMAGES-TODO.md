# TODO : Images à Créer/Ajouter

## ✅ Ce qui est déjà fait

- [x] Placeholder hero SVG avec animation (carte de France + graphiques)
- [x] Placeholder profil SVG
- [x] Favicon SVG basique (maison bleue)
- [x] Composant OptimizedImage créé
- [x] Hero Section mise à jour avec image
- [x] Configuration metadata avec icons

## 🎯 Actions Immédiates (Priorité 1)

### 1. Créer un Logo Professionnel

**Options :**

#### Option A : Design sur Canva (gratuit)
1. Aller sur https://www.canva.com/
2. Chercher "Logo immobilier" ou "Logo data"
3. Personnaliser avec :
   - Nom : "Club House Immobilier" ou "CHI"
   - Couleurs : #2563EB (bleu) + #18181B (noir)
   - Style : Minimal, moderne, data-driven
4. Télécharger en SVG (ou PNG 1000x300px)
5. Placer dans `public/images/logo.svg`

#### Option B : Design sur Figma (gratuit)
1. Aller sur https://www.figma.com/
2. Créer un nouveau fichier
3. Dessiner un logo simple :
   - Icône de maison + graphique
   - ou "CH" stylisé
   - ou Carte de France minimaliste
4. Export : SVG ou PNG transparent
5. Placer dans `public/images/logo.svg`

#### Option C : Générateur de Logo IA
1. Aller sur https://looka.com/ ou https://brandmark.io/
2. Entrer "Club House Immobilier"
3. Sélectionner style : Tech, Professional, Minimal
4. Générer et télécharger
5. Placer dans `public/images/logo.svg`

**Une fois créé :**
```tsx
// Mettre à jour dans src/components/layout/Header.tsx
<Image
  src="/images/logo.svg"
  alt="Club House Immobilier"
  width={180}
  height={50}
/>
```

---

### 2. Générer Favicon Multi-formats

**Utiliser Favicon Generator :**

1. Aller sur https://favicon.io/favicon-converter/
2. Upload votre logo (ou utiliser `public/favicon.svg`)
3. Générer tous les formats
4. Télécharger le package complet
5. Remplacer les fichiers dans `public/` :
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

**Ajouter au layout.tsx :**
```tsx
icons: {
  icon: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
  other: [
    { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2563eb' },
  ],
}
```

---

### 3. Télécharger Illustrations sur Undraw

**Pour la Hero Section :**

1. Aller sur https://undraw.co/illustrations
2. Rechercher : "data analysis", "real estate", "city", "analytics"
3. Choisir une illustration pertinente
4. Personnaliser la couleur : `#2563eb` (bleu primary)
5. Télécharger en SVG
6. Renommer en `hero-main.svg`
7. Placer dans `public/images/`

**Suggestions de mots-clés :**
- "data"
- "city"
- "real estate"
- "analytics"
- "map"
- "charts"
- "investment"

**Remplacer dans HeroSection.tsx :**
```tsx
src="/images/hero-main.svg" // au lieu de placeholder-hero.svg
```

---

### 4. Illustrations Profils (Optionnel)

**Télécharger 3 illustrations :**

1. **Investisseur débutant**
   - Recherche : "reading", "learning", "beginner"
   - Télécharger et renommer : `investor-beginner.svg`

2. **Investisseur expérimenté**
   - Recherche : "expert", "business", "analysis"
   - Télécharger et renommer : `investor-experienced.svg`

3. **Curieux / Analyste**
   - Recherche : "searching", "explorer", "curious"
   - Télécharger et renommer : `analyst-curious.svg`

**Mettre à jour AudienceSection.tsx :**
```tsx
<div className="relative w-32 h-32 mb-4">
  <Image
    src="/images/investor-beginner.svg"
    alt="Investisseur débutant"
    fill
    className="object-contain"
  />
</div>
```

---

## 📅 Actions Court Terme (Priorité 2)

### 5. Image Open Graph (Partage Social)

Créer une image 1200x630px pour le partage sur réseaux sociaux.

**Canva Template :**
1. Sur Canva, chercher "Open Graph" ou "Social Media Post"
2. Dimensions : 1200x630px
3. Design :
   - Logo en haut
   - Titre : "Club House Immobilier"
   - Sous-titre : "Analyse territoriale pour investisseurs"
   - Background : Dégradé bleu ou image carte France
4. Export PNG
5. Placer dans `public/images/og-image.png`

**Ajouter au layout.tsx :**
```tsx
openGraph: {
  images: ['/images/og-image.png'],
  // ...
}
```

---

### 6. Photos de Villes Françaises (Plus tard)

Quand vous développerez la page villes, télécharger des photos sur :

**Unsplash :**
- https://unsplash.com/s/photos/paris
- https://unsplash.com/s/photos/lyon
- https://unsplash.com/s/photos/bordeaux
- etc.

**Licence :** Gratuit, usage commercial OK

**Optimisation :**
1. Redimensionner à 1200x800px
2. Compresser sur https://tinypng.com/
3. Convertir en WebP si possible
4. Placer dans `public/images/cities/`

---

## 🔧 Outils Recommandés

### Design & Création
- **Canva** : https://www.canva.com/ (gratuit)
- **Figma** : https://www.figma.com/ (gratuit)
- **Looka** : https://looka.com/ (logo IA)

### Illustrations Gratuites
- **Undraw** : https://undraw.co/ ⭐ Top recommandé
- **Storyset** : https://storyset.com/
- **Humaaans** : https://www.humaaans.com/

### Icônes SVG
- **Heroicons** : https://heroicons.com/ (Next.js friendly)
- **Lucide** : https://lucide.dev/
- **Feather Icons** : https://feathericons.com/

### Photos Libres
- **Unsplash** : https://unsplash.com/ ⭐
- **Pexels** : https://pexels.com/
- **Pixabay** : https://pixabay.com/

### Optimisation
- **TinyPNG** : https://tinypng.com/ (PNG/JPG)
- **SVGOMG** : https://jakearchibald.github.io/svgomg/ (SVG)
- **Squoosh** : https://squoosh.app/ (tous formats)

### Favicon
- **Favicon.io** : https://favicon.io/ ⭐
- **RealFaviconGenerator** : https://realfavicongenerator.net/

---

## 📋 Checklist Finale

### Essentiel (À faire maintenant)
- [ ] Créer logo principal (SVG/PNG)
- [ ] Générer favicons multi-formats
- [ ] Télécharger 1 illustration hero sur Undraw
- [ ] Mettre à jour Header avec vrai logo
- [ ] Tester favicon dans navigateur

### Optionnel (Amélioration)
- [ ] 3 illustrations profils
- [ ] Image Open Graph 1200x630
- [ ] Ajouter illustrations aux sections
- [ ] Créer une version dark du logo

### Plus tard (Avec données)
- [ ] Photos de villes françaises (20-30 photos)
- [ ] Screenshots d'interfaces
- [ ] Graphiques et visualisations
- [ ] Icônes custom pour outils

---

## 💡 Conseils

1. **Commencez simple** : Logo + Favicon + 1 illustration hero suffisent pour commencer
2. **Cohérence visuelle** : Gardez la même palette de couleurs (#2563EB partout)
3. **Optimisez toujours** : Compressez avant d'ajouter au projet
4. **SVG first** : Préférez SVG pour logos et illustrations (scalable + léger)
5. **Alt text** : N'oubliez jamais les descriptions pour l'accessibilité

---

## 🚀 Temps Estimé

- Logo + Favicon : **30-45 minutes**
- Illustrations Undraw : **15 minutes**
- Configuration : **10 minutes**

**Total : ~1 heure pour avoir un site visuellement complet**

---

**Commencez par le logo et le favicon, c'est le plus important pour la crédibilité du site !**
