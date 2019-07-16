
define(function (require) {

  "use strict";

  var Backbone = require('backbone'),
      _ = require('underscore');

  var eventBroker  = _.clone(Backbone.Events);

  return eventBroker;

});