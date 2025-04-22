"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const serverPath = path_1.default.resolve(__dirname, 'server.ts');
const clientPath = path_1.default.resolve(__dirname, 'client.ts');
console.log(serverPath);
(0, child_process_1.exec)(`node ${serverPath}`, (err, stdout, stderr) => {
    if (err)
        console.error('Server error:', err);
    console.log(stdout);
    console.error(stderr);
});
setTimeout(() => {
    (0, child_process_1.exec)(`ts-node ${clientPath}`, (err, stdout, stderr) => {
        if (err)
            console.error('Client error:', err);
        console.log(stdout);
        console.error(stderr);
    });
}, 1000);
