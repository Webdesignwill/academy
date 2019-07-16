(function () {

	var Cornichon = {};


	require.config({
		// baseUrl: './js',
		paths: {
			// app:'empty:',
			text: 'lib/require/text',
			mustache: 'lib/mustache',
			backbone : 'lib/backbone.min',
			underscore : 'lib/underscore.min',
			jquery : 'lib/jquery.min',
			marionette: 'lib/backbone.marionette.min',
			bootstrap: 'lib/bootstrap/js/bootstrap.min',
			'css-parse': 'lib/css-parse',
			'css-stringify': 'lib/css-stringify',
			'cornichon.AbstractTemplate': './models/plugin/AbstractTemplate',
			'cornichon.AbstractPluginView': './views/plugin/AbstractPluginView',
			'cornichon.Component': './models/project/Component',
			'cornichon.ComponentView': './views/project/ComponentView',
			'cornichon.PluginComponentView': './views/plugin/PluginComponentView',
			'cornichon.Page': './models/project/Page',
			'cornichon.PageView': './views/project/PageView',
			'cornichon.Navigation': './models/project/Navigation',
			'cornichon.NavigationView': './views/plugin/NavigationView',
			'cornichon.UiItemView': './views/core-lib/UiItemView'
		},
		shim : {
			jquery : {
				exports : 'jQuery'
			},
			underscore : {
				exports : '_'
			},
			backbone : {
				deps : ['jquery', 'underscore'],
				exports : 'Backbone'
			},
			marionette : {
				deps : ['jquery', 'underscore', 'backbone'],
				exports : 'Marionette'
			},
			bootstrap : {
				deps : ['jquery']
			}
		}
	});




	function initUI () {
		require(['models/toolbar/Toolbar', 'models/editor/Editor', 'views/toolbar/ToolbarView', 'views/editor/EditorView'], function (Toolbar, Editor, ToolbarView, EditorView) {
			Cornichon.host = new Editor();
			Cornichon.toolbar.show(new ToolbarView({ model: new Toolbar() }));
			Cornichon.editor.show(new EditorView({ model: Cornichon.host }));
		});
	}




	define(function (require, exports, module) {

		// Load application dependencies
		var Backbone = require('backbone'),
			Marionette = require('marionette'),
			Mustache = require('mustache');

		require('bootstrap');


		// Set up Mustache renderer
		Backbone.Marionette.Renderer.render = function(template, data){
			if (template && template.substr(0, 1) == '#') template = $(template).html();
			return Mustache.to_html(template, data);
		};


		// Init
		Cornichon = new Marionette.Application();
		define('app', function() { return Cornichon; });

		Cornichon.addRegions({
			toolbar: '#toolbar',
			editor: '#editor'
		});

		Cornichon.addInitializer(initUI);

		Cornichon.vent.on('all', function (name, data) { console.log ('Event:', name, data); });
		Cornichon.start();

	});




})();
