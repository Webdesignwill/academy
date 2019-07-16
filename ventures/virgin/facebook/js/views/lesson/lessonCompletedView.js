
define(function (require) {

  "use strict";

  var lessonCompletedTpl = require('text!views/lesson/templates/lessonCompletedTpl.tpl'),
      appModel = require('shared.models/app/appModel'),
      broker = require('shared.utils/broker');

  var LessonCompletedView = Backbone.ViewMaster.extend({

    id : appModel.get('viewIdentifiers').lessonCompleted,
    className : appModel.get('viewIdentifiers').lessonCompleted,

    events : {
      'click #accept-challenge' : 'closeModal',
      'click #redo-lesson-button' : 'redoLesson',
      'click #close-modal' : 'closeModal'
    },

    initialize : function (options) {
      this.lessonModel = options.lessonModel;
    },

    render : function () {

      this._handlebars(lessonCompletedTpl, {
            challengeCriteria : this.lessonModel.get('challengeCriteria'),
            awardXp : this.lessonModel.get('awardXp'),
            awardRef : this.lessonModel.get('awardRef')
          });

      if(this.lessonModel.get('challengeStatus') === 'none') {
        this.$el.find('#go-to-challenge').hide();
      }

      this.$el.find('.l-inf .icon').addClass('sprites-restart');

      return this;
    },

    redoLesson: function () {
      broker.trigger('views:modal:lesson', this.lessonModel.attributes);
      this.removeView(this);
    },

    closeModal : function () {
      this.removeView(this);
      broker.trigger('modal:close');
    }
  });

  return LessonCompletedView;

});