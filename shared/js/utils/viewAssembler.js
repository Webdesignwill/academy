
define(function (require) {

  "use strict";

  var $ = require('jquery'),
      broker = require('shared.utils/broker'),
      appModel = require('shared.models/app/appModel');

  function viewAssembler (parts){

    if(document.getElementById('academy-content') !== null) {
      document.getElementById('academy-content').scrollTop = 0;
    }

    appModel.set('goToLink', null);
    // Either a new list with a new page has loaded or a modal
    // is loaded without a specific page name. if so, then use the previous
    parts.ev = parts.ev || ['tab:'+appModel.get('nav')];

    // Trigger the events
    triggerEventsArray(parts.ev);

    // Set the page otherwise, use the previous
    appModel.set('page', parts.page || appModel.get('page'));

    var v = new parts.V(parts.args || {});
    $(parts.el).html(v.render().el);

  }

  function triggerEventsArray (evArray) {
    for(var i = 0;i<evArray.length; i++){
      broker.trigger(evArray[i], evArray[i]);
    }
  }

  return viewAssembler;

});
