define(function (require) {

  var trophyModel = require('shared.models/trophy/trophyModel');

  var TrophiesCollection = Backbone.Collection.extend({
    model : trophyModel
  });

  return new TrophiesCollection();
});