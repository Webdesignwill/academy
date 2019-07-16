define(function(require) {

  var staticLessonsCollection = require('staticLessonsCollection'),
      appModel = require('shared.models/app/appModel');

  describe("Static Lessons Collection / ", function () {

    describe("Connectivity / ", function () {

      it('The URL in offline mode', function(){
        if(appModel.get('appConfig').local) {
          expect(staticLessonsCollection.url).toBe('../../../shared/lessons/data/lessons.json');
        }
      });

      it('The URL in online mode', function(){
        if(appModel.get('appConfig').local === false) {
          expect(staticLessonsCollection.url).toBe('../../../shared/lessons/data/lessonsLive.json');
        }
      });

    });

  });
});