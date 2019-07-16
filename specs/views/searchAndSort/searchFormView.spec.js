define(function(require) {

  var SearchFormView = require('searchFormView'),
      appModel = require('shared.models/app/appModel'),
      SearchInputView = require('searchInputView'),
      SearchSortByView = require('searchSortByView');

  describe("Search Form View / ", function () {

    describe("Defaults / ", function () {

      beforeEach(function () {
        this.searchFormView = new SearchFormView();
      });

      it('Tagname should be form', function(){
        expect(this.searchFormView.tagName).toBe('form');
      });

      it('Class name should be sort-search', function(){
        expect(this.searchFormView.className).toBe('sort-search');
      });

    });

    describe("Should instantiate two new views", function () {

      it('Should render searchInputView', function () {
        var searchFormView = new SearchFormView(),
            MrBond = sinon.spy(SearchInputView.prototype, 'initialize');

        searchFormView.render();
        expect(MrBond.calledOnce).toBeTruthy();

        MrBond.reset();

      });

      it('Should instantiate searchSortByView', function () {
        var searchFormView = new SearchFormView(),
            MrBond = sinon.spy(SearchSortByView.prototype, 'initialize');

        searchFormView.render();
        expect(MrBond.calledOnce).toBeTruthy();

        MrBond.reset();

      });

    });

  });
});