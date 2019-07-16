//
//  shared/js/constants.js
//

alert('Constants Local');

define(function (require) {

  "use strict";

      // Require Libs
  var $ = require('jquery'),
      _ = require('underscore');

  var constants = {
    debug : {
      zombieKiller : false,
      handlebars : false
    },
    glossary : {
      path : '../../../shared/glossary/glossary.json'
    },
    lessonLibrary : {
      offline : '../../../shared/lessons/data/lessons.json',
      online : '../../../shared/lessons/data/lessonsLive.json',
      path : ''
    },
    offlineLessonData : {
      path : '../../../server-lesson-data.json'
    },
    development : {
      active : true,
      name : 'socialDev',
      url : 'https://socialdev.poker.gamesys.corp'
    },
    venture : {
      facebook : 17
    },
    local : {
      active : false,
      name : 'localhost',
      url : 'localhost'
    },
    token : {
      url : '/token',
      port : ':9083'
    },
    cometd : {
      url : '/cometd',
      port : ':8082',
      channels : {
        'academy' : '/academy/lessons',
        'academyLessonUpdate' : '/academy/lesson/update'
      }
    }
  };

  return function(strObjectPath) {
    var properties = strObjectPath.split("."),
        obj = constants[properties[0]];

    for (var i = 1, length = properties.length; i<length; i++) {
      obj = obj[properties[i]];
    }

    return obj;

  };

});