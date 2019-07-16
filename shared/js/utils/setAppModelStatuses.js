
define(function (require) {

  "use strict";

  var _ = require('underscore'),
      appModel = require('shared.models/app/appModel'),
      ServerLessonModel = require('shared.models/lesson/serverLessonModel');

  var LessonsCollection = Backbone.Collection.extend({

    // Only uses this if a fetch occurs which happens offline
    url : appModel.get('offlineLessonData').path,
    model : ServerLessonModel,

    initialize : function () {
      this.listenTo(this, 'reset', this.setAppModelLessonStatuses);
    },

    setAppModelLessonStatuses : function () {
      this.lessonSetter('status', 'lessonStatus');
    },

    lessonSetter : function (pluckMe, setMeAs) {

      var plucked = this.pluck(pluckMe),
          stAry = _.uniq(plucked),
          obj = {};

      stAry = _.sortBy(stAry, function (status) {
        return appModel.get('collectionSortOrdering')[status.toLowerCase()];
      });

      _.each(stAry, function (status) {
        obj[status] = status;
      });

      appModel.set(setMeAs, obj);

    },

    comparator : function (model) {
      return model.get('order');
    },

    parse : function (res) {
      // Only happens if working locally
      appModel.set({overallProgress : res.overallProgress});
      return res.lessonJourneys;
    }

  });

  return new LessonsCollection();

});