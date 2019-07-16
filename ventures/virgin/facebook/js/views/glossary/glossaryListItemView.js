
define(function (require) {

  "use strict";

  var glossaryListItemTpl = require('text!views/glossary/templates/glossaryListItemTpl.tpl'),
      appModel = require('shared.models/app/appModel');

  var GlossaryListItemView = Backbone.ViewMaster.extend({

    tagName : 'li',
    className : appModel.get('viewIdentifiers').glossaryListItem,

    initialize : function (model) {
      this.model = model;
    },

    render : function () {
      this._handlebars(glossaryListItemTpl, this.model);
      return this;
    }

  });

  return GlossaryListItemView;

});