define(function (require, exports, module) {

	var AbstractPluginView = require('cornichon.AbstractPluginView'),
		App = require('app');


	var PluginPluginComponentView = AbstractPluginView.extend({

		initialize: function () {
			AbstractPluginView.prototype.initialize.apply(this, arguments);

			this.el.id = this.model.cid;
			this.$el.addClass('component');
		},
		render: function(){
			AbstractPluginView.prototype.render.apply(this,arguments);

			if(this.model.has('components')){
				this.componentViews = [];
				var self = this;
				_.forEach(this.model.get('components'),function(component){
					component.set('groupName',self.model.id);
					var view = new (component.get('view'))({model:component});
					self.componentViews.push(view);
					self.$el.append(view.render().el);
				});
			}
			return this;
		},

		triggerEvents:function(events){
			_.forEach(events,function(event){
				App.vent.trigger(event.id + ':' + event.type, event);
			});
		},

		onClose: function(){
			AbstractPluginView.prototype.onClose.apply(this, arguments);
			if(this.componentViews){
				_.each(this.componentViews,function(componentView){
					componentView.close();
				});
			}
		}

	});


	module.exports = PluginPluginComponentView;
});