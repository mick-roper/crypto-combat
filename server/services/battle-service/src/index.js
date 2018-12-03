const app = require('express')();
const http = require('http').Server(app);
const { WSServer } = require('websocket');

const port = process.env.PORT || 4500;

app.get('/', (req, res) => {
  res.status(200).send();
});

const wsServer = new WSServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', req => {
  const conn = req.accept('echo-protocol', req.origin);
  
  conn.on('message', message => {
    if (message.type === 'utf8') {
      const data = message.utf8Data;

      console.log(data);
    }
  });

  conn.on('close', (code, description) => {
    console.log(`closed: ${code} ${description}`);
  });
});

http.listen(port, () => console.log(`server listening on *:${port}`));