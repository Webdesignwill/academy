
define(function (require) {

  "use strict";

  var $ = require('jquery'),
      userModel = require('shared.models/user/userModel'),
      appModel = require('shared.models/app/appModel');

  var LessonView = Backbone.ViewMaster.extend({

    tagName : 'iframe',
    id : appModel.get('viewIdentifiers').lesson,
    className : appModel.get('viewIdentifiers').lesson,

    initialize : function (model) {

      appModel.set('lessonInProgress', true);

      this._addParentView();
      userModel.set('lessonId', model.id);

      var modal = $('.academy-modal'),
          modalWidth = modal.width(),
          modalHeight = modal.height();

      this.$el.attr('src', model.url)
          .attr('width', modalWidth)
          .attr('height', modalHeight);

    },

    render : function () {
      return this;
    }

  });

  return LessonView;

});