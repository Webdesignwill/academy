define(function (require) {

  "use strict";

  var $ = require('jquery'),
      broker = require('shared.utils/broker'),
      trophyItemViewTpl = require('text!views/header/templates/trophyItemViewTpl.tpl'),
      achievementsDetails = require('shared.challengeAchievements'),
      TrophyDetailView = require('views/header/trophyDetailView');

  var TrophyItemView = Backbone.ViewMaster.extend({

    tagName: 'li',

    events: {
      'click': 'displayTrophy'
    },

    initialize : function (options) {
      this.model = options.model;
      this.trophy = achievementsDetails[this.model.get('achievementReference')];
    },

    render : function () {

      var templateObject = {
        imageName: this.model.get('achievementReference'),
        title: this.trophy.title,
        description: this.trophy.description
      };

      this._handlebars(trophyItemViewTpl, templateObject);
      return this;
    },

    displayTrophy: function () {

      var trophyDetails = new TrophyDetailView({model : this.model, trophy : this.trophy});
      var modalNode = $('#academy-sub-modal').empty();

      modalNode.append(trophyDetails.render().$el);
      broker.trigger('modal:sub:show');
    }

  });

  return TrophyItemView;
});