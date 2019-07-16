define(function (require, exports, module) {

	var LayerView = require('cornichon.LayerView'),
		App = require('app');


	var LessonCompletedView = LayerView.extend({

		tagName: 'div',
		className: 'lesson-completed',

		events: {
			'click button.redo': 'onRedoClick',
			'touchstart button': 'onButtonTouchstart',
			'touchend button.redo': 'onRedoClick',
			'click button.accept': 'onAcceptClick',
			'touchend button.redo': 'onRedoClick'
		},


		onButtonTouchstart: function (e) {
			e.preventDefault();
		},


		onRedoClick: function () {
			App.vent.trigger('viewer:goToPage', { position: 'start' });
		},


		onAcceptClick: function () {
			// TODO
		}

	});


	module.exports = LessonCompletedView;
});