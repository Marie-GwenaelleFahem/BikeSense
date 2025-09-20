# 🚴‍♂️ BikeSense

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MariaDB](https://img.shields.io/badge/MariaDB-10.11-003545?style=flat&logo=mariadb)](https://mariadb.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker)](https://www.docker.com/)

**BikeSense** est une application de surveillance en temps réel pour vélos connectés. Elle collecte et analyse les données de capteurs (température, humidité, mouvement) pour offrir une expérience de monitoring complète avec un système d'alertes intelligent.

## 📋 Table des matières

- [🎯 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🔧 Utilisation](#-utilisation)
- [📊 API Documentation](#-api-documentation)
- [🧪 Tests](#-tests)
- [🐳 Docker](#-docker)
- [📱 Interface utilisateur](#-interface-utilisateur)
- [🔒 Sécurité](#-sécurité)
- [🤝 Contribution](#-contribution)

## 🎯 Fonctionnalités

### 📡 Monitoring des capteurs
- **Température** : Surveillance en temps réel avec seuils configurables
- **Humidité** : Détection d'anomalies et alertes automatiques
- **Mouvement** : Tracking des déplacements avec données d'accélération (x, y, z)

### 🚨 Système d'alertes intelligent
- Alertes configurables par type de capteur
- Niveaux de sévérité : `low`, `medium`, `high`, `critical`
- Notifications en temps réel
- Historique des alertes avec résolution

### 📈 Visualisation des données
- Graphiques en temps réel avec **Recharts**
- Statistiques agrégées (min, max, moyenne)
- Historique des mesures avec filtrage par date
- Dashboard responsive avec **Tailwind CSS**

### 👤 Gestion utilisateur
- Authentification JWT sécurisée
- Inscription/connexion
- Sessions persistantes
- Protection des routes

## 🏗️ Architecture

```
BikeSense/
├── front/                    # Application React/TypeScript
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages principales
│   │   ├── features/        # Fonctionnalités métier
│   │   ├── services/        # Services API
│   │   ├── hooks/           # Hooks personnalisés
│   │   └── context/         # Contextes React
│   └── dist/                # Build de production
├── server/                   # API Node.js/Express
│   ├── src/
│   │   ├── controllers/     # Contrôleurs API
│   │   ├── models/          # Modèles de données
│   │   ├── routes/          # Routes API
│   │   ├── middleware/      # Middlewares (auth, validation)
│   │   └── lib/             # Utilitaires
│   └── sql/                 # Scripts SQL
└── docker-compose.yml       # Orchestration Docker
```

### Stack technique

**Frontend**
- **React 19.1.0** avec TypeScript
- **Tailwind CSS 4.1.11** pour le styling
- **React Router 7.8.1** pour la navigation
- **Recharts 3.1.2** pour les graphiques
- **Axios 1.11.0** pour les requêtes HTTP
- **Lucide React** pour les icônes

**Backend**
- **Node.js** avec **Express 5.1.0**
- **TypeScript 5.8.3**
- **MariaDB 3.4.5** avec driver natif
- **JWT** pour l'authentification
- **Bcrypt** pour le chiffrement des mots de passe
- **Swagger** pour la documentation API

## 🚀 Installation

### Prérequis

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Docker** et **Docker Compose** (optionnel)
- **MariaDB** 10.11+ (ou via Docker)

### Installation manuelle

1. **Cloner le repository**
```bash
git clone <repository-url>
cd BikeSense
```

2. **Installer les dépendances du backend**
```bash
cd server
npm install
```

3. **Installer les dépendances du frontend**
```bash
cd front
npm install
```

### Installation avec Docker

```bash
# Lancer l'ensemble de l'application
docker-compose up -d

# Ou en mode production
docker-compose -f docker-compose.production.yml up -d
```

## ⚙️ Configuration

### Variables d'environnement

1. **Copier le fichier d'exemple** dans le dossier `server/` :
```bash
cp .env.example .env
```

2. **Éditer le fichier `.env`** avec vos propres valeurs :
   - Configuration de la base de données
   - Clé secrète JWT (génération sécurisée recommandée)
   - Paramètres du serveur
   - Variables Docker (optionnel)

> ⚠️ **Important** : 
> - Ne jamais committer le fichier `.env` dans Git
> - Utiliser des mots de passe forts et uniques
> - Générer une clé JWT sécurisée (minimum 32 caractères)
> - Vérifier que `.env` est dans votre `.gitignore`

### Base de données

#### Option 1 : Base distante avec tunnel SSH
```bash
ssh -L [port_local]:[host_bdd]:[port_bdd] user@remote-server
```

#### Option 2 : Base locale avec Docker
```bash
docker-compose up bikesense-db -d
```

## 🔧 Utilisation

### Développement

**Backend (port 3000)**
```bash
cd server
npm run dev
```

**Frontend (port 5173)**
```bash
cd front
npm run dev
```

### Production

**Build et démarrage**
```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd front
npm run build
npm run preview
```

### Accès à l'application

- **Frontend** : http://localhost:5173 (dev) ou http://localhost (prod)
- **API** : http://localhost:3000
- **Documentation Swagger** : http://localhost:3000/api-docs

## 📊 API Documentation

### Endpoints principaux

#### 🌡️ Températures
```http
GET    /api/temperature           # Toutes les mesures
GET    /api/temperature/latest    # Dernière mesure
GET    /api/temperature/aggregate # Statistiques
```

#### 💧 Humidité
```http
GET    /api/humidity              # Toutes les mesures
GET    /api/humidity/latest       # Dernière mesure
GET    /api/humidity/aggregate    # Statistiques
```

#### 🏃 Mouvement
```http
GET    /api/movement              # Tous les mouvements
GET    /api/movement/latest       # Dernier mouvement
GET    /api/movement/aggregate    # Statistiques
```

### Paramètres de filtrage

Tous les endpoints supportent :
- `min`, `max`, `value` : Filtrage par valeur
- `start`, `end` : Filtrage par date/période
- `state` : État du mouvement (pour /movement)

### Exemple de réponse

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "value": 22.5,
      "date": "2025-01-20T10:30:00.000Z"
    }
  ]
}
```

## 🧪 Tests

### Backend
```bash
cd server
npm test              # Mode watch
npm run test:run       # Exécution unique
npm run test:coverage  # Avec coverage
```

### Frontend
```bash
cd front
npm run lint          # Linting ESLint
```

## 🐳 Docker

### Services disponibles

| Service | Description | Port |
|---------|-------------|------|
| `bikesense-frontend` | Interface React | 80 |
| `bikesense-backend` | API Node.js | 3000 |
| `bikesense-db` | Base MariaDB | 3306 |

### Commandes utiles

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart bikesense-backend

# Arrêter tous les services
docker-compose down

# Rebuild et redémarrer
docker-compose up --build -d
```

### Health checks

Tous les services incluent des health checks :
- **API** : Vérification endpoint `/api/health`
- **Frontend** : Test de connexion HTTP
- **Base** : Vérification MariaDB

## 📱 Interface utilisateur

### Pages principales

- **🏠 Dashboard** : Vue d'ensemble des capteurs et alertes
- **📊 Charts** : Visualisation graphique des données
- **📜 History** : Historique complet des mesures
- **⚙️ Settings** : Configuration des alertes et profil
- **🔐 Login/Register** : Authentification utilisateur

### Fonctionnalités UI

- **Design responsive** avec Tailwind CSS
- **Thème moderne** avec animations fluides
- **Alertes en temps réel** avec notifications
- **Graphiques interactifs** avec Recharts
- **Navigation intuitive** avec React Router

## 🔒 Sécurité

### Bonnes pratiques

- **Variables d'environnement** : Ne jamais committer les fichiers `.env`
- **Mots de passe** : Utiliser des mots de passe forts et uniques
- **JWT Secret** : Générer une clé de minimum 32 caractères aléatoires
- **HTTPS** : Utiliser HTTPS en production
- **Mise à jour** : Maintenir les dépendances à jour

### Génération de JWT Secret sécurisé

```bash
# Avec Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Avec OpenSSL
openssl rand -hex 64
```

### Fichiers sensibles à ignorer

Assurez-vous que votre `.gitignore` contient :
```gitignore
# Variables d'environnement
.env
.env.local
.env.production

# Logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# Build
dist/
build/
```

## 🤝 Contribution

### Workflow de développement

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commit** les changements (`git commit -m 'feat: add amazing feature'`)
4. **Push** vers la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

### Standards de code

- **ESLint** pour la qualité du code
- **TypeScript** strict mode
- **Prettier** pour le formatage
- **Conventional Commits** pour les messages

### Architecture des tests

- **Vitest** pour les tests unitaires backend
- **Supertest** pour les tests d'intégration API
- **Tests de validation** pour les endpoints

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une **issue** sur GitHub
- Consulter la **documentation API** via Swagger
- Vérifier les **logs Docker** en cas de problème

---

<div align="center">

**Développé avec ❤️ pour la surveillance intelligente des vélos connectés**

[⭐ Star ce projet](https://github.com/your-username/bikesense) • [🐛 Reporter un bug](https://github.com/your-username/bikesense/issues) • [💡 Demander une feature](https://github.com/your-username/bikesense/issues)

</div>
