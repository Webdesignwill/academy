define(function(require) {

  var glossaryCollection = require('shared.collections/glossary/glossaryCollection');

  describe("Glossary Collection / ", function () {

    describe("Connectivity / ", function () {

      it('The URL', function(){
        expect(glossaryCollection.url).toBe('../../../shared/glossary/glossary.json');
      });

    });

  });
});