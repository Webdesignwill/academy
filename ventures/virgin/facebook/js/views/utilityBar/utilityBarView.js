
define(function (require) {

  "use strict";

  var lessonProgressionTemplate = require('text!views/utilityBar/templates/lessonProgressionTpl.tpl'),
      glossarySelectionTemplate = require('text!views/utilityBar/templates/glossarySelectionTpl.tpl'),
      glossaryCollection = require('shared.collections/glossary/glossaryCollection'),
      GlossaryLetterItemview = require('views/utilityBar/glossaryLetterItemView'),
      broker = require('shared.utils/broker');

  var UtilityBarView = Backbone.ViewMaster.extend({

    className : 'utility-bar-view',
    subViews : [],

    initialize : function () {

      var interests = {
        'show:utilityBar:lessons' : this.showLessonsLayout,
        'show:utilityBar:glossary' : this.showGlossaryLayout
      };

      broker.on(interests, this);
    },

    render : function (template) {
      var temp = template || lessonProgressionTemplate;
      this._handlebars(temp);
      return this;
    },

    showLessonsLayout : function () {
      this._clearViewsRecursively(this.subViews);
      this.$el.empty();
      this.render(lessonProgressionTemplate);
    },

    showGlossaryLayout : function () {
      this.$el.empty();

      var fragment = document.createDocumentFragment(),
          self = this;

      glossaryCollection.each(function (model) {
        var view = new GlossaryLetterItemview({letter : model.get('letter')});
        fragment.appendChild(view.render().el);
        self.addSubViewArray(view);
      });

      this.render(glossarySelectionTemplate);
      this.$el.find('.alphabetical-filter').html(fragment);
    }

  });

  return UtilityBarView;

});