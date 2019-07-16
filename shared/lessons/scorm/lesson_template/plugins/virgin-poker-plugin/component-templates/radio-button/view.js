define(function (require, exports, module) {

	var $ = require('jquery'),
		PluginComponentView = require('cornichon.PluginComponentView');


	var RadioButtonView = PluginComponentView.extend({

		events: {
			'click input':'recordInteraction'
		},

		render: function(){
			PluginComponentView.prototype.render.apply(this, arguments);
			return this;
		},

		recordInteraction:function(e){
			var value = e.currentTarget.getAttribute('value');
			var self = this;
			if(this.model.get('events')){
				this.triggerEvents(this.model.get('events'));
			}
		}

	});


	module.exports = RadioButtonView;
});