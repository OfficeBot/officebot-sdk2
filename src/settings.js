/**
 * Reference point for all of the sdk modules to find common
 * settings, such as what promise to use
 * @singleton
 * @namespace OfficeBotSDK.Settings
 */
let settings = {
  _p : Promise,
  setPromiseLib : function(p) {
    this._p = p;
  },
  getPromise : function() {
    return this._p;
  }
};

module.exports = settings;