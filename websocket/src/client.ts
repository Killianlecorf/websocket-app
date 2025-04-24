import WebSocket from 'ws';
import { ClientMessage, ServerMessage } from '../types/types';

const ID = `client-${Math.floor(Math.random() * 1000)}`;
const TOTAL_MESSAGES = 100000;

let sent = 0;
let received = 0;
let latencies: number[] = [];
const timestamps: Record<string, number> = {};

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log(`[+] ${ID} connected. Sending ${TOTAL_MESSAGES} messages...`);

  for (let i = 0; i < TOTAL_MESSAGES; i++) {
    const timestamp = Date.now();
    const msg: ClientMessage = {
      type: 'message',
      sender: ID,
      timestamp
    };
    const msgId = `${ID}-${i}`;
    timestamps[msgId] = timestamp;
    ws.send(JSON.stringify(msg));
    sent++;
  }
});

ws.on('message', (data) => {
  const msg: ServerMessage = JSON.parse(data.toString());
  if (msg.sender === ID) {
    const msgId = `${msg.sender}-${received}`;
    const latency = Date.now() - msg.timestamp;
    latencies.push(latency);
  }
  received++;

  if (received === TOTAL_MESSAGES) {
    const avgLatency = latencies.length
      ? latencies.reduce((a, b) => a + b) / latencies.length
      : 0;
    console.log(`\n📊 Test terminé pour ${ID}`);
    console.log(`Messages envoyés : ${sent}`);
    console.log(`Messages reçus    : ${received}`);
    console.log(`Latence moyenne   : ${avgLatency.toFixed(2)} ms`);
    process.exit(0);
  }
});
