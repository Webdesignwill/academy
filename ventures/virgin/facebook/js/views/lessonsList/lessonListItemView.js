
define(function(require) {

  "use strict";

  var lessonListItemTemplate = require('text!views/lessonsList/templates/lessonListItemTpl.tpl'),
      broker = require('shared.utils/broker'),
      appModel = require('shared.models/app/appModel'),
      LessonListItem;

  LessonListItem = Backbone.ViewMaster.extend({

    tagName : 'li',
    className : appModel.get('viewIdentifiers').lessonsListItem,
    events : {
      'click' : 'buttonHandler'
    },

    initialize : function(model, searchStr, index, firstInSection) {

      this.model = model;
      this.index = index;
      this.firstInSection = firstInSection;

      // Used for the highlighter
      if (typeof searchStr !== 'undefined') {
        this.searchStr = searchStr;
      }

      this.$el.addClass(this.model.status);

    },

    buttonHandler : function() {
      if(this.model.status !== 'locked') {
        broker.trigger('views:modal:lesson', this.model);
      }
    },

    layoutManager : function() {

      var pr = this.model.progress,
          st = this.model.status;

      if(pr >= 5) {
        this.$el.find('.l-inf').addClass('completed');
        this.$el.find('.ch-in').addClass('point');
      }

      if(st === 'locked') {
        this.$el.find('.p-bar').remove();
      }

      if(st !== 'locked') {
        this.$el.find('.unlock-level-num').remove();
      }

      if(pr === 10) {
        this.$el.find('.re-inf').addClass('point');
        this.$el.find('.p-bar').remove();
      }

      if(this.firstInSection) {
        this.$el.prepend('<a id="goto' + st + '"></a>');
      }

    },

    setTabIndex : function() {
      this.$el.attr('tabindex', this.index + 10 * 10);
    },

    render : function() {
      this.delegateEvents();
      this._handlebars(lessonListItemTemplate, this.model, 'highlight');
      // Deal with individual layouts and their behaviors
      this.layoutManager();

      // Tab index for accessibility
      this.setTabIndex();

      // Calculate and render progress bar
      this._calculateProgressBar();

      return this;
    }

  });

  return LessonListItem;

});