define(function (require, exports, module) {

	var LayerView = require('cornichon.LayerView'),
		App = require('app');


	var SimpleTutorialView = LayerView.extend({

		tagName: 'div',
		className: 'simple-tutorial',

		events: function(){
			return this.setupLayerTemplateEvents();
		},

		templateEvents:{
			'click button': 'onButtonClick',
			'touchstart button': 'onButtonTouchstart',
			'touchend button': 'onButtonClick'
		},

		jargonSections:[
			'paragraph1','paragraph2','paragraph3'
		],

		onButtonClick: function (e) {
			App.vent.trigger('viewer:goToPage', { page: +1 });
			e.stopPropagation();
		}
	});


	module.exports = SimpleTutorialView;
});