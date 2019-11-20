/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;
var SerialPort = require('serialport'); // serial library
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
router.post('/requestDrink', function(req,res) {
	console.log(req.body);
});

//---------------------- WEBAPP SERVER SETUP ---------------------------------//
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory
app.use('/api',router);

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
if (!process.argv[2]) {
  console.error('Usage: node ' + process.argv[1] + ' SERIAL_PORT');
  process.exit(1);
}
const serial = new SerialPort(process.argv[2], {});
//----------------------------------------------------------------------------//
console.log('c');
serial.write('c');
//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
//io.on('connect', function(socket) {
//  console.log('a new user connected');

//  socket.on('message', (data) => { // If we get a new message from the client we process it;
//    console.log(data);
//  });
//  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
//    console.log('user disconnected');
//  });
//});

//----------------------------------------------------------------------------//
