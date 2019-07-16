
define(function (require) {

  "use strict";

  // Require Libs
  var $ = require('jquery'),

      // Require Views
      LessonListView = require('views/lessonsList/lessonListView'),
      ErrorView = require('views/errors/errorView'),
      GlossaryPageView = require('views/glossary/glossaryPageView'),
      LessonView = require('views/lesson/lessonView'),
      LessonCompletedView = require('views/lesson/lessonCompletedView'),
      PrimaryNavView = require('views/navigation/primaryNavView'),
      SearchFormView = require('views/searchAndSort/searchFormView'),
      HeaderView = require('views/header/headerView'),
      UtilityBarView = require('views/utilityBar/utilityBarView'),

      // Vars and renderer
      appModel = require('shared.models/app/appModel'),
      viewAssembler = require('shared.utils/viewAssembler'),

      broker = require('shared.utils/broker');

  var interests = {
    'views:navTools' : renderNavTools,
    'views:lessons:list' : renderLessonsListView,
    'views:modal:lesson' : renderLessonModalView,
    'views:modal:lessonCompleted' : renderLessonCompletedModalView,
    'views:renderHeader' : renderHeader,
    // 'views:glossary:list' : renderGlossaryView,
    'views:glossary:list' : renderGlossaryView,
    'views:error' : renderErrorView,
    'modal:show' : showModal,
    'modal:sub:show' : showSubModal,
    'modal:close' : closeModal,
    'modal:sub:close' : closeSubModal,
    'hide:element' : hideElement
  };

  // Get the broker to listen to the interests
  broker.on(interests, this);

  function renderNavTools () {

    var primaryNavView = new PrimaryNavView(),
        utilityBarView = new UtilityBarView(),
        searchFormView = new SearchFormView();

    $('#' + appModel.get('viewIdentifiers').utilityBar).html(utilityBarView.render().el);

    primaryNavView.render();
    searchFormView.render();

  }

  function navEvent (options) {
    if(typeof options === 'undefined') {
      return 'tab:' + appModel.get('nav');
    }
  }

  // Lessons list views
  function renderLessonsListView (options) {
    appModel.set('goToLink', null);
    viewAssembler({
      V : LessonListView,
      el : '#' + appModel.get('viewIdentifiers').academyContent,
      ev : [navEvent(options), 'show:utilityBar:lessons'],
      page : 'lessons',
      args : {
        searchStr : options && options.searchStr || null,
        nav : options && options.nav || null
      }
    });
  }

  // The glossary view
  function renderGlossaryView (search) {
    viewAssembler({
      V : GlossaryPageView,
      el : '#' + appModel.get('viewIdentifiers').academyContent,
      page : 'glossary',
      args : {
        searchStr : search && search.searchStr || null
      }
    });
  }

  // Lesson view
  function renderLessonModalView (model) {
    viewAssembler({
      V : LessonView,
      ev : ['modal:show'],
      el : '#' + appModel.get('viewIdentifiers').academyModal,
      args : {url : model.url, id : model.id}
    });
  }

  function renderLessonCompletedModalView (lessonModel) {
    viewAssembler({
      V : LessonCompletedView,
      ev : ['modal:show'],
      el : '#' + appModel.get('viewIdentifiers').academyModal,
      args : {lessonModel : lessonModel}
    });
  }

  //Lessons Progress View
  function renderHeader () {
    viewAssembler({
      V : HeaderView,
      el : '#' + appModel.get('viewIdentifiers').academyHeader
    });
  }

  // Error views
  function renderErrorView (error) {
    viewAssembler({
      V : ErrorView,
      el : '#' + appModel.get('viewIdentifiers').academyContent,
      page : appModel.get('page'),
      args : {
        error : error
      }
    });
  }

  // Show the modal window and load view
  function showModal () {
    $('#' + appModel.get('viewIdentifiers').academyGlobalContainer).addClass('show-modal');
  }

  // Modal temporary until lobby modularization
  function showSubModal () {
    $('#academy-global-container').addClass('show-sub-modal');
  }

  // Close the modal and remove view
  function closeModal () {

    if(appModel.get('lessonInProgress')) {
      appModel.set('lessonInProgress', false);
    }

    $('#' + appModel.get('viewIdentifiers').academyGlobalContainer).removeClass('show-modal');
    broker.trigger('tab' + appModel.get('nav'));
  }

  // Close the modal and remove view
  function closeSubModal () {
    $('#academy-global-container').removeClass('show-sub-modal');
  }

  function hideElement (element, cls) {
    if(typeof cls !== 'undefined'){
      $(element).removeClass(cls);
      return;
    }
    $(element).hide();
  }

});