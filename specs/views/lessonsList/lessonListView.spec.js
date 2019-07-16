define(function(require) {

  var LessonListView = require('lessonListView'),
      lessonsCollection = require('shared.collections/lessons/lessonsCollection');

  beforeEach(function () {
    this.lessonListView = new LessonListView();
  });

  describe("Lesson List View / ", function () {

    describe("Defaults / ", function () {

      it('Tagname should be ul', function(){
        expect(this.lessonListView.tagName).toBe('ul');
      });

      it('ID and Class name should be challenge-list', function(){
        expect(this.lessonListView.id).toBe('lessons-list');
        expect(this.lessonListView.className).toBe('lessons-list');
      });

    });

    describe('The methods', function () {

      beforeEach(function () {
        lessonsCollection.reset([
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
      });

      it('Render should have 4 subviews', function () {
        this.lessonListView.render();
        expect(this.lessonListView.subViews.length).toBe(4);
      });

    });

  });
});