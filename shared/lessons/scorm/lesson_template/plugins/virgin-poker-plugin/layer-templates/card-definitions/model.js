define(function (require, exports, module) {

	var Backbone = require('backbone'),
		Layer = require('cornichon.Layer');
		


	var CardDefinitions = Layer.extend({

		initialize: function () {
			Layer.prototype.initialize.apply(this, arguments);
			this.on('change', this.onChange, this);
		},


		onChange: function () {
			var renderItems = [],
				items = this.get('items'),
				i;

			for (i in items) renderItems.push({ index: i, data: items[i] });
			this.set('renderItems', renderItems);
		}
	});


	module.exports = CardDefinitions;
});