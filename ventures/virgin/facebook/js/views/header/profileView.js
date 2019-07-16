define(function (require) {

  "use strict";

  var userModel = require('shared.models/user/userModel'),
      headerViewTemplate = require('text!views/header/templates/profileViewTpl.tpl');

  var HeaderView = Backbone.ViewMaster.extend({

    initialize: function () {
      this.listenTo(userModel, 'change:avatar', this.render);
    },

    render : function () {
      this._handlebars(headerViewTemplate, userModel.attributes);
      return this;
    }
  });

  return HeaderView;
});