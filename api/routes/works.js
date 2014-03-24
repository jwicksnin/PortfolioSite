'use strict';

var Work = require('../models/Work');

exports.collection = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  Work.find({}, function(err, works){
    if(err){
      res.writeHead(500);
      res.send({'error': err});
    } else{
      res.send(works);
    }
  });
};

exports.createWork = function(req, res){
  res.setHeader('Content-Type', 'application/json');

  var work = new Work(req.body);
  work.save(function(err, responseWork){
    if(err){
      res.writeHead(500);
      res.send({'error': err});
    } else {
      res.send(responseWork);
    }
  });
};

exports.findWorkById = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;
  Work.findOne({'_id': String(id)}, function(err, responseWork){
    if(err) {
      res.send({'error': err});
    } else {
      res.send(responseWork);
    }
  });
};

exports.updateWork = function(req, res){
  //res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;
  var work = req.body;
  Work.update({'_id': String(id)}, work, function(err){
    if(err) {
      res.send({'error': err});
    } else {
      res.send({msg: 'success'});
    }
  });
};

exports.deleteWork = function(req, res){
  var id = String(req.params.id);
  Work.remove({'_id': id}, function(err){
    if(err) {
      res.send({'error': err});
    } else {
      res.send({msg: 'success'});
    }
  });
};
