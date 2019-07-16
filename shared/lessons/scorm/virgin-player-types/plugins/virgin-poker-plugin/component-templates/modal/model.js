define(function (require, exports, module) {

	var _ = require('underscore'),
		Component = require('cornichon.Component');


	var Modal = Component.extend({
		defaults:{
			displayCloseButton:true
		}

	});


	module.exports = Modal;
});