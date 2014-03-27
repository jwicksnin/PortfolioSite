var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/portfolio-development');

var schema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  link: String,
  //thumbnail: String,
  company: String
});

module.exports = mongoose.model('Work', schema);
