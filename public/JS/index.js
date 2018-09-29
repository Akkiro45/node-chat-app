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

socket.on('newLocationMessage', function(msg) {
  const li = $('<li></li>');
  const a = $('<a target="_blank">My cuurent location.</a>')
  li.text(`${msg.from}: `);
  a.attr('href', msg.url);
  li.append(a);
  $('#messages').append(li);
});

socket.on('disconnect', function() {
  console.log('Disconnected  from server.');
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(data) {
    console.log(data);
  });
});

const locationButton = $('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your brwoser.');
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location.');
  });
});
