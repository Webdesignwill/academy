
define(function (require) {

  "use strict";

  var broker = require('shared.utils/broker'),
      appModel = require('shared.models/app/appModel'),
      lessonsCollection = require('shared.collections/lessons/lessonsCollection'),
      glossaryCollection = require('shared.collections/glossary/glossaryCollection'),
      staticLessonsCollection = require('shared.collections/lessons/staticLessonsCollection'),
      trophiesCollection = require('shared.collections/trophies/trophiesCollection');

  var interests = {
    'get:collection:lessons' : getLessons,
    'get:collection:glossary' : getGlossaryCollection,
    'get:collection:trophies' : getTrophiesCollection
  };

  // Get the broker to listen to the interests
  broker.on(interests, this);

  // Get the lessons from server and create collection
  function getLessons (data) {
    // Get local data or switch to server data
    if(appModel.get('appConfig').local){
      lessonsCollection.fetch({
        success : getLessonsLibrary,
        error : handleError
      });
    } else {
      lessonsCollection.reset(data);
      getLessonsLibrary();
    }
  }

  // Get the static lessons and create collection
  function getLessonsLibrary () {
    // Start getting and merging the lessons
    staticLessonsCollection.fetch({
      success : checkSynchronicity,
      error : handleError
    });
  }

  function checkSynchronicity () {
    // Check to see if the data is in sync. If not, fail catastrophically
    if(lessonsCollection.length !== staticLessonsCollection.length) {
      broker.trigger('views:error', 'The lesson data stored locally is different to the data that came back from the server. Local data length is ' + staticLessonsCollection.length + ' and the server data length is ' + lessonsCollection.length);
    } else {
      mergeLocalAndServerCollections();
    }
  }

  // Merge the two
  function mergeLocalAndServerCollections () {
    lessonsCollection.set(staticLessonsCollection.models);
    loadNavAndLessons();
  }

  function loadNavAndLessons () {
    if(appModel.get('applicationLoaded')){
      broker.trigger('tab:' + appModel.get('nav'));
      return;
    }
    appModel.set('applicationLoaded', true);
  }

  // Handle any errors
  function handleError () {
    broker.trigger('views:error', 'There was a problem either getting Glossary or local Lessons data');
  }

  // Grab the glossary
  function getGlossaryCollection () {
    glossaryCollection.fetch({
      error : handleError
    });
  }

  function getTrophiesCollection (data) {
    trophiesCollection.reset(data);
  }

});
