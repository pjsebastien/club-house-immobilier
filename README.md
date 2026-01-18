# Club House Immobilier

Site d'analyse territoriale et d'aide à la décision pour investisseurs immobiliers.

## 🎯 Objectif

Club House Immobilier aide les investisseurs immobiliers à analyser et comparer les villes et quartiers français afin d'identifier les territoires cohérents pour leurs projets d'investissement.

## 🛠 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Déploiement** : Vercel (recommandé)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Lancer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
clubhouseimmo/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── villes/            # Page exploration villes
│   │   ├── quartiers/         # Page exploration quartiers
│   │   ├── investir/          # Page ressources investissement
│   │   ├── outils/            # Page outils d'analyse
│   │   ├── methodologie/      # Page méthodologie
│   │   ├── sources/           # Page sources de données
│   │   ├── mentions-legales/  # Mentions légales
│   │   ├── politique-confidentialite/
│   │   ├── layout.tsx         # Layout global
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Styles globaux
│   │
│   └── components/
│       ├── layout/            # Composants de layout
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       ├── ui/                # Composants UI réutilisables
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   ├── Container.tsx
│       │   └── Section.tsx
│       └── sections/          # Sections de la home page
│           ├── HeroSection.tsx
│           ├── AudienceSection.tsx
│           ├── ToolsSection.tsx
│           ├── HowItWorksSection.tsx
│           └── ResponsibleApproachSection.tsx
│
├── public/                    # Assets statiques
├── tailwind.config.js         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── next.config.js             # Configuration Next.js
```

## 🎨 Design System

### Couleurs

- **Primary** : Bleu (#2563eb - primary-600)
- **Neutral** : Gris (#71717a - neutral-500)
- **Backgrounds** : Blanc et gris clair

### Typographie

- Font : Inter (Google Fonts)
- Hiérarchie claire avec tailles responsive

### Composants

- **Button** : 3 variants (primary, secondary, outline)
- **Card** : Avec effet hover optionnel
- **Section** : Wrapper pour les sections de page
- **Container** : Centrage et limitation de largeur

## 📄 Pages Actuelles

### ✅ Complètes

- **/** : Home page avec toutes les sections
- **/methodologie** : Explication de l'approche
- **/sources** : Présentation des sources de données

### 🚧 Squelettes (à enrichir avec données)

- **/villes** : Exploration des villes
- **/quartiers** : Exploration des quartiers
- **/investir** : Ressources investissement
- **/outils** : Outils d'analyse
- **/mentions-legales** : À compléter
- **/politique-confidentialite** : À compléter

## 🔄 Prochaines Étapes

1. Intégration des données réelles (INSEE, DVF)
2. Développement des outils d'analyse
3. Système de recherche et filtres
4. Graphiques et visualisations
5. Système de comparaison de territoires
6. Optimisation SEO avancée
7. Tests et validation

## 📊 Sources de Données

- **INSEE** : Données démographiques, économiques et sociales
- **DVF / Etalab** : Transactions immobilières

## ⚖️ Avertissement

Ce site est un outil d'aide à la décision. Il ne fournit aucune recommandation d'investissement ni notation officielle de territoires. Consultez des professionnels qualifiés avant toute décision d'investissement.

## 📝 License

Tous droits réservés - Club House Immobilier
