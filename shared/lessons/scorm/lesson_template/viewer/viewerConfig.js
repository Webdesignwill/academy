require.config({
	deps:[
		'CornichonViewer'
	],
	baseUrl: 'js',
	paths: {
		app: 'App',
		SCORMApi: 'models/core-lib/SCORMApi',
		text: 'lib/require/text',
		mustache: 'lib/mustache',
		backbone : 'lib/backbone.min',
		underscore : 'lib/underscore.min',
		jquery : 'lib/jquery.min',
		'jquery.animate' : 'lib/jquery.animate-enhanced.min',
		marionette: 'lib/backbone.marionette.min',
		bootstrap: 'lib/bootstrap/js/bootstrap.min',
		ie8shim: 'lib/ie8-shim',
		'css-parse': 'lib/css-parse',
		'css-stringify': 'lib/css-stringify',
		'cornichon.AbstractTemplate': 'models/plugin/AbstractTemplate',
		'cornichon.AbstractPluginView': 'views/plugin/AbstractPluginView',
		'cornichon.Component': 'models/project/Component',
		'cornichon.ComponentView': 'views/project/ComponentView',
		'cornichon.Navigation': 'models/project/Navigation',
		'cornichon.NavigationView': 'views/plugin/NavigationView',
		'cornichon.PluginComponentView': 'views/plugin/PluginComponentView',
		'cornichon.Page': 'models/project/Page',
		'cornichon.PageView': 'views/project/PageView',
		'cornichon.Layer': 'models/project/Layer',
		'cornichon.TemplatedView': 'views/project/TemplatedView',
		'cornichon.LayerCollectionView': 'views/project/LayerCollectionView',
		'cornichon.LayerView': 'views/project/LayerView',
		'cornichon.Text': 'models/core-lib/Text',
		'cornichon.TextView': 'views/core-lib/TextView',
		'cornichon.UiItemView': 'views/core-lib/UiItemView',
		'cornichon.utils': 'utils/utils'
	},
	shim : {
		jquery : {
			exports : 'jQuery'
		},
		'jquery.animate':{
			deps:['jquery']
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