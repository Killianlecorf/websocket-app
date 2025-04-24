import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { exec } from 'child_process';

const PROTO_PATH = path.resolve(__dirname, '../proto/messaging.proto');

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
const chatPackage = grpcObject.chat;

let messagesPerSecond = 0;

setInterval(() => {

  if (messagesPerSecond > 0) {
    console.log(`[📊] Messages par seconde (gRPC): ${messagesPerSecond}`);
  }

  messagesPerSecond = 0;
}, 1000);

function chat(call: any) {
  call.on('data', (msg: any) => {
    messagesPerSecond++;
    const response = {
      sender: msg.sender,
      timestamp: Date.now(),
      text: msg.text,
    };
    call.write(response);
  });

  call.on('end', () => {
    call.end();
  });
}

const server = new grpc.Server();
server.addService(chatPackage.ChatService.service, { Chat: chat });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC Server started on localhost:50051');
  server.start();

  const clientProcess = exec('ts-node src/client.ts');

  clientProcess.stdout?.on('data', (data) => {
    process.stdout.write(data);
  });

  clientProcess.stderr?.on('data', (data) => {
    process.stderr.write(data);
  });

  clientProcess.on('close', (code) => {
    console.log(`Client exited with code ${code}`);
  });
});
