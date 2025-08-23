// De base se trouve dans le serveur

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