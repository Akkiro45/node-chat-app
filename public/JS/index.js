const socket = io();

socket.on('connect', function() {
  console.log('Connected to server.');
});

socket.on('newMessage', function(msg) {
  console.log('newMessage ', msg);
  const li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  $('#messages').append(li);
});

socket.on('disconnect', function() {
  console.log('Disconnected  from server.');
});

// socket.emit('createMessage', {
//   from: 'Akkiro',
//   text: 'Hi'
// }, function(data) {
//   console.log('Got it!', data);
// });

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(data) {
    console.log(data);
  });
});
