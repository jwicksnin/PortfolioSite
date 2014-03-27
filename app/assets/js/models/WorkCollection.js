'use strict';

var Backbone = require('backbone');
var Work = require('./Work');

module.exports = Backbone.Collection.extend({
  model: Work,
  url: 'http://localhost:3000/api/v1/works'
});
