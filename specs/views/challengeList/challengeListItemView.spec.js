define(function(require) {

  var ChallengeListItemView = require('challengeListItemView'),
      broker = require('shared.utils/broker');

  describe("Challenge List Item View / ", function () {

    describe("Defaults / ", function () {

      beforeEach(function () {
        this.challengeListItemView = new ChallengeListItemView();
      });

      it('Tagname should be li', function(){
        expect(this.challengeListItemView.tagName).toBe('li');
      });

      it('Class name should be challenge-list-item', function(){
        expect(this.challengeListItemView.className).toBe('challenge-list-item');
      });

    });

    describe("Methods / ", function () {

      it('toggleRedoLessons should add the class display-redo-lesson', function () {
        this.challengeListItemView = new ChallengeListItemView({
          challengeStatus: "inprogress"
        });
        this.challengeListItemView.toggleRedoLesson();
        expect(this.challengeListItemView.el).toHaveAttr('class', 'challenge-list-item display-redo-lesson');
      });

      it('toggleRedoLessons should NOT add the class display-redo-lesson', function () {
        this.challengeListItemView = new ChallengeListItemView({
          challengeStatus: "new"
        });
        this.challengeListItemView.toggleRedoLesson();
        expect(this.challengeListItemView.el).toHaveAttr('class', 'challenge-list-item');
      });

      it('layoutManager should add class challenge-completed', function () {
        this.challengeListItemView = new ChallengeListItemView({
          challengeStatus: "completed"
        });
        this.challengeListItemView.layoutManager();
        expect(this.challengeListItemView.el).toHaveAttr('class', 'challenge-list-item challenge-completed');
      });

    });

  });
});