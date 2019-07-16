define(function (require, exports, module) {

	var ToolbarMenu = require('./ToolbarMenu'),
		ToolbarMenuItem = require('./ToolbarMenuItem'),
		ToolbarMenuSeparator = require('./ToolbarMenuSeparator'),
		ToolbarMenuHeader = require('./ToolbarMenuHeader');


	var FileMenu = ToolbarMenu.extend({
		
		defaults: {
			caption: 'File',
			icon: null,
			open: false,
			items: null
		},


		initialize: function () {
			ToolbarMenu.prototype.initialize.apply(this, arguments);

			var items = this.get('items');
			items.add(new ToolbarMenuItem({ caption: 'New', event: 'new-project-request' }));
			items.add(new ToolbarMenuItem({ caption: 'Open', event: 'open-project-request' }));
			items.add(new ToolbarMenuItem({ caption: 'Save', event: 'save-project-request' }));
			items.add(new ToolbarMenuSeparator);
			items.add(new ToolbarMenuHeader({ caption: 'Share' }));
			items.add(new ToolbarMenuItem({ caption: 'Twitter', event: 'share-project-request', data: 'twitter' }));
			items.add(new ToolbarMenuItem({ caption: 'Facebook', event: 'share-project-request', data: 'facebook' }));
		}

	});


	module.exports = FileMenu;
});