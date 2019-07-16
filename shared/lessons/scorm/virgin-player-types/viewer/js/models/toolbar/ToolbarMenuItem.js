define(function (require, exports, module) {

	var Backbone = require('backbone');


	var ToolbarMenuItem = Backbone.Model.extend({
		
		defaults: {
			caption: 'Menu option',
			event: null,
			data: null
		}

	});



	module.exports = ToolbarMenuItem;
});