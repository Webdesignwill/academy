define(function (require, exports, module) {

	var Backbone = require('backbone'),
		ToolbarMenuItem = require('./ToolbarMenuItem');


	var ToolbarMenuHeader = ToolbarMenuItem.extend({
		
		defaults: {
			header: true,
			caption: null
		}

	});



	module.exports = ToolbarMenuHeader;
});