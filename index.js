//creates a variable called 'express' for express npm package
var express = require('express');
// requires our server to use the express function
var server = express();

var alertRouter = require('./server/routers/alert.router.js');

// connects mongoose to mongoose npm package
var mongoose = require('mongoose');
// creates a variable for where our database resides
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;
// creates the database connection
mongoose.connect(mongoURI);


var port = process.env.PORT || 8080;

server.use(express.static(__dirname + '/public'));

server.get('/', function(req, res){
  res.sendFile('public/html/index.html', {root:__dirname});
});

server.use(alertRouter);

server.listen(port, function(){
  console.log('Now listening on port...', port);
});
