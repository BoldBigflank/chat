var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3000;

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

server.listen(port);



app.configure(function() {
    app.use(express.static(__dirname + '/public'));
      app.use(app.router);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var usernames = {};

var rooms = ['group_a', 'group_b'];

io.sockets.on('connection', function (socket) {

  socket.on('adduser', function(group) {
  	// A socket has declared a group
  	socket.group = group

  	// If someone from the other room
  	var partner_room = (group == 'group_a') ? 'group_b' : 'group_a';
  	console.log(io.sockets.clients(partner_room))
  	if(io.sockets.clients(partner_room).length > 0){
  		//Put this user and someone from the other group in a room.
  		var room = new Date().getTime();
  		var partner = io.sockets.clients(partner_room)[0]
  		partner.leave(partner_room)
  		partner.join(room)
  		partner.room = room
  		socket.join(room)
  		socket.room = room
  		io.sockets.in(room).emit('updaterooms', room)

  	} else {
  		// Else put them in their room to wait
  		socket.join(group)
  		console.log("user added to wait list", group)
  	} 
  	


    // socket.username = username;
    // usernames[username] = username;
    // socket.join('room1');
    // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    // socket.emit('updaterooms', rooms, 'room1');
  });

  socket.on('sendchat', function (data) {
    io.sockets.in(socket.room).emit('updatechat', socket.group, data);
  });

  socket.on('disconnect', function () {
    // delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});