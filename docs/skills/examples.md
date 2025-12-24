# Exemples Pratiques de Skills

Cette section présente une collection de skills prêts à l'emploi au **format correct** (YAML frontmatter + Markdown). Tous les exemples utilisent la vraie syntaxe de Claude Code.

## Comment utiliser ces exemples

1. Créez le répertoire du skill : `mkdir -p ~/.claude/skills/nom-du-skill`
2. Copiez le contenu dans `~/.claude/skills/nom-du-skill/SKILL.md`
3. Adaptez selon vos besoins
4. **Testez** en utilisant des phrases naturelles liées à la description

**Rappel** : Les skills sont activés automatiquement, pas avec des commandes slash.

---

## Skills Git

### 1. Commit Message Generator (Conventional Commits)

**Répertoire** : `~/.claude/skills/commit-helper/SKILL.md`

```yaml
---
name: commit-helper
description: Génère des messages de commit suivant la convention Conventional Commits. Utiliser quand l'utilisateur demande de créer un commit, écrire un message de commit, analyser des changements git, ou préparer un commit.
---

# Commit Message Helper

## Objectif

Créer des commits clairs et structurés selon Conventional Commits.

## Processus

1. Analyser les changements stagés
   ```bash
   git diff --staged
   git status
   ```

2. Déterminer le type
   - `feat`: Nouvelle fonctionnalité
   - `fix`: Correction de bug
   - `docs`: Documentation
   - `style`: Formatage (pas de changement de code)
   - `refactor`: Refactorisation
   - `test`: Tests
   - `chore`: Maintenance (build, dépendances)
   - `perf`: Performance

3. Identifier le scope (composant affecté)

4. Rédiger selon le format:
   ```
   type(scope): description (< 72 caractères)

   [Corps optionnel]

   [Footer: Closes #123, BREAKING CHANGE, etc.]
   ```

## Contraintes

- NE PAS commiter sans confirmation explicite
- Présenter le message proposé avant de l'exécuter
- Utiliser l'impératif : "add" pas "added"
- Première lettre minuscule, pas de point final

## Exemple

```
feat(auth): add OAuth2 login support

Implement Google and GitHub OAuth2 providers.
Users can now login with social accounts.

Closes #245
```
```

**Test** : "Aide-moi à créer un commit pour mes changements"

---

### 2. Pull Request Reviewer

**Répertoire** : `~/.claude/skills/pr-reviewer/SKILL.md`

```yaml
---
name: pr-reviewer
description: Analyse et révise les pull requests GitHub. Utiliser quand l'utilisateur demande de réviser une PR, analyser des changements, ou faire une code review.
allowed-tools: [Read, Grep, Glob, Bash]
---

# Pull Request Reviewer

## Instructions

1. Récupérer les informations de la PR
   ```bash
   gh pr view <numero> --json title,body,files
   gh pr diff <numero>
   ```

2. Analyser selon ces critères

### Qualité du Code
- Lisibilité et clarté
- Noms descriptifs
- Pas de duplication
- Complexité raisonnable

### Fonctionnalité
- Le code fait ce qu'il doit
- Cas limites gérés
- Pas de régression

### Tests
- Présence de tests
- Couverture des cas importants
- Tests clairs

### Sécurité
- Pas de secrets en dur
- Validation des entrées
- Pas de vulnérabilités évidentes

### Performance
- Pas de N+1 queries
- Pas de boucles inutiles

## Format de Rapport

```markdown
# Revue PR #[numero]: [titre]

## Résumé
[Description brève des changements]

## Analyse

### ✅ Points Positifs
- [Point 1]

### ⚠️ À Améliorer
- [Point 1 + suggestion]

### ❌ Problèmes Critiques
- [Problème + solution requise]

## Verdict
[ ] Approuvé
[ ] Changements demandés
```
```

**Test** : "Peux-tu revoir la PR #123 ?"

---

### 3. Changelog Generator

**Répertoire** : `~/.claude/skills/changelog-gen/SKILL.md`

```yaml
---
name: changelog-generator
description: Génère un changelog depuis les commits git. Utiliser quand l'utilisateur demande de créer un changelog, documenter les changements, ou préparer une release.
---

# Changelog Generator

## Processus

1. Trouver le dernier tag
   ```bash
   git describe --tags --abbrev=0
   ```

2. Lister les commits depuis ce tag
   ```bash
   git log <tag>..HEAD --oneline
   ```

3. Catégoriser les commits par type (feat, fix, etc.)

4. Générer au format Keep a Changelog

## Format

```markdown
# Changelog

## [Unreleased]

### Added
- Nouvelles fonctionnalités (feat)

### Changed
- Modifications (refactor, style)

### Fixed
- Corrections (fix)

### Security
- Correctifs de sécurité

## [1.2.0] - 2024-01-15

...
```

## Instructions

- Grouper par catégorie
- Utiliser des phrases claires
- Inclure les numéros d'issues si mentionnés
- Proposer un numéro de version (semver)
```

**Test** : "Génère un changelog depuis le dernier tag"

---

## Skills Documentation

### 4. README Generator

**Répertoire** : `~/.claude/skills/readme-gen/SKILL.md`

```yaml
---
name: readme-generator
description: Génère ou met à jour le README.md d'un projet. Utiliser quand l'utilisateur demande de créer un README, documenter le projet, ou mettre à jour la documentation d'accueil.
---

# README Generator

## Instructions

1. Analyser le projet
   - Lire package.json / requirements.txt / Cargo.toml
   - Explorer la structure (src/, lib/, etc.)
   - Identifier le type (app, library, CLI, etc.)

2. Générer les sections

### Structure

```markdown
# [Nom du Projet]

[Badge de build] [Badge de version] [Badge de licence]

[Description en 1-2 phrases]

## Fonctionnalités

- Fonctionnalité 1
- Fonctionnalité 2

## Installation

```bash
[Commandes d'installation]
```

## Utilisation

[Exemples de code ou commandes]

## Configuration

[Variables d'environnement, options]

## Documentation

[Liens vers docs détaillées]

## Contribuer

[Guide de contribution]

## Licence

[Type de licence]
```

## Principes

- Être concis mais complet
- Inclure des exemples concrets
- Pas de placeholder génériques
- Utiliser les vraies informations du projet
```

**Test** : "Crée un README pour ce projet"

---

### 5. API Documentation Generator

**Répertoire** : `~/.claude/skills/api-docs/SKILL.md`

```yaml
---
name: api-doc-generator
description: Documente les endpoints d'une API REST. Utiliser quand l'utilisateur demande de documenter une API, créer de la documentation d'endpoints, ou générer une spec OpenAPI.
---

# API Documentation Generator

## Instructions

1. Trouver les fichiers de routes/controllers

2. Pour chaque endpoint, extraire:
   - Méthode HTTP
   - Path
   - Paramètres (path, query, body)
   - Réponses possibles
   - Codes d'erreur

3. Documenter au format :

```markdown
## [METHOD] /path/to/endpoint

**Description:** Ce que fait l'endpoint

**Auth:** Requise/Non requise

### Paramètres

**Path:**
- `id` (string) - Identifiant de la ressource

**Query:**
- `page` (number, optional) - Numéro de page

**Body:**
```json
{
  "name": "string",
  "email": "string"
}
```

### Réponses

#### 200 OK
```json
{
  "id": "123",
  "name": "John"
}
```

#### 400 Bad Request
```json
{
  "error": "Invalid input"
}
```

### Exemple

```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```
```

## Bonnes Pratiques

- Exemples réalistes
- Tous les codes d'erreur possibles
- Types de données clairs
```

**Test** : "Documente tous les endpoints API de ce projet"

---

## Skills Tests

### 6. Unit Test Generator

**Répertoire** : `~/.claude/skills/unit-test-gen/SKILL.md`

```yaml
---
name: unit-test-generator
description: Génère des tests unitaires pour du code. Utiliser quand l'utilisateur demande de créer des tests, générer des tests unitaires, ou ajouter de la couverture de tests.
---

# Unit Test Generator

## Instructions

1. L'utilisateur fournit un fichier source

2. Analyser toutes les fonctions/classes exportées

3. Créer un fichier de test adjacent (.test.ts, .spec.js, etc.)

4. Pour chaque fonction, créer:
   - Test du cas nominal (happy path)
   - Test des cas d'erreur
   - Tests des cas limites (edge cases)

## Structure des Tests

```typescript
describe('functionName', () => {
  it('should return expected value for valid input', () => {
    // Arrange
    const input = validInput;
    const expected = expectedOutput;

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('should throw error for invalid input', () => {
    expect(() => functionName(invalidInput)).toThrow();
  });

  it('should handle edge case: empty input', () => {
    expect(functionName('')).toBe(defaultValue);
  });
});
```

## Principes

- Pattern Arrange-Act-Assert
- Noms de tests descriptifs
- Mock les dépendances externes
- Tests isolés et indépendants
- Au minimum 3 tests par fonction

## Détection du Framework

Lire package.json pour identifier : Jest, Vitest, Mocha, etc.
```

**Test** : "Génère des tests unitaires pour src/utils/calculator.ts"

---

### 7. Integration Test Generator

**Répertoire** : `~/.claude/skills/integration-test-gen/SKILL.md`

```yaml
---
name: integration-test-generator
description: Génère des tests d'intégration pour une API. Utiliser quand l'utilisateur demande des tests d'intégration, tests E2E d'API, ou tests de bout en bout.
---

# Integration Test Generator

## Instructions

Créer des tests qui valident le flux complet d'une requête API.

## Structure

```typescript
describe('POST /api/users', () => {
  beforeEach(async () => {
    await cleanDatabase();
    await seedTestData();
  });

  afterEach(async () => {
    await cleanDatabase();
  });

  it('should create user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@test.com' })
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: 'John',
      email: 'john@test.com'
    });

    // Vérifier en DB
    const user = await User.findById(response.body.id);
    expect(user).toBeTruthy();
  });

  it('should return 400 for invalid email', async () => {
    await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'invalid' })
      .expect(400);
  });

  it('should require authentication', async () => {
    await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@test.com' })
      .expect(401);
  });
});
```

## Tests à Inclure

- Cas nominal
- Validation des données
- Authentification/autorisation
- Codes HTTP corrects
- Format des réponses
- Effets de bord (DB, cache, etc.)
```

**Test** : "Crée des tests d'intégration pour l'API users"

---

## Skills Refactoring

### 8. Extract Function

**Répertoire** : `~/.claude/skills/extract-function/SKILL.md`

```yaml
---
name: extract-function
description: Extrait du code en fonction réutilisable. Utiliser quand l'utilisateur demande d'extraire une fonction, refactoriser du code en fonction, ou créer une fonction à partir de code dupliqué.
---

# Extract Function

## Processus

1. Analyser le code à extraire
   - Identifier les dépendances
   - Déterminer les paramètres nécessaires
   - Identifier le type de retour
   - Repérer les effets de bord

2. Proposer un nom descriptif
   - Verbe + nom : `calculateTotalPrice`
   - Décrit l'action et le résultat
   - Pas d'abréviations obscures

3. Créer la fonction
   ```typescript
   /**
    * [Description de ce que fait la fonction]
    * @param param1 - [Description]
    * @returns [Description du retour]
    */
   function functionName(param1: Type): ReturnType {
     // Corps de la fonction
     return result;
   }
   ```

4. Remplacer le code original par l'appel

5. Présenter avant/après pour approbation

## Principes

- Single Responsibility
- Pas d'effets de bord cachés
- Paramètres explicites
- Types clairs (TypeScript)
```

**Test** : "Extrait ce code en fonction réutilisable"

---

### 9. TypeScript Migration

**Répertoire** : `~/.claude/skills/ts-migration/SKILL.md`

```yaml
---
name: typescript-migrator
description: Convertit du JavaScript en TypeScript. Utiliser quand l'utilisateur demande de migrer vers TypeScript, ajouter des types, ou convertir un fichier JS en TS.
---

# TypeScript Migrator

## Processus

1. Renommer .js en .ts (ou .jsx en .tsx pour React)

2. Ajouter les types

### Variables et Constantes
```typescript
const name: string = "John";
const age: number = 30;
const items: string[] = ["a", "b"];
```

### Fonctions
```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

const add = (a: number, b: number): number => a + b;
```

### Interfaces
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age?: number; // optionnel
}
```

### React Components
```typescript
interface Props {
  title: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
```

3. Remplacer require() par import

4. Gérer les any temporaires

## Principes

- Éviter `any` autant que possible
- Utiliser des types précis
- Créer des interfaces réutilisables
- Utiliser les génériques si approprié
```

**Test** : "Convertis ce fichier JavaScript en TypeScript"

---

## Skills Sécurité

### 10. Security Auditor

**Répertoire** : `~/.claude/skills/security-audit/SKILL.md`

```yaml
---
name: security-auditor
description: Audit de sécurité du code selon OWASP Top 10. Utiliser quand l'utilisateur demande un audit de sécurité, vérifier les vulnérabilités, ou analyser la sécurité du code.
allowed-tools: [Read, Grep, Glob, Bash]
---

# Security Auditor

## OWASP Top 10 Checklist

### 1. Injection
- [ ] SQL : paramètres préparés utilisés ?
- [ ] NoSQL : requêtes validées ?
- [ ] Command injection : entrées système validées ?

### 2. Broken Authentication
- [ ] Mots de passe hashés (bcrypt/argon2) ?
- [ ] Tokens sécurisés ?
- [ ] Rate limiting sur login ?

### 3. Sensitive Data Exposure
- [ ] Pas de secrets en dur ?
- [ ] HTTPS obligatoire ?
- [ ] Données sensibles chiffrées ?

### 4. XML External Entities
- [ ] XML parser sécurisé ?

### 5. Broken Access Control
- [ ] Vérifications d'autorisation ?
- [ ] Pas de références directes exposées ?

### 6. Security Misconfiguration
- [ ] Pas d'infos sensibles dans erreurs ?
- [ ] Headers de sécurité (CSP, HSTS) ?

### 7. XSS
- [ ] Sorties échappées ?
- [ ] Content-Security-Policy configuré ?

### 8. Insecure Deserialization
- [ ] Validation avant désérialisation ?

### 9. Components with Known Vulnerabilities
```bash
npm audit
# ou
pip-audit
```

### 10. Insufficient Logging
- [ ] Événements de sécurité loggés ?

## Format du Rapport

```markdown
# Audit de Sécurité

## Résumé
- 🔴 Critique: X
- 🟡 Élevé: X
- 🟢 Moyen: X

## Vulnérabilités

### 🔴 [CRITIQUE] Titre
**Fichier:** path/to/file.ts:42
**Impact:** ...
**Solution:** ...
```
```

**Test** : "Fais un audit de sécurité du code"

---

## Skills DevOps

### 11. Dockerfile Generator

**Répertoire** : `~/.claude/skills/dockerfile-gen/SKILL.md`

```yaml
---
name: dockerfile-generator
description: Crée un Dockerfile optimisé pour le projet. Utiliser quand l'utilisateur demande de dockeriser l'application, créer un Dockerfile, ou conteneuriser le projet.
---

# Dockerfile Generator

## Instructions

1. Détecter le type de projet (Node, Python, Go, etc.)

2. Créer un Dockerfile multi-stage

### Node.js Example

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY . .

# Build
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js || exit 1

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

3. Créer .dockerignore

```
node_modules
npm-debug.log
.env
.git
.DS_Store
*.md
```

## Bonnes Pratiques

- Multi-stage build
- Image de base légère (alpine)
- Layer caching optimal
- Non-root user
- Health check
```

**Test** : "Crée un Dockerfile pour ce projet"

---

### 12. CI/CD Pipeline

**Répertoire** : `~/.claude/skills/cicd-setup/SKILL.md`

```yaml
---
name: cicd-pipeline
description: Configure une pipeline CI/CD. Utiliser quand l'utilisateur demande de configurer CI/CD, créer une GitHub Action, ou automatiser le déploiement.
---

# CI/CD Pipeline Setup

## GitHub Actions Example

`.github/workflows/ci.yml` :

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy
        run: |
          # Deployment steps
```

## Étapes à Inclure

1. Install dependencies (avec cache)
2. Lint
3. Tests
4. Build
5. Security audit
6. Deploy (si main branch)
```

**Test** : "Configure une pipeline CI/CD avec GitHub Actions"

---

## Utilisation de ces Skills

### Pour chaque skill :

1. **Créez le répertoire**
   ```bash
   mkdir -p ~/.claude/skills/nom-du-skill
   ```

2. **Copiez le contenu** dans `SKILL.md`

3. **Adaptez** à vos besoins :
   - Modifiez les conventions
   - Ajoutez vos outils préférés
   - Personnalisez les formats

4. **Testez** avec des phrases naturelles

### Exemples de tests :

| Skill | Phrase de test |
|-------|----------------|
| commit-helper | "Aide-moi à créer un commit" |
| pr-reviewer | "Révise la PR #123" |
| readme-generator | "Crée un README pour ce projet" |
| unit-test-generator | "Génère des tests pour ce fichier" |
| security-auditor | "Fais un audit de sécurité" |

## Personnalisation

Tous ces exemples sont des points de départ. **Personnalisez-les** :

- Ajoutez vos conventions d'équipe
- Incluez vos outils spécifiques
- Modifiez les formats de sortie
- Combinez plusieurs skills

## Prochaines étapes

Consultez la **Référence Avancée** pour :
- Optimisation des descriptions
- Patterns avancés
- Débogage
- Performance
