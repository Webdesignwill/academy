define(function (require, exports, module) {

	var Backbone = require('backbone'),
		FileMenu = require('./FileMenu'),
		EditMenu = require('./EditMenu');


	var Toolbar = Backbone.Model.extend({
		
		
		initialize: function () {
			var items = new Backbone.Collection();

			items.add(new FileMenu);
			items.add(new EditMenu);

			this.set('items', items);
		}

	});



	module.exports = Toolbar;
});