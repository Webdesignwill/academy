define(function(require) {

  var ChallengeListView = require('challengeListView'),
      lessonsCollection = require('shared.collections/lessons/lessonsCollection');

  beforeEach(function () {
    this.challengeListView = new ChallengeListView();
  });

  describe("Challenge List View / ", function () {

    describe("Defaults / ", function () {

      it('Tagname should be ul', function(){
        expect(this.challengeListView.tagName).toBe('ul');
      });

      it('ID and Class name should be challenge-list', function(){
        expect(this.challengeListView.id).toBe('challenge-list');
        expect(this.challengeListView.className).toBe('challenge-list');
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

      it('Render should have 1 subviews', function () {
        this.challengeListView.render();
        expect(this.challengeListView.subViews.length).toBe(1);
      });

      it('_checkCount should return false', function () {
        lessonsCollection.reset([]);
        this.challengeListView.render();
        expect(this.challengeListView._checkCount()).toEqual(false);
      });

    });

  });
});