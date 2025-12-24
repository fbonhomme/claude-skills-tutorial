# Cas Pratique : Installation de Skills Officiels

Ce guide pratique vous montre comment installer et utiliser 5 skills du [dépôt officiel Anthropic](https://github.com/anthropics/skills) dans votre projet.

## Vue d'ensemble

Nous allons installer ces 5 skills professionnels :

1. **PDF** - Manipulation complète de fichiers PDF
2. **XLSX** - Création et analyse de feuilles de calcul Excel
3. **Frontend Design** - Conception d'interfaces utilisateur distinctives
4. **Skill Creator** - Guide pour créer vos propres skills
5. **MCP Builder** - Création de serveurs MCP (Model Context Protocol)

## Prérequis

- Git installé
- Claude Code configuré
- Un projet existant ou nouveau

## Installation dans un Projet

### Méthode 1 : Installation Globale (Tous vos projets)

Pour avoir ces skills disponibles partout :

```bash
# Créer le répertoire des skills personnels
mkdir -p ~/.claude/skills

# Cloner le dépôt officiel
cd ~/.claude/skills
git clone https://github.com/anthropics/skills.git anthropic-skills

# Créer des liens symboliques vers les skills souhaités
ln -s anthropic-skills/skills/pdf pdf
ln -s anthropic-skills/skills/xlsx xlsx
ln -s anthropic-skills/skills/frontend-design frontend-design
ln -s anthropic-skills/skills/skill-creator skill-creator
ln -s anthropic-skills/skills/mcp-builder mcp-builder
```

### Méthode 2 : Installation Projet (Partagée avec l'équipe)

Pour partager ces skills avec votre équipe via Git :

```bash
# Dans votre projet
cd mon-projet

# Créer le répertoire des skills projet
mkdir -p .claude/skills

# Cloner le dépôt dans un sous-dossier temporaire
git clone https://github.com/anthropics/skills.git temp-skills

# Copier les skills souhaités
cp -r temp-skills/skills/pdf .claude/skills/
cp -r temp-skills/skills/xlsx .claude/skills/
cp -r temp-skills/skills/frontend-design .claude/skills/
cp -r temp-skills/skills/skill-creator .claude/skills/
cp -r temp-skills/skills/mcp-builder .claude/skills/

# Nettoyer
rm -rf temp-skills

# Versioner avec Git
git add .claude/skills/
git commit -m "docs: add official Anthropic skills"
git push
```

### Méthode 3 : Installation Sélective (Copie Manuelle)

Pour installer un skill spécifique :

```bash
# Créer le répertoire du skill
mkdir -p .claude/skills/pdf

# Télécharger le SKILL.md
curl -o .claude/skills/pdf/SKILL.md \
  https://raw.githubusercontent.com/anthropics/skills/main/skills/pdf/SKILL.md

# Télécharger les fichiers de référence s'ils existent
curl -o .claude/skills/pdf/reference.md \
  https://raw.githubusercontent.com/anthropics/skills/main/skills/pdf/reference.md

curl -o .claude/skills/pdf/forms.md \
  https://raw.githubusercontent.com/anthropics/skills/main/skills/pdf/forms.md
```

## Vérification de l'Installation

Pour vérifier que les skills sont bien installés :

```bash
# Vérifier la structure
ls -la .claude/skills/

# Devrait afficher :
# pdf/
# xlsx/
# frontend-design/
# skill-creator/
# mcp-builder/

# Vérifier qu'un skill contient SKILL.md
ls .claude/skills/pdf/
# Devrait afficher : SKILL.md, reference.md, forms.md, etc.
```

Dans Claude Code, demandez :
```
Quels skills sont disponibles ?
```

Claude devrait lister vos 5 nouveaux skills.

---

## Skill 1 : PDF - Manipulation de Documents PDF

### Description

Le skill PDF permet de manipuler des fichiers PDF de manière programmatique : extraction de texte/tables, fusion, découpage, création, remplissage de formulaires.

### Dépendances Python Requises

```bash
# Installer les bibliothèques Python nécessaires
pip install pypdf pdfplumber reportlab
```

### Cas d'Usage Pratique

#### Exemple 1 : Extraire du texte d'un PDF

**Demande à Claude :**
```
J'ai un PDF nommé "rapport-2024.pdf", peux-tu en extraire tout le texte ?
```

**Ce que Claude fera :**
- Activera automatiquement le skill PDF
- Utilisera `pdfplumber` pour extraire le texte
- Préservera la mise en page
- Retournera le texte formaté

#### Exemple 2 : Fusionner plusieurs PDFs

**Demande :**
```
Fusionne les fichiers chapitre1.pdf, chapitre2.pdf et chapitre3.pdf
en un seul document "livre-complet.pdf"
```

**Claude utilisera :**
```python
from pypdf import PdfWriter

writer = PdfWriter()
for pdf in ['chapitre1.pdf', 'chapitre2.pdf', 'chapitre3.pdf']:
    writer.append(pdf)
writer.write('livre-complet.pdf')
```

#### Exemple 3 : Remplir un formulaire PDF

**Demande :**
```
Remplis le formulaire formulaire-contact.pdf avec :
- Nom: Jean Dupont
- Email: jean@example.com
- Message: Demande d'information
```

Claude utilisera les instructions du fichier `forms.md` pour remplir le formulaire.

### Fichiers Inclus

- `SKILL.md` - Instructions principales
- `reference.md` - Référence complète des bibliothèques
- `forms.md` - Guide spécifique pour les formulaires PDF

---

## Skill 2 : XLSX - Feuilles de Calcul Excel

### Description

Création, modification et analyse de fichiers Excel avec support complet des formules, formatage, analyse de données et visualisation.

### Dépendances Python Requises

```bash
pip install openpyxl pandas xlsxwriter
```

### Cas d'Usage Pratique

#### Exemple 1 : Créer un fichier Excel avec formules

**Demande :**
```
Crée un fichier Excel "ventes-2024.xlsx" avec :
- Colonne A : Mois (Janvier à Décembre)
- Colonne B : Ventes (valeurs de 1000 à 5000)
- Colonne C : Formule pour TVA à 20%
- Ligne 13 : Total des ventes
Ajoute du formatage professionnel
```

**Claude créera :**
```python
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment

wb = openpyxl.Workbook()
ws = wb.active

# En-têtes avec formatage
headers = ['Mois', 'Ventes HT', 'TVA 20%', 'Total TTC']
for col, header in enumerate(headers, 1):
    cell = ws.cell(1, col, header)
    cell.font = Font(bold=True)
    cell.fill = PatternFill(start_color="4472C4", fill_type="solid")

# Données avec formules
mois = ['Janvier', 'Février', 'Mars', ...]
for row, mois_nom in enumerate(mois, 2):
    ws.cell(row, 1, mois_nom)
    ws.cell(row, 2, random.randint(1000, 5000))
    # Formule pour TVA
    ws.cell(row, 3, f'=B{row}*0.2')
    # Formule pour TTC
    ws.cell(row, 4, f'=B{row}+C{row}')

# Total
ws.cell(13, 1, 'TOTAL')
ws.cell(13, 2, '=SUM(B2:B12)')
ws.cell(13, 3, '=SUM(C2:C12)')
ws.cell(13, 4, '=SUM(D2:D12)')

wb.save('ventes-2024.xlsx')
```

#### Exemple 2 : Analyser un fichier Excel existant

**Demande :**
```
Analyse le fichier donnees-clients.xlsx et donne-moi :
- Nombre total de clients
- Moyenne d'âge
- Répartition par ville
```

Claude lira le fichier avec pandas et générera un rapport d'analyse.

#### Exemple 3 : Créer un rapport financier

**Demande :**
```
Crée un modèle financier Excel pour un business plan avec :
- Prévisions sur 3 ans
- Revenus, coûts, profit
- Graphiques automatiques
- Formatage professionnel avec code couleur
```

Le skill appliquera les conventions de formatage financier (vert pour positif, rouge pour négatif, etc.).

### Bonnes Pratiques du Skill

- ✅ Utilise toujours des formules (pas de valeurs calculées en dur)
- ✅ Applique le formatage des nombres (€, %, etc.)
- ✅ Code couleur professionnel
- ✅ Vérifie que les formules fonctionnent avec `recalc.py`

---

## Skill 3 : Frontend Design - Conception d'Interface

### Description

Guide pour créer des interfaces frontend distinctives et production-ready qui évitent les clichés génériques de l'IA.

### Philosophie du Skill

Ce skill pousse à créer des designs **uniques et mémorables** plutôt que génériques.

### Cas d'Usage Pratique

#### Exemple 1 : Créer une landing page distinctive

**Demande :**
```
Crée une landing page pour une startup de crypto avec un style brutalist
```

**Claude va :**
1. **Analyser le contexte** : Crypto + Brutalist = Design brut, typographie audacieuse
2. **Choisir une direction** :
   - Fonts : Space Grotesk, Unbounded (pas Arial/Inter)
   - Couleurs : Noir/blanc avec accent néon
   - Layout : Asymétrique, grille cassée
3. **Implémenter** avec animations personnalisées

```tsx
// Exemple de code généré
const LandingPage = () => {
  return (
    <div className="brutalist-container">
      <h1 style={{
        fontFamily: 'Space Grotesk',
        fontSize: '8rem',
        fontWeight: 900,
        lineHeight: 0.9,
        letterSpacing: '-0.05em'
      }}>
        CRYPTO
        <br/>
        <span style={{color: '#00ff00'}}>REVOLUTION</span>
      </h1>
      {/* Design unique, pas de template générique */}
    </div>
  );
};
```

#### Exemple 2 : Dashboard avec personnalité

**Demande :**
```
Crée un dashboard analytics avec une esthétique néo-brutaliste
pour une app de fitness
```

**Direction que Claude prendra :**
- Typographie : Choc, impactante
- Couleurs : Contrastes élevés, pas de pastels
- Layout : Cards avec bordures épaisses
- Animations : Transitions abruptes et énergiques
- Graphiques : Style dessiné à la main

### Ce que le Skill Évite

❌ **À éviter selon le skill** :
- Fonts génériques : Arial, Inter, Roboto
- Gradients violets clichés
- Layouts prévisibles
- Esthétique "générée par IA" fade

✅ **À privilégier** :
- Typographie distinctive : Space Grotesk, Archivo Black, Unbounded
- Direction esthétique claire (minimalist, maximalist, retro, brutalist)
- Compositions spatiales inattendues
- Personnalité forte adaptée au contexte

---

## Skill 4 : Skill Creator - Créateur de Skills

### Description

Guide méta pour créer des skills efficaces. Ce skill aide à concevoir et structurer vos propres skills personnalisés.

### Cas d'Usage Pratique

#### Exemple 1 : Créer un skill personnalisé

**Demande :**
```
Aide-moi à créer un skill pour générer des tests Playwright pour notre app React
```

**Claude vous guidera à travers :**

1. **Définition du scope**
   ```yaml
   ---
   name: playwright-test-generator
   description: Génère des tests E2E Playwright pour composants React. Utiliser quand l'utilisateur demande des tests end-to-end, tests Playwright, ou tests d'intégration UI pour React.
   ---
   ```

2. **Structure du skill**
   ```markdown
   # Playwright Test Generator

   ## Objectif
   Créer des tests E2E Playwright pour composants React avec bonnes pratiques.

   ## Processus
   1. Analyser le composant React
   2. Identifier les interactions utilisateur
   3. Générer les tests avec page objects
   4. Inclure les assertions visuelles

   ## Templates
   [Exemples de tests...]
   ```

3. **Validation et test**
   - Claude créera le fichier dans `.claude/skills/playwright-test-generator/`
   - Vous guidera pour le tester
   - Suggérera des améliorations

#### Exemple 2 : Améliorer un skill existant

**Demande :**
```
J'ai un skill pour créer des commits Git, mais il n'est jamais activé.
Aide-moi à l'améliorer.
```

**Claude analysera :**
- La description (probablement trop vague)
- Le contenu (manque d'exemples ?)
- Les mots-clés déclencheurs

**Et proposera :**
```yaml
# Avant (problème)
description: Aide avec Git

# Après (amélioré)
description: Génère des messages de commit Git suivant Conventional Commits (feat, fix, docs). Utiliser quand l'utilisateur demande de créer un commit, écrire un message de commit, analyser des changements git, préparer un commit, ou faire un git commit.
```

### Principes Enseignés par ce Skill

1. **Modularité** : Un skill = une responsabilité
2. **Description claire** : Inclure QUOI et QUAND
3. **Workflows structurés** : Étapes numérotées
4. **Ressources bundlées** : Scripts, templates, références

---

## Skill 5 : MCP Builder - Création de Serveurs MCP

### Description

Guide complet pour créer des serveurs MCP (Model Context Protocol) qui permettent aux LLMs d'interagir avec des services externes.

### Contexte

MCP est un protocole pour connecter Claude à des outils et services externes (APIs, bases de données, services web, etc.).

### Cas d'Usage Pratique

#### Exemple 1 : Créer un serveur MCP pour GitHub

**Demande :**
```
Aide-moi à créer un serveur MCP pour interagir avec l'API GitHub
```

**Claude vous guidera à travers 4 phases :**

**Phase 1 : Recherche et Planification**
```markdown
## Analyse de l'API GitHub
- Endpoints prioritaires : repos, issues, PRs
- Authentification : Token personnel
- Rate limiting : 5000 req/heure

## Outils à créer
1. github_list_repos - Lister les repos
2. github_create_issue - Créer une issue
3. github_list_issues - Lister les issues
4. github_create_pr - Créer une PR
```

**Phase 2 : Implémentation TypeScript**

Claude générera le code complet :

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "github-mcp-server",
  version: "1.0.0"
});

// Tool : Créer une issue
server.tool(
  "github_create_issue",
  "Crée une nouvelle issue GitHub",
  {
    repo: z.string().describe("Nom du repo (owner/repo)"),
    title: z.string().describe("Titre de l'issue"),
    body: z.string().describe("Description de l'issue"),
  },
  async ({ repo, title, body }) => {
    const [owner, repoName] = repo.split('/');
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
      }
    );

    const issue = await response.json();
    return {
      content: [
        {
          type: "text",
          text: `Issue créée : ${issue.html_url}`
        }
      ]
    };
  }
);
```

**Phase 3 : Tests**
```bash
# Build
npm run build

# Test avec MCP Inspector
npx @modelcontextprotocol/inspector
```

**Phase 4 : Évaluations**

Claude créera 10 questions d'évaluation :

```xml
<evaluation>
  <qa_pair>
    <question>Combien d'issues ouvertes y a-t-il dans le repo anthropics/anthropic-sdk-python avec le label "bug" ?</question>
    <answer>12</answer>
  </qa_pair>
  <!-- ... 9 autres questions -->
</evaluation>
```

#### Exemple 2 : Serveur MCP pour API interne

**Demande :**
```
Crée un serveur MCP pour notre API de gestion de commandes interne
```

Claude créera :
- Structure du projet TypeScript
- Authentification avec votre API
- Outils pour CRUD sur les commandes
- Gestion d'erreurs appropriée
- Documentation complète

### Technologies Supportées

- **TypeScript** (recommandé) : SDK MCP officiel
- **Python** : FastMCP
- **Transports** : HTTP streamable ou stdio

### Bonnes Pratiques Enseignées

1. **Nommage clair** : `service_action_resource`
2. **Descriptions précises** : Aide Claude à choisir le bon outil
3. **Gestion d'erreurs** : Messages actionnables
4. **Pagination** : Pour grandes listes
5. **Annotations** : `readOnlyHint`, `destructiveHint`, etc.

---

## Utilisation Combinée des Skills

### Scénario : Générer un Rapport PDF à partir d'Excel

```
1. J'ai des données dans ventes.xlsx
2. Crée-moi un rapport PDF professionnel avec :
   - Résumé des ventes
   - Tableaux formatés
   - Graphiques
```

**Skills activés automatiquement :**
- **XLSX** : Lire et analyser les données Excel
- **PDF** : Créer le document PDF avec reportlab

Claude orchestrera les deux skills pour :
1. Lire le fichier Excel
2. Analyser les données
3. Générer le PDF avec mise en page professionnelle

### Scénario : Créer un Dashboard et le Documenter

```
Crée un dashboard analytics moderne pour notre app,
puis crée un skill pour générer automatiquement ce type de dashboard
```

**Skills activés :**
- **Frontend Design** : Créer le dashboard avec style unique
- **Skill Creator** : Créer un skill réutilisable

Résultat : Un dashboard + un nouveau skill personnalisé !

---

## Maintenance et Mises à Jour

### Mettre à jour les skills

```bash
# Si installation globale avec git
cd ~/.claude/skills/anthropic-skills
git pull origin main

# Si installation projet
cd mon-projet/.claude/skills
# Re-copier les skills mis à jour
```

### Suivre les changements

Surveillez le dépôt officiel :
- [Anthropic Skills - GitHub](https://github.com/anthropics/skills)
- Changelog dans chaque skill
- Nouvelles releases

### Personnaliser un skill officiel

Si vous voulez modifier un skill :

```bash
# Copier le skill dans un nouveau nom
cp -r .claude/skills/pdf .claude/skills/pdf-custom

# Modifier SKILL.md
vim .claude/skills/pdf-custom/SKILL.md

# Changer le nom dans le frontmatter
---
name: pdf-custom
description: Version personnalisée du skill PDF avec...
---
```

---

## Résolution de Problèmes

### Skill non détecté

**Vérifier :**
```bash
# Le SKILL.md existe ?
ls .claude/skills/pdf/SKILL.md

# Le frontmatter YAML est valide ?
head -10 .claude/skills/pdf/SKILL.md
```

### Skill activé mais erreur

**Pour les skills Python (pdf, xlsx) :**
```bash
# Vérifier les dépendances
pip list | grep pypdf
pip list | grep openpyxl

# Installer si manquant
pip install pypdf pdfplumber reportlab openpyxl pandas
```

### Demander à Claude

```
Liste tous les skills disponibles avec leurs descriptions
```

Claude affichera tous les skills installés.

---

## Ressources Complémentaires

### Documentation Officielle

- [Dépôt Skills Anthropic](https://github.com/anthropics/skills)
- [Documentation MCP](https://modelcontextprotocol.io/)
- [Claude Code Docs](https://code.claude.com/docs)

### Créer vos Propres Skills

Utilisez le skill **skill-creator** :
```
Aide-moi à créer un skill pour [votre cas d'usage]
```

### Contribuer

Si vous améliorez un skill officiel :
1. Fork le dépôt
2. Créez une branche
3. Proposez une Pull Request

---

## Prochaines Étapes

Maintenant que vous avez installé ces 5 skills professionnels :

1. **Testez-les** avec des cas d'usage réels de votre projet
2. **Personnalisez-les** selon vos besoins
3. **Créez vos propres skills** en vous inspirant de ceux-ci
4. **Partagez** avec votre équipe en les versionnant dans Git

**Exemple de test rapide :**
```
Crée-moi un fichier Excel avec 10 produits et leurs prix,
puis génère un PDF récapitulatif professionnel
```

Claude utilisera automatiquement les skills XLSX et PDF ! 🚀
