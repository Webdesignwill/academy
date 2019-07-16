
define(function(require) {

  "use strict";

  // Require Libs
  var _ = require('underscore'),
      // Grab the user model
      userModel = require('shared.models/user/userModel'),
      // Vars and broker
      appModel = require('shared.models/app/appModel'),
      broker = require('shared.utils/broker'),
      urlParamsManager = require('shared.utils/urlParamsManager'),
      // Comms
      communications = require('communications'),
      comms,
      Comm,
      communicationsCollectionsCD,
      communicationsAcademyLessonsUpdated,
      communicationsAvatar,
      communicationsAcademyTrophies,
      communicationsListenerSubscribe,
      communicationsListenerUnsuccessful,
      interests;

  // To populate collections
  require('shared.controllers/collections/collectionsController');

  interests = {
    'publish:lesson:update' : publishLessonUpdate
  };

  // Get the broker to listen to the interests
  broker.on(interests, this);

  function publishLessonUpdate(lessonModel) {

    comms.publish({
      'channel' : appModel.get('cometd').channels.academyLessonUpdate,
      data : {
        "playerId" : userModel.get('playerId'),
        "lessonId" : userModel.get('lessonId'),
        "ventureId" : urlParamsManager.getUrlParameterByName('ventureId') || appModel.get('ventureId'),
        "lessonCompleted" : lessonModel.get('lessonCompleted'),
        "lessonProgress" : lessonModel.get('lessonProgress'),
        "scormData" : JSON.stringify(lessonModel.get('scormData'))
      }
    });
  }

  function onMetaSubscribe(message) {
    if (message.subscription === appModel.get('cometd').channels.academy) {
      getLessonsList();
      getAcademyTrophies();
      getAvatar();
    }
  }

  function onMetaUnsuccessful() {
    broker.trigger('views:error', 'There is a problem connecting to the server');
  }

  // populate the collection
  function triggerCollectionsControllerCometD(message) {

    var data = JSON.parse(message.data),
        previousOverallProgress = appModel.get('overallProgress');

    if (typeof data.overallProgress !== 'undefined') {
      if(previousOverallProgress === 0 && data.overallProgress > previousOverallProgress) {
        broker.trigger('show:header:utilities');
      }
      appModel.set({overallProgress : data.overallProgress});
    }

    // Events trigger collection methods in collectionsController
    if (typeof data.lessonJourneys !== 'undefined') {
      setLessonModelData(data.lessonJourneys);
    }
  }

  function setLessonModelData (data) {
    _.each(data, function (model, index) {
      model.order = index;
      if(model.scormData) {
        model.scormData = JSON.parse(model.scormData);
      }
    });
    broker.trigger('get:collection:lessons', data);
  }

  function lessonsUpdated(message) {
    if (JSON.parse(message.data).unlocked === true) {
      getLessonsList();
    }
    if (JSON.parse(message.data).unlocked === false) {
      broker.trigger('views:error', 'There was a problem updating the lesson');
    }
  }

  function academyTrophiesUpdated (message) {
    // Pass to collection
    var trophies = JSON.parse(message.data).progressions['lesson-challenge'];
    broker.trigger('get:collection:trophies', trophies);
  }

  function avatarUpdate (message) {
    var data = JSON.parse(message.data).avatars,
        avatarImg;

    avatarImg = _.map(data, function (val) {
      return val['imageUri'];
    });

    userModel.set('avatar', avatarImg[0]);

  }

  function getLessonsList () {
    comms.publish({
      'channel' : appModel.get('cometd').channels.academy,
      data : {
        "playerId" : userModel.get('playerId'),
        "ventureId" : urlParamsManager.getUrlParameterByName('ventureId') || appModel.get('ventureId')
      }
    });
  }

  function getAcademyTrophies () {
    comms.publish({
      'channel' : appModel.get('cometd').channels.academyTrophies,
      data : {
        "messagePlayerTokenInfo":{
            "id":userModel.get('playerId'),
            "ventureId": urlParamsManager.getUrlParameterByName('ventureId') || appModel.get('ventureId')
         },
         "categories":[
            "lesson-challenge"
         ]
      }
    });
  }

  function getAvatar () {
    comms.publish({
      'channel' : appModel.get('cometd').channels.avatar,
      data : {
        "players" : [{
          'id': userModel.get('playerId'),
          'ventureId': appModel.get('ventureId')
        }]
      }
    });
  }

  function initializeCometConnection() {
    console.log("initializeCometConnection", Comm);
    if (typeof Comm !== 'undefined') {
      comms = Comm.getConnection();
      startListeners(true);
    }
    userModel.on('change:token', function() {
      if (typeof Comm !== 'undefined') {
        comms = Comm.getConnection();
      } else {
        console.log("HI TO+KEN", userModel.get("token"));
        var connectionConfig = {
          url : appModel.get('cometd').url,
          logLevel : "info",
          memberId : userModel.get('playerId'),
          name : userModel.get('userName'),
          ventureId : urlParamsManager.getUrlParameterByName('ventureId') || appModel.get('ventureId'),
          credentials : userModel.get('token'),
          onMetaSubscribe : onMetaSubscribe,
          onMetaUnsuccessful : onMetaUnsuccessful,
          maxNetworkDelay : 5000
        };
        comms = communications.createCometDConnection(connectionConfig);
      }
      startListeners(true);
    });
     userModel.fetch();
  }

  function startListeners(isLocal) {

    if (!appModel.get('appConfig').local) {
      communicationsCollectionsCD = comms.subscribe({
        'channel' : appModel.get('cometd').channels.academy,
        'callback' : triggerCollectionsControllerCometD,
        'context' : 'LOBBY'
      });
      communicationsAcademyLessonsUpdated = comms.subscribe({
        'channel' : appModel.get('cometd').channels.academyLessonUpdate,
        'callback' : lessonsUpdated,
        'context' : 'LOBBY'
      });
      communicationsAcademyTrophies = comms.subscribe({
        'channel' : appModel.get('cometd').channels.academyTrophies,
        'callback' : academyTrophiesUpdated,
        'context' : 'LOBBY'
      });
      communicationsAvatar = comms.subscribe({
        channel: appModel.get('cometd').channels.avatar,
        callback: avatarUpdate,
        context: 'LOBBY'
      });
      if (isLocal) {
        communicationsListenerSubscribe = comms.addListener('/meta/subscribe', onMetaSubscribe, this);
        communicationsListenerUnsuccessful = comms.addListener('/meta/unsuccessful', onMetaUnsuccessful, this);
      }
    }
  }

  function stopListeners() {
    if (!appModel.get('appConfig').local) {
      comms.unsubscribeSingle(communicationsCollectionsCD);
      comms.unsubscribeSingle(communicationsAcademyLessonsUpdated);
      comms.unsubscribeSingle(communicationsAcademyTrophies);
      comms.unsubscribeSingle(communicationsAvatar);
      comms.removeListener(communicationsListenerSubscribe);
      comms.removeListener(communicationsListenerUnsuccessful);
    }
  }

  function initConnections() {

    if (typeof appModel.get('Comms') !== 'undefined') {
      Comm = appModel.get('Comms');
    }
    // Check to see if were local or not
    if (appModel.get('appConfig').local) {
      // Only if local variable is set to true
      broker.trigger('get:collection:lessons');
      return;
    } else {
      initializeCometConnection();
    }
  }

  return {
    init : initConnections,
    start : startListeners,
    stop : stopListeners
  };
  // return initConnections;

});