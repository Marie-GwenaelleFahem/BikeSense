# BikeSense API Routes Documentation

Ce document résume toutes les routes disponibles dans l'API BikeSense pour faciliter le développement du front-end.

## Base URL
```
http://localhost:3000/api
```

## Routes par module

### 1. Temperature Routes (`/api/temperatures`)

| Endpoint | Method | Description | Paramètres Query | Exemple |
|----------|--------|-------------|------------------|---------|
| `/` | GET | Récupérer toutes les températures | `min`, `max`, `value`, `start`, `end` | `/api/temperatures?start=2024-01-01&end=2024-01-31` |
| `/latest` | GET | Récupérer la dernière température | Aucun | `/api/temperatures/latest` |
| `/aggregate` | GET | Statistiques agrégées sur une période | `start`*, `end`* | `/api/temperatures/aggregate?start=2024-01-01&end=2024-01-31` |

### 2. Humidity Routes (`/api/humidities`)

| Endpoint | Method | Description | Paramètres Query | Exemple |
|----------|--------|-------------|------------------|---------|
| `/` | GET | Récupérer toutes les humidités | `min`, `max`, `value`, `start`, `end` | `/api/humidities?min=50&max=80` |
| `/latest` | GET | Récupérer la dernière humidité | Aucun | `/api/humidities/latest` |
| `/aggregate` | GET | Statistiques agrégées sur une période | `start`*, `end`* | `/api/humidities/aggregate?start=2024-01-01&end=2024-01-31` |

### 3. Movement Routes (`/api/movements`)

| Endpoint | Method | Description | Paramètres Query | Exemple |
|----------|--------|-------------|------------------|---------|
| `/` | GET | Récupérer tous les mouvements | `state`, `start`, `end` | `/api/movements?state=true&start=2024-01-01` |
| `/latest` | GET | Récupérer le dernier mouvement | Aucun | `/api/movements/latest` |
| `/aggregate` | GET | Statistiques agrégées sur une période | `start`*, `end`* | `/api/movements/aggregate?start=2024-01-01&end=2024-01-31` |

## Paramètres Query Détaillés

### Paramètres Communs
- `start` (string): Date de début au format YYYY-MM-DD ou ISO 8601
- `end` (string): Date de fin au format YYYY-MM-DD ou ISO 8601
- `*` : Paramètre requis pour les routes `/aggregate`

### Paramètres Spécifiques

#### Temperature & Humidity
- `min` (number): Valeur minimale à filtrer
- `max` (number): Valeur maximale à filtrer
- `value` (number): Valeur exacte à rechercher

#### Movement
- `state` (boolean): État du mouvement (true/false)

## Format de Réponse

Toutes les réponses suivent ce format JSON :

### Succès
```json
{
  "success": true,
  "data": {
    // Données spécifiques à l'endpoint
  }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

## Codes de Statut HTTP

- `200` : Succès
- `400` : Paramètres invalides
- `404` : Données non trouvées
- `500` : Erreur serveur

## Exemples d'utilisation en JavaScript (Fetch)

```javascript
// Récupérer toutes les températures
fetch('/api/temperatures')
  .then(response => response.json())
  .then(data => console.log(data));

// Récupérer la dernière température
fetch('/api/temperatures/latest')
  .then(response => response.json())
  .then(data => console.log(data));

// Récupérer les stats de température pour janvier 2024
fetch('/api/temperatures/aggregate?start=2024-01-01&end=2024-01-31')
  .then(response => response.json())
  .then(data => console.log(data));

// Récupérer les mouvements avec filtrage
fetch('/api/movements?state=true&start=2024-01-01')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Notes pour le Front-end

1. **Validation**: Tous les endpoints valident les paramètres d'entrée
2. **Dates**: Utilisez le format ISO 8601 pour les dates (ex: "2024-01-15T10:30:00Z")
3. **Filtres**: Les paramètres de filtrage sont optionnels sauf indication contraire
4. **Agrégation**: Les routes `/aggregate` nécessitent obligatoirement `start` et `end`
5. **Gestion d'erreurs**: Vérifiez toujours `response.success` avant d'utiliser `response.data`
