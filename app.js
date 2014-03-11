var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var works = require('./routes/works');

app.get('/api/v1/works', works.collection);

app.post('/api/v1/works', works.createWork);

app.get('/api/v1/works/:id', works.findWorkById);

var server = http.createServer(app);
server.listen(3000, function(){
   console.log("server running");
})
