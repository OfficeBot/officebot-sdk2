const Model = require('./model.class');
const clone = require('./utils.class').clone;
/**
 * @constructor
 */
class EndpointConfig {
  constructor(config = {}) {
    this.config = { api : {}};

    let defaults = {
      'url' : '/',
      'instantiator' : Model
    };
    Object.assign(this.config, defaults, clone(config));
  }
  /**
   * Gets / sets the API configuration object. This is needed so each
   * endpoint can share common settings
   * @param {APIConfig} config - The parent api configuration 
   * @returns {(this | object)}
   */
  api(config) {
    if ('undefined' !== typeof config) {
      if ('object' === typeof config && config !== null) {
        this.config.api = clone(config);
      }
      return this;
    }
    return this.config.api;
  }

  /**
   * Gets the base url from the underlying api configuration 
   * @returns {string} Current root url
   */
  baseUrl() {
    if (!this.config.api || !this.config.api.baseUrl) {
      return '';
    }
    return this.config.api.baseUrl();
  }
  /**
   * Gets / sets the endpoint's relative url
   * @param {string=} newUrl - Url to use for this endpoint
   * @returns {(this | string)} This instance or the current url
   */
  url(newUrl) {
    if ('undefined' !== typeof newUrl) {
      if ('string' === typeof newUrl) {
        this.config.url = newUrl;
      }
      return this;
    }
    return this.config.url;
  }
  /**
   * Gets / sets the instantiator function to use when creating a new model. 
   * @param {(function|class)=} instantiator - the function or class to use for instantiation
   * @returns {(this|function)} This instance or the current insantiation function 
   */
  model(newFn) {
    if ('undefined' !== typeof newFn) {
      if ('function' === typeof newFn) {
        this.config.instantiator = newFn;
      }
      return this;
    }
    return this.config.instantiator;
  }

}

module.exports = EndpointConfig;