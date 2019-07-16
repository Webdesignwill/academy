define(function (require, exports, module) {

	var ToolbarItem = require('./ToolbarItem'),
		ToolbarMenuItem = require('./ToolbarMenuItem');


	var ToolbarMenu = ToolbarItem.extend({
		
		defaults: {
			icon: null,
			caption: 'Menu',
			open: false,
			items: null
		},


		initialize: function () {
			if (!this.get('items')) this.set('items', new Backbone.Collection);
		}

	});



	module.exports = ToolbarMenu;
});