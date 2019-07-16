define(function (require, exports, module) {

	var Marionette = require('marionette'),
		ToolbarMenuItemsView = require('./ToolbarMenuItemsView');


	var ToolbarMenuView = Marionette.ItemView.extend({

		tagName: 'li',
		className: 'dropdown',
		template: '#toolbar-menu-template',


		render: function (data) {
			var html = Backbone.Marionette.Renderer.render(this.template, this.model.toJSON()),
				item = new ToolbarMenuItemsView({ collection: this.model.get('items') }).render();

			this.$el.html(html).append(item.el);
		}

	});


	module.exports = ToolbarMenuView;
});