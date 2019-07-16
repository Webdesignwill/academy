
define(function (require) {

  "use strict";

  var $ = require('jquery'),
      _ = require('underscore'),
      SearchSortListItemView = require('views/searchAndSort/searchSortListItemView'),
      searchSortByTemplate = require('text!views/searchAndSort/templates/searchSortByTpl.tpl'),
      appModel = require('shared.models/app/appModel');

  var SearchAndSortView = Backbone.ViewMaster.extend({

    tagName : 'div',
    id : appModel.get('viewIdentifiers').spritesSortBtn,
    className : appModel.get('viewIdentifiers').spritesSortBtn,
    events : {
      'click' : 'showSortCriteria'
    },

    initialize : function () {
      this.bindWindowCloseEvent();
    },

    populateSortList : function () {
      this.renderList(appModel.get('statusOptions').lesson, appModel.get('lessonStatus'));
    },

    showSortCriteria : function () {
      this.populateSortList();
      this.$el.addClass('display');
    },

    bindWindowCloseEvent : function () {
      var self = this;
      $(window).click(function (e) {
        if(e.target.id !== appModel.get('viewIdentifiers').spritesSortBtn){
          self.$el.removeClass('display');
        }
      });
    },

    renderList : function (status, list) {

      // VERY UGLY METHOD, PLEASE CLEAN
      var fragment = document.createDocumentFragment(),
          tabIndex = 10,
          iterate = 1,
          last = false,
          view;

      var lessonsStatusLength = _.keys(list).length;

      _.each(list, function (element, index) {
        if(lessonsStatusLength === iterate) {
          last = true;
        }
        view = new SearchSortListItemView({
          element : element,
          status : status,
          index : index,
          last : last
        }, tabIndex);
        fragment.appendChild(view.render().el);
        tabIndex++;
        iterate++;
      });

      iterate = 0;
      last = false;
      this.$el.find('#arrange-by').html(fragment);

    },

    setTabIndex : function () {
      this.$el.attr('tabindex', 5);
    },

    render : function () {
      this._handlebars(searchSortByTemplate);
      this.setTabIndex();
      return this;
    }

  });

  return SearchAndSortView;

});