
define(function (require) {

  "use strict";

  var appModel = require('shared.models/app/appModel');

  var SearchCollection = Backbone.Collection.extend({

    initialize : function () {
      this.listenTo(this, 'reset', this.setAppModelLessonStatuses);
    },

    setAppModelLessonStatuses : function () {
      if(appModel.get('page') === 'glossary') {
        return;
      }
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
      if(appModel.get('page') === 'glossary') {
        return this.sortGlossary(model);
      }
      return model.get('order');
    },

    sortGlossary : function (model) {
      return model.get('letter');
    }

  });

  return new SearchCollection();

});