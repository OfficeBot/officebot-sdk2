/**
 * This creates a simple package that can be exported
 * @namespace OfficeBotSDK.Index
 */
let SDK = (function(Promise) {

  let Settings = require('./src/settings.js');
  Settings.setPromiseLib(Promise);

  let exports = {
    APIConfig       : require('./src/api-config.class'),
    Cache           : require('./src/cache.class'),
    EndpointConfig  : require('./src/endpoint-config.class'),
    Endpoint        : require('./src/endpoint.class'),
    HTTPMock        : require('./src/http-mock.class'),
    Model           : require('./src/model.class'),
    Request         : require('./src/request.class'),
    Settings        : Settings,
    Tranport        : require('./src/transport.class'),
    URLBuilder      : require('./src/url-builder.class'),
    Utils           : require('./src/utils.class')
  };

  return exports;

})(Promise);

module.exports = SDK;