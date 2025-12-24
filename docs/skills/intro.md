# Introduction aux Skills Claude Code

Bienvenue dans ce guide complet sur les **Skills** pour Claude Code. Ce cours vous apprendra tout ce qu'il faut savoir pour créer, gérer et utiliser des skills personnalisés.

## Qu'est-ce qu'un Skill ?

Un **skill** (compétence) est une extension qui enrichit les capacités de Claude Code en ajoutant des fonctionnalités spécialisées et de l'expertise contextuelle. Les skills permettent de :

- Automatiser des tâches répétitives avec des workflows prédéfinis
- Transmettre l'expertise et les conventions de votre équipe à Claude
- Standardiser les processus de développement
- Guider Claude sur quand et comment utiliser certains outils
- Partager des connaissances techniques spécialisées

## Caractéristiques clés des Skills

### Invocation automatique par le modèle

**Point important** : Les skills ne sont PAS invoqués manuellement avec des commandes. Claude décide **automatiquement** d'utiliser un skill basé sur :
- Votre demande
- Le contexte actuel
- La description du skill

Vous posez simplement votre question naturellement, et Claude active le skill approprié s'il est pertinent.

### Structure basée sur des fichiers

Les skills sont des **répertoires** contenant un fichier `SKILL.md`, pas des configurations JSON. Chaque skill est un dossier autonome avec sa propre documentation et ressources.

## Pourquoi utiliser des Skills ?

### Productivité accrue

Au lieu de répéter les mêmes instructions détaillées à Claude, créez un skill qui encapsule toute la logique. Claude l'utilisera automatiquement quand c'est pertinent.

### Cohérence des processus

Garantissez que certaines tâches sont toujours exécutées de la même manière, selon vos standards et meilleures pratiques, même par différents membres de l'équipe.

### Partage de connaissances

Les skills projet (`.claude/skills/`) sont versionnés avec Git, permettant à toute l'équipe de bénéficier des mêmes workflows et expertise.

### Exemples d'utilisation

- **Skill de commit Git** : Guide Claude pour créer des commits suivant vos conventions (Conventional Commits, etc.)
- **Skill de revue de code** : Définit vos critères de qualité et checklist de revue
- **Skill de documentation** : Standards de documentation de votre projet
- **Skill de tests** : Patterns de tests et conventions de nommage
- **Skill d'architecture** : Principes architecturaux et patterns à suivre

## Types de Skills

Il existe deux emplacements principaux pour les skills :

### 1. Skills personnels (Personal Skills)

**Emplacement** : `~/.claude/skills/nom-du-skill/`

Ces skills sont disponibles pour vous uniquement, dans tous vos projets.

**Idéal pour :**
- Vos préférences personnelles de développement
- Workflows que vous utilisez partout
- Outils et raccourcis personnels
- Expérimentation avec de nouveaux skills

**Exemple de structure :**
```
~/.claude/skills/
└── my-commit-helper/
    └── SKILL.md
```

### 2. Skills projet (Project Skills)

**Emplacement** : `.claude/skills/nom-du-skill/` (dans votre projet)

Ces skills sont spécifiques au projet et partagés avec l'équipe via Git.

**Idéal pour :**
- Conventions et standards de l'équipe
- Workflows spécifiques au projet
- Processus métier particuliers
- Expertise technique du projet

**Exemple de structure :**
```
mon-projet/
├── .claude/
│   └── skills/
│       ├── code-review/
│       │   └── SKILL.md
│       └── api-docs/
│           └── SKILL.md
├── src/
└── package.json
```

## Architecture d'un Skill

Un skill est un **répertoire** contenant au minimum un fichier `SKILL.md` avec :

1. **Frontmatter YAML** : Métadonnées du skill
2. **Contenu Markdown** : Instructions pour Claude

### Structure minimale

```yaml
---
name: mon-skill-name
description: Ce que fait ce skill et quand l'utiliser. Soyez précis et descriptif.
---

# Mon Skill

## Instructions
Instructions détaillées pour Claude...

## Exemples
Exemples concrets d'utilisation...
```

### Champs requis dans le frontmatter

| Champ | Requis | Limite | Description |
|-------|--------|--------|-------------|
| `name` | Oui | 64 caractères | Identifiant unique (lowercase, chiffres, tirets uniquement) |
| `description` | Oui | 1024 caractères | **Doit inclure QUOI et QUAND** : ce que fait le skill ET quand Claude doit l'utiliser |

### Champ optionnel

| Champ | Description |
|-------|-------------|
| `allowed-tools` | Liste des outils que Claude peut utiliser avec ce skill (pour restreindre les capacités) |

## Comment fonctionne l'activation d'un Skill ?

Les skills sont **invoqués automatiquement** par Claude, pas manuellement par vous.

### Vous NE faites PAS :
```
❌ /mon-skill argument
❌ Utilise le skill mon-skill
```

### Vous faites plutôt :
```
✅ "Peux-tu m'aider à créer un commit pour ces changements ?"
   → Claude active automatiquement le skill de commit s'il existe

✅ "Fais une revue de code de ce fichier"
   → Claude active le skill de revue s'il est pertinent

✅ "Extrais le texte de ce PDF"
   → Claude cherche un skill PDF et l'utilise
```

### Comment Claude choisit un skill

Claude lit le champ `description` de tous les skills disponibles et :
1. Compare votre demande avec les descriptions
2. Évalue si le contexte correspond
3. Active automatiquement le(s) skill(s) pertinent(s)

**C'est pourquoi la description doit être très spécifique !**

## Visualiser vos Skills disponibles

Pour voir quels skills sont actuellement disponibles, demandez simplement à Claude :

```
Quels skills sont disponibles ?
```

ou

```
Liste tous les skills disponibles
```

Claude vous montrera tous les skills personnels et projet qu'il peut utiliser.

## Structure d'un Skill complet

Un skill peut contenir plusieurs fichiers pour plus de richesse :

```
mon-skill/
├── SKILL.md          # Fichier principal (requis)
├── REFERENCE.md      # Documentation de référence (optionnel)
├── EXAMPLES.md       # Exemples détaillés (optionnel)
├── scripts/          # Scripts utilitaires (optionnel)
│   └── helper.py
└── templates/        # Templates de code (optionnel)
    └── template.txt
```

Vous pouvez référencer ces fichiers depuis `SKILL.md` :

```markdown
Pour plus de détails, voir [REFERENCE.md](REFERENCE.md).

Exécuter le script helper :
```bash
python scripts/helper.py input.txt
```
```

## Prochaines étapes

Dans les sections suivantes, vous apprendrez :

1. **Créer votre premier skill** - Guide pas à pas avec la vraie syntaxe
2. **Exemples pratiques** - Collection de skills réels prêts à copier
3. **Techniques avancées** - Optimisation, débogage, et patterns avancés
4. **Référence complète** - Toutes les options et meilleures pratiques

Passons maintenant à la création de votre premier skill !
