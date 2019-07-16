define(function (require, exports, module) {

	var Backbone = require('backbone'),
		App = require('app'),
		Toolbox = require('models/editor/Toolbox'),
		Project = require('models/project/Project'),
		ProjectLoader = require('models/project/ProjectLoader'),
		Page = require('cornichon.Page'),
		$ = require('jquery');


	var Editor = Backbone.Model.extend({
		
		defaults: {
			name: 'Edd',
			toolbox: new Toolbox,
			currentProject: new Project,
			panes: new Backbone.Collection
		},


		initialize: function () {
			this.addListeners();
//			this.newProject();
			this.loadTestProject();
		},


		addListeners: function () {
			App.vent.on('open-project-request', this.loadTestProject, this);
		},


		// TODO: remove
		loadTestProject: function () {
			var me = this,
				url = '/cornichon/' + (window.location.hash.substr(1) || 'virgin-package'),
				loader = new ProjectLoader({ url: url });
			
			loader.load(function (project) {
				project.on('ready', function () {
					me.loadProject(project);
				})
			});
		},


		loadProject: function (project) {
			this.set('currentProject', project);
		},


		newProject: function () {
			var project = new Project({
				updated: false,
				name: 'New project'
			});

			project.addPage(new Page);
			this.loadProject(project);
		}



	});


	module.exports = Editor;
});