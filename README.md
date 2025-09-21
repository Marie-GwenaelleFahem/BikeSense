# 🚴‍♂️ BikeSense - Système de Monitoring IoT

Système de surveillance intelligent pour vélos avec capteurs IoT, authentification utilisateur et interface web moderne.

## 📋 Structure du Projet

```
BikeSense-main/
├── front/          # Interface React/Vite
├── server/         # API Node.js/Express  
├── docker-compose.yml          # Développement local
├── docker-compose.production.yml # Production
└── TROUBLESHOOTING.md         # Guide de dépannage
```

## 🚀 Démarrage Rapide

### Option 1 : Mode Développement (Recommandé)

```bash
# Backend
cd server
npm install

# Frontend (nouveau terminal)
cd front
npm install
npm run dev
```

**Accès :**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Option 2 : Docker

```bash
# Développement avec base locale
docker-compose up -d

# Production avec base externe
docker-compose -f docker-compose.production.yml up -d
```

## 🔐 Authentification

Le système inclut un système d'authentification complet avec gestion des rôles :

### Compte de Test
- **Email :** `test@bikesense.com`
- **Mot de passe :** `password123`
- **Rôle :** Administrateur

### Rôles Disponibles
- **Admin** : Tous les droits
- **Employee** : Lecture + actions avancées
- **User** : Lecture + actions de base  
- **Viewer** : Lecture seule

## 📊 Fonctionnalités

- ✅ **Dashboard** : Vue d'ensemble des capteurs
- ✅ **Authentification** : Login/Register avec protection des routes
- ✅ **Gestion des rôles** : Système de permissions
- ✅ **Capteurs IoT** : Température, Humidité, Mouvement
- ✅ **Graphiques** : Visualisation des données
- ✅ **Historique** : Consultation des données passées
- ✅ **Alertes** : Configuration des seuils

## 🛠️ Technologies

### Frontend
- React 19 + TypeScript
- Vite + TailwindCSS
- React Router + Context API
- Recharts pour les graphiques

### Backend  
- Node.js + Express + TypeScript
- JWT + bcrypt pour l'auth
- MariaDB (ou système mock)
- Swagger pour la documentation

## 📚 Documentation

- [API Routes](./server/API_Routes.md)
- [Guide de Dépannage](./TROUBLESHOOTING.md)
- [Collection Postman](./server/Bikesense.postman_collection.json)

## 🤝 Équipe

- Jonathan - Développement front-end
- Julie - Développeuse back-end (base de données)
- Rosine - IoT + scrpit MQTT sur serveur Debian
- Gwen - Implémentation authentification et déploiement
- Admin - Infrastructure serveur

---

*Projet créé dans le cadre d'un système IoT pour vélos connectés* 🚴‍♂️
