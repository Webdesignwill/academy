define(function(require) {

  return {
    commonData: {
      getUrlParameterByName: function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results === null) return false;
        else return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    },
    CONSTANTS: {
      VENTURE_PIQUETTE: 15,
      VENTURE_TEST: 17
    }
  };
});