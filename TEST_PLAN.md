# Documentation des Tests

## 📊 Vue d'ensemble

Ce projet implémente une suite complète de **119 tests** couvrant la validation de formulaire en deux niveaux :

- **Tests unitaires** : Logique métier du module `validator.js`
- **Tests d'intégration** : Interface React et interactions utilisateur

## 🎯 Couverture de Code

```
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |    93.75 |     100 |     100 |
 src            |     100 |      100 |     100 |     100 |
  App.js        |     100 |      100 |     100 |     100 |
 src/components |     100 |    93.75 |     100 |     100 |
  UserForm.jsx  |     100 |    93.75 |     100 |     100 | 106
----------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       119 passed, 119 total
```

**✅ 100% de couverture** (Statements, Functions, Lines)

## 🧪 Tests Unitaires (validator.js) - 116 tests

### Fonctions testées

| Fonction              | Tests | Couvre                                              |
| --------------------- | ----- | --------------------------------------------------- |
| `validateAge()`       | 9     | Majeur/mineur, dates futures, erreurs de paramètres |
| `validateZipCode()`   | ~20   | Codes FR métropole/Corse/DOM-TOM, formats invalides |
| `validateIndentity()` | ~18   | Noms/prénoms, accents, injection SQL/XSS            |
| `validateName()`      | ~13   | Caractères spéciaux, chiffres, champs vides         |
| `validateEmail()`     | ~25   | Format RFC 5322, injections, domaines invalides     |

### 🛡️ Sécurité - 30+ tests anti-injection

**Vecteurs testés** :

- SQL Injection : `'; DROP TABLE users;--`, `' OR '1'='1`
- XSS : `<script>alert('XSS')</script>`, `<img src=x onerror=...>`
- Path Traversal : `../../../etc/passwd`, `Anne\\root`
- Command Injection : `John; rm -rf /`

**Protection** : Rejet des caractères `<>:;/\@[]{}` dans noms/emails

## 🖥️ Tests d'Intégration (React) - 3 tests

### 1. Happy Path

Remplit le formulaire correctement, vérifie :

- ✅ Bouton disabled → enabled
- ✅ Sauvegarde dans localStorage
- ✅ Vidage des champs après soumission

### 2. Utilisateur Chaotique

Simule erreurs et corrections :

- ✅ Saisies invalides (chiffres, caractères spéciaux, injection SQL)
- ✅ Messages d'erreur affichés
- ✅ Corrections successives
- ✅ Validation finale

### 3. Counter (Sanity Check)

Test basique de fonctionnement

## 📝 Règles de Validation

| Champ              | Règles                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| **Prénom/Nom**     | Obligatoire, pas de chiffres ni caractères spéciaux, accents autorisés |
| **Email**          | Format valide (RFC 5322), présence de @ et domaine                     |
| **Date naissance** | Majeur (18+ ans), pas de date future                                   |
| **Code postal**    | 5 chiffres, codes français valides uniquement (01-95, 20xxx, 971-976)  |

## 🚀 Commandes

```bash
# Tous les tests avec couverture
pnpm test

# Rapport HTML
open coverage/lcov-report/index.html
```

---
