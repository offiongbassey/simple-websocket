const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server:server  });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    console.log(`A new client connected`);
    ws.send('Welcome new client!');  
    ws.on('message', function message(data, isBinary) {
      console.log('received: %s', data);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    });
  
    
  });

app.get('/', (req, res) => res.send('Welcome'));

const PORT = 3000;
server.listen(3000, () => console.log(`Server running on port: ${ PORT }`));

