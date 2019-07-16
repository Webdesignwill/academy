
define(function (require) {

  "use strict";

  var sortByListItemTpl = require('text!views/searchAndSort/templates/sortByListItemTpl.tpl'),
      appModel = require('shared.models/app/appModel');

  var SearchSortListItemView = Backbone.ViewMaster.extend({

    tagName : 'li',
    events : {
      'click' : 'toggleActiveClass'
    },

    initialize : function (item, tabIndex) {
      this.tabIndex = tabIndex;
      this.lastItem = item.last;
      this.readableStatus = appModel.get('readableStatus')[item.element];
      this.lessonStatus = appModel.get('lessonStatus')[item.element];
      this.setTabClasses();
    },

    setTabClasses : function () {
      if(appModel.get('goToLink') === this.lessonStatus) {
        this.$el.addClass('active-tick');
      }
      if(this.lastItem) {
        this.$el.addClass('last');
      }
    },

    setTabIndex : function () {
      this.$el.attr('tabindex', this.tabIndex);
    },

    toggleActiveClass : function () {
      appModel.set('goToLink', this.lessonStatus);
    },

    render : function () {

      var options = {
        status : this.lessonStatus,
        readableStatus : this.readableStatus
      };

      this._handlebars(sortByListItemTpl, options);
      this.setTabIndex();

      return this;
    }

  });

  return SearchSortListItemView;

});