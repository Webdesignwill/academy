
define(function (require) {

  "use strict";

  var appModel = require('shared.models/app/appModel'),
      broker = require('shared.utils/broker');

  var SearchInputView = Backbone.ViewMaster.extend({

    tagName : 'input',
    className : appModel.get('viewIdentifiers').searchInput,
    id : appModel.get('viewIdentifiers').searchInput,
    events : {
      'keyup' : 'keyup',
      'focus' : 'hideElement'
    },

    initialize : function () {
      broker.on('reset:search', this.resetSearch, this);
    },

    setSearchStringLength : function () {
      if(appModel.get('page') === 'glossary') {
        this.searchStringLength = 1;
      }
      if(appModel.get('page') === 'lessons') {
        this.searchStringLength = 3;
      }
    },

    hideElement : function () {
      broker.trigger('hide:element', '#sprites-sort-btn', 'display');
    },

    resetSearch : function () {
      this.$el.val('');
    },

    keyup : function (e) {
      e.preventDefault();

      var charCode = e.which || e.keyCode;
      this.setSearchStringLength();

      // This is how the search list view would like to receive the options
      var options = {
        searchStr : this.el.value.replace(/^\s+|\s+$/, '').toLowerCase(),
        sortby : false
      };

      // If hit enter, just ignore it
      if(charCode === 13){
        return;
      }

      // Make sure string is over string min length and not empty
      if(options.searchStr.length >= this.searchStringLength) {
        broker.trigger('views:' + appModel.get('page') + ':list ', options);
        if(appModel.get('page') !== 'glossary') {
          broker.trigger('tab:search');
        }
      }

      // If user hits backspace until the string is empty, then go back to original page
      if(charCode === 8 && options.searchStr.length === 0 || charCode === 46 && options.searchStr.length === 0) {
        if(appModel.get('page') === 'glossary') {
          broker.trigger('views:glossary:list');
          return;
        }
        broker.trigger('tab:' + appModel.get('nav'));
      }

    },

    setTabIndex : function () {
      this.$el.attr('tabindex', 20);
    },

    render : function () {
      this.$el.attr('placeholder', appModel.get('searchConfig').text);
      this.setTabIndex();
      return this;
    }

  });

  return SearchInputView;

});