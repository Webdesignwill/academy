
define(function (require) {

  "use strict";

  var StaticLessonModel = require('shared.models/lesson/staticLessonModel'),
      appModel = require('shared.models/app/appModel');

  var StaticLessonCollection = Backbone.Collection.extend({

    // Gets the offline or online lesson library
    url : appModel.get('lessonLibrary').path,

    model : StaticLessonModel

  });

  return new StaticLessonCollection();

});