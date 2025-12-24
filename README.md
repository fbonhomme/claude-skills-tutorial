# Guide des Skills Claude Code

Ce projet contient un cours complet et précis sur l'utilisation et la mise en place de **Skills** pour Claude Code, construit avec Docusaurus.

## À propos

Les Skills sont des extensions qui enrichissent les capacités de Claude Code en ajoutant des fonctionnalités spécialisées et des workflows personnalisés. Ce guide vous apprendra tout ce qu'il faut savoir pour créer, gérer et utiliser des skills.

## Contenu du cours

### 1. Introduction aux Skills
- Qu'est-ce qu'un skill ?
- Pourquoi utiliser des skills ?
- Types de skills (locaux vs globaux)
- Architecture d'un skill

### 2. Créer votre premier Skill
- Guide pas à pas pour débutants
- Skills simples avec paramètres
- Skills pratiques (générateurs de tests, revue de code)
- Bonnes pratiques de création

### 3. Exemples Pratiques
Plus de 20 exemples de skills prêts à l'emploi :
- **Skills Git** : Commits conventionnels, revue de PR, changelog
- **Skills Documentation** : Génération README, documentation API
- **Skills Tests** : Tests unitaires, tests d'intégration
- **Skills Refactoring** : Extraction de fonctions, conversion TypeScript
- **Skills Sécurité** : Audit de sécurité, validation des entrées
- **Skills Performance** : Profiling, optimisations
- **Skills DevOps** : Dockerization, CI/CD

### 4. Référence Avancée
- Techniques avancées de prompting
- Patterns sophistiqués (chain of skills, wizards, templates)
- Optimisation des prompts
- Débogage et maintenance
- Partage de skills

## Installation

### Prérequis

- Node.js >= 18
- npm, yarn ou pnpm

### Lancement local

```bash
cd my-skills-tutorial
npm install
npm start
```

Le site sera accessible sur `http://localhost:3000`

### Build pour production

```bash
npm run build
```

Les fichiers statiques seront générés dans le dossier `build/`

### Déploiement

```bash
npm run serve
```

Pour tester le site de production localement.

## Structure du projet

```
my-skills-tutorial/
├── docs/
│   └── skills/
│       ├── intro.md              # Introduction aux skills
│       ├── creating-skills.md    # Guide de création
│       ├── examples.md           # Exemples pratiques
│       └── advanced.md           # Référence avancée
├── src/
│   ├── components/
│   │   └── HomepageFeatures/    # Composants de la page d'accueil
│   └── pages/
│       └── index.tsx             # Page d'accueil
├── static/
│   └── img/                      # Images et assets
├── docusaurus.config.ts          # Configuration Docusaurus
├── sidebars.ts                   # Configuration de la sidebar
└── package.json
```

## Personnalisation

### Modifier le titre et le tagline

Éditez `docusaurus.config.ts` :

```typescript
const config: Config = {
  title: 'Votre Titre',
  tagline: 'Votre tagline',
  // ...
};
```

### Ajouter du contenu

1. Créez un nouveau fichier Markdown dans `docs/skills/`
2. Ajoutez-le à la sidebar dans `sidebars.ts`

### Personnaliser les couleurs

Éditez `src/css/custom.css` pour modifier les couleurs du thème.

## Contribuer

Les contributions sont bienvenues ! N'hésitez pas à :
- Proposer de nouveaux exemples de skills
- Améliorer la documentation
- Signaler des erreurs
- Suggérer des améliorations

## Ressources

- [Claude Code](https://claude.com/claude-code)
- [Documentation Claude Code](https://github.com/anthropics/claude-code)
- [Docusaurus](https://docusaurus.io/)
- [Anthropic](https://anthropic.com)

## Licence

Ce guide est fourni à des fins éducatives.

## Support

Pour toute question ou problème :
- Consultez la documentation complète sur le site
- Ouvrez une issue sur GitHub
- Rejoignez la communauté Discord Anthropic

---

Construit avec ❤️ et [Docusaurus](https://docusaurus.io/)
