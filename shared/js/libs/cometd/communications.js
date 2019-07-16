define(function(require) {

  var $ = require('jquery'),
      // Ask Tolis for fix TODO
      Constants = {
        GAME_CONTEXT : 'GAME',
        LOBBY_CONTEXT : 'LOBBY'
      };

  require('jQueryCometd');
  require('luajs');

  var cometd = $.cometd;
  var connected = false;
  var config, connection, subscriptions = {};

  cometd.unregisterTransport('websocket');
  // cometd.unregisterTransport('long-polling');
  // cometd.unregisterTransport('callback-polling');

  function addMetaListeners() {
    // console.log("ADD META LISTENERS", this);
    cometd.addListener('/meta/handshake', $.proxy(function(handshake) {
      this.handleMetaHandshake(handshake);
    }, this));
    cometd.addListener('/meta/connect', $.proxy(function(message) {
      this.handleMetaConnect(message);
    }, this));
    cometd.addListener('/meta/unsuccessful', $.proxy(function(message) {
      this.handleMetaUnsuccessful(message);
    }, this));
    cometd.addListener('/meta/disconnect', $.proxy(function(message) {
      this.handleMetaDisconnect(message);
    }, this));
    cometd.addListener('/meta/subscribe', $.proxy(function(message) {
      this.handleMetaSubscribe(message);
    }, this));
    cometd.addListener('/meta/unsubscribe', $.proxy(function(message) {
      this.handleMetaUnsubscribe(message);
    }, this));
    cometd.addListener('/meta/publish', $.proxy(function(message) {
      this.handleMetaPublish(message);
    }, this));
  }

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  $(window).unload(function() {
    cometd.disconnect(true);
  });

  var Comms = function(options) {
      var defaults = {
        onConnectionSuccess: function() {},
        onConnectionError: function() {},
        onConnectionClosed: function() {},
        onMetaUnsuccessful: function() {},
        onMetaUnsubscribe: function() {},
        onMetaSubscribe: function () {}
      };
      config = $.extend(defaults, options);
      this.init();
    };

  Comms.fn = Comms.prototype;

  Comms.fn.init = function() {
    var handshakeParams = {
      ext: {
        authentication: {
          memberId: config.memberId,
          ventureId: config.ventureId,
          credentials: config.credentials
        }
      }
    };

    if(typeof config.name !== 'underfined' && config.name !== "") {
      handshakeParams.ext.name = config.name;
    }
    addMetaListeners.call(this);
    cometd.configure(config);
    cometd.handshake(handshakeParams);
  };

  Comms.fn.getCometDConnection = function() {
    return connection;
  };

  Comms.fn.isConnected = function() {
    return connected;
  };

  Comms.fn.handleMetaHandshake = function(handshake) {
    if(handshake.failure) {
      config.onConnectionError();
    }
  };

  Comms.fn.handleMetaConnect = function(message) {
    if(cometd.isDisconnected()) {
      connected = false;
      config.onConnectionClosed();
      return;
    }
    var wasConnected = connected;
    connected = (message.successful === true);
    if(!wasConnected && connected) {
      config.onConnectionSuccess();
    } else if(wasConnected && !connected) {
      config.onConnectionError();
    }
  };

  Comms.fn.handleMetaUnsuccessful = function(message) {
    config.onMetaUnsuccessful(message);
  };
  Comms.fn.handleMetaDisconnect = function(message) {};
  Comms.fn.handleMetaSubscribe = function(message) {};
  Comms.fn.handleMetaUnsubscribe = function(message) {
    config.onMetaUnsubscribe(message);
  };
  Comms.fn.handleMetaPublish = function(message) {};

  Comms.fn.executeLuaCallback = function(message, callback) {
    var table = luajs.utils.parseJSON(message.data);
    if(message.ext["CamelHeaders"].JMSXGroupID === null) {
      message.ext["CamelHeaders"].JMSXGroupID = 'nil';
    }
    var ext = new luajs.Table(message.ext);
    callback.call({}, table, ext);

  };
  //TODO: test this
  Comms.fn.executeFlashCallback = function(message, callback) {

    var table = JSON.parse(message.data),
      ext = message.ext;
    callback.call({}, table, ext);

  };
  //TODO: test this
  Comms.fn.executeLobbyCallback = function(message, callback) {
    callback(message);
  };
  // public actions TODO: test this
  Comms.fn.subscribe = function(self, config, context) {

    var finalCallback;
    config = (typeof config !== 'undefined') ? config : self;
    self = (self instanceof Comms) ? self : this;

    if(context && context === Constants.GAME_CONTEXT) {
      if(config.callback instanceof luajs.Function) {
        finalCallback = self.executeLuaCallback;
      } else {
        finalCallback = self.executeFlashCallback;
      }
    } else {
      finalCallback = self.executeLobbyCallback;
    }

    try {
      var subscription = cometd.subscribe(config.channel, function(message) {
        var type = message.ext.CamelHeaders.type || message.ext.CamelHeaders.JMSType;
        var data = JSON.parse(message.data);
        console.group(type + "||" + (message.ext.CamelHeaders.channel || ""));
        console.log('DATA: ',data);
        console.log('EXT: ',message.ext);
        console.groupEnd();
        finalCallback(message, config.callback);
      });

      self.addSubscription(subscription, context);

      return subscription;

    } catch(e) {
      if(e instanceof luajs.Error && console) throw new Error('[luajs] ' + e.message + '\n    ' + (e.luaStack || []).join('\n    '));
      if(console && console.error) {
        console.error(e);
      }
    }
  };

  Comms.fn.addSubscription = function(subscription, context) {

    context = context || Constants.LOBBY_CONTEXT;
    var channel = subscriptions[subscription[0]];


    if(channel) {
      // subscriptions[subscription[0]].push(subscription);
      if(channel[context]) {
        channel[context].push(subscription);
      } else {
        channel[context] = [];
        channel[context].push(subscription);
      }
    } else {
      subscriptions[subscription[0]] = {};
      subscriptions[subscription[0]][context] = [];
      subscriptions[subscription[0]][context].push(subscription);
    }

    console.log("Communications:addSubscription", subscription[0], subscriptions);
  };

  Comms.fn.unsubscribe = function(channel, context) {
    // debugger;
    var channelContext, i, length;

    if(subscriptions[channel]) {
      channelContext = subscriptions[channel][context];
      length = channelContext.length;

      for(i = length - 1; i >= 0; i--) {
        console.log('Communications:unsubscribe', subscriptions[channel], channelContext[i], context);
        cometd.unsubscribe(channelContext[i]);
        channelContext.splice(i, 1);
      }
    } else {
      console.log('Communications:unsubscribe', context);
      cometd.unsubscribe(context);
    }

  };

  Comms.fn.publish = function(self, config) {
    // debugger;
    config = (typeof config !== 'undefined') ? config : self;
    self = (self instanceof Comms) ? self : this;
    console.log('Communications:publish', config.channel, config.data);
    cometd.publish(config.channel, self.dataFormatter(config.data));
  };

  Comms.fn.batchParser = function(data, callback, context) {
    var dataItem, dataToReturn = [];
    if(data instanceof Array) {
      var dataLength = data.length;
      while(dataLength--) {
        dataToReturn.push({
          channel: data[dataLength].channel,
          subscriptionInstance: callback(this, data[dataLength], data[dataLength].context),
          context: data[dataLength].context,
          id: data[dataLength].id
        });
        // dataToReturn.push(callback(this, data[dataLength], context));
      }
    } else {
      for(dataItem in data) {
        if(data.hasOwnProperty(dataItem) && dataItem !== "__luajs") {
          dataToReturn.push({
            channel: data[dataItem].channel,
            subscriptionInstance: callback(this, data[dataItem], context),
            context: data[dataItem].context,
            id: data[dataItem].id
          });
        }
      }
    }

    console.log('Communications:batchParser:returns', dataToReturn);
    return dataToReturn;
  };
  Comms.fn.batch = function(params) {
    // debugger;
    var subscriptionInstances;
    console.log("Communications:batch", params);
    cometd.batch($.proxy(function() {
      if(params.publications) this.batchParser(params.publications, this.publish, params.context);
      if(params.subscriptions) subscriptionInstances = this.batchParser(params.subscriptions, this.subscribe, params.context);
      if(params.unsubscriptions) this.batchParser(params.unsubscriptions, this.unsubscribe, params.context);
    }, this));

    return subscriptionInstances;
  };

  Comms.fn.dataFormatter = function(data) {
    if(data && typeof data !== "object") {
      return data;
    }
    if(!(data instanceof luajs.Table)) {
      return JSON.stringify(data);
    } else {
      return JSON.stringify(luajs.utils.toObject(data));
    }
  };

  Comms.fn.exposePrivates = function() {
    return {
      cometd: cometd,
      config: config,
      connected: connected
    };
  };

  Comms.fn.addListener = function(channel, callback, context) {
    return cometd.addListener(channel, $.proxy(function(message) {
      callback(message);
    }, context));
  };

  Comms.fn.removeListener = function (listener){
    cometd.removeListener(listener);
  };
  Comms.fn.unsubscribeSingle = function (param){
    cometd.unsubscribe(param);
  };

  return {
    createCometDConnection: function(options) {
      connection = new Comms(options);
      return connection;
    },
    subscriptions: subscriptions
  };

});