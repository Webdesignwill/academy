define(function (require) {

  "use strict";

  var tpl = require('text!views/header/templates/trophyDetailTpl.tpl'),
      broker = require('shared.utils/broker');

  var TrophyDetailView = Backbone.ViewMaster.extend({

    className: 'trophy',
    events : {
      'click #close-sub-modal' : 'closeModal'
    },

    initialize : function (options) {
      this.model = options.model;
      this.trophy = options.trophy;
    },

    closeModal : function () {
      this.removeView(this);
      broker.trigger('modal:sub:close');
    },

    render: function () {

      var templateObject = {
        imageNameLowerCase: this.model.get('achievementReference').toLowerCase(),
        imageName: this.model.get('achievementReference'),
        title: this.trophy.title,
        description: this.trophy.description
      };

      this._handlebars(tpl, templateObject);
      return this;
    }

  });

  return TrophyDetailView;
});