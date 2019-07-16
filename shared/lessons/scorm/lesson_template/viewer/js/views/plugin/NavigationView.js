define(function (require, exports, module) {

	var AbstractPluginView = require('cornichon.AbstractPluginView');


	var NavigationView = AbstractPluginView.extend({

		template: '#page-template',
		htmlTemplate: 'template.html',
		cssTemplate: 'style.css',


		initialize: function () {
			AbstractPluginView.prototype.initialize.apply(this, arguments);

			this.el.id = this.model.cid;
			this.$el.addClass('navigation');
		}

	});


	module.exports = NavigationView;
});