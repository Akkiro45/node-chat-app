const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// Link: https://cryptic-anchorage-76734.herokuapp.com/
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

// Middleware
app.use(express.static(publicPath));

// SocketIO
io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('join', (params, callBack) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callBack('Name and Room name required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.leave('room name');

    // io.emit() -->  io.to('room name').emit()
    // socket.broadcast.emit() --> socket.broadcast.to('room name').emit()
    // socket.emit()

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app.'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has Joined.`));
    callBack();
  });

  socket.on('createMessage', (msg, callBack) => {
    const user = users.getUser(socket.id);
    if(user && isRealString(msg.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
    }
    callBack();
    // socket.broadcast.emit('newMessage', generateMessage(msg.from, msg.text));
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
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
