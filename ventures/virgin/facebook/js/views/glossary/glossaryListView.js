
define(function (require) {

  "use strict";

  var _ = require('underscore'),
      GlossaryListItemView = require('views/glossary/glossaryListItemView'),
      glossaryListTpl = require('text!views/glossary/templates/glossaryListTpl.tpl'),
      appModel = require('shared.models/app/appModel');

  var GlossaryListView = Backbone.ViewMaster.extend({

    tagName : 'div',
    className : appModel.get('viewIdentifiers').glossaryList,
    subViews : [],

    initialize : function (model) {
      this.model = model;
    },

    render : function () {

      var fragment = document.createDocumentFragment(),
          self = this;

      this._handlebars(glossaryListTpl, this.model);

      // Render the list of words under the letter category
      _.each(this.model.words, function (element) {
        var glossaryListItemView = new GlossaryListItemView(element);
        fragment.appendChild(glossaryListItemView.render().el);
        self.subViews.push(glossaryListItemView);
      });

      this.$el.find('ul').append(fragment);

      return this;
    }

  });

  return GlossaryListView;

});