define(function (require, exports, module) {

	var Backbone = require('backbone'),
		ToolbarMenuItem = require('./ToolbarMenuItem');


	var ToolbarMenuSeparator = ToolbarMenuItem.extend({
		
		defaults: {
			caption: null,
			event: null
		}

	});



	module.exports = ToolbarMenuSeparator;
});