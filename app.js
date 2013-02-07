var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 3000;

server.listen(port);

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
      app.use(app.router);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var usernames = {};

var rooms = ['group_a', 'group_b'];

io.sockets.on('connection', function (socket) {

  socket.on('adduser', function(group, fn) {
  	// A socket has declared a group
  	socket.group = group

  	// If someone from the other room
  	var partner_room = (group == 'group_a') ? 'group_b' : 'group_a';
  	if(io.sockets.clients(partner_room).length > 0){
  		//Put this user and someone from the other group in a room.
  		var room = new Date().getTime();
  		var partner = io.sockets.clients(partner_room)[0]
  		partner.leave(partner_room)
  		partner.join(room)
  		partner.room = room
      socket.leave(socket.room)
  		socket.join(room)
  		socket.room = room
  		io.sockets.in(room).emit('updaterooms', room)

  	} else {
  		// Else put them in their room to wait
  		socket.leave(socket.room)
      socket.join(group)
  		console.log("user added to wait list", group)
  	} 
    // Change the number of online folks
    var count = io.sockets.clients().length
    var countgroup = Math.max(io.sockets.clients('group_a').length, io.sockets.clients('group_b')) 
    var whois = (io.sockets.clients('group_a').length > io.sockets.clients('group_b')) ? "Listeners" : "Venters";
    io.sockets.emit('onlineusers', count, countgroup, whois )
    
    // Return the user's id
    fn(socket.id)
  	


    // socket.username = username;
    // usernames[username] = username;
    // socket.join('room1');
    // socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    // socket.emit('updaterooms', rooms, 'room1');
  });

  socket.on('typing', function(isTyping){
    socket.broadcast.to(socket.room).emit('isTyping', isTyping)
  })

  socket.on('sendchat', function (data) {
    // Send the message to everyone but themselves
    // Prevent html injection
    var message = data
    socket.broadcast.to(socket.room).emit('updatechat', socket.id, message);
  });

  socket.on('disconnect', function () {
    // delete usernames[socket.username];
    if(socket.room && socket.room != 'group_a' && socket.room != 'group_b'){
      socket.broadcast.to(socket.room).emit('userdisconnected', socket.id);
      // May need to update 'onlineusers'

      var count = io.sockets.clients().length
      var countgroup = Math.max(io.sockets.clients('group_a').length, io.sockets.clients('group_b'))
      var whois = (io.sockets.clients('group_a').length > io.sockets.clients('group_b')) ? "Listeners" : "Venters";
      io.sockets.emit('onlineusers', count, countgroup, whois )
      
    }
  });
});