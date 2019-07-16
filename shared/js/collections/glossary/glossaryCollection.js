
define(function (require) {

  "use strict";

  var appModel = require('shared.models/app/appModel');

  var GlossaryCollection = Backbone.Collection.extend({

    url : appModel.get('glossary').path

  });

  return new GlossaryCollection();

});