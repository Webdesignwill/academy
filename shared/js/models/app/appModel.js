
define(function (require) {

  "use strict";

  var urlParamsManager = require('shared.utils/urlParamsManager'),
      getConstant = require('shared/constants');

  var AppModel = Backbone.Model.extend({

    applicationLoaded : false,

    backupTokenUrl : 'https://socialdev.poker.gamesys.corp:9083/token',
    backupCometdUrl : 'https://socialdev.poker.gamesys.corp:8082/cometd',
    debug : getConstant('debug'),
    local : getConstant('local'),
    venture : getConstant('venture'),
    glossary : getConstant('glossary'),
    lessonLibrary : getConstant('lessonLibrary'),
    devServer : 'https://socialdev.poker.gamesys.corp',
    offlineLessonData : getConstant('offlineLessonData'),

    readableStatus : {
      'recommended' : 'Recommended',
      'niew' : 'New', // Leave key typo. Reserved word
      'unlocked' : 'Unlocked',
      'locked' : 'Locked',
      'inprogress' : 'In Progress',
      'completed' : 'Completed'
    },

    // Search configuration
    searchConfig : {
      'text' : 'Search all'
    },

    ///////////
    // Model //
    ///////////

    initialize : function () {

      this.checkOfflineMode();
      this.setOfflineData();
      this.setDebug();
      this.setToken();
      this.setCometd();
      this.setGlossary();
      this.setVenture();
      this.setLessonLibrary();
      this.setOfflineData();
      this.setNavItems();
      this.setSearchConfig();
      this.setViewIdentifiers();
      this.setCollectionSortOrdering();
      this.setStatusOptions();
      this.setReadableStatus();

    },

    checkOfflineMode : function () {
      if(urlParamsManager.getUrlParameterByName('offline')){
        this.set('appConfig', {
          'local' : true
        });
      } else {
        this.set('appConfig', {
          'local' : false
        });
      }
    },

    setDebug : function () {
      this.set('debug', {
        zombieKiller : true,
        handlebars : this.debug.handlebars
      });
    },

    setToken : function () {
      this.set('token', {
        url : urlParamsManager.getUrlParameterByName('token') || this.backupTokenUrl
      });
    },

    setCometd : function () {
      this.set('cometd', {
        url : urlParamsManager.getUrlParameterByName('cp') || this.backupCometdUrl,
        channels : {
          'academy' : '/academy/lessons',
          'academyLessonUpdate' : '/academy/lesson/update',
          'academyTrophies' : '/service/gamification/achievement/progress',
          'avatar': '/service/playerprofile/avatar/getforplayers'
        }
      });
    },

    setVenture : function () {
      this.set('ventureId', this.venture.facebook);
    },

    setGlossary : function () {
      this.set('glossary', {
        path : this.glossary.path
      });
    },

    setLessonLibrary : function () {
      if(this.get('appConfig').local) {
        this.set('lessonLibrary', {
          path : this.lessonLibrary.offline
        });
      } else {
        this.set('lessonLibrary', {
          path : this.lessonLibrary.online
        });
      }
    },

    setOfflineData : function () {
      this.set('offlineLessonData', {
        path : this.offlineLessonData.path
      });
    },

    setNavItems : function () {
      this.set('navItems', {
        'all' : 'All',
        'beginner' : 'Beginner',
        'intermediate' : 'Intermediate',
        'advanced' : 'Advanced'
      });
    },

    setSearchConfig : function () {
      this.set('searchConfig', {
        'text' : this.searchConfig.text
      });
    },

    setViewIdentifiers : function () {
      this.set('viewIdentifiers', {
        // Top level
        'navContainer' : 'nav-container',
        'navBar' : 'nav-bar',
        'academyGlobalContainer' : 'academy-global-container',
        'academyContent' : 'academy-content',
        'academyHeader' : 'academy-header',
        'academyModal' : 'academy-modal',
        'utilityBar' : 'utility-bar',
        'navigationBackButton' : 'navigation-back-button',

        // Views
        'error' : 'error-view',
        'glossaryPage' : 'glossary-page-view',
        'glossaryList' : 'glossary-list-view',
        'glossaryListItem' : 'glossary-list-item-view',
        'lessonsList' : 'lessons-list',
        'lessonsListItem' : 'lesson-list-item',
        'lessonCompleted' : 'lesson-completed',
        'lesson' : 'lesson-view', // Modal window, rename TODO
        'sortSearch' : 'sort-search',
        'searchInput' : 'search-input',
        'spritesSortBtn' : 'sprites-sort-btn'
      });
    },

    setCollectionSortOrdering : function () {
      this.set('collectionSortOrdering', {
        'recommended' : 2,
        'new' : 3,
        'inprogress' : 1,
        'completed' : 4,
        'locked' : 5
      });
    },

    setStatusOptions : function () {
      this.set('statusOptions', {
        "lesson" : "status",
        "challenge" : "challengeStatus"
      });
    },

    setReadableStatus : function () {
      this.set('readableStatus', {
        'recommended' : this.readableStatus.recommended,
        'new' : this.readableStatus.niew, // Leave typo. Reserved word otherwise
        'unlocked' : this.readableStatus.unlocked,
        'locked' : this.readableStatus.locked,
        'inprogress' : this.readableStatus.inprogress,
        'completed' : this.readableStatus.completed
      });
    }

  });

  return new AppModel();

});
