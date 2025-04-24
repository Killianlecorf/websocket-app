import { WebSocketServer } from 'ws';
import { addClient, broadcast } from './clientManager';
import { ClientMessage, ServerMessage } from '../types/types';

const wss = new WebSocketServer({ port: 8080 });

let messagesPerSecond = 0;

setInterval(() => {
  console.log(`[📊] Messages par seconde: ${messagesPerSecond}`);
  messagesPerSecond = 0;
}, 1000);

wss.on('connection', (ws) => {
  console.log('[+] Client connected');
  addClient(ws);

  ws.on('message', (data) => {
    messagesPerSecond++;

    try {
      const msg: ClientMessage = JSON.parse(data.toString());

      if (msg.type === 'message') {
        const serverMsg: ServerMessage = {
          type: 'broadcast',
          sender: msg.sender,
          timestamp: Date.now()
        };

        broadcast(serverMsg);
      }
    } catch (err) {
      console.error('[!] Invalid message format', err);
    }
  });
});

console.log('WebSocket server started on ws://localhost:8080');
