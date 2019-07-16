define(function (require) {

  "use strict";

  var trophiesCollection = require('shared.collections/trophies/trophiesCollection'),
      tpl = require('text!views/header/templates/latestTrophiesTpl.tpl'),
      noTrophiesTpl = require('text!views/header/templates/noTrophiesTpl.tpl'),
      TrophyItemView = require('views/header/trophyItemView');

  var LatestTrophiesView = Backbone.ViewMaster.extend({

    subViews : [],

    initialize : function () {
      this.listenTo(trophiesCollection, 'reset', this.renderLatestOrNoTrophies);
    },

    renderLatestOrNoTrophies : function (trophies) {

      var sorted = _.filter(trophies.models, function (trophy) {
        return trophy.get('trackableStatusInfo').trackableClosingDate !== 0;
      });

      if(sorted.length < 1 ) {
        this._handlebars(noTrophiesTpl);
        return;
      }

      sorted = _.sortBy(trophies.models, function (trophy) {
        return trophy.get('trackableStatusInfo').trackableClosingDate;
      });

      var docFrag = document.createDocumentFragment(),
          trophyView;

      sorted = _.last(sorted, 6).reverse();

      _.each(sorted, function (model) {
        if (model.get('trackableStatusInfo').trackableClosingDate !== 0) {
          trophyView = new TrophyItemView({model : model});
          docFrag.appendChild(trophyView.render().el);
          this.addSubViewArray(trophyView);
        }
      }, this);

      this._handlebars(tpl);
      this.$el.find('ul').html(docFrag);

      return this;

    },

    render : function () {
      this.renderLatestOrNoTrophies(trophiesCollection);
      return this;
    }

  });

  return LatestTrophiesView;
});

// define(function (require) {

//   "use strict";

//   var trophiesCollection = require('shared.collections/trophies/trophiesCollection'),
//       tpl = require('text!views/header/templates/latestTrophiesTpl.tpl'),
//       TrophyItemView = require('views/header/trophyItemView');

//   var LatestTrophiesView = Backbone.ViewMaster.extend({

//     subViews : [],

//     initialize : function () {
//       this.listenTo(trophiesCollection, 'reset', this.renderLatestOrNoTrophies);
//     },

//     renderLatestOrNoTrophies : function (trophies) {

//       var sorted = _.filter(trophies.models, function (trophy) {
//         return trophy.get('trackableStatusInfo').trackableClosingDate !== 0;
//       });

//       if(sorted.length < 1 ) {
//         this.renderNoTrophies();
//         return;
//       }

//       if(this.$el.find('#trophy-list-wrapper').hasClass('no-trophies')){
//         this.$el.find('#trophy-list-wrapper').removeClass('no-trophies');
//       }

//       sorted = _.sortBy(trophies.models, function (trophy) {
//         return trophy.get('trackableStatusInfo').trackableClosingDate;
//       });

//       var docFrag = document.createDocumentFragment(),
//           emptyUl = document.createElement('ul'),
//           trophyView;

//       sorted = _.last(sorted, 6).reverse();

//       _.each(sorted, function (model) {
//         if (model.get('trackableStatusInfo').trackableClosingDate !== 0) {
//           trophyView = new TrophyItemView({model : model});
//           emptyUl.appendChild(trophyView.render().el);
//           this.addSubViewArray(trophyView);
//         }
//       }, this);

//       docFrag.appendChild(emptyUl);
//       this.$el.find('#trophy-list-wrapper').html(docFrag);
//     },

//     render : function () {
//       this._handlebars(tpl);
//       this.renderLatestOrNoTrophies(trophiesCollection);
//       return this;
//     },

//     renderNoTrophies : function () {
//       this.$el.find('#trophy-list-wrapper').addClass('no-trophies');
//       this.$el.find('#trophy-list-wrapper').html();
//     }

//   });

//   return LatestTrophiesView;
// });