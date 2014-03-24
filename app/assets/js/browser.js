'use strict';
/*jshint unused:false */

// load jquery et all via browserify
var _          = require('underscore');
var $          = require('jquery');
var Backbone   = require('backbone');
Backbone.$      = $;

var WorkRoutes = require('./routers/WorkRouter');

$(function() {
  console.log("browser.js");
  var workRoutes = new WorkRoutes();
  workRoutes.start();
});

