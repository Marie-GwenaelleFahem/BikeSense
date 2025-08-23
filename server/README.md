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

## Tests

```bash
npm test          # Mode watch
npm run test:run  # Une seule fois
```

Tests de validation et gestion d'erreur pour l'API.

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

# Températures entre 9h et 17h le 5 août
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

### Humidité

#### Récupérer toutes les mesures d'humidité

```http
GET /api/humidity
```

**Paramètres de filtrage (optionnels) :**

- `min` : Valeur minimale (ex: `40`)
- `max` : Valeur maximale (ex: `60`)
- `value` : Valeur exacte (ex: `55.2`)
- `start` : Date/heure de début (ex: `2025-08-05` ou `2025-08-05T09:00:00`)
- `end` : Date/heure de fin (ex: `2025-08-05` ou `2025-08-05T17:00:00`)

**Exemples :**

```bash
# Toutes les mesures d'humidité
GET /api/humidity

# Humidité entre 40% et 60%
GET /api/humidity?min=40&max=60

# Humidité du 5 août 2025
GET /api/humidity?start=2025-08-05&end=2025-08-05
```

**Réponse :**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "value": 55.2,
      "date": "2025-08-05T10:30:00.000Z"
    },
    {
      "id": 2,
      "value": 54.8,
      "date": "2025-08-05T10:35:00.000Z"
    }
  ]
}
```

#### Récupérer la mesure d'humidité la plus récente

```http
GET /api/humidity/latest
```

**Réponse :**

```json
{
  "success": true,
  "data": {
    "id": 1250,
    "value": 56.1,
    "date": "2025-08-05T15:45:00.000Z"
  }
}
```

#### Récupérer les statistiques d'humidité

```http
GET /api/humidity/aggregate
```

**Réponse :**

```json
{
  "success": true,
  "data": {
    "min": 35.2,
    "max": 78.7,
    "avg": 52.1,
    "count": 42
  }
}
```

### Mouvements

#### Récupérer tous les mouvements

```http
GET /api/movement
```

**Paramètres de filtrage (optionnels) :**

- `state` : État du mouvement (`start-moving`, `stop-moving`, `stationnary`)
- `start` : Date/heure de début (ex: `2025-08-05` ou `2025-08-05T09:00:00`)
- `end` : Date/heure de fin (ex: `2025-08-05` ou `2025-08-05T17:00:00`)

**Exemples :**

```bash
# Tous les mouvements
GET /api/movement

# Seulement les arrêts de mouvement
GET /api/movement?state=stop-moving

# Mouvements du 5 août 2025
GET /api/movement?start=2025-08-05&end=2025-08-05

# Mouvements entre 9h et 17h le 5 août
GET /api/movement?start=2025-08-05T09:00:00&end=2025-08-05T17:00:00
```

**Réponse :**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "state": "start-moving",
      "move_duration": 120,
      "move_number": 1,
      "x_axis": 0.5,
      "y_axis": -0.2,
      "z_axis": 0.8,
      "date": "2025-08-05T10:30:00.000Z"
    },
    {
      "id": 2,
      "state": "stop-moving",
      "move_duration": null,
      "move_number": null,
      "x_axis": null,
      "y_axis": null,
      "z_axis": null,
      "date": "2025-08-05T10:32:00.000Z"
    }
  ]
}
```

#### Récupérer le mouvement le plus récent

```http
GET /api/movement/latest
```

**Réponse :**

```json
{
  "success": true,
  "data": {
    "id": 1250,
    "state": "stationnary",
    "move_duration": null,
    "move_number": null,
    "x_axis": null,
    "y_axis": null,
    "z_axis": null,
    "date": "2025-08-05T15:45:00.000Z"
  }
}
```

#### Récupérer les statistiques de mouvement

```http
GET /api/movement/aggregate
```

**Réponse :**

```json
{
  "success": true,
  "data": {
    "total_movements": 150,
    "start_movements": 45,
    "stop_movements": 45,
    "stationnary_count": 60,
    "avg_move_duration": 125.5,
    "total_duration": 5647
  }
}
```

## Configuration du côté serveur :

Ajoute un bloc `location` dans le vhost Nginx (/etc/nginx/sites-available/default)
Il faut que le `default` ressemble à ça :

```bash
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

 	location /ws {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3006;
        proxy_read_timeout 3600;
        proxy_send_timeout 3600;
    }
    location /healthz {
        return 200 '{"ok": true}';
        add_header Content-Type application/json;
    }
}
```

**server**

- listen 80 → Nginx écoute sur le port 80 (HTTP).
- listen [::]:80 → idem mais en IPv6 (permet au serveur d'être accessible autant en IPv4 qu’en IPv6)
- default_server → c’est le serveur par défaut si aucune autre règle server_name ne correspond.
- server*name *; → \_ est un “catch all” (accepte toutes les requêtes peu importe le nom de domaine).
  → Donc, tout ce qui arrive sur le port 80 est dirigé ici.

**location /ws**
La partie pour que Nginx fasse passer les WebSockets jusqu’au serveur Node.js

- proxy_http_version 1.1 → obligatoire car les WebSockets ne marchent qu’en HTTP/1.1 (pas en HTTP/1.0).
- proxy_set_header Upgrade $http_upgrade; → dit à Nginx d’accepter le “upgrade” vers WebSocket.
- proxy_set_header Connection "Upgrade"; → pour maintenir la connexion WebSocket persistante.
- proxy_set_header Host $host; → garde le header Host d’origine (souvent utile pour les applis qui le vérifient).
- proxy_pass http://127.0.0.1:3006; → redirige la requête WebSocket vers le serveur Node.js qui écoute sur le port 3006.
- proxy_read_timeout 3600; et proxy_send_timeout 3600; → évite que Nginx coupe la connexion après quelques secondes, permet de garder le WS ouvert pendant au moins 1h (modifiable).
  **location /healthz**
  Endpoint de santé (health check) pour monitoring.
- return 200 '{"ok": true}'; → renvoie un JSON statique.
- add_header Content-Type application/json; → précise que c’est bien du JSON.
  → Permet de voir si nginx tourne bien.
  Puis exécuter :

```bash
sudo nginx -t && sudo systemctl reload nginx
```

**sudo nginx -t** est une étape de sécurité qui dit à Nginx de lire tous ses fichiers conf et de vérifier : - s’il n’y a pas d’erreur de syntaxe (accolades manquantes, mauvais mot-clé, etc.), - si les fichiers/répertoires référencés existent bien.
Si tout est bon, il affiche : `nginx: configuration file /etc/nginx/nginx.conf test is successful`
(-t = test)
**sudo systemctl reload nginx** permet de recharger la configuration sans couper les connexions en cours contrairement à `restart`.
**Astuce :** le `&&` fait que la commande `reload` ne s’exécutera **que si** le test est réussi.

## Mise en place du serveur WebSocket

**1. Créer le fichier serveur**
Dans le dossier `server`, créez un fichier `websocket.js` :

```bash
cd server
touch websocket.js
```

**2. Ajouter le code suivant dans `websocket.js`** :

```js
import fs from "fs";
import { WebSocketServer } from "ws";

const PORT = process.env.WS_PORT || 3006;
const TOKEN = process.env.INGEST_TOKEN || "change-me";
const OUT_DIR = process.env.OUT_DIR || "./data";
const OUT_FILE = `${OUT_DIR}/ingest.ndjson`;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Crée un serveur WebSocket
const wss = new WebSocketServer({ port: PORT });
console.log(`[WS] listening on ws://0.0.0.0:${PORT}`);

// Connexion des clients
wss.on("connection", (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const token = url.searchParams.get("token");

  if (token !== TOKEN) {
    console.log("[WS] connexion rejetée: mauvais token");
    ws.close();
    return;
  }

  console.log("[WS] client connecté");

  ws.on("message", (msg) => {
    try {
      fs.appendFileSync(OUT_FILE, msg.toString() + "\n");
    } catch (e) {
      console.error("[WS] erreur écriture fichier:", e.message);
    }
  });

  ws.on("close", () => console.log("[WS] client déconnecté"));
});
```

**Ce script permet de** :

- lancer un serveur WebSocket sur le port 3006 (modifiable via WS_PORT),
- vérifier un token d’authentification (INGEST_TOKEN),
- enregistrer chaque message reçu dans data/ingest.ndjson.
  **3. Installer les dépendances**
  Le package.json est offert dans le dossier `server/`, il suffit de faire :

```bash
npm install
```

ou installer uniquement les dépendances essentielles :

```bash
npm install ws mqtt dotenv
```

**4. Lancer le server**

```bash
node websocket.js
```

On doit voir :

```bash
[WS] listening on ws://0.0.0.0:3006
[WS] client connecté
```

## Cloudflare Tunnel

Cloudflare Tunnel permet de rendre le serveur WebSocket (qui tourne en local sur le serveur à 127.0.0.1:3006) accessible depuis Internet, sans avoir à ouvrir de port ou configurer le pare-feu/NAT.
**1. Installer Cloudflare Tunnel**
Il faudra se placer au home du serveur et télécharger le Cloudflare Tunnel :

```bash
curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

Vérifier que vous avez bien cloudflare avec la commande :

```bash
cloudflared --version
```

**2. Démarrer un tunnel vers Nginx**
Comme vu au-dessus, Nginx écoute sur le port 80 (HTTP), donc on l'expose en faisant la commande :

```bash
cloudflared tunnel --url http://localhost:80
```

Cloudflare te donnera une URL aléatoire encadrée, généralement ça ressemble à ça :

```
https://xxx.trycloudflare.com
```

**3. Accéder au WebSocket**
On ouvre un autre terminal et on lance le websocket :

```bash
wss://xxx.trycloudflare.com/ws?token=change-me
```

**Informations :**

- Le wss:// → sécurisé (WebSocket over HTTPS).
- Le /ws → c’est le location qui a été configuré dans Nginx.
- ?token=... → c’est pour l'auth (trouvable dans le fichier websocket.js dans le dossier server).

## Pont MQTT → WebSocket (client)

Ce script lit les messages du broker MQTT (dans le même réseau que le RPi) et les envoie par WebSocket vers le serveur (exposé via Nginx ou Cloudflare Tunnel).
**1. Fichier `Listener.js`**
**Chargement des libs et du `.env`**

```js
import "dotenv/config";
import mqtt from "mqtt";
import WebSocket from "ws";
```

- `dotenv/config` charge automatiquement les variables du fichier `.env` dans `process.env`.
- `mqtt` sert à se connecter au broker MQTT et à s’abonner aux topics.
- `ws` sert à ouvrir une connexion WebSocket vers ton serveur (ingest).
  **Configuration**

```js
const BROKER = process.env.BROKER_URL;
const TOPIC = process.env.TOPIC;
const WS_HOST = process.env.WS_HOST;
const TOKEN = process.env.INGEST_TOKEN;
const WS_URL = `${WS_HOST}/?token=${encodeURIComponent(TOKEN)}`;
```

Avec uniquement l'utilisation du fichier `.env`

- Lit l’URL du broker MQTT, le topic, l’hôte WS et le token depuis le `.env`.
- Construit l’URL WS finale avec le token en query string.
- Log la config réellement utilisée (très pratique pour vérifier que `.env` est bien lu).
  **Variables d’état WebSocket**

```js
let ws,
  wsReady = false;
```

- `ws` contiendra la connexion WebSocket.
- `wsReady` indique si le WS est actuellement ouvert (pour savoir si on peut envoyer).
  **Connexion WS + reconnexion + keepalive**

```js
function connectWS() {
  ws = new WebSocket(WS_URL);
  ...
}
```

La fonction `connectWS()` permet d':

- Ouvre la connexion WS vers WS_URL.
- Au open : marque prêt + démarre un ping périodique (keepalive) pour éviter les déconnexions silencieuses.
- Au close : passe en non-prêt et re-essaie automatiquement après 2 s.
- Au error : log l’erreur (utile pour diagnostiquer 502/530, refus de token, etc.).
  **Connexion au broker MQTT + abonnement**

```js
const client = mqtt.connect(BROKER);
client.on("connect", () => {
  console.log("[MQTT] connecté à", BROKER);
  ...
})
```

- Se connecte au broker (BROKER).
- S’abonne au topic (TOPIC) — pws-packet/# = tous les sous-topics de pws-packet/.
- Gère les erreurs de connexion/souscription.
  **File d’attente + envoi par lots**

```js
const queue = [];
setInterval(() => {
  if (!wsReady || queue.length === 0) return;
  ...
})
```

- `queue` : tampon pour ne rien perdre si WS est temporairement fermé / lent.
- Toutes les 500 ms : si WS est prêt et que la file n’est pas vide :
- prend jusqu’à 100 messages (batch),
- les envoie en un seul paquet (réduit l’overhead),
- en cas d’échec, remet le lot au début de la file pour réessayer plus tard.
  **Réception des messages MQTT → parsing → enrichissement → queue**

```js
client.on("message", (topic, buf, pkt) => {
  const string = buf.toString().trim();
  if (!(string.startsWith("{") || string.startsWith("["))) return;
  ...
})
```

- Reçoit chaque message MQTT.
- Ignore ce qui n’est pas JSON (sécurité).
- Parse JSON (objet ou tableau).
- Ajoute des métadonnées utiles :
  - \_topic : le topic MQTT d’origine,
  - \_ts_src : timestamp ISO d’arrivée,
  - \_retained : si le message est “retain”.
- Place dans la `queue` pour un envoi ultérieur côté WS (respect des lots/timing).
  → MQTT publie → ça parses et enrichis → ça se tamponne dans queue → si WS est connecté, ça envoie par lots toutes les 500 ms → le serveur WS reçoit et écrit (ex. NDJSON/DB).
  **2. Dépendances**

```bash
cd server
npm i
ou
npm install mqtt ws dotenv
```

**3. Fichier .env**
Le fichier `.env` doit ressembler à ceci :

```env
BROKER_URL=mqtt://192.168.1.51:1883
TOPIC="pws-packet/#"
WS_HOST=wss://xxxxx.trycloudflare.com/ws
INGEST_TOKEN=change-me

```

**4. Lancer le fichier**

```bash
node Listener.js
```

Au démarrage, il y aura un log de configuration comme ceci :

```bash
[CFG] { BROKER: 'mqtt://192.168.1.51:1883',
        TOPIC: 'pws-packet/#',
        WS_HOST: 'wss://xxxxx.trycloudflare.com',
        WS_URL: 'wss://xxxxx.trycloudflare.com/?token=change-me' }
    }
```

Puis

```bash
[MQTT] connecté à mqtt://192.168.1.51:1883
[MQTT] abonné pws-packet/#
[WS] connecté
```

À présent, plus qu'à attendre que le Rasbperry Pi reçoit les données des capteurs.

## FAQ - Dépannage

- [WS] erreur: Unexpected server response: 530/502 → L’URL trycloudflare.com ne pointe plus vers ton tunnel actif.
  **Solution** : Relance sur le serveur : cloudflared tunnel --url http://127.0.0.1:3006 et récupère la nouvelle URL et mets-la dans WS_HOST.
- [WS] erreur: connect ECONNREFUSED 127.0.0.1:3006 → WS_HOST vaut encore la valeur par défaut.
  **Solution** : Vérifie que .env est bien lu (log [CFG]), et que WS_HOST a la bonne URL.
- TOPIC affiche pws-packet/ au lieu de pws-packet/# → Le # peut être interprété comme un commentaire dans certains contextes.
  **Solution** : Bien vérifier que dans le .env, le TOPIC prend bien le "#", ne pas oublier les guillemets.
- Coupures fréquentes (code 1006) → Le keepalive (ping toutes les 5s) est déjà activé côté client.

## Informations :

- On a utilisé Nginx
- NodeJS
- Cloudflare Tunnel

## Schéma d’architecture

```bash
RPi → MQTT broker → Listener.js → WebSocket (Cloudflare Tunnel) → Serveur Node.js → NDJSON
```
