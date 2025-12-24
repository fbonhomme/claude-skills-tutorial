# Créer votre premier Skill

Dans ce guide, nous allons créer des skills étape par étape, du plus simple au plus sophistiqué, en utilisant la **vraie syntaxe** de Claude Code.

## Prérequis

- Claude Code installé et configuré
- Un éditeur de texte
- Connaissance de base de Markdown et YAML

## Skill Simple : Greeting Helper

Créons notre premier skill qui aide Claude à saluer de manière professionnelle.

### Étape 1 : Créer le répertoire

Les skills sont organisés en répertoires. Créons un skill personnel :

```bash
# Linux/Mac
mkdir -p ~/.claude/skills/greeting-helper

# Windows (PowerShell)
New-Item -ItemType Directory -Path "$env:USERPROFILE\.claude\skills\greeting-helper"
```

### Étape 2 : Créer le fichier SKILL.md

Créez le fichier `~/.claude/skills/greeting-helper/SKILL.md` :

```yaml
---
name: greeting-helper
description: Aide à saluer les utilisateurs de manière chaleureuse et professionnelle. Utiliser quand l'utilisateur démarre une session ou dit bonjour.
---

# Greeting Helper

## Instructions

Quand un utilisateur te salue ou démarre une conversation :

1. Réponds avec un message chaleureux mais professionnel
2. Demande comment tu peux aider aujourd'hui
3. Suggère 2-3 tâches courantes que tu peux accomplir

## Ton à adopter

- Amical mais professionnel
- Concis et clair
- Encourageant

## Exemple

Quand l'utilisateur dit "Bonjour" :

"Bonjour ! Content de vous aider aujourd'hui. Comment puis-je vous assister ?

Je peux notamment :
- Écrire ou refactoriser du code
- Créer des tests
- Déboguer des problèmes

Qu'aimeriez-vous faire ?"
```

### Étape 3 : Tester le skill

**Important** : Vous ne tapez PAS `/greeting-helper`. Au lieu de cela, dites simplement :

```
Bonjour Claude !
```

Claude devrait automatiquement activer le skill et utiliser les instructions pour vous saluer de manière structurée.

## Skill Pratique : Commit Message Generator

Créons un skill plus utile pour générer des messages de commit Git.

### Structure du répertoire

```bash
mkdir -p ~/.claude/skills/commit-generator
```

### SKILL.md

Créez `~/.claude/skills/commit-generator/SKILL.md` :

```yaml
---
name: commit-generator
description: Génère des messages de commit Git suivant la convention Conventional Commits. Utiliser quand l'utilisateur demande de créer un commit, analyser des changements git, ou écrire un message de commit.
---

# Commit Message Generator

## Objectif

Créer des messages de commit clairs et conformes à la convention Conventional Commits.

## Processus

1. **Analyser les changements**
   ```bash
   git diff --staged
   git status
   ```

2. **Déterminer le type de commit**
   - `feat`: Nouvelle fonctionnalité
   - `fix`: Correction de bug
   - `docs`: Documentation uniquement
   - `style`: Changements de formatage (espaces, virgules, etc.)
   - `refactor`: Refactorisation sans changement de fonctionnalité
   - `test`: Ajout ou modification de tests
   - `chore`: Tâches de maintenance (build, dépendances, etc.)
   - `perf`: Amélioration de performance

3. **Identifier le scope** (optionnel)
   Le composant ou module affecté : `(auth)`, `(api)`, `(ui)`, etc.

4. **Rédiger le message**

   Format :
   ```
   type(scope): description courte (< 72 caractères)

   [Corps optionnel avec explication détaillée]

   [Footer optionnel : Closes #123, BREAKING CHANGE, etc.]
   ```

## Bonnes pratiques

- Description à l'impératif : "add feature" pas "added feature"
- Première lettre en minuscule
- Pas de point à la fin de la description
- Corps du message : expliquer le "pourquoi", pas le "quoi"

## Exemples

### Nouvelle fonctionnalité
```
feat(auth): add password reset functionality

Implement password reset via email with secure token.
Token expires after 1 hour for security.

Closes #156
```

### Correction de bug
```
fix(api): prevent race condition in user creation

Add mutex lock to ensure atomic user creation
in high-concurrency scenarios.
```

### Changement breaking
```
feat(api)!: change authentication endpoint format

BREAKING CHANGE: Auth endpoint now requires
`/api/v2/auth` instead of `/auth`. Update all clients.
```

## Workflow

1. Analyser les changements stagés
2. Présenter le message proposé à l'utilisateur
3. Demander confirmation avant de commiter
4. Ne PAS commiter sans approbation explicite
```

### Comment l'utiliser

Dites simplement :

```
Aide-moi à créer un commit pour mes changements
```

ou

```
J'ai des changements à commiter, peux-tu m'aider avec le message ?
```

Claude activera automatiquement le skill et suivra le processus défini.

## Skill Projet : Code Review Standards

Créons maintenant un skill projet qui sera partagé avec toute l'équipe.

### Structure

```bash
# Dans votre projet
cd mon-projet
mkdir -p .claude/skills/code-review-standards
```

### SKILL.md

Créez `.claude/skills/code-review-standards/SKILL.md` :

```yaml
---
name: code-review-standards
description: Standards de revue de code pour ce projet. Utiliser quand l'utilisateur demande une revue de code, de vérifier une PR, ou d'analyser la qualité du code.
allowed-tools: [Read, Grep, Glob, Bash]
---

# Code Review Standards

## Notre checklist de revue

### 1. Fonctionnalité
- [ ] Le code fait ce qu'il est censé faire
- [ ] Les cas limites sont gérés
- [ ] Pas de régression introduite

### 2. Qualité du code
- [ ] Code lisible et auto-documenté
- [ ] Noms de variables/fonctions descriptifs
- [ ] Fonctions < 50 lignes
- [ ] Complexité cyclomatique raisonnable
- [ ] Pas de duplication de code

### 3. Tests
- [ ] Tests unitaires présents
- [ ] Tests couvrent les cas importants
- [ ] Tests sont clairs et maintenables
- [ ] Pas de tests flaky

### 4. Sécurité
- [ ] Pas de secrets en dur
- [ ] Validation des entrées utilisateur
- [ ] Pas de vulnérabilités OWASP connues
- [ ] Dépendances à jour

### 5. Performance
- [ ] Pas de requêtes N+1
- [ ] Pas de boucles imbriquées inutiles
- [ ] Ressources correctement fermées
- [ ] Pas de memory leaks évidents

### 6. Standards du projet
- [ ] Conforme à notre style guide
- [ ] Tests passent : `npm test`
- [ ] Linting passe : `npm run lint`
- [ ] Build réussit : `npm run build`

## Processus de revue

1. **Lire les changements**
   ```bash
   git diff main...HEAD
   ```

2. **Exécuter les checks automatiques**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

3. **Analyser le code** selon la checklist

4. **Catégoriser les findings**
   - 🔴 **Bloquant** : À corriger avant merge
   - 🟡 **Important** : À corriger idéalement
   - 🟢 **Suggestion** : Nice to have

5. **Présenter le rapport**

## Format du rapport

```markdown
# Revue de Code

## Résumé
[Brève description des changements]

## Checks automatiques
- ✅ Linting: Passé
- ✅ Tests: Passé (25/25)
- ✅ Build: Réussi

## Findings

### 🔴 Bloquants
1. **[Fichier:Ligne]** Description du problème
   **Solution suggérée:** ...

### 🟡 Importants
1. **[Fichier:Ligne]** Description
   **Suggestion:** ...

### 🟢 Suggestions
1. Considérer...

## Verdict
- [ ] ✅ Approuvé - Prêt à merger
- [ ] ⚠️ Approuvé avec réserves - Petits changements souhaités
- [ ] ❌ Changements requis - Ne pas merger
```

## Exemples de review

Voir les PRs précédentes pour des exemples :
- PR #234 : Excellent exemple de tests complets
- PR #189 : Bon exemple de gestion d'erreurs
```

### Versioner avec Git

```bash
git add .claude/skills/
git commit -m "docs: add code review standards skill"
git push
```

Maintenant toute l'équipe a accès à ce skill !

### Utilisation

N'importe qui dans l'équipe peut demander :

```
Fais une revue de code de mes changements
```

Claude utilisera automatiquement les standards définis.

## Skill avec Fichiers Additionnels

Créons un skill plus riche avec plusieurs fichiers de support.

### Structure

```bash
mkdir -p ~/.claude/skills/api-documentation/{examples,templates}
```

### SKILL.md

`~/.claude/skills/api-documentation/SKILL.md` :

```yaml
---
name: api-documentation
description: Génère de la documentation pour les APIs REST. Utiliser quand l'utilisateur demande de documenter une API, créer de la doc OpenAPI, ou expliquer des endpoints.
---

# API Documentation Generator

## Instructions

Créer une documentation complète pour chaque endpoint API.

## Format

Pour chaque endpoint, documenter :

1. **Méthode et Path**
2. **Description**
3. **Authentification requise**
4. **Paramètres** (query, path, headers)
5. **Corps de la requête** (avec schéma)
6. **Réponses possibles** (avec exemples)
7. **Codes d'erreur**
8. **Exemple d'utilisation** (curl)

## Template

Voir [templates/endpoint-template.md](templates/endpoint-template.md)

## Exemples complets

Voir [examples/user-api.md](examples/user-api.md)

## Processus

1. Analyser le code des routes/controllers
2. Extraire les informations de chaque endpoint
3. Utiliser le template pour chaque endpoint
4. Générer des exemples de requêtes/réponses réalistes
```

### templates/endpoint-template.md

```markdown
## [METHOD] /path/to/endpoint

**Description:** [Ce que fait cet endpoint]

**Authentification:** [Requise/Non requise] [Type: Bearer, Basic, etc.]

### Paramètres

#### Path Parameters
- `param1` (type) - Description

#### Query Parameters
- `param2` (type, optionnel) - Description

### Corps de la requête

```json
{
  "field": "value"
}
```

### Réponses

#### 200 OK
```json
{
  "status": "success",
  "data": {}
}
```

#### 400 Bad Request
```json
{
  "status": "error",
  "message": "Invalid input"
}
```

### Exemple

```bash
curl -X METHOD https://api.example.com/path \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"field":"value"}'
```
```

### examples/user-api.md

Un exemple complet pour référence.

## Bonnes Pratiques de Création

### 1. Description ultra-spécifique

❌ **Trop vague**
```yaml
description: Aide avec Git
```

✅ **Spécifique**
```yaml
description: Génère des messages de commit suivant Conventional Commits (feat, fix, etc.). Utiliser quand l'utilisateur demande de créer un commit, écrire un message de commit, ou analyser des changements git avant commit.
```

### 2. Inclure "quand utiliser"

La description DOIT dire à Claude **quand** utiliser le skill :

```yaml
description: [Ce que fait le skill]. Utiliser quand [contexte/mots-clés déclencheurs].
```

### 3. Structure claire

Utilisez des sections Markdown claires :

```markdown
# Nom du Skill

## Objectif
[Une phrase claire]

## Instructions
[Étapes détaillées]

## Exemples
[Exemples concrets]

## Erreurs courantes à éviter
[Pièges]
```

### 4. Exemples concrets

Incluez toujours des exemples d'entrée/sortie :

```markdown
## Exemple

### Entrée
```bash
git diff
```

### Sortie attendue
```
feat(auth): add login endpoint

Implements JWT-based authentication
```
```

### 5. Contraintes explicites

Dites ce que Claude NE doit PAS faire :

```markdown
## Contraintes

- NE PAS commiter sans confirmation de l'utilisateur
- NE PAS modifier de fichiers sans montrer les changements d'abord
- NE PAS exécuter de commandes destructives
```

## Débogage de Skills

### Le skill n'est pas activé

**Causes possibles :**

1. **Description trop vague**

   Solution : Rendez-la plus spécifique avec des mots-clés

2. **Fichier mal placé**

   Vérifiez :
   ```bash
   ls ~/.claude/skills/mon-skill/SKILL.md
   # ou
   ls .claude/skills/mon-skill/SKILL.md
   ```

3. **Erreur de syntaxe YAML**

   Vérifiez que :
   - Les `---` sont bien présents au début et à la fin
   - L'indentation est correcte
   - Les guillemets sont bien fermés

4. **Nom invalide**

   Le `name` doit être :
   - Lowercase uniquement
   - Chiffres autorisés
   - Tirets autorisés
   - Pas d'espaces, pas de caractères spéciaux

### Tester un skill

1. **Demandez à Claude de lister les skills**
   ```
   Quels skills sont disponibles ?
   ```

2. **Utilisez des mots-clés de la description**

   Si votre description dit "Utiliser quand l'utilisateur demande de créer un commit", testez avec :
   ```
   Aide-moi à créer un commit
   ```

3. **Soyez explicite temporairement**

   Pendant le test, vous pouvez dire :
   ```
   Utilise le skill [nom-du-skill] pour m'aider
   ```

## Prochaines étapes

Maintenant que vous savez créer des skills, consultez :

- **Exemples Pratiques** : 20+ skills prêts à copier et adapter
- **Référence Avancée** : Techniques d'optimisation et patterns avancés
