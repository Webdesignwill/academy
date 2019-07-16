define(function (require, exports, module) {

	var Marionette = require('marionette'),
		ToolbarItemsView = require('./ToolbarItemsView');


	var ToolbarView = Marionette.Layout.extend({

		template: '#toolbar',
		

		regions: {
			itemList: 'div.nav-collapse'
		},


		initialize: function () {
			this.on('render', function () {
				this.itemList.show(new ToolbarItemsView({ collection: this.model.get('items') }));
			});
		}

	});


	module.exports = ToolbarView;
});