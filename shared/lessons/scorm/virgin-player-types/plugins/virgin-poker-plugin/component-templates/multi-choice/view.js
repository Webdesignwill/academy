define(function (require, exports, module) {

	var $ = require('jquery'),
		App = require('app'),
		PluginComponentView = require('cornichon.PluginComponentView');


	var MultiChoiceView = PluginComponentView.extend({

		htmlTemplate:false,

		events: {
			'click label':'legacyLabelInteraction'
		},

		legacyLabelInteraction:function(e){
			console.log($(e.currentTarget));
			this.$el.find('label').removeClass('checked');
			$(e.currentTarget).addClass('checked');
		}

	});


	module.exports = MultiChoiceView;
});