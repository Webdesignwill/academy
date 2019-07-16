define(function (require, exports, module) {

	var _ = require('underscore'),
		Component = require('cornichon.Component');


	var VideoPlayer = Component.extend({
		defaults:{
			width:640,
			height:390,
			initPlay:false
		}

	});


	module.exports = VideoPlayer;
});