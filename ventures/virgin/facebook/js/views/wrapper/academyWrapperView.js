
define(function (require) {

  "use strict";

  var Tpl = require('text!views/wrapper/templates/academyWrapperViewTpl.tpl');

  var AcademyMainView = Backbone.View.extend({

    el: '#academy-global-container',

    render : function () {
      this.$el.html(Tpl);
      return this;
    }

  });

  return new AcademyMainView();

});