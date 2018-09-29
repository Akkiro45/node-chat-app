const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

// Link: https://cryptic-anchorage-76734.herokuapp.com/
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.static(publicPath));

// SocketIO

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app.'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined.'));

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    // socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
  });

  socket.on('disconnect', () => {
    console.log('Disconnected clients');
  });
});

// Routes

server.listen(port, (e) => {
  if(e) {
    console.log('Unable to connect to server.');
  } else {
    console.log(`Connected to server on PORT ${port}.`);
  }
});
