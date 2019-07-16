
define(function (require) {

  "use strict";

  var lessonsCollection = require('shared.collections/lessons/lessonsCollection'),
      searchCollection = require('shared.collections/search/searchCollection'),
      LessonListItemView = require('views/lessonsList/lessonListItemView'),
      appModel = require('shared.models/app/appModel'),
      searchFilter = require('shared.utils/searchFilter'),
      broker = require('shared.utils/broker');

  var LessonsListView = Backbone.ViewMaster.extend({

    tagName : 'ul',
    id : appModel.get('viewIdentifiers').lessonsList,
    className : appModel.get('viewIdentifiers').lessonsList,
    subViews : [],

    initialize : function (search) {
      this._removeSubViews();
      this.searchOrNot(search);
    },

    searchOrNot : function (search) {
      if(search.searchStr !== null) {
        this.searchStr = search.searchStr;
      }
      if(search.nav !== null) {
        this.nav = search.nav;
      }
      if(search.searchStr === null && search.nav === null || typeof search.nav !== 'undefined' && search.nav === 'all') {
        lessonsCollection.setAppModelLessonStatuses();
        this.collection = lessonsCollection;
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
        this.createFragment();
        return this;
      }
    },

    createFragment : function () {

      var fragment = document.createDocumentFragment(),
          self = this,
          previousStatus,
          firstInSection,
          view;

      this.collection.each(function (element, index) {
        if(previousStatus === 'undefined' || element.get('status') !== previousStatus) {
          previousStatus = element.get('status');
          firstInSection = true;
        } else {
          firstInSection = false;
        }
        view = new LessonListItemView(element.toJSON(), self.searchStr, index, firstInSection);
        fragment.appendChild(view.render().el);
        self.addSubViewArray(view);
      });

      this.$el.html(fragment);

      return this;
    }

  });

  return LessonsListView;

});