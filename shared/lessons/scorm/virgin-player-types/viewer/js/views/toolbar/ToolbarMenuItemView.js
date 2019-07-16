define(function (require, exports, module) {

	var Marionette = require('marionette'),
		App = require('app'),
		ToolbarMenuHeader = require('models/toolbar/ToolbarMenuHeader'),
		ToolbarMenuSeparator = require('models/toolbar/ToolbarMenuSeparator');


	var ToolbarMenuItemView = Marionette.ItemView.extend({
		tagName: 'li',
		template: '#toolbar-menu-item-template',

		events: {
			'click a': 'onClick'
		},


		initialize: function () {
			this.on('render', function () {
				if (this.model instanceof ToolbarMenuSeparator) this.$el.addClass('divider')
				if (this.model instanceof ToolbarMenuHeader) this.$el.addClass('nav-header')
			})
		},


		onClick: function () {
			App.vent.trigger(this.model.get('event'));
		}
	});


	module.exports = ToolbarMenuItemView;
});