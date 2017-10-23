/**
 * @constructor
 */
class Cache {
  /**
   * Create a cache object
   */
  constructor() {
    this.objects = new Map();
    this.config = {
      ttl : 60000,
    };
  }
  /**
   * Fetches an object from the cache using the object's name (typically the url)
   * @param {string} name 
   * @returns {(object|Array|undefined)} The found object or array if exists, otherwise undefined
   */
  get(name) {
    let now = Date.now();
    let obj = this.objects.get(name);
    if ('undefined' !== typeof obj && now - obj[0] < this.config.ttl) {
      let cachedObject = obj[1];
      Object.defineProperty(cachedObject,'__fromCache', {value : true});
      return cachedObject;
    } else {
      this.objects.delete(name); //in case the object exists but has expired
      return undefined;
    }
  }
  /**
   * Stores any object or primitive into the cache using it's name
   * NOTE: Primitives WILL be converted to objects prior to caching
   * @param {string} name 
   * @param {(string|number|boolean|object)} value 
   * @returns {boolean} success
   */
  put(name, value) {
    if ('string' !== typeof name) {
      throw new Error('Invalid name attribute');
    }
    //convert primitive strings to string objects so we can add __fromCached
    if ('string' === typeof value) {
      value = new String(value); // jshint ignore:line
    }
    if ('number' === typeof value) {
      value = new Number(value); // jshint ignore:line
    }
    if ('boolean' === typeof value) {
      value = new Boolean(value); // jshint ignore:line      
    }
    this.objects.set(name, [Date.now(), value]);
    return true;
  }
  /**
   * Removes an object from the cache
   * @param {string} name 
   */
  invalidate(name) {
    return this.objects.delete(name);
  }
  /**
   * Changes the default time to live of objects in the cache
   * @param {number} newTTL 
   * @returns {boolean} success
   */
  setTTL(newTTL) {
    if ('number' !== typeof newTTL) {
      throw new Error('Invalid TTL value');
    }
    this.config.ttl = newTTL;
    return true;
  }
 
}

module.exports = Cache;