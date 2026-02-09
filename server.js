const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('유저 접속됨');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Render 배포를 위해 포트 설정 변경
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 돌아가는 중!`);
});