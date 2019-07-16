define(function (require, exports, module) {

	var $ = require('jquery'),
		PluginComponentView = require('cornichon.PluginComponentView');


	var VideoPlayerView = PluginComponentView.extend({

		api: {
			'play': 'videoPlay',
			'pause': 'videoPause'
		},

		initialize: function () {
			PluginComponentView.prototype.initialize.apply(this, arguments);
			this.listenTo(this,"render:complete",this.renderComplete);
			this.listenToOnce(this,"video:rendered",this.onVideoRendered);

			var self =  this;

			require(['./popcorn-ie8.js'], function () {
				self.renderComplete();
			});
		},

		render:function(){
			PluginComponentView.prototype.render.apply(this, arguments);
			return this;
		},

		renderComplete: function(){
			if((this.model.has('youtubeId') || this.model.has('html5Video')) && typeof Popcorn !== 'undefined' && typeof this.video === 'undefined'){
				var componentId = "#"+this.$el[0].id;
				if($(componentId+' .video-player').length > 0){
					if(this.model.has('youtubeId')){
						this.video = Popcorn.youtube(componentId+' .video-player','http://www.youtube.com/?v='+this.model.get('youtubeId')+'&controls=0&modestbranding=1&showinfo=0');
					}else if(this.model.has('html5Video')){
						var html5Video = this.model.get('html5Video');
						var fragment = document.createDocumentFragment();
						var videoTag = document.createElement('video');
						videoTag.setAttribute('height','100%');
						videoTag.setAttribute('width','100%');
						fragment.appendChild(videoTag);
						_.forEach(html5Video,function(videoSrc){
							var srcTag = document.createElement('source');
							srcTag.setAttribute('src',videoSrc);
							videoTag.appendChild(srcTag);
						});
						this.$el.find('.video-player').append(fragment);
						this.video = Popcorn( componentId+' .video-player video' );
					}
					this.trigger('video:rendered');
				}
			}
		},

		onVideoRendered: function(){
			var self = this;
			if(this.model.has('cue')){
				var cueArray = this.model.get('cue');
				_.forEach(cueArray,function(cue){
					var time = cue.time;
					var events = cue.events;
					self.video.cue(time,function(){
						self.triggerEvents(events);
					});
				});
			}

			if(this.model.get('initPlay')){
				this.video.play();
			}
		},

		videoPlay:function(){
			this.video.play();
		},

		videoPause:function(){
			this.video.pause();
		},

		onClose: function(){
			PluginComponentView.prototype.onClose.apply(this, arguments);
			this.video.destroy();
		}

	});


	module.exports = VideoPlayerView;
});