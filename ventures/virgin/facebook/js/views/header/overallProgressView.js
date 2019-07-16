define(function (require) {

  "use strict";

  var appModel = require('shared.models/app/appModel'),
      overallProgressTpl = require('text!views/header/templates/overallProgressTpl.tpl');

  var OverallProgressView = Backbone.ViewMaster.extend({

    initialize : function () {
      appModel.on('change:overallProgress', this.updateOverallProgress, this);
    },

    updateOverallProgress : function () {
      var overallProgress = appModel.get('overallProgress') || 0,
          str = overallProgress + '%';

      this.$el.find('.progress-percentage').html(str);
      this.$el.find('.progress-bar').css('width', str);

    },

    render : function () {
      this._handlebars(overallProgressTpl);
      this.updateOverallProgress();
      return this;
    }

  });

  return OverallProgressView;
});