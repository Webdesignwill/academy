
define(function (require) {

  "use strict";

  var $ = require('jquery'),
      urlParamsManager = require('shared.utils/urlParamsManager'),

      appModel = require('shared.models/app/appModel');

  var UserModel = Backbone.Model.extend({

    url : appModel.get('token').url,

    defaults : {
      "playerId":urlParamsManager.getUrlParameterByName('memberId') || 1,
      "ventureId":urlParamsManager.getUrlParameterByName('ventureId'),
      "lessonId":'',
      "userName":urlParamsManager.getUrlParameterByName('username') || 'Hard Code',
      'avatar': ''
    },

    parse : function (res) {
      this.set('token', res);
    },

    sync : function (method, models, options) {

      var self = this;

      $.ajax({
        url: self.url,
        dataType: 'text',
        success: function(response) {
          self.set('token', response);
        }
      });

    }

  });

  return new UserModel();

});