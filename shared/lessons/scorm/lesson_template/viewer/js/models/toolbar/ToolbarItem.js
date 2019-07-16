define(function (require, exports, module) {

	var Backbone = require('backbone');


	var ToolbarItem = Backbone.Model.extend({
		
		defaults: {
			action: null,
			icon: null,
			caption: 'ToolbarItem'
		},

		
		

		initialize: function () {
		}


	});



	module.exports = ToolbarItem;
});