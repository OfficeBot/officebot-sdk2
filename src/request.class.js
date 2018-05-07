const Transport = require('./transport.class.js');
const clone = require('./utils.class').clone;

/**
 * @constructor
 * @param {object=} config
 */
class Request {
  constructor(config = {}) {
    var defaults = {
      method: 'GET',
      url: '/',
      headers: {},
      data: undefined,
      responseType : 'application/json',
      params : {}
    };
    this.config = {};
    Object.assign(this.config, defaults, config);
  }
  /**
   * Executes the current request using the underlying transport mechanism (ie http)
   * @returns {Promise}
   */
  exec() {
    let originalRequest = this;
    let Promise = require('./settings').getPromise();
    return new Promise((resolve, reject) => {
      originalRequest.transport = new Transport(originalRequest);

      originalRequest.transport
      .exec()
      .then(function successCallback(response) {
        response.data = clone(response.response);
        // originalRequest.response = response;
        response.request = originalRequest;
        return resolve(response);
      }, function errorCallback(response) {
        // originalRequest.response = response;
        response.request = originalRequest;        
        return reject(response);
      });
    });
  }
  /**
   * Gets / sets the query object to use
   * @param {object=} newQuery 
   * @returns {(this | object)}
   */
  query(newQuery) {
    if ('undefined' !== typeof newQuery) {
      if ('object' === typeof newQuery && newQuery !== null) {
        newQuery = clone(newQuery);
      }
      this.config.params = newQuery;
      return this;
    } else {
      return this.config.params;
    }
  }
  
  /**
   * Gets / sets the http verb (method) to use (ie get,put,post, etc)
   * @param {string=} newMethod 
   * @returns {(this | string)}
   */
  method(newMethod) {
    if ('undefined' !== typeof newMethod) {
      if ('string' === typeof newMethod) {
        this.config.method = newMethod;
      }
      return this;
    } else {
      return this.config.method;
    }
  }
  
  /**
   * Gets / sets the target url to make the request to
   * @param {string=} newUrl 
   * @returns {(this | string)}
   */
  url(newUrl) {
    if ('undefined' !== typeof newUrl) {
      if ('string' === typeof newUrl) {
        this.config.url = newUrl;
      }
      return this;
    } else {
      return this.config.url;
    }
  }

  /**
   * Gets / sets headers (key / value pairs ) to use for the request
   * @param {object=} newHeaderObj 
   * @returns {(this | object)}
   */
  headers(newHeaderObj) {
    if ('undefined' !== typeof newHeaderObj) {
      if ('object' === typeof newHeaderObj && newHeaderObj !== null) {
        this.config.headers = clone(newHeaderObj);
      }
      return this;
    } else {
      return this.config.headers;
    }
  }

  /**
   * Gets / sets the request body
   * @param {object=} newBody 
   * @returns {(this | object | undefined)}
   */
  body(newBody) {
    if ('undefined' !== typeof newBody) {
      if ('object' === typeof newBody && newBody !== null) {
        this.config.data = clone(newBody);
      }
      return this;
    } else {
      return this.config.data;
    }
  }
  /**
   * Gets or sets the response type for the request
   * @param {string=} newType 
   * @returns {(this | string)}
   */
  mediaType(newType) {
    if ('undefined' !== typeof newType) {
      if ('string' === typeof newType) {
        this.config.responseType = newType;
      }
      return this;
    }
    return this.config.responseType;
  }

  /**
   * Returns a copy of this request's configurations
   * @returns {object}
   */
  toJSON() {
    return JSON.parse( JSON.stringify(this.config) );
  }
}

module.exports = Request;
