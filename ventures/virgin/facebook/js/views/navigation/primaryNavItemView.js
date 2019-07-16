
define(function (require) {

  "use strict";

  var broker = require('shared.utils/broker'),
      appModel = require('shared.models/app/appModel'),
      router = require('router'),
      primaryNavItemTpl = require('text!views/navigation/templates/primaryNavItemTpl.tpl');

  var PrimaryNavView = Backbone.ViewMaster.extend({

    tagName : 'li',

    events : {
      'click' : 'filterLessons',
      'keyup' : 'filterLessons',
      'focus' : 'hideElement'
    },

    initialize : function (item, tabIndex) {

      this.navObject = item;
      this.element = item.element.toLowerCase();
      this.tabIndex = tabIndex;

      if(typeof broker._events['tab:'+this.element] === 'undefined') {
        var str = 'tab:'+this.element;
        broker.on(str, this.filterLessons, this);
      }

    },

    hideElement : function () {
      broker.trigger('hide:element', '#sprites-sort-btn', 'display');
    },

    filterLessons : function (e) {

      appModel.set('nav', this.element);
      var charCode;

      if(typeof e !== 'undefined') {
        charCode = e.which || e.keyCode;
      }

      if(charCode === 13 || charCode === 1 || typeof e === 'undefined'){

        var options = {
          nav : this.element
        };

        broker.trigger('views:lessons:list  reset:search', options);

        this.toggleTabs();
      }

    },

    toggleTabs : function () {
      this.$el.parent().find('.active').removeClass('active');
      this.$el.addClass('active');
    },

    addClasses : function () {
      this.$el.addClass('primary-nav-' + this.tabIndex);
    },

    setTabIndex : function () {
      this.$el.attr('tabindex', this.tabIndex);
    },

    render : function () {
      this._handlebars(primaryNavItemTpl, this.navObject);
      this.setTabIndex();
      this.addClasses();
      return this;
    }

  });

  return PrimaryNavView;

});