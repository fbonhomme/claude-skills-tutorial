# Référence Avancée des Skills

Ce guide couvre les techniques avancées, l'optimisation et les meilleures pratiques pour créer des skills sophistiqués.

## Structure Complète d'un Skill

### Frontmatter YAML - Tous les champs

```yaml
---
name: skill-name-example
description: Description détaillée de ce que fait le skill et quand l'utiliser. Soyez très spécifique avec des mots-clés que l'utilisateur pourrait mentionner.
allowed-tools: [Read, Grep, Glob, Bash]
---
```

### Tableau de référence des champs

| Champ | Type | Requis | Limite | Description |
|-------|------|--------|--------|-------------|
| `name` | string | ✅ Oui | 64 caractères | Identifiant unique (lowercase, chiffres, tirets uniquement) |
| `description` | string | ✅ Oui | 1024 caractères | **DOIT inclure QUOI et QUAND** utiliser le skill |
| `allowed-tools` | array | ❌ Non | - | Liste des outils autorisés (restreint les capacités) |

### Règles pour le `name`

✅ **Valides** :
```yaml
name: commit-helper
name: api-doc-generator
name: security-audit
name: test-gen-v2
```

❌ **Invalides** :
```yaml
name: Commit Helper       # Majuscules interdites
name: commit_helper       # Underscores interdits
name: commit.helper       # Points interdits
name: commit helper       # Espaces interdits
name: très-long-nom-de-skill-qui-dépasse-la-limite-de-64-caractères  # Trop long
```

## Optimisation de la Description

La description est **CRITIQUE** car c'est elle qui détermine quand Claude active le skill.

### Anatomie d'une bonne description

```yaml
description: [ACTION] [DÉTAILS TECHNIQUES]. Utiliser quand [CONTEXTE 1], [CONTEXTE 2], ou [MOTS-CLÉS].
```

### Exemples comparatifs

#### ❌ Trop vague - Claude ne saura pas quand l'utiliser

```yaml
description: Aide avec Git
```

#### ⚠️ Mieux, mais incomplet - Manque le "quand"

```yaml
description: Génère des messages de commit Git
```

#### ✅ Excellent - Spécifique avec contexte

```yaml
description: Génère des messages de commit Git suivant la convention Conventional Commits (feat, fix, docs, etc.). Utiliser quand l'utilisateur demande de créer un commit, écrire un message de commit, analyser des changements pour commit, ou préparer un commit.
```

### Stratégies pour améliorer les descriptions

**1. Listez les synonymes et variations**

```yaml
description: Génère de la documentation API REST (OpenAPI, Swagger). Utiliser quand l'utilisateur demande de documenter une API, créer une spec OpenAPI, documenter des endpoints, générer de la doc d'API, ou créer une référence API.
```

**2. Incluez les technologies/outils spécifiques**

```yaml
description: Configure une pipeline CI/CD avec GitHub Actions, GitLab CI, ou CircleCI. Utiliser quand l'utilisateur demande d'automatiser les tests, configurer le déploiement continu, créer une workflow GitHub Actions, ou setup CI/CD.
```

**3. Mentionnez les cas d'usage**

```yaml
description: Effectue un audit de sécurité selon OWASP Top 10 (injection SQL, XSS, etc.). Utiliser quand l'utilisateur demande un audit de sécurité, vérifier les vulnérabilités, analyser la sécurité du code, ou review de sécurité avant production.
```

## Restriction des Outils avec `allowed-tools`

Le champ `allowed-tools` limite les capacités de Claude quand le skill est actif.

### Cas d'usage

**1. Skills Read-Only (lecture seule)**

```yaml
---
name: code-analyzer
description: Analyse le code pour détecter les code smells. Utiliser pour analyser la qualité du code sans modifier les fichiers.
allowed-tools: [Read, Grep, Glob]
---
```

Claude peut lire et chercher, mais **ne peut pas** écrire ou modifier.

**2. Skills de Revue de Code**

```yaml
---
name: code-reviewer
description: Révise le code selon nos standards. Utiliser pour code review ou revue de PR.
allowed-tools: [Read, Grep, Glob, Bash]
---
```

Permet de lire et exécuter des commandes (comme `npm test`), mais pas d'éditer.

**3. Skills Sécurisés**

```yaml
---
name: safe-reporter
description: Génère des rapports à partir du code. Utiliser pour créer des rapports sans risque de modification.
allowed-tools: [Read, Grep]
---
```

Minimise les risques en limitant aux outils strictement nécessaires.

### Liste des outils disponibles

- `Read` - Lire des fichiers
- `Write` - Créer de nouveaux fichiers
- `Edit` - Modifier des fichiers existants
- `Glob` - Chercher des fichiers par pattern
- `Grep` - Chercher dans le contenu des fichiers
- `Bash` - Exécuter des commandes shell
- `LSP` - Utiliser le Language Server Protocol
- Et d'autres outils selon la configuration

**Omettez `allowed-tools` si vous voulez que Claude ait accès à tous les outils.**

## Techniques Avancées de Contenu Markdown

### 1. Structure en Sections Claires

```markdown
# Nom du Skill

## Objectif
[Une phrase claire décrivant l'objectif]

## Prérequis
[Ce qui doit être installé ou configuré]

## Processus
[Étapes détaillées numérotées]

## Exemples
[Exemples concrets d'entrée/sortie]

## Contraintes
[Ce que le skill NE doit PAS faire]

## Erreurs Courantes
[Comment gérer les erreurs]
```

### 2. Instructions Progressives

Guidez Claude étape par étape :

```markdown
## Processus

### Étape 1 : Analyse
1. Lire le fichier fourni par l'utilisateur
2. Identifier le langage et le framework
3. Extraire les fonctions/classes exportées

**Ne pas passer à l'étape 2 avant d'avoir terminé l'analyse**

### Étape 2 : Planification
1. Pour chaque fonction, déterminer :
   - Les cas de test nominaux
   - Les cas d'erreur
   - Les cas limites
2. Présenter le plan à l'utilisateur
3. **Attendre approbation avant de continuer**

### Étape 3 : Génération
[...]
```

### 3. Contraintes Explicites

Dites clairement ce que Claude NE doit PAS faire :

```markdown
## Contraintes Impératives

❌ **NE JAMAIS** :
- Commiter du code sans confirmation explicite de l'utilisateur
- Supprimer des fichiers sans demander confirmation
- Pousser sur main/master sans approbation
- Exécuter des commandes destructives (`rm -rf`, `DROP TABLE`, etc.)
- Modifier des fichiers de configuration critiques sans backup

✅ **TOUJOURS** :
- Présenter les changements avant de les appliquer
- Demander confirmation pour les opérations critiques
- Expliquer ce que tu vas faire avant de le faire
- Fournir un moyen d'annuler les changements
```

### 4. Exemples Concrets

Incluez des exemples d'entrée/sortie :

```markdown
## Exemples

### Exemple 1 : Fonction Simple

**Entrée (fichier source)** :
```typescript
export function add(a: number, b: number): number {
  return a + b;
}
```

**Sortie (test généré)** :
```typescript
describe('add', () => {
  it('should return sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });

  it('should handle zero', () => {
    expect(add(0, 5)).toBe(5);
  });
});
```
```

### 5. Gestion Contextuelle

Adaptez le comportement selon le projet :

```markdown
## Détection du Contexte

### 1. Identifier le type de projet
Lire package.json, requirements.txt, Cargo.toml, etc.

### 2. Adapter selon le framework détecté

**Si React** :
- Utiliser les hooks (pas de classes)
- Placer les tests dans `__tests__/`
- Fichiers `.tsx` pour les composants
- Suivre les conventions React

**Si Vue** :
- Utiliser Composition API (si Vue 3+)
- Placer les tests dans `*.spec.ts`
- Suivre les conventions Vue

**Si Node.js/Express** :
- Structure controllers/services/routes
- Middleware pour validation
- Gestion d'erreurs centralisée

### 3. Utiliser les outils du projet
Détecter dans package.json :
- Framework de test (Jest, Vitest, Mocha)
- Linter (ESLint, Prettier)
- Builder (Webpack, Vite, esbuild)
```

## Patterns Avancés

### Pattern 1 : Workflow Multi-Phases

Pour des tâches complexes, divisez en phases distinctes :

```markdown
# Refactoring Complexe

## Phase 1 : ANALYSE SEULEMENT (NO MODIFICATION)

### Actions
1. Lire tous les fichiers concernés
2. Mapper les dépendances
3. Identifier les duplications
4. Créer une todo list

### Livrable
Rapport d'analyse présenté à l'utilisateur

**🛑 STOP : Attendre approbation avant Phase 2**

---

## Phase 2 : PLANIFICATION

### Actions
1. Proposer une stratégie de refactoring
2. Identifier les risques
3. Suggérer l'ordre des modifications
4. Estimer l'impact

### Livrable
Plan détaillé avec alternatives

**🛑 STOP : Attendre choix utilisateur avant Phase 3**

---

## Phase 3 : EXÉCUTION (SI APPROUVÉ)

### Actions
1. Appliquer les changements un par un
2. Après CHAQUE modification :
   - Vérifier que le code compile
   - Exécuter les tests
   - Commiter si succès
3. Si échec : rollback et informer

### Livrable
Code refactorisé et validé

---

## Phase 4 : VALIDATION FINALE

### Actions
1. Exécuter tous les tests
2. Vérifier le linting
3. Vérifier le build
4. Générer un rapport de changements

### Livrable
Résumé complet des modifications
```

### Pattern 2 : Template Generator

Créez des structures de fichiers complètes :

```markdown
# Générateur de Feature Complète

## Structure à Créer

```
src/features/[feature-name]/
├── index.ts
├── [FeatureName].tsx
├── [FeatureName].test.tsx
├── [FeatureName].styles.ts
├── hooks/
│   └── use[FeatureName].ts
├── types.ts
└── README.md
```

## Fichier 1 : index.ts
```typescript
export { [FeatureName] } from './[FeatureName]';
export type { [FeatureName]Props } from './types';
export { use[FeatureName] } from './hooks/use[FeatureName]';
```

## Fichier 2 : [FeatureName].tsx
[Template complet du composant...]

[Continuer pour chaque fichier...]
```

### Pattern 3 : Validation en Cascade

Validez progressivement avant d'exécuter :

```markdown
## Validation en Cascade

### Niveau 1 : Validation Syntaxique
- [ ] Fichiers existent
- [ ] Chemins valides
- [ ] Format des données correct

**Si échec** : Arrêter et informer

### Niveau 2 : Validation Sémantique
- [ ] Dépendances installées
- [ ] Versions compatibles
- [ ] Configuration valide

**Si échec** : Proposer installation/correction

### Niveau 3 : Validation Logique
- [ ] Les changements ont du sens
- [ ] Pas de conflits
- [ ] Respecte les contraintes

**Si échec** : Expliquer le problème et demander clarification

### Niveau 4 : Confirmation Utilisateur
- [ ] Présenter le plan complet
- [ ] Attendre approbation

**Seulement si TOUS les niveaux passent** : Exécuter
```

### Pattern 4 : Conditionnement Contextuel

Adaptez le comportement selon le contexte :

```markdown
## Comportement Conditionnel

### Si environnement de production détecté
```bash
if [ "$NODE_ENV" = "production" ]; then
  echo "ATTENTION : Environnement de production détecté"
  echo "Voulez-vous vraiment continuer ? (oui/non)"
  # Attendre confirmation explicite
fi
```

### Si tests échouent
1. Montrer les erreurs
2. Proposer des corrections
3. NE PAS continuer sans validation

### Si dépendances manquantes
1. Lister les dépendances manquantes
2. Proposer : `npm install [packages]`
3. Demander permission d'installer

### Si fichiers non-versionnés
1. Avertir qu'il y a des fichiers non-trackés
2. Proposer de les ajouter ou ignorer
3. Ne pas continuer sans décision
```

## Débogage et Optimisation

### Skill ne s'active pas

**Diagnostic** :

1. **Testez la visibilité**
   ```
   Demandez à Claude : "Quels skills sont disponibles ?"
   ```
   Si votre skill n'apparaît pas : problème de localisation

2. **Vérifiez l'emplacement**
   ```bash
   # Skills personnels
   ls -la ~/.claude/skills/mon-skill/SKILL.md

   # Skills projet
   ls -la .claude/skills/mon-skill/SKILL.md
   ```

3. **Validez le YAML**
   - Les `---` doivent être présents au début et à la fin
   - Pas d'erreur d'indentation
   - Pas de caractères spéciaux non-échappés

4. **Testez avec des mots-clés exacts**

   Si votre description dit :
   ```yaml
   description: ...Utiliser quand l'utilisateur demande de créer un commit...
   ```

   Testez avec :
   ```
   Aide-moi à créer un commit
   ```

### Skill s'active mais ne fait pas ce qui est attendu

**Causes possibles** :

1. **Instructions ambiguës**

   ❌ Vague :
   ```markdown
   Crée des tests si nécessaire
   ```

   ✅ Précis :
   ```markdown
   Tu DOIS créer des tests pour :
   - Chaque fonction exportée
   - Au minimum 3 cas par fonction (nominal, erreur, edge case)

   Ne crée PAS de tests pour :
   - Fonctions privées
   - Types/interfaces
   - Constantes
   ```

2. **Manque de structure**

   Utilisez des sections claires et numérotées

3. **Exemples manquants**

   Ajoutez toujours des exemples concrets

### Améliorer la performance

**1. Réduire la taille du contenu**

Évitez les répétitions inutiles. Soyez concis mais complet.

**2. Externaliser les références longues**

Créez des fichiers séparés pour les templates et exemples détaillés :

```markdown
Pour le template complet, voir [template.md](template.md)
Pour des exemples détaillés, voir [examples.md](examples.md)
```

**3. Utiliser des checklists**

Les checklists sont claires et rapides à traiter :

```markdown
## Validation
- [ ] Tests passent
- [ ] Linting réussi
- [ ] Build sans erreurs
- [ ] Pas de warnings
```

## Maintenance des Skills

### Versioning

Documentez les changements importants :

```yaml
---
name: my-skill
description: Mon skill v2.1 - [Ce que fait le skill]. Utiliser quand...
---

# Mon Skill

## Changelog

### v2.1 (2024-01-20)
- Ajouté support pour TypeScript 5
- Amélioration de la détection des frameworks

### v2.0 (2024-01-15)
- Refonte complète de la logique
- BREAKING: Changement du format de sortie

### v1.0 (2024-01-01)
- Version initiale
```

### Tests de Régression

Créez des cas de test mentaux :

```markdown
# Tests pour ce skill

## Test 1 : Cas nominal
Input : Fichier TypeScript standard avec 3 fonctions
Expected : 3 fichiers de test avec 9 tests minimum

## Test 2 : Gestion d'erreur
Input : Chemin de fichier invalide
Expected : Message d'erreur clair + suggestion de fichiers similaires

## Test 3 : Edge case
Input : Fichier sans exports
Expected : Message expliquant qu'il n'y a rien à tester
```

### Refactoring

**Quand refactoriser** :

- Le contenu dépasse 500 lignes
- Le skill fait plusieurs choses distinctes
- Vous utilisez souvent des variations du skill

**Comment refactoriser** :

Divisez en plusieurs skills spécialisés :

```yaml
# Avant (trop complexe)
name: do-everything

# Après (séparé)
name: analyze-code       # Analyse seulement
name: generate-tests     # Génération seulement
name: run-validation     # Validation seulement
```

## Partage et Distribution

### Préparation pour le Partage

**1. Rendez-le portable**

```markdown
## Configuration Automatique

### Détection du gestionnaire de paquets
```bash
if [ -f "package-lock.json" ]; then
  PKG_MGR="npm"
elif [ -f "yarn.lock" ]; then
  PKG_MGR="yarn"
elif [ -f "pnpm-lock.yaml" ]; then
  PKG_MGR="pnpm"
fi
```

N'assume RIEN sur l'environnement de l'utilisateur.
```

**2. Documentez les dépendances**

```yaml
---
name: pdf-processor
description: Traite des fichiers PDF (extraction, fusion). Utiliser pour opérations sur PDFs.
---

# PDF Processor

## Prérequis

Ce skill nécessite :
- Python 3.8+
- Package `pypdf` : `pip install pypdf`
- Package `pdfplumber` : `pip install pdfplumber`

### Installation

```bash
pip install pypdf pdfplumber
```
```

**3. Incluez un README**

Créez `README.md` dans le dossier du skill :

```markdown
# Mon Skill

## Description
[Description détaillée]

## Installation
```bash
mkdir -p ~/.claude/skills/mon-skill
# Copier les fichiers...
```

## Usage
[Exemples de phrases pour déclencher le skill]

## Configuration
[Options de configuration si applicable]

## Exemples
[Exemples concrets]
```

### Distribution via Git

**Projet avec Skill** :

```bash
# Structure
mon-projet/
├── .claude/
│   └── skills/
│       └── project-skill/
│           ├── SKILL.md
│           └── README.md
├── src/
└── package.json

# Partage
git add .claude/
git commit -m "docs: add project skill"
git push
```

Toute l'équipe obtient le skill automatiquement !

## Sécurité des Skills

### Ne jamais inclure

❌ **Interdits** :
- Tokens d'API
- Mots de passe
- Clés privées
- Chemins absolus vers votre machine
- Informations personnelles

### Bonnes pratiques

✅ **Recommandé** :

```markdown
## Authentification

Utiliser les variables d'environnement :
- `GITHUB_TOKEN` pour l'API GitHub
- `API_KEY` pour l'API externe

Vérifier la présence :
```bash
if [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: GITHUB_TOKEN not set"
  exit 1
fi
```

NE JAMAIS mettre de token en dur dans le skill !
```

## Ressources et Aide

### Documentation Officielle

- [Claude Code Skills](https://code.claude.com/docs/en/skills.md)
- [Claude Code Plugins](https://code.claude.com/docs/en/plugins.md)

### Communauté

- GitHub : Partagez vos skills publiquement
- Discord Claude : Discussions et aide

### Déboguer

```bash
# Mode debug de Claude Code
claude --debug

# Voir les skills disponibles
# Demandez à Claude : "Liste tous les skills disponibles"

# Inspecter un skill
cat ~/.claude/skills/mon-skill/SKILL.md
```

## Conclusion

Les skills sont un outil puissant pour personnaliser Claude Code. Avec ces techniques avancées :

**Principes clés** :
1. **Description > Tout** : Une description claire et spécifique est essentielle
2. **Structure > Longueur** : Un contenu bien structuré bat un long contenu
3. **Exemples > Explications** : Des exemples concrets valent mieux que des explications abstraites
4. **Contraintes > Confiance** : Définissez explicitement les limites
5. **Validation > Exécution** : Validez avant d'agir

**Workflow recommandé** :
1. Commencez simple
2. Testez souvent
3. Itérez progressivement
4. Documentez les changements
5. Partagez avec l'équipe

Vous êtes maintenant équipé pour créer des skills sophistiqués et performants !
