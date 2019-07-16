
define(function (require) {

  "use strict";

  var glossaryCollection = require('shared.collections/glossary/glossaryCollection'),
      searchCollection = require('shared.collections/search/searchCollection'),
      GlossaryListView = require('views/glossary/glossaryListView'),
      appModel = require('shared.models/app/appModel'),
      broker = require('shared.utils/broker'),
      searchFilter = require('shared.utils/searchFilter');

  var GlossaryPageView = Backbone.ViewMaster.extend({

    tagName : 'div',
    id : appModel.get('viewIdentifiers').glossaryPage,
    className : appModel.get('viewIdentifiers').glossaryPage,
    subViews : [],

    initialize : function (search) {
      broker.trigger('show:header:glossary');
      this._removeSubViews();
      this.searchOrNot(search);
    },

    searchOrNot : function (search) {
      if(search.searchStr !== null) {
        this.searchStr = search.searchStr;
      }
      if(search.searchStr === null) {
        broker.trigger('show:utilityBar:glossary');
        this.collection = glossaryCollection;
        return;
      }
      this.callFilter();
    },

    callFilter : function () {
      if(searchFilter.call(this)) {
        this.collection = searchCollection;
      } else {
        this.noResults = true;
        broker.trigger('views:error', 'Sorry but there are no results for ' + this.searchStr);
      }
    },

    render : function () {

      if(this.noResults) {
        return false;
      } else {
        var fragment = document.createDocumentFragment(),
            self = this;

        // If the row is divisible by 3, then add a new row
        this.collection.each(function (element, index) {
          var view = new GlossaryListView(element.toJSON()),
              renderedView = view.render().el;

          //adding class for styling
          if (index % 2 !== 0) {
            $(renderedView).addClass('odd');
          }

          fragment.appendChild(renderedView);
          self.subViews.push(view);
        });

        this.$el.append(fragment);

        return this;

      }
    }

  });

  return GlossaryPageView;

});