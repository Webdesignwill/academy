define(function (require) {

  var broker = require('shared.utils/broker'),
      userModel = require('shared.models/user/userModel'),
      appModel = require('shared.models/app/appModel'),
      lessonsCollection = require('shared.collections/lessons/lessonsCollection'),
      lessonModel;

  window.API_1484_11 = {
    Initialize : function () {
      lessonModel = lessonsCollection.get(userModel.get('lessonId'));
      if(!lessonModel.has('scormData')) {
        lessonModel.set('scormData', {});
      }
      lessonModel.set('lessonCompleted',false);
    },
    Terminate : function () {},
    Commit : function () {
      if(lessonModel.get('lessonCompleted')) {
        broker.trigger('publish:lesson:update', lessonModel);
        broker.trigger('views:modal:lessonCompleted', lessonModel);
        return;
      }
      if(appModel.get('appConfig').local === false){
        broker.trigger('publish:lesson:update', lessonModel);
      }
    },
    GetLastError : function () {},
    GetErrorString : function () {},
    GetDiagnostic : function () {},
    Finish : function () {},
    GetValue : function (key) {
      return lessonModel.get('scormData')[key] || '';
    },

    SetValue : function (key, val) {

      var splitVal,
          firstNumber,
          secondNumber;

      switch (key) {
        case 'cmi.location' :

          splitVal = val.split('/');
          firstNumber = splitVal[0];
          secondNumber = splitVal[1];

          lessonModel.get('scormData')[key] = val;
          lessonModel.set('lessonProgress', Math.round((firstNumber / secondNumber) * 10));

        break;
        case 'cmi.completion_status' :

          splitVal = lessonModel.get('scormData')['cmi.location'].split('/'),
          secondNumber = splitVal[1];

          lessonModel.set('scormData', {'cmi.location' : '1/' + secondNumber});
          lessonModel.set('lessonCompleted',true);

        break;
      }

    }

  };
});