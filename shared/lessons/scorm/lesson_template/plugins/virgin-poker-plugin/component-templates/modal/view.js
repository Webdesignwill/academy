define(function (require, exports, module) {

	var $ = require('jquery'),
		App = require('app'),
		PluginComponentView = require('cornichon.PluginComponentView');


	var ModalView = PluginComponentView.extend({

		events:{
			'click .close':'closeClicked'
		},

		render: function(){
			PluginComponentView.prototype.render.apply(this, arguments);
			return this;
		},

		closeClicked:function(e){
			e.preventDefault();
			$('.modal-background').removeClass('show');
			if(this.model.has('events') && typeof this.model.get('events').close !== 'undefined'){
				this.triggerEvents(this.model.get('events').close);
			}
		},

		triggerEvents:function(events){
			_.forEach(events,function(event){
				App.vent.trigger(event.id + ':' + event.type, event);
			});
		}


	});


	module.exports = ModalView;
});