define(function (require, exports, module) {

	var ComponentView = require('cornichon.ComponentView'),
		Marionette = require('marionette'),
		Mustache = require('mustache'),
		CSS = {
			parse: require('css-parse'),
			stringify: require('css-stringify')
		};


	var AbstractPluginView = ComponentView.extend({

		htmlTemplate: 'template.html',
		cssTemplate: 'style.css',

		initialize: function () {
			ComponentView.prototype.initialize.apply(this, arguments);

			this.model.on('change:htmlTemplate', this._loadHTMLTemplate, this);
			this.model.on('change:cssTemplate', this._loadCSSTemplate, this);
			this._loadHTMLTemplate();
			this._loadCSSTemplate();
		},


		render: function () {
			ComponentView.prototype.render.apply(this, arguments);

			this.$el.css({ left: this.model.get('x'), top: this.model.get('y') });
			this.$el.width(this.model.get('width')).height(this.model.get('height'));
			return this;
		},


		getTemplate: function () {
			var template = this.template || '',
				css = this.css || '';

			return css + template;
		},


		_loadHTMLTemplate: function () {
			var me = this,
				template = this.model.get('template'),
				plugin = template.get('plugin'),
				baseUrl = plugin.get('baseUrl') + template.get('baseUrl'),
				htmlTemplate = this.htmlTemplate;

			if (htmlTemplate) {
				require(['text!' + baseUrl + '/' + htmlTemplate], function (html) {
					me.template = html;
					me.render();
					me.trigger("render:complete");
				});
			}
		},


		_loadCSSTemplate: function () {
			var cssTemplate = this.cssTemplate,
				template = this.model.get('template'),
				plugin = template.get('plugin'),
				baseUrl = plugin.get('baseUrl') + template.get('baseUrl');

			if (cssTemplate) {
				var element = document.createElement('link');
				element.setAttribute('rel','stylesheet');
				element.setAttribute('href',baseUrl+'/'+cssTemplate);

				var headElement = document.getElementsByTagName("head")[0];
				headElement.appendChild(element);

			}
		}

	});


	module.exports = AbstractPluginView;
});