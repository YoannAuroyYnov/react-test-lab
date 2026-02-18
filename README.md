# React Test Lab

Une application React de démonstration avec tests unitaires, documentation JSDoc et CI/CD automatisée via GitHub Actions.

## Pré-requis

- **Node.js** 22.x ou supérieur
- **pnpm** (gestionnaire de paquets)

Pour installer pnpm :

```bash
npm install -g pnpm
```

## Installation

Cloner le projet et installer les dépendances :

```bash
git clone git@github.com:YoannAuroyYnov/react-test-lab.git
cd react_test_lab
pnpm install
```

## Exécuter l'application

### Mode développement

```bash
pnpm start
```

L'application s'ouvrira automatiquement dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

### Build de production

```bash
pnpm build
```

Les fichiers optimisés seront générés dans le dossier `build/`.

## Exécuter les tests

### Lancer tous les tests

```bash
pnpm test
```

Le rapport de couverture sera disponible dans le dossier `coverage/`.

## Documentation

Pour générer la documentation JSDoc :

```bash
pnpm jsdoc
```

La documentation sera générée dans `public/docs/` et accessible à `http://localhost:300/docs` après le build.

## Déploiement

Le projet est automatiquement déployé sur GitHub Pages via GitHub Actions lors d'un push sur la branche `main`.

URL de déploiement : https://yoannauroyynov.github.io/react-test-lab/
