"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClient = addClient;
exports.broadcast = broadcast;
const ws_1 = __importDefault(require("ws"));
const clients = new Set();
function addClient(ws) {
    clients.add(ws);
    ws.on('close', () => {
        clients.delete(ws);
    });
}
function broadcast(message) {
    const data = JSON.stringify(message);
    for (const client of clients) {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(data);
        }
    }
}
