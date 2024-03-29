
define(function() {
	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function (con) {
	  var method;
	  var dummy = function() {};
	  var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
	     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
	     'time,timeEnd,trace,warn,memory').split(',');
	  while (method = methods.pop()) {
	    con[method] = con[method] || dummy;
	  }
	})(window.console = window.console || {});
});
