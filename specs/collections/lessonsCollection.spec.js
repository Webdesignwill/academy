define(function(require) {

  var lessonsCollection = require('shared.collections/lessons/lessonsCollection'),
      appModel = require('shared.models/app/appModel');

  lessonsCollection.add([
    {
      "status":"recommended",
      "awardXp":10,
      "challengeStatus":"locked",
      "challengeProgress":0,
      "id":"1"
    },
    {
      "status":"default",
      "awardXp":10,
      "challengeStatus":"locked",
      "challengeProgress":0,
      "id":"2"
    },
    {
      "status":"completed",
      "awardXp":10,
      "challengeStatus":"inprogress",
      "challengeProgress":0,
      "id":"3"
    },
    {
      "status":"default",
      "awardXp":10,
      "challengeStatus":"locked",
      "challengeProgress":0,
      "id":"4"
    }
  ]);

  describe("Server Lessons Collection / ", function () {

    describe("Connectivity / ", function () {

      it('The URL', function(){
        expect(lessonsCollection.url).toBe('../../../server-lesson-data.json');
      });

    });

    describe("Methods / ", function () {

      it('Lesson setter should set appModel by available lesson status data', function () {
        lessonsCollection.lessonSetter('status', 'lessonStatus');
        expect(appModel.get('lessonStatus').recommended).toBe('recommended');
      });

      it('Lesson setter should set appModel by available challenge status data', function () {
        lessonsCollection.lessonSetter('challengeStatus', 'challengeStatus');
        expect(appModel.get('challengeStatus').inprogress).toBe('inprogress');
      });

      it('Comparator should return list in correct order', function () {
        // TODO
      });

    });

  });
});