define(function (require) {

  "use strict";

  var broker = require('shared.utils/broker'),
      router = require('router'),
      glossaryViewTpl = require('text!views/header/templates/glossaryViewTpl.tpl');

  var GlosssaryView = Backbone.ViewMaster.extend({

    events : {
      'click' : 'showGlossary'
    },

    render : function () {
      this.$el.html(glossaryViewTpl);
      return this;
    },

    showGlossary : function () {
      broker.trigger('views:glossary:list reset:search');
    }

  });

  return GlosssaryView;

});