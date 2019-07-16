
define(function (require) {

  "use strict";

  var _ = require('underscore'),
      lessonsCollection = require('shared.collections/lessons/lessonsCollection'),
      glossaryCollection = require('shared.collections/glossary/glossaryCollection'),
      searchCollection = require('shared.collections/search/searchCollection'),
      appModel = require('shared.models/app/appModel');

  var byNav = function () {
    var self = this;
    return _.filter(lessonsCollection.models, function (model) {
      if(model.get('level') === self.nav) {
        return model;
      }
    });
  };

  var byLesson = function () {
    var self = this;
    return _.filter(lessonsCollection.models, function (model) {

      var title = model.get('title').toLowerCase(),
          tip = model.get('tip').toLowerCase();

      var challengeCriteria = model.get('challengeCriteria') && model.get('challengeCriteria').toLowerCase() || '';
      var awardTitle = model.get('awardTitle') && model.get('awardTitle').toLowerCase() || '';

      if (title.indexOf(self.searchStr) !== -1 || tip.indexOf(self.searchStr) !== -1 || challengeCriteria.indexOf(self.searchStr) !== -1 || awardTitle.indexOf(self.searchStr) !== -1) {
        return model;
      }
    });
  };

  var byGlossary = function () {
    var self = this,
        collection = [],
        wordCollection = [],
        letterCollection = [],
        previousLetter;

    glossaryCollection.each(function (element, index, list) {
      _.filter(element.get('words'), function (innerModel) {
        if(innerModel.word.toLowerCase().indexOf(self.searchStr) !== -1) {
          letterCollection.push(element.get('letter'));
          wordCollection.push({
            word : innerModel.word,
            description : innerModel.description
          });
        }
      });
    });

    _.each(letterCollection, function (letter, index, list) {
      if(previousLetter !== letter) {
        var filteredWordsArray = _.filter(wordCollection, function (words, index, list) {
          if(words.word[0] === letter) {
            return {word : words.word};
          }
        });

        collection.push({
          letter : letter,
          words : filteredWordsArray
        });
      }

      previousLetter = letter;

    });

    return collection;

  };

  var searchFilter = function () {

    var results = [];

    if(appModel.get('page') === 'glossary') {
      results = byGlossary.call(this);
    }
    if(typeof this.searchStr !== 'undefined' && appModel.get('page') !== 'glossary') {
      results = byLesson.call(this);
    }
    if(typeof this.nav !== 'undefined') {
      results = byNav.call(this);
    }

    if (typeof results !== 'undefined' && results.length === 0) {
      return false;
    } else {
      searchCollection.reset(results);
      return true;
    }

  };

  return searchFilter;

});