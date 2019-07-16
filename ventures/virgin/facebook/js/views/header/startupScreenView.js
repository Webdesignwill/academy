define(function (require) {

  "use strict";

  var headerViewTemplate = require('text!views/header/templates/startupScreenViewTpl.tpl');

  var StartupScreenView = Backbone.ViewMaster.extend({

    className : 'startup-screen-view',

    initialize : function () {

    },

    render : function () {
      this.$el.html(headerViewTemplate);
      return this;
    }

  });

  return StartupScreenView;

});