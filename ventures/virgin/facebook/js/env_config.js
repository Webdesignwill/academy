define(function() {
  requirejs.config({
    config: {
      'constants': {
        ports: {
          table: '8080',
          lobby: '8086',
          cp: '8082',
          payment: '8084',
          cashier: '8085',
          token: '9083'
        },
        endpoints: {
          poker_lobby: 'https://socialDev.poker.gamesys.corp:8086',
          connection_proxy: 'https://socialDev.poker.gamesys.corp:8082/cometd',
          token: 'https://socialDev.poker.gamesys.corp:9083/token',
          payment: 'http://socialDev.poker.gamesys.corp:8084/payment',
          social_system: 'http://social.poker.dev.gamesys.corp:8080'

          // poker_lobby: 'https://fedtest.poker.gamesys.corp:8086',
          // connection_proxy: 'https://fedtest.poker.gamesys.corp:8082/cometd',
          // token: 'https://fedtest.poker.gamesys.corp:9083/token',
          // payment: 'http://fedtest.poker.gamesys.corp:8084/payment',
          // social_system: 'http://fedtest.poker.dev.gamesys.corp:8080'
        },
        facebook: {
          appId: '265973993485405',
          appName: 'poker_local'
        },
        tablePath: '/static-assets/poker',
        staticAssets: '',
        ventureId: 17
      }
    }
  });
});