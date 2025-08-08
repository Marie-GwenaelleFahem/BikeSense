# BikeSense - API Server

## Installation et lancement

### Installation des dépendances
```bash
npm install
```

### Configuration de l'environnement

1. **Créer le fichier `.env`** basé sur `.env.example` :

2. **Remplir les variables d'environnement** dans `.env` :

### Connexion à la base de données

#### Option 1 : Base de données distante (recommandée)

La base MariaDB est hébergée sur un serveur distant nécessitant une connexion SSH.

1. **Établir un tunnel SSH** pour rediriger la connexion :
```bash
ssh -L [port_local]:[host_bdd]:[port_bdd] user@remote-server

ssh -L 3307:localhost:3306 user@admin-hetic.arcplex.tech -p XXXX
```

2. **Maintenir le tunnel actif** :
   - Ne pas fermer la fenêtre du terminal pendant l'utilisation
   - Le tunnel redirige le port local 3307 vers le port 3306 du serveur distant par exemple, dépendant de votre environnement

#### Option 2 : Base de données locale

En cas de complications ou de besoin, il est possible de travailler sur une base locale :

### Lancement du serveur

#### Mode développement
```bash
npm run dev
```

#### Mode production
```bash
npm start
```

Le serveur sera accessible sur `http://localhost:3000`

## API Endpoints

### Températures

#### Récupérer toutes les températures
```http
GET /api/temperature
```

**Paramètres de filtrage (optionnels) :**
- `min` : Valeur minimale (ex: `20`)
- `max` : Valeur maximale (ex: `25`)
- `value` : Valeur exacte (ex: `22.5`)
- `start` : Date/heure de début (ex: `2025-08-05` ou `2025-08-05T09:00:00`)
- `end` : Date/heure de fin (ex: `2025-08-05` ou `2025-08-05T17:00:00`)

**Exemples :**
```bash
# Toutes les températures
GET /api/temperature

# Températures entre 20 et 25
GET /api/temperature?min=20&max=25

# Températures du 5 août 2025
GET /api/temperature?start=2025-08-05&end=2025-08-05

# Températures entre 9h et 17h le 5 aoûut
GET /api/temperature?start=2025-08-05T09:00:00&end=2025-08-05T17:00:00
```

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "value": 22.5,
      "date": "2025-08-05T10:30:00.000Z"
    },
    {
      "id": 2,
      "value": 23.1,
      "date": "2025-08-05T10:35:00.000Z"
    }
  ]
}
```

#### Récupérer la température la plus récente
```http
GET /api/temperature/latest
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "id": 1250,
    "value": 24.3,
    "date": "2025-08-05T15:45:00.000Z"
  }
}
```

#### Récupérer les statistiques ou agrégats
```http
GET /api/temperature/aggregate
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "min": 15.2,
    "max": 28.7,
    "avg": 22.1,
    "count": 42
  }
}
```