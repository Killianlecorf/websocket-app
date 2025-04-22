import WebSocket from 'ws';
import { ServerMessage } from '../types/types';

const clients = new Set<WebSocket>();

export function addClient(ws: WebSocket) {
  clients.add(ws);

  ws.on('close', () => {
    clients.delete(ws);
  });
}

export function broadcast(message: ServerMessage) {
  const data = JSON.stringify(message);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}