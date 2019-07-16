define(function(require) {

  var LessonListItemView = require('lessonListItemView'),
      broker = require('shared.utils/broker');

  describe("Lesson List Item View / ", function () {

    describe("Defaults / ", function () {

      beforeEach(function () {
        this.lessonListItemView = new LessonListItemView();
      });

      it('Tagname should be li', function(){
        expect(this.lessonListItemView.tagName).toBe('li');
      });

      it('Class name should be lesson-list-item', function(){
        expect(this.lessonListItemView.className).toBe('lesson-list-item');
      });

    });

    describe("Methods / ", function () {

      it('renderSash should have class name after model status', function () {
        var lessonListItemView = new LessonListItemView({
          awardTitle: "Reraiser sharp",
          awardXp: 10,
          challengeCriteria: "Make 10 preflops raises",
          challengeProgress: 6,
          challengeStatus: "inprogress",
          id: "32",
          status: "locked",
          tip: "If you want to raise with good starting cards, the best raise size is 3 or 4 times the size of the big blind, regardless of the strength of your hand.",
          title: "Preflop Betsizing",
          url: "../../../shared/lessons/scorm/dev/index_lms.html"
        });
        lessonListItemView.render();
        lessonListItemView.renderSash();
        expect(lessonListItemView.$el.find('.sash')).toHaveAttr('class', 'sash sprites-sash-locked');
      });

      it('toggleLearnMoreButton should add display-learn-more-btn to el', function () {
        var lessonListItemView = new LessonListItemView({
          status : 'locked'
        });
        lessonListItemView.toggleLearnMoreBtn();
        expect(lessonListItemView.el).toHaveAttr('class', 'lesson-list-item display-learn-more-btn');
      });

      it('toggleUnlockLevel should add display-unlock-level to el', function () {
        var lessonListItemView = new LessonListItemView({
          status : 'locked'
        });
        lessonListItemView.toggleUnlockLevel();
        expect(lessonListItemView.el).toHaveAttr('class', 'lesson-list-item display-unlock-level');
      });

      it('addMask should prepend a mask to el with class lesson-mask', function () {
        var lessonListItemView = new LessonListItemView({
          status : 'locked'
        });
        lessonListItemView.addMask();
        expect(lessonListItemView.$el.find('.lesson-mask')).toHaveAttr('class', 'lesson-mask');
      });

      it('displayChallenge should prepend a mask to el with class lesson-mask', function () {
        var lessonListItemView = new LessonListItemView({
          status : 'locked'
        });
        lessonListItemView.displayChallenge();
        expect(lessonListItemView.el).toHaveAttr('class', 'lesson-list-item display-challenge');
      });

    });

  });
});