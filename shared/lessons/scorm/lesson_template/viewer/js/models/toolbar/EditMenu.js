define(function (require, exports, module) {

	var ToolbarMenu = require('./ToolbarMenu'),
		ToolbarMenuItem = require('./ToolbarMenuItem'),
		ToolbarMenuSeparator = require('./ToolbarMenuSeparator'),
		ToolbarMenuHeader = require('./ToolbarMenuHeader');


	var EditMenu = ToolbarMenu.extend({
		
		defaults: {
			caption: 'Edit',
			icon: null,
			open: false,
			items: null
		},


		initialize: function () {
			ToolbarMenu.prototype.initialize.apply(this, arguments);

			var items = this.get('items');
			items.add(new ToolbarMenuItem({ caption: 'Undo', event: 'undo-request' }));
			items.add(new ToolbarMenuItem({ caption: 'Redo', event: 'redo-request' }));
			items.add(new ToolbarMenuSeparator);
			items.add(new ToolbarMenuItem({ caption: 'Select all', event: 'select-all-request', data: 'twitter' }));
			items.add(new ToolbarMenuItem({ caption: 'Deselect all', event: 'deselect-all-request', data: 'facebook' }));
		}

	});


	module.exports = EditMenu;
});