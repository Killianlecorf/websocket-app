import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../proto/messaging.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
const chatPackage = grpcObject.chat;

const client = new chatPackage.ChatService('localhost:50051', grpc.credentials.createInsecure());

const ID = `client-${Math.floor(Math.random() * 1000)}`;
const TOTAL_MESSAGES = 100000;

let sent = 0;
let received = 0;
let latencies: number[] = [];
const timestamps: Record<string, number> = {};

const call = client.Chat();

console.log(`[+] ${ID} connected. Sending ${TOTAL_MESSAGES} messages...`);

call.on('data', (msg: any) => {
  if (msg.sender === ID && msg.text.includes(`Hello`)) {
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
    call.end();
    process.exit(0);
  }
});

const start = Date.now();
for (let i = 0; i < TOTAL_MESSAGES; i++) {
  const timestamp = Date.now();
  const msg = { sender: ID, timestamp, text: `Hello ${i}` };
  timestamps[`${ID}-${i}`] = timestamp;
  call.write(msg);
  sent++;
}
