
define(function(require) {

  "use strict";

  require('shared.utils/viewMaster');
  require('shared.controllers/views/viewsController');
  require('shared.utils/lessonApi');

  var $ = require('jquery'),
      broker = require('shared.utils/broker'),
      connectionsController = require('shared.controllers/connections/connectionsController'),
      academyWrapperView = require('./views/wrapper/academyWrapperView'),
      appModel = require('shared.models/app/appModel'),
      router = require('router');

  return {

    init : function() {

      academyWrapperView.render();
      broker.trigger('views:error', 'Loading . . .');
      broker.trigger('get:collection:glossary');
      connectionsController.init();

      Backbone.history.start();

      return $.Deferred().resolve();

    },

    start : function(params) {

      appModel.on('change:applicationLoaded', function () {

        broker.trigger('views:navTools views:renderHeader');

        if(params && params.navigate === '' || params && params.navigate === null || typeof params && params.navigate === 'undefined') {
          broker.trigger('tab:all');
          return;
        }

        router.navigate(params.navigate, {trigger : true});

      });

      $('#close-modal').click(function() {
        broker.trigger('modal:close');
      });
      $('#close-sub-modal').click(function() {
        broker.trigger('modal:sub:close');
      });

      return $.Deferred().resolve();

    },

    stop : function() {
      return $.Deferred().resolve();
    }

  };

});