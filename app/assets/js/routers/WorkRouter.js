'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var Work = require('../models/Work');
var WorkView = require('../views/WorkView');
var WorkCollection     = require('../models/WorkCollection');
var WorkCollectionView = require('../views/WorkCollectionView');


module.exports = Backbone.Router.extend({
  routes: {
    'works/:id': 'show',
    'works': 'index'
  },

  show: function(id){

  },

  start: function(){
    Backbone.history.start({pushState: true});
  },

  index: function() {
    this.workList.fetch();
    $('#Contact').replaceWith(this.workListView.el);
  },

  initialize: function() {
    console.log("work router.js");
    this.workList = new WorkCollection();
    this.workListView = new WorkCollectionView({collection: this.workList});
  }
});
