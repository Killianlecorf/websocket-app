"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const ID = `client-${Math.floor(Math.random() * 1000)}`;
const INTERVAL_MS = 500;
const TEST_DURATION_MS = 10000;
let sent = 0;
let received = 0;
let latencies = [];
const timestamps = {};
const ws = new ws_1.default('ws://localhost:8080');
ws.on('open', () => {
    console.log(`[+] ${ID} connected. Starting test...`);
    const interval = setInterval(() => {
        const msg = {
            type: 'message',
            sender: ID,
            timestamp: Date.now(),
            text: `Hello ${sent}`,
        };
        const msgId = `${ID}-${sent}`;
        timestamps[msgId] = msg.timestamp;
        ws.send(JSON.stringify(msg));
        sent++;
    }, INTERVAL_MS);
    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
            const avgLatency = latencies.length
                ? latencies.reduce((a, b) => a + b) / latencies.length
                : 0;
            console.log(`\n📊 Test terminé pour ${ID}`);
            console.log(`Messages envoyés : ${sent}`);
            console.log(`Messages reçus    : ${received}`);
            console.log(`Latence moyenne   : ${avgLatency.toFixed(2)} ms`);
            process.exit(0);
        }, 2000);
    }, TEST_DURATION_MS);
});
ws.on('message', (data) => {
    const msg = JSON.parse(data.toString());
    if (msg.sender === ID && msg.text.includes(`Hello`)) {
        const msgId = `${msg.sender}-${sent - 1}`;
        const latency = Date.now() - msg.timestamp;
        latencies.push(latency);
    }
    received++;
});
