define(function (require, exports, module) {

	var LayerView = require('cornichon.LayerView'),
		App = require('app');


	var SimpleTutorialView = LayerView.extend({

		tagName: 'div',
		className: 'card-definitions',
		itemSelected: 0,

		events: function(){
			return this.setupLayerTemplateEvents();
		},

		templateEvents:{
			'click li': 'onItemClick',
			'touchstart li': 'onItemTouchstart',
			'touchend li': 'onItemClick'
		},

		jargonSections:[
			'paragraph1','paragraph2','paragraph3'
		],


		onItemClick: function (e) {
			var cls = e.target && e.target.className,
				match;

			if (cls && (match = cls.match(/item\-(\d+)/))) {
				this.itemSelected = parseInt(match[1], 10);
				this.update();
			}

			e.stopPropagation();
		},


		render: function () {
			LayerView.prototype.render.apply(this,arguments);

			var model = this.model;
			model.set('listClass', function () { return (model.get('items').length > 6)? 'small' : ''; });

			this.update();

			return this;
		},


		update: function () {
			this.$el.find('section.hand > div').hide();
			this.$el.find('section.hand > div.item-' + this.itemSelected).show();

			this.$el.find('li img').css('opacity', .4);
			this.$el.find('li img.item-' + this.itemSelected).css('opacity', 1);
		}

	});


	module.exports = SimpleTutorialView;
});