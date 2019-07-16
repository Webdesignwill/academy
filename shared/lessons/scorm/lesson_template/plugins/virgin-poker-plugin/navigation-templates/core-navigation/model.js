define(function (require, exports, module) {

	var _ = require('underscore'),
		Navigation = require('cornichon.Navigation');


	var CoreNavigation = Navigation.extend({
		defaults:{
			nextPageElementShow:true,
			previousPageElementShow:true
		},
		initialize: function () {
			Navigation.prototype.initialize.apply(this, arguments);
			this.listenTo(this,'change:currentPage',this.currentPageUpdated);
		},
		currentPageUpdated:function(){
			var pages = this.get('pages');
			var pageIndex = pages.indexOf(this.get('currentPage'));
			var nextPageElementShow = (pageIndex === (pages.length - 1)?false:true);
			var previousPageElementShow = (pageIndex === 0?false:true);
			this.set('nextPageElementShow',nextPageElementShow);
			this.set('previousPageElementShow',previousPageElementShow);
			this.updateProgress();
		},
		updateProgress:function(){
			var chapters = this.get('chapters');
			var totalPages = this.get('pages').length;
			var pageIndex = this.get('pages').indexOf(this.get('currentPage'));
			var progress = [];
			var currentPageTotal = 0;
			chapters.each(function(chapter){
				var chapterSize = chapter.get('pages').length;
				if(chapterSize > 0){
					var progressForChapter = 0;
					if(pageIndex + 1 >= currentPageTotal+chapterSize){
						progressForChapter = 100;
					}else if(pageIndex + 1 > currentPageTotal){
						progressForChapter = ((pageIndex + 1 - currentPageTotal)/chapterSize) * 100;
					}
					var chapterObj = {
						size:(chapterSize/totalPages)*100,
						progress:progressForChapter
					};
					progress.push(chapterObj);
					currentPageTotal += chapterSize;
				}
			});
			this.set('progress',progress);
			this.set('percentComplete',Math.round(((pageIndex) / totalPages) * 100));
		}

	});


	module.exports = CoreNavigation;
});