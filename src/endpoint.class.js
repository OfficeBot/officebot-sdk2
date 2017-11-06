const URLBuilder = require('./url-builder.class');
const Request = require('./request.class');
const clone = require('./utils.class').clone;
const noop = require('./utils.class').noop;

/**
 * Creates an endpoint instance
 * @constructor
 */
class Endpoint {
  constructor(endpointConfig = {}) {
    if (!endpointConfig || 'function' !== typeof endpointConfig.model) {
      throw new Error('Invalid endpoint configuration.');
    }
    this.endpointConfig = clone(endpointConfig);
    this.config = {
      allowFromCache : true,
      method : 'get',
      target : '',
      query : {}
    };
    this.cache = this.endpointConfig.api().cache;
  }
  /**
   * Instantiates a new model instance and returns it
   * @param {object=} data - Initialization data for the new model instance 
   * @returns {@link Model} New instance of Model
   */
  createNew(data = {}) {
    let root = this.endpointConfig.baseUrl() + this.endpointConfig.url();
    data['@root'] = root;
    let instantiator = this.endpointConfig.model();
    let instance = new instantiator(data);
    instance.config(this.endpointConfig);
    return instance;
  }
  /**
   * Gets / sets instantiator to use when creating a new model instance. Instantiator *should* inherit
   * from {@link Model}
   * @param {(function|class)=} instantiator - Function or class to use when instantiating model
   * @returns {(this|function)} Current instantiator function or this instance
   */
  model(instantiator) {
    if ('undefined' !== typeof instantiator) {
      this.endpointConfig.model(instantiator);
      return this;
    }
    return this.endpointConfig.model();
  }
  /** 
   * Gets / sets the endpoint's relative url
   * @param {string=} url - The new url value
   * @returns {(this|string)} This instance or the current url
   */
  url(newUrl) {
    if ('undefined' !== typeof newUrl) {
      this.endpointConfig.url(newUrl);
      return this;
    }
    return this.endpointConfig.url();
  }
  /**
   * Builds a query to find an object with the specified identifier
   * @param {string} id - the unique model identifier 
   * @returns {this}
   */
  findById(id) {
    if ('string' !== typeof id) {
      throw new Error('Invalid model identifier');
    }
    this.config.target = new URLBuilder([
      this.endpointConfig.baseUrl(),
      this.endpointConfig.url(),
      id
    ]);
    this.config.method = 'get';
    return this;
  }
  /**
   * Creates a query to find objects that match the optional query
   * @param {object=} query 
   * @returns {this}
   */
  find(query) {
    this.config.target = new URLBuilder([
      this.endpointConfig.baseUrl(),
      this.endpointConfig.url()
    ]);
    this.config.method = 'get';
    this.config.query.search = JSON.stringify(query);
    return this;
  }

  /**
   * Creates a query to find a unique model with the specified id 
   * and replaces it's data with the specified body object
   * @param {string} id - the unique model identifier 
   * @param {object} body 
   * @returns {this}
   */
  findByIdAndUpdate(id, body) {
    if ('string' !== typeof id) {
      throw new Error('Invalid model identifier');
    }
    if ('object' !== typeof body) {
      throw new Error('Invalid body object');
    }
    this.config.target = new URLBuilder([
      this.endpointConfig.baseUrl(),
      this.endpointConfig.url(),
      id
    ]);
    this.body = body;
    this.config.method = 'put';
    return this;
  }

  /**
   * Creates a query that finds a model with the specified id and 
   * removes it from the database 
   * @param {string} id - the unique model identifier 
   * @returns {this}
   */
  findByIdAndRemove(id) {
    if ('string' !== typeof id) {
      throw new Error('Invalid model identifier');
    }
    this.config.target = new URLBuilder([
      this.endpointConfig.baseUrl(),
      this.endpointConfig.url(),
      id
    ]);
    this.config.method = 'delete';
    return this;
  }

  /**
   * Determines if the query request should allow objects from the cache
   * or require objects be fresh from the api
   * @param {boolean=} allow - Specify if using the cache is allowed
   * @returns {(this | boolean)} This instance or the current allow value
   */
  allowFromCache(allow) {
    if ('undefined' !== typeof allow) {
      if ('boolean' === typeof allow) {
        this.config.allowFromCache = allow;
      }
      return this;
    }
    return this.config.allowFromCache;
  }

  /**
   * Runs the query that has been created using the find/findBy.. calls
   * @param {function=} cb - Function to call on completion (success or failure)
   * @returns {Promise}
   */
  exec(cb = noop) {
    let allowFromCache = this.allowFromCache();
    let modelConstructor = this.endpointConfig.model();
    let endpointConfig = this.endpointConfig;

    let headers = {};
    try {
      headers = this.endpointConfig.api().commonHeaders();
    } catch(e) {
      // console.error('Unable to get common headers. Something went\'t wrong (unless you are unit testing). ');
    }
    Object.assign(headers, this.config.headers);

    let request = new Request()
      .method(this.config.method)
      .body(this.config.body || {})
      .query(this.config.query || {})
      .headers(headers || {})
      .url(this.config.target.toString());

    let Promise = require('./settings').getPromise();
    
    return new Promise((resolve, reject) => {
      if (this.hasCache()) {
        let cachedObject = cache.get(request.url());
        if (cachedObject && allowFromCache) {
          cb(null, cachedObject);
          return resolve(cachedObject);
        }
      }
      //do actual 'get'
      request.exec().then(response => {
        let data = response.data;
        let model;

        if (Array.isArray(data)) {
          model = data.map((item) => {
            let entry = new modelConstructor(item);
            entry.config(endpointConfig);
            Object.defineProperty(entry, '__request', { value : clone(request), enumerable : false });
            return entry;            
          });
        } else {
          model = new modelConstructor(data);
          model.config(endpointConfig);
          Object.defineProperty(model, '__request', { value : clone(request), enumerable : false });
        }

        if (this.hasCache()) {
          cache.put(request.url(), model);
        }
        cb(null, model);
        return resolve(model);
      }).catch(err => {
        if (this.hasCache()) {
          cache.invalidate(request.url());
        }
        cb(err);
        return reject(err);
      });
    });
  }
  /**
   * Query helper to skip records returned from the api (if supported). Combined
   * with the .limit method, this function is great for pagination 
   * @param {number} skipAmount 
   * @returns this
   */
  skip(skipAmount = 0) {
    if ('number' === typeof skipAmount) {
      this.config.query.skip = skipAmount;
    }
    return this;
  }
 /**
  * Query helper to limit the number of results returned (provided the api 
  * supports it)
  * @param {number} limitAmount 
  * @returns this
  */
  limit(limitAmount = 0) {
    if ('number' === typeof limitAmount) {
      this.config.query.limit = limitAmount;
    }
    return this;
  }
  /**
   * Sets a list of fields to return from the api (if supported).
   * @param {(string|string[])} fields - a list of fields to return from the api
   * @returns this
   */
  select(fields = '') {
    if (Array.isArray(fields)) {
      fields = fields.join(' ');
    }
    if ('string' === typeof fields) {
      this.config.query.fields = fields;
    }
    return this;
  }

  /**
   * Checks to see if the cache object has been set and is valid
   * @access private
   * @returns {boolean}
   */
  hasCache() {
    return this.cache && 'function' === typeof this.cache;
  }
}

module.exports = Endpoint;
