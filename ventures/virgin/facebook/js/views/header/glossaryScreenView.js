define(function (require) {

  "use strict";

  var glossaryHeaderTpl = require('text!views/header/templates/glossaryHeaderViewTpl.tpl');

  var HeaderView = Backbone.ViewMaster.extend({

    className : 'glossary-header-view',

    initialize : function () {

    },

    render : function () {
      this.$el.html(glossaryHeaderTpl);
      return this;
    }

  });

  return HeaderView;
});