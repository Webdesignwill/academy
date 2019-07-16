
define(function (require) {

  "use strict";

  var _ = require('underscore'),
      handlebars = require('handlebars'),
      appModel = require('shared.models/app/appModel');

  Backbone.ViewMaster = Backbone.View.extend({

    parentViewArray : [],

    constructor : function() {
      Backbone.View.prototype.constructor.apply(this, arguments);
    },

    highlighter : function (compiled) {
      if(typeof this.searchStr !== 'undefined') {
        var regex = new RegExp("(>[^<]*)(\\b\\w*"+this.searchStr+"\\w*\\b)([^<]*<)", "gi");
        compiled = compiled.replace(regex, "$1<span class=\"" + "text-highlight" + "\">$2</span>$3");
      }
      return compiled;
    },

    addSubViewArray : function (view) {
      this.subViews.push(view);
    },

    _addParentView : function () {
      // console.log('ADD VIEW : ', this);
      this.parentViewArray.push(this);
    },

    _clearViewsRecursively : function (subViewsArray) {


      if(appModel.get('lessonInProgress')) {
        return;
      }

      _.each(subViewsArray, function (iteratedSubView, index) {
        if(iteratedSubView.subViews && iteratedSubView.subViews.length > 0) {
          this._clearViewsRecursively(iteratedSubView.subViews);
        }
        this.removeView(iteratedSubView);
        // console.log('REMOVE VIEW : ', iteratedSubView);
        if(index+1 === subViewsArray.length){
          subViewsArray.splice(0, subViewsArray.length);
        }
      }, this);
    },

    removeView : function (view) {
      view.off();
      view.undelegateEvents();
      view.remove();
    },

    ////////////////////////////////////////////////////////////
    // View utilities. underscores to identify view utilities //
    ////////////////////////////////////////////////////////////

    // looks for zombies
    _removeSubViews : function () {
      // console.log('Parent view array length : ', this.parentViewArray.length);
      if(this.parentViewArray.length > 0) {
        this._clearViewsRecursively(this.parentViewArray);
      }
      this._addParentView();
    },

    _handlebars : function (te, object, hi) {

      // Sometimes we don't need to pass an object
      var obj = object || {};

      var template = handlebars.compile(te),
          compiled = template(obj);

      // Really for search only
      if(typeof hi !== 'undefined' && hi === 'highlight'){
        compiled = this.highlighter(compiled);
      }

      this.$el.html(compiled);
    },

    _calculateProgressBar : function () {

      var progress = this.model.progress,
          $progressBar = this.$el.find('.p-bar');

      $progressBar.css('width', (progress * 10) + '%');
    }

  });



});
