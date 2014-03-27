'use strict';

var Backbone = require('backbone');
var WorkView = require('./WorkView');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'listAll',

  initialize: function() {
    this.collection.on('add', this.addWork, this);
    this.collection.on('reset', this.addAll, this);
  },

  addWork: function(work) {
    var workView = new WorkView({model: work});
    this.$el.append(workView.el);
  },

  addAll: function(){
    this.collection.forEach(this.addWork);
  },

  render: function(){
    this.addAll();
  }
})
