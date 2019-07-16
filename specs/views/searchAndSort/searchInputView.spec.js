define(function(require) {

  var SearchFormView = require('searchInputView'),
      appModel = require('shared.models/app/appModel');

  describe("Search Input View / ", function () {

    describe("Defaults / ", function () {

      beforeEach(function () {
        this.searchFormView = new SearchFormView();
      });

      it('Tagname should be input', function(){
        expect(this.searchFormView.tagName).toBe('input');
      });

      it('Class name should be search-input', function(){
        expect(this.searchFormView.className).toBe('search-input');
      });

    });

    describe("Methods / ", function () {

      it('Should reset the search values', function () {
        var searchFormView = new SearchFormView();
        searchFormView.$el.val('A SEARCH STRING');
        searchFormView.resetSearch();
        expect(searchFormView.$el.val()).toBe('');
      });

      // keyUp TODO

    });

  });
});