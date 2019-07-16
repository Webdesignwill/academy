define(function (require, exports, module) {

	var LayerView = require('cornichon.LayerView'),
		App = require('app');


	var PlaceholderView = LayerView.extend({

		tagName: 'div',
		className: 'placeholder',

		events: {
			'click button': 'onButtonClick',
			'touchstart button': 'onButtonTouchstart',
			'touchend button': 'onButtonClick'
		},


		onButtonTouchstart: function (e) {
			e.preventDefault();
		},


		onButtonClick: function () {
			App.vent.trigger('viewer:goToPage', { page: +1 });
		},


		renderTemplate: function () {
			this.$el.append('moo');
		}

	});


	module.exports = PlaceholderView;
});