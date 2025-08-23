import "dotenv/config";
import mqtt from "mqtt";
import WebSocket from "ws";
import { DataInsertionService } from "./src/lib/dataInsertionService.js";

// --- config ---
const BROKER = process.env.BROKER_URL;
const TOPIC = process.env.TOPIC;
const WS_HOST = process.env.WS_HOST;
const TOKEN = process.env.INGEST_TOKEN;
const WS_URL = `${WS_HOST}/?token=${encodeURIComponent(TOKEN)}`;

console.log("[CFG]", { BROKER, TOPIC, WS_HOST, WS_URL });

let ws,
  wsReady = false;

// --- Connexion WS avec retry + keepalive ---
function connectWS() {
  ws = new WebSocket(WS_URL);

  ws.on("open", () => {
    wsReady = true;
    console.log("[WS] connecté");

    // keepalive : envoie un ping toutes les 5s
    const keepAlive = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      } else {
        clearInterval(keepAlive);
      }
    }, 5000);
  });

  ws.on("close", () => {
    wsReady = false;
    console.log("[WS] fermé, réessaye dans 2 secondes...");
    setTimeout(connectWS, 2000);
  });

  ws.on("error", (e) => console.log("[WS] erreur:", e.message));
}

connectWS();

// --- MQTT ---
const client = mqtt.connect(BROKER);
client.on("connect", () => {
  console.log("[MQTT] connecté à", BROKER);
  client.subscribe(TOPIC, (e) =>
    e
      ? console.error("[MQTT] erreur:", e.message)
      : console.log("[MQTT] abonné", TOPIC)
  );
});

client.on("error", (e) => console.error("[MQTT] erreur:", e.message));

// --- Buffer + envoi ---
const queue = [];
setInterval(() => {
  if (!wsReady || queue.length === 0) return;
  const batch = queue.splice(0, Math.min(queue.length, 100));
  try {
    ws.send(JSON.stringify(batch));
  } catch {
    queue.unshift(...batch);
  }
}, 500);

client.on("message", (topic, buf, pkt) => {
  const string = buf.toString().trim();
  if (!(string.startsWith("{") || string.startsWith("["))) return;
  let parsed;
  try {
    parsed = JSON.parse(string);
  } catch {
    return;
  }
  const items = Array.isArray(parsed) ? parsed : [parsed];
  const now = new Date().toISOString();

  for (const item of items) {
    const enrichedItem = {
      ...item,
      _topic: topic,
      _ts_src: now,
      _retained: !!pkt?.retain,
    };
    queue.push(enrichedItem);

    // insertion en base de données
    DataInsertionService.insertData(enrichedItem).catch((error) => {
      console.error("[DB] Erreur insertion:", error);
    });
  }
});
