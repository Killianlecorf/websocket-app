"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const clientManager_1 = require("./clientManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('[+] Client connected');
    (0, clientManager_1.addClient)(ws);
    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data.toString());
            if (msg.type === 'message') {
                const serverMsg = {
                    type: 'broadcast',
                    sender: msg.sender,
                    timestamp: Date.now(),
                    text: msg.text,
                };
                (0, clientManager_1.broadcast)(serverMsg);
                console.log(`[>] Broadcasted: ${msg.text}`);
            }
        }
        catch (err) {
            console.error('[!] Invalid message format', err);
        }
    });
});
console.log('✅ WebSocket server started on ws://localhost:8080');
