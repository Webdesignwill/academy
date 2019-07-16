// Require configuration
require.config({

  paths: {
    'jquery': './../../../../shared/js/libs/jquery/jquery-1.7.2.min',
    'backbone': '../../../../shared/js/libs/backbone/backbone-1.0',
    'underscore': '../../../../shared/js/libs/underscore/underscore',
    'handlebars': '../../../../shared/js/libs/handlebars/handlebars',
    'text': '../../../../shared/js/libs/require/text',
    'viewMaster' : 'shared.utils/viewMaster',

    'cometd': '../../../../shared/js/libs/cometd/cometd',
    'jQueryCometd': '../../../../shared/js/libs/cometd/jquery.cometd',
    'communications': '../../../../shared/js/libs/cometd/communications',
    'luajs': '../../../../shared/js/libs/cometd/luajs',
    'json2': '../../../../shared/js/libs/json2/json2',
    'consolePolyfill': '../../../../shared/js/libs/console-polyfill/console-polyfill',

    'shared': './../../../../shared/js',
    'shared.libs': './../../../../shared/js/libs',
    'shared.utils': './../../../../shared/js/utils',
    'shared.controllers': './../../../../shared/js/controllers',
    'shared.collections': './../../../../shared/js/collections',
    'shared.models': './../../../../shared/js/models',

    'shared.challengeAchievements' : '../../../../shared/achievements/lesson-challenges'
  },

  shim: {
    'main' : {
      deps: ['backbone', 'consolePolyfill']
    },
    'backbone': {
      deps: ['jquery', 'underscore', 'handlebars'],
      exports: 'Backbone'
    },
    'viewMaster': {
      deps : ['backbone']
    },
    'jquery': {
      deps: ['json2']
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'json2': {
      exports: 'JSON'
    },

    // Comms
    connectionManager: {
      deps: ['jquery', 'jQueryCometd'],
      exports: 'connectionManager'
    },
    jQueryCometd: {
      deps: ['cometd'],
      exports: '$.cometd'
    },
    cometd: {
      exports: 'org.cometd'
    }
  }

});

define(['main'], function (main) {

  main.init().done(function() {
    main.start({
      navigate : ''
      // navigate : 'filter/beginner'
    });
  });

});