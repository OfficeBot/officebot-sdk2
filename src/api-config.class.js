const EndpointConfig = require('./endpoint-config.class.js');
const Endpoint = require('./endpoint.class.js');
const Cache = require('./cache.class');
const clone = require('./utils.class').clone;

/**
 * Defines the base configuration for an API
 * @constructor
 */
class APIConfig {
  constructor() {
    this.config = { headers : {}, url : '' };
    this.endpoints = {};
    this.cache = new Cache();
  }
  /**
   * Gets / Sets base api url
   * @param {string=} url - Base url that this endpoint talks to
   * @returns {(this|string)}
   */
  baseUrl(url) {
    if ('undefined' !== typeof url) {
      if ('string' === typeof url) {
        this.config.url = url;
      }
      return this;
    }
    return this.config.url;
  }
  /**
   * Creates a new endpoint
   * @param {string} endpointName - The name that will be used to get this endpoint
   * @returns {@link Endpoint} An instance of Endpoint
   */
  endpoint(endpointName = '__default__') {
    let config = new EndpointConfig().api(this);
    this[ endpointName ] = new Endpoint(config);
    return this[ endpointName ];
  }
  /**
   * Sets headers that all calls will use. Helpful for authentication
   * @param {object=} headers - Key / value pairs of headers
   * @returns {this | object}
   */
  commonHeaders(headers) {
    if ('undefined' !== typeof headers) {
      this.config.headers = headers;
      return this;
    } else {
      return clone(this.config.headers);
    }
  }
}

module.exports = APIConfig;