define(function (require, exports, module) {

	var LayerView = require('cornichon.LayerView'),
		App = require('app');


	var ReadMoreView = LayerView.extend({

		tagName: 'div',
		className: 'read-more',

		events: function(){
			return this.setupLayerTemplateEvents();
		},

		templateEvents:{
			"click .see-more-link":"expandSeeMore",
			"click .go":"hide"
		},

		jargonSections:[

		],

		initialize:function(){
			LayerView.prototype.initialize.apply(this, arguments);
			var self = this;
			require(['./jquery.jscrollpane.js']);
			require(['./jquery.mousewheel.js']);
			require(['./mwheelIntent.js']);
		},
		expandSeeMore: function(e){
			e.preventDefault();
			this.$el.find('.see-more-link').hide();
			this.$el.find('.initial-text').hide();
			this.$el.find('.scroll-container').show();
			this.$el.find('.scroll-container').jScrollPane();
		}
	});


	module.exports = ReadMoreView;
});