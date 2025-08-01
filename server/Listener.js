import mqtt from 'mqtt';
import fs from 'fs';

const client = mqtt.connect('mqtt://192.168.1.51');
const filePath = './data/data.json';

client.on('connect', () => {
  console.log("Connecté au broker MQTT");
  client.subscribe('pws-packet/#');
});

client.on('message', (canalmqtt, message) => {
  const msgString = message.toString();

  try {
    if (!msgString.trim().startsWith('{')) {
      throw new Error('Fichier non JSON');
    }

    const parsed = JSON.parse(msgString);
    console.log("sensor_id reçu :", parsed.sensor_id);

    const capteursRecherchés = [112, 114, 127];

    if (capteursRecherchés.includes(parsed.sensor_id)) {
      let table = [];
      if (fs.existsSync(filePath)) {
        table = JSON.parse(fs.readFileSync(filePath));
      }

      table.push(parsed);
      fs.writeFileSync(filePath, JSON.stringify(table, null, 2));
    } else {
      return console.log(`Capteur ${parsed.sensor_id} ignoré sur ${canalmqtt}`);
    }

  } catch (err) {
    console.warn(`Message ignoré sur [${canalmqtt}] :`, err.message);
  }
});