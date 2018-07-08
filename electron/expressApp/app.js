module.exports = () => {
	var express = require('express');

	var app = express();
	var server = require('http').createServer(app);
	var io = require('socket.io')(server);

	// parser
	var bodyParser = require('body-parser');
	app.use(bodyParser.json());

	// logger
	var morgan = require('morgan');
	app.use(morgan('dev'));

	server.listen(3001);

	app.use('/', express.static(__dirname + "/angular/dist/angular"));

	// API routes
	require('./api/routes/socket.routes.js')(app, io);

	io.on('connection', function (socket) {
		console.log('Client connected...');

		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(data);
		});

		// Log whenever a client disconnects from our websocket server
		socket.on('disconnect', function () {
			console.log('client disconnected');
		});

		// When we receive a 'message' event from our client, print out
		// the contents of that message and then echo it back to our client
		// using `io.emit()`
		socket.on('message', (message) => {
			console.log("Message Received: " + message);
			io.emit('message', { type: 'new-message', text: message });
		});
	});

	// db
	// var db_infos = require('./db_infos');
	// var db = require('mongoose');

	// Angular

	// API routes
	// only for example
	// require('./api/routes/todo.routes.js')(app); 

	// server.listen(3001, function () {
	// 	console.log('listening on port 3001...');
	// });


}