
define(function (require) {

  var broker = require('shared.utils/broker'),
      lessonsCollection = require('shared.collections/lessons/lessonsCollection');

  var Router = Backbone.Router.extend({

    routes : {
      'glossary' : 'openGlossary',
      'lesson/:id' : 'openLesson',
      'filter/:filter' : 'filterLessons'
    },

    openGlossary : function () {
      broker.trigger('views:glossary:list');
    },

    openLesson : function (lessonId) {

      if(typeof lessonId === 'undefined' || typeof lessonId === null) {
        return;
      }

      if(typeof lessonId === 'string') {
        lessonId = parseFloat(lessonId);
      }

      if(typeof lessonsCollection.get(lessonId) === 'undefined') {
        return;
      }

      broker.trigger('views:modal:lesson tab:all', lessonsCollection.get(lessonId).attributes);

    },

    filterLessons : function (filter) {
      var nav = 'tab:' + filter;
      broker.trigger(nav);
    }

  });

  return new Router();

});