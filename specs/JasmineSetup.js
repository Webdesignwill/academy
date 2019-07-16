define(function(require){
  // jasmine.getFixtures().fixturesPath = 'fixtures/html';
  // jasmine.getJSONFixtures().fixturesPath = 'fixtures/json';
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
  
  require([
    
    // Collections
    'collections/glossaryCollection.spec.js',
    'collections/lessonsCollection.spec.js',
    'collections/staticLessonsCollection.spec.js',
    'collections/viewsCollection.spec.js',
    'collections/searchCollection.spec.js',

    // Models
    'models/serverLessonModel.spec.js',
    'models/staticLessonModel.spec.js',

    // Views
    'views/challengeList/challengeListView.spec.js',
    'views/challengeList/challengeListItemView.spec.js',
    'views/lessonsList/lessonListView.spec.js',
    'views/lessonsList/lessonListItemView.spec.js',
    // Search stuff
    'views/searchAndSort/searchFormView.spec.js',
    'views/searchAndSort/searchInputView.spec.js',
    'views/searchAndSort/searchListView.spec.js',
    'views/searchAndSort/searchSortByView.spec.js',
    'views/searchAndSort/searchSortListItemView.spec.js'

    ], function(){
        jasmineEnv.execute();
  });
});