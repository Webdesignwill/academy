
define(function (require) {

  "use strict";

  var broker = require('shared.utils/broker'),
      appModel = require('shared.models/app/appModel'),
      navigationBackButtonViewTpl = require('text!views/navigation/templates/navigationBackButtonViewTpl.tpl');

  var NavigationBackButtonView = Backbone.ViewMaster.extend({

    tagName : 'button',
    className : appModel.get('viewIdentifiers').navigationBackButton,

    events : {
      'click' : 'handler'
    },

    handler : function () {
      broker.trigger('render:nav reset:search show:header:utilities tab:' + appModel.get('nav'));
    },

    render : function () {

      this._handlebars(navigationBackButtonViewTpl);

      return this;
    }

  });

  return NavigationBackButtonView;

});