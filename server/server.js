const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Link: https://cryptic-anchorage-76734.herokuapp.com/
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('newMessage', {
    text: 'Welcome to chat app.'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined'
  });

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected clients');
  });
});

// Middleware
app.use(express.static(publicPath));

// Routes

server.listen(port, (e) => {
  if(e) {
    console.log('Unable to connect to server.');
  } else {
    console.log(`Connected to server on PORT ${port}.`);
  }
});
