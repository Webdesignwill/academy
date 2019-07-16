
define(function (require) {

  "use strict";

  var broker = require('shared.utils/broker'),
      SearchInputView = require('views/searchAndSort/searchInputView'),
      SearchSortByView = require('views/searchAndSort/searchSortByView'),
      searchFormTemplate = require('text!views/searchAndSort/templates/searchFormTpl.tpl'),
      appModel = require('shared.models/app/appModel');

  var SearchAndSortView = Backbone.ViewMaster.extend({

    el : '#' + appModel.get('viewIdentifiers').sortSearch,
    className : appModel.get('viewIdentifiers').sortSearch,

    events : {
      'keyup' : 'keyup'
    },

    initialize : function () {
      var interests = {
        'render:nav' : this.showSort,
        'show:utilityBar:glossary' : this.hideSort
      };

      broker.on(interests, this);
    },

    keyup : function (e) {
      e.preventDefault();
    },

    showSort : function () {
      $('#sprites-sort-btn').show();
    },

    hideSort : function () {
      $('#sprites-sort-btn').hide();
    },

    render : function () {

      this._handlebars(searchFormTemplate);

      // Show the input
      var searchInputView = new SearchInputView();
      this.$el.append(searchInputView.render().el);

      // Show the sort by view
      var searchSortByView = new SearchSortByView();
      this.$el.prepend(searchSortByView.render().el);

      return this;
    }

  });

  return SearchAndSortView;

});