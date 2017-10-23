/**
 * @constructor
 * @param {string[]} args 
 */
class URLBuilder {
  constructor(args = []) {
    if (!args || 'function' !== typeof args.join) {
      throw new Error('URL Builder requires param 1 to be an array.');
    }
    this.target = args.filter(item => {
      return item !== '/';
    }).join('/') || "/";
  }
  /**
   * @returns {string} url
   */
  toString() {
    return this.target || '';
  }
}

module.exports = URLBuilder;