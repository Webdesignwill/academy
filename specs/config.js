// Require configuration

require.config({

  deps:[
    'backbone',
    'jquery',
    'underscore',
    'handlebars',
    'viewMaster',
    'appModel'
  ],

  paths:{

    ////////////////////
    // 3rd party Libs //
    ////////////////////
    
    backbone:'../shared/js/libs/backbone/backbone-0.9.9',
    jquery:'../shared/js/libs/jquery/jquery-1.7.2.min',
    underscore:'../shared/js/libs/underscore/underscore-1.3.3.min',
    handlebars:'../shared/js/libs/handlebars/handlebars',
    text:'../shared/js/libs/require/text',

    ///////////////////
    // Communication //
    ///////////////////

    cometd:'../shared/js/libs/cometd/cometd',
    jQueryCometd:'../shared/js/libs/cometd/jquery.cometd',
    communications:'../shared/js/libs/cometd/communications',
    luajs:'../shared/js/libs/cometd/luajs',

    ///////////////////////////
    // Shared JS Controllers //
    ///////////////////////////

    collectionsController : '../shared/js/controllers/collections/collectionsController',
    connectionsController:'../shared/js/controllers/connections/connectionsController',
    viewsController : '../shared/js/controllers/views/viewsController',

    /////////////////////
    // Shared JS Utils //
    /////////////////////

    broker:'../shared/js/utils/broker',
    lessonApi:'../shared/js/utils/lessonApi',
    viewMaster:'../shared/js/utils/viewMaster',
    viewAssembler:'../shared/js/utils/viewAssembler',

    ///////////////////////////
    // Shared JS Collections //
    ///////////////////////////

    glossaryCollection:'../shared/js/collections/glossary/glossaryCollection',
    lessonsCollection:'../shared/js/collections/lessons/lessonsCollection',
    staticLessonsCollection:'../shared/js/collections/lessons/staticLessonsCollection',
    viewsCollection:'../shared/js/collections/views/viewsCollection',
    searchCollection:'../shared/js/collections/search/searchCollection',

    //////////////////////
    // Shared JS Models //
    //////////////////////

    appModel:"../shared/js/models/app/appModel",
    serverLessonModel:"../shared/js/models/lesson/serverLessonModel",
    staticLessonModel:"../shared/js/models/lesson/staticLessonModel",
    userModel:"../shared/js/models/user/userModel",

    //////////////////////
    // Shared JS Mixins //
    //////////////////////

    /////////////////////
    // Shared JS Views //
    /////////////////////

    ////////////////////////////
    // Venture specific Views //
    ////////////////////////////

    errorView : "../ventures/virgin/facebook/js/views/errors/errorView",
    // Lessons
    lessonListView : "../ventures/virgin/facebook/js/views/lessonsList/lessonListView",
    lessonListItemView : "../ventures/virgin/facebook/js/views/lessonsList/lessonListItemView",
    lessonView : "../ventures/virgin/facebook/js/views/lesson/lessonView",
    lessonCompletedView : "../ventures/virgin/facebook/js/views/lesson/lessonCompletedView",
    // Challenges
    challengeListView : "../ventures/virgin/facebook/js/views/challengeList/challengeListView",
    challengeListItemView : "../ventures/virgin/facebook/js/views/challengeList/challengeListItemView",
    // Navigation
    primaryNavView : "../ventures/virgin/facebook/js/views/navigation/primaryNavView",
    primaryNavItemView : "../ventures/virgin/facebook/js/views/navigation/primaryNavItemView",
    // Search
    searchFormView : "../ventures/virgin/facebook/js/views/searchAndSort/searchFormView",
    searchInputView : "../ventures/virgin/facebook/js/views/searchAndSort/searchInputView",
    searchSortByView : "../ventures/virgin/facebook/js/views/searchAndSort/searchSortByView",
    searchListView : "../ventures/virgin/facebook/js/views/searchAndSort/searchListView",
    searchSortListItemView : "../ventures/virgin/facebook/js/views/searchAndSort/searchSortListItemView",
    // Glossary
    glossaryPageView : "../ventures/virgin/facebook/js/views/glossary/glossaryPageView",
    glossaryListView : "../ventures/virgin/facebook/js/views/glossary/glossaryListView",
    glossaryListItemView : "../ventures/virgin/facebook/js/views/glossary/glossaryListItemView",
    // Speech Bubble
    speechBubbleView : "../ventures/virgin/facebook/js/views/speechBubble/speechBubbleView",

    ////////////////////////////////
    // Venture specific templates //
    ////////////////////////////////

    errorTpl : "../ventures/virgin/facebook/js/views/errors/templates/errorTpl",
    lessonItemTpl : "../ventures/virgin/facebook/js/views/lessonsList/templates/lessonListItemTpl",
    challengeItemTpl : "../ventures/virgin/facebook/js/views/challengeList/templates/challengeListItemTpl",
    primaryNavItemTpl : "../ventures/virgin/facebook/js/views/navigation/templates/primaryNavItemTpl",
    // Search templates
    searchFormTpl : "../ventures/virgin/facebook/js/views/searchAndSort/templates/searchFormTpl",
    searchSortByTpl : "../ventures/virgin/facebook/js/views/searchAndSort/templates/searchSortByTpl",
    // Glossary templates
    glossaryListItemTpl : "../ventures/virgin/facebook/js/views/glossary/templates/glossaryListItemTpl",
    glossaryListTpl : "../ventures/virgin/facebook/js/views/glossary/templates/glossaryListTpl",
    speechBubbleTpl : "../ventures/virgin/facebook/js/views/speechBubble/templates/speechBubbleTpl",
    // Lesson
    lessonCompletedTpl : "../ventures/virgin/facebook/js/views/lesson/templates/lessonCompletedTpl"

  },

  shim:{
    backbone:{
      deps:['jquery', 'underscore', 'handlebars'],
      exports:'Backbone'
    },
    underscore:{
      exports:'_'
    },
    handlebars:{
      exports:'Handlebars'
    },

    // Comms
    connectionManager:{
      deps:['jquery', 'jQueryCometd'],
      exports:'connectionManager'
    },
    jQueryCometd:{
      deps:['cometd'],
      exports:'$.cometd'
    },
    cometd:{
      exports:'org.cometd'
    }
  }

});

require(['JasmineSetup']);