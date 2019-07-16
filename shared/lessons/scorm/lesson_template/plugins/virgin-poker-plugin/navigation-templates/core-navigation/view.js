define(function (require, exports, module) {

	var $ = require('jquery'),
		NavigationView = require('cornichon.NavigationView');


	var CoreNavigationView = NavigationView.extend({

		events:{
			"click button.nav-next":"nextPage",
			"click button.nav-previous":"previousPage",
			"touchend button.nav-next":"nextPage",
			"touchend button.nav-previous":"previousPage",
			"touchstart button":"onTouchstart"
		},

		modelBind:{
			"currentPageName":"#page-name",
			"currentChapterName":"#chapter-name",
			"percentComplete":"#percent-complete"
		},

		initialize: function () {
			NavigationView.prototype.initialize.apply(this, arguments);
			this.listenTo(this.model,"change:nextPageElementShow",this.nextPageElementDisplay);
			this.listenTo(this.model,"change:previousPageElementShow",this.previousPageElementDisplay);
			this.listenTo(this.model,"change:progress",this.renderProgress);
			this.listenTo(this.model,"change:currentPageName",this.updatePageTitle);
		},
		nextPage: function(){
			this.model.nextPageTrigger();
		},
		previousPage: function(){
			this.model.previousPageTrigger();
		},
		onTouchstart: function (e) {
			e.preventDefault();
		},
		render:function(){
			NavigationView.prototype.render.apply(this, arguments);
			this.updatePageTitle();
			this.nextPageElementDisplay();
			this.previousPageElementDisplay();
			return this;
		},
		updatePageTitle:function(){
			document.title = this.model.get('currentPageName') + " - " + this.model.get('currentChapterName') + " - " + this.model.get('project').get('name');
		},
		nextPageElementDisplay:function(){
			if(this.model.get('nextPageElementShow')){
				this.$el.find('button.nav-next').removeClass('hidden');
			}else{
				this.$el.find('button.nav-next').addClass('hidden');
			}
		},
		previousPageElementDisplay:function(){
			if(this.model.get('previousPageElementShow')){
				this.$el.find('button.nav-previous').removeClass('hidden');
			}else{
				this.$el.find('button.nav-previous').addClass('hidden');
			}
		},
		renderProgress:function(){
			var self = this;
			var progress = this.model.get('progress');
			_.each(progress,function(chapter,index){
				var element = self.$el.find('.progress-bar .chapter')[index];
				$(element).find(".progress-bg").width(chapter.progress+"%");
			});
		}

	});


	module.exports = CoreNavigationView;
});