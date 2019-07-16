
define(function (require) {

  "use strict";

  var errorTpl = require('text!./templates/errorTpl.tpl'),
      appModel = require('shared.models/app/appModel');

  var ErrorView = Backbone.ViewMaster.extend({

    id : appModel.get('viewIdentifiers').error,
    className : appModel.get('viewIdentifiers').error,

    initialize : function (error) {
      this._removeSubViews();
      this.error = error;
    },

    render : function () {
      this._handlebars(errorTpl, this.error);
      return this;
    }

  });

  return ErrorView;

});