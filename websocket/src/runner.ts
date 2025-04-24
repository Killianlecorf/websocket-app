import { exec } from 'child_process';


const server = exec('ts-node src/server.ts');

server.stdout?.on('data', (data) => {
  process.stdout.write(data);
  if (data.includes('✅ WebSocket server started')) {
    console.log('[*] Serveur prêt. Démarrage du client...');
    exec('ts-node src/client.ts', (err, stdout, stderr) => {
      if (err) {
        console.error('Client error:', err);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
  }
});

server.stderr?.on('data', (data) => {
  console.error(`[Server error] ${data}`);
});
