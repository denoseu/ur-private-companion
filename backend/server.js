const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", //frontend
    methods: ["GET", "POST"]
  }
});

let connectedUsers = 0;

io.on('connection', (socket) => {
  connectedUsers++;
  io.emit('users', connectedUsers);

  socket.on('cursor', (position) => {
    socket.broadcast.emit('cursor', position);
  });

  socket.on('disconnect', () => {
    connectedUsers--;
    io.emit('users', connectedUsers);
  });
});

server.listen(4000, () => {
  console.log('WebSocket server listening on port 4000');
});
