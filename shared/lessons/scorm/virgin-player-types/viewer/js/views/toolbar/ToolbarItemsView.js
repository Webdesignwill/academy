define(function (require, exports, module) {

	var Marionette = require('marionette'),
		ToolbarMenuView = require('./ToolbarMenuView');


	var ToolbarItemsView = Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'nav',
		itemView: ToolbarMenuView
	});


	module.exports = ToolbarItemsView;
});