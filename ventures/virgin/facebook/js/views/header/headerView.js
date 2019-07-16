define(function (require) {

  "use strict";

  var broker = require('shared.utils/broker'),
      OverallProgressView = require('views/header/overallProgressView'),
      LatestTrophiesView = require('views/header/latestTrophiesView'),
      GlossaryScreenView = require('views/header/glossaryScreenView'),
      GlossaryView = require('views/header/glossaryView'),
      ProfileView = require('views/header/profileView'),
      StartupScreenView = require('views/header/startupScreenView'),
      appModel = require('shared.models/app/appModel'),
      headerViewTemplate = require('text!views/header/templates/headerViewTpl.tpl');

  var HeaderView = Backbone.ViewMaster.extend({

    className : 'academy-header-inner',
    subViews : [],

    initialize : function () {
      broker.trigger('publish:get:trophies');

      var interests = {
        'show:header:glossary' : this.renderGlossaryHeaderView,
        'show:header:utilities' : this.displayUtilityHeader
      };

      broker.on(interests, this);
    },

    render : function () {
      if(appModel.get('overallProgress') <= 0) {
        this.renderHeaderStartupScreenView();
      } else {
        this.displayUtilityHeader();
      }
      return this;
    },

    renderGlossaryHeaderView : function () {
      this._clearViewsRecursively(this.subViews);
      var glossaryScreenView = new GlossaryScreenView();
      this.$el.html(glossaryScreenView.render().el);
      this.addSubViewArray(glossaryScreenView);
    },

    displayUtilityHeader : function () {
      this._clearViewsRecursively(this.subViews);
      this._handlebars(headerViewTemplate);
      this.renderOverallProgressView();
      this.renderLatestTrophiesView();
      this.renderProfileView();
      this.renderGlossaryView();
    },

    renderHeaderStartupScreenView : function () {
      var startupScreenView = new StartupScreenView();
      this.$el.html(startupScreenView.render().el);
      this.addSubViewArray(startupScreenView);
    },

    renderOverallProgressView : function () {
      var overallProgressView = new OverallProgressView();
      this.$el.find('.overall-progress').html(overallProgressView.render().el);
      this.addSubViewArray(overallProgressView);
    },

    renderLatestTrophiesView : function () {
      var latestTrophiesView = new LatestTrophiesView();
      this.$el.find('.latest-trophies').html(latestTrophiesView.render().el);
      this.addSubViewArray(latestTrophiesView);
    },

    renderProfileView : function () {
      var profileView = new ProfileView();
      this.$el.find('.profile-view').html(profileView.render().el);
      this.addSubViewArray(profileView);
    },

    renderGlossaryView : function () {
      var glossaryView = new GlossaryView();
      this.$el.find('.glossary').html(glossaryView.render().el);
      this.addSubViewArray(glossaryView);
    }

  });

  return HeaderView;
});