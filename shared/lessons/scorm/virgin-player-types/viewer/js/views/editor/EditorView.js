define(function (require, exports, module) {

	var Marionette = require('marionette'),
		ProjectView = require('views/project/ProjectView');


	var EditorView = Marionette.Layout.extend({

		template: '#editor',

		regions: {
			projectContainer: 'div.project-container'
		},


		initialize: function () {
			this.model.on('change', this.render, this);
			this.on('render', this._renderProject, this);
		},


		_renderProject: function () {
			var project = this.model.get('currentProject');
			if (project) this.projectContainer.show(new ProjectView({ model: project }));
		}

	});


	module.exports = EditorView;
});