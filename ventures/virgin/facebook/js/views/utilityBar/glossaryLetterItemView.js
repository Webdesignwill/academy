
define(function (require) {

  "use strict";

  var appModel = require('shared.models/app/appModel'),
      template = require('text!views/utilityBar/templates/glossaryLetterItemViewTpl.tpl'),
      glossaryCollection = require('shared.collections/glossary/glossaryCollection'),
      broker = require('shared.utils/broker');

  var GlossaryLetterItemView = Backbone.ViewMaster.extend({

    tagName : 'li',

    events : {
      'click' : 'resetSearch'
    },

    initialize : function (options) {
      this.letter = options;
    },

    render : function () {
      this._handlebars(template, this.letter);
      return this;
    },

    resetSearch : function () {

      var currentResultsLength = $('.glossary-page-view').find('.glossary-list-view').length,
          glossaryCollectionlength = glossaryCollection.length;

      if(currentResultsLength < glossaryCollectionlength) {
        broker.trigger('views:' + appModel.get('page') +':list reset:search');
      }
    }

  });

  return GlossaryLetterItemView;

});