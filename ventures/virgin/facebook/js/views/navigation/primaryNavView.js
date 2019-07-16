
define(function (require) {

  "use strict";

  var _ = require('underscore'),
      broker = require('shared.utils/broker'),
      appModel = require('shared.models/app/appModel'),
      primaryNavViewTpl = require('text!views/navigation/templates/primaryNavViewTpl.tpl'),
      NavigationBackButtonView = require('views/navigation/navigationBackButtonView'),
      PrimaryNavItemView = require('views/navigation/primaryNavItemView');

  var PrimaryNavView = Backbone.ViewMaster.extend({

    el : '#' + appModel.get('viewIdentifiers').navContainer,
    subViews : [],

    initialize : function () {

      appModel.set({nav : 'all', page : 'lessons'});

      var interests = {
        'render:nav' : this.render,
        'show:utilityBar:glossary' : this.showGlossaryLayout,
        'tab:search' : this.searchMode
      };

      broker.on(interests, this);

    },

    showGlossaryLayout : function () {
      this._clearViewsRecursively(this.subViews);
      var navigationBackButtonView = new NavigationBackButtonView();
      this.$el.empty().html(navigationBackButtonView.render().el);
    },

    searchMode : function () {
      appModel.set('nav', 'all');
      this.$el.find('.active').removeClass('active');
      this.$el.find('.primary-nav-1').addClass('active');
    },

    render : function () {

      this.$el.empty();
      this.$el.html(primaryNavViewTpl);

      var self = this,
          fragment = document.createDocumentFragment(),
          tabIndex = 1;

      _.each(appModel.get('navItems'), function (element) {
        var primaryNavItemView = new PrimaryNavItemView({element : element}, tabIndex);
        fragment.appendChild(primaryNavItemView.render().el);
        if(appModel.get('nav') === primaryNavItemView.element) {
          primaryNavItemView.toggleTabs();
        }
        self.addSubViewArray(primaryNavItemView);
        tabIndex++;
      });

      self.$el.find('ul').append(fragment);

      return this;
    }

  });

  return PrimaryNavView;

});