define(function (require, exports, module) {

	var Marionette = require('marionette'),
		ToolbarMenuItemView = require('./ToolbarMenuItemView');


	var ToolbarMenuItemsView = Marionette.CollectionView.extend({

		tagName: 'ul',
		className: 'dropdown-menu',
		itemView: ToolbarMenuItemView

	});


	module.exports = ToolbarMenuItemsView;
});