const WebSocket = require('ws');
const clients = new Set()
module.exports.socketHandler = (io) => {
  io.on('connection', (socket) => {
    clients.add(socket)
    console.log(`connected user number: ${clients.size}`);

    socket.on('close', () => {
      console.log(`a user disconnected`);
      clients.delete(socket)
    });
  });
};

module.exports.reminder = (message) => {
  try {
    console.log(message);
    console.log(clients.size);

    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  } catch (err) {
    console.log(err);
  }
}