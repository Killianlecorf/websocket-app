import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../proto/messaging.proto');

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
const chatPackage = grpcObject.chat;

function chat(call: any) {
  call.on('data', (msg: any) => {
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
});
