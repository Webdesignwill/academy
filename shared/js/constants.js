//
//  shared/js/constants.js
//

define(function (require) {

  "use strict";

      // Require Libs
  var $ = require('jquery'),
      _ = require('underscore');

  var basePath = require.toUrl('./');

  var constants = {
    debug : {
      zombieKiller : false,
      handlebars : false
    },
    local : {
      active : true,
      name : 'localhost',
      url : 'localhost'
    },
    glossary : {

      //path : '/poker-lobby-ui/academy_client_dev/shared/glossary/glossary.json'
      //path : '../academy_client_dev/shared/glossary/glossary.json'
      path : basePath+'../glossary/glossary.json'
    },
    lessonLibrary : {
      //offline : '../academy_client_dev/shared/lessons/data/lessons.json',
      //offline : '/poker-lobby-ui/academy_client_dev/shared/lessons/data/lessons.json',
      offline : basePath+'../lessons/data/lessons.json',
      //online : '../academy_client_dev/shared/lessons/data/lessonsLive.json',
      //online : '/poker-lobby-ui/academy_client_dev/shared/lessons/data/lessonsLive.json',
      online : basePath+'../lessons/data/lessonsLive.json',
      //path : '/poker-lobby-ui/academy_client_dev/shared/lessons'
      //path : '../academy_client_dev/shared/lessons'
      path : basePath+'../lessons'
    },

    offlineLessonData : {
      // path : '../academy_client_dev/server-lesson-data.json'
      // path : '/poker-lobby-ui/academy_client_dev/server-lesson-data.json'
      path : '../../../server-lesson-data.json'
    },
    venture : {
      facebook : 17
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