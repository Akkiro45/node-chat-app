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
  let messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(data) {
    messageTextbox.val('');
  });
});

const locationButton = $('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your brwoser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location..');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
  });
});
