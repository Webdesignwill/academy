define(function(require) {

  var SearchListView = require('searchListView'),
      appModel = require('shared.models/app/appModel');

  describe("Search List View / ", function () {

    describe("Defaults / ", function () {

      beforeEach(function () {
        this.searchListView = new SearchListView({
          searchStr: "william", sortby: false
        });
      });

      it('Tagname should be ul', function(){
        expect(this.searchListView.tagName).toBe('ul');
      });

      it('Class name should be lessons-list challenge-list', function(){
        expect(this.searchListView.className).toBe('challenge-list lessons-list');
      });

    });

  });
});