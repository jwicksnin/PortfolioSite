'use strict';
var Backbone = require('backbone');
var _       = require('underscore');
var Work    = require('../models/Work');
var $        = require('jquery');
Backbone.$   = $;

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'work',
  template: _.template('Title: <%= title %> </br> Description: <%= description %> </br> Company: <%= company %>'),

  initialize: function() {
    //console.log(template);
    this.render();
  },

  render: function() {
    var workAttributes = this.model.toJSON();
    console.log(workAttributes);
    //console.log(template);
    this.$el.html(this.template(workAttributes));
    return this;
  }
});
