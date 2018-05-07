/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This creates a simple package that can be exported
 * @namespace OfficeBotSDK.Index
 */
var SDK = function (Promise) {

  var Settings = __webpack_require__(1);
  Settings.setPromiseLib(Promise);

  var exports = {
    API: __webpack_require__(2),
    Cache: __webpack_require__(26),
    EndpointConfig: __webpack_require__(3),
    Endpoint: __webpack_require__(24),
    HTTPMock: __webpack_require__(23),
    Model: __webpack_require__(4),
    Request: __webpack_require__(18),
    Settings: Settings,
    Tranport: __webpack_require__(19),
    URLBuilder: __webpack_require__(25),
    Utils: __webpack_require__(11)
  };

  return exports;
}(Promise);

module.exports = SDK;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Reference point for all of the sdk modules to find common
 * settings, such as what promise to use
 * @singleton
 * @namespace OfficeBotSDK.Settings
 */
var settings = {
  _p: Promise,
  setPromiseLib: function setPromiseLib(p) {
    this._p = p;
  },
  getPromise: function getPromise() {
    return this._p;
  }
};

module.exports = settings;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EndpointConfig = __webpack_require__(3);
var Endpoint = __webpack_require__(24);
var Cache = __webpack_require__(26);
var clone = __webpack_require__(11).clone;

/**
 * Defines the base configuration for an API
 * @constructor
 */

var APIConfig = function () {
  function APIConfig() {
    _classCallCheck(this, APIConfig);

    this.config = { headers: {}, url: '' };
    this.endpoints = {};
    this.cache = new Cache();
  }
  /**
   * Gets / Sets base api url
   * @param {string=} url - Base url that this endpoint talks to
   * @returns {(this|string)}
   */


  _createClass(APIConfig, [{
    key: 'baseUrl',
    value: function baseUrl(url) {
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

  }, {
    key: 'endpoint',
    value: function endpoint() {
      var endpointName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '__default__';

      var config = new EndpointConfig().api(this);
      this[endpointName] = new Endpoint(config);
      return this[endpointName];
    }
    /**
     * Sets headers that all calls will use. Helpful for authentication
     * @param {object=} headers - Key / value pairs of headers
     * @returns {this | object}
     */

  }, {
    key: 'commonHeaders',
    value: function commonHeaders(headers) {
      if ('undefined' !== typeof headers) {
        this.config.headers = headers;
        return this;
      } else {
        return clone(this.config.headers);
      }
    }
  }]);

  return APIConfig;
}();

module.exports = APIConfig;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = __webpack_require__(4);
var clone = __webpack_require__(11).clone;
/**
 * @constructor
 */

var EndpointConfig = function () {
  function EndpointConfig() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EndpointConfig);

    this.config = { api: {} };

    var defaults = {
      'url': '/',
      'responseType': "application/json",
      'instantiator': Model
    };
    Object.assign(this.config, defaults, clone(config));
  }

  /**
   * Gets or sets the expected media return type. Ultimately, it is up to the transport
   * to use this setting to correctly talk to the api
   * Note - This is currently unused
   * @param {string=} newType - The new media type that this endpoint communicates with
   */


  _createClass(EndpointConfig, [{
    key: 'mediaType',
    value: function mediaType(newType) {
      if ('undefined' !== typeof newType) {
        if ('string' === typeof newType) {
          this.config.responseType = newType;
        }
        return this;
      }
      return this.config.responseType;
    }

    /**
     * Gets / sets the API configuration object. This is needed so each
     * endpoint can share common settings
     * @param {APIConfig} config - The parent api configuration 
     * @returns {(this | object)}
     */

  }, {
    key: 'api',
    value: function api(config) {
      if ('undefined' !== typeof config) {
        if ('object' === (typeof config === 'undefined' ? 'undefined' : _typeof(config)) && config !== null) {
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

  }, {
    key: 'baseUrl',
    value: function baseUrl() {
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

  }, {
    key: 'url',
    value: function url(newUrl) {
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

  }, {
    key: 'model',
    value: function model(newFn) {
      if ('undefined' !== typeof newFn) {
        if ('function' === typeof newFn) {
          this.config.instantiator = newFn;
        }
        return this;
      }
      return this.config.instantiator;
    }
  }]);

  return EndpointConfig;
}();

module.exports = EndpointConfig;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsonpatch = __webpack_require__(5);
var clone = __webpack_require__(11).clone;
var noop = __webpack_require__(11).noop;
var Request = __webpack_require__(18);

/**
 * @constructor
 */

var Model = function () {
  function Model() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Model);

    Object.defineProperty(this, '__config', { enumerable: false, writable: true });
    Object.defineProperty(this, '__response', { enumerable: false, writable: true });
    Object.defineProperty(this, '__original', { value: jsonpatch.deepClone(data), writable: true });
    Object.defineProperty(this, '__revision', { value: Date.now(), writable: true });

    Object.assign(this, clone(data));
  }
  /**
   * Persists this model back to the api
   * @param {function=} cb - Callback to invoke on completion (failure or success)
   * @returns {Request}
   */


  _createClass(Model, [{
    key: 'save',
    value: function save() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      var headers = {};
      try {
        headers = this.__config.api().commonHeaders();
      } catch (e) {
        //ignore
      }

      var method = this._id ? 'put' : 'post';
      var instance = this;

      var request = new Request().url(this.makeHref()).method(method).headers(headers).body(this).exec().then(function (response) {
        Object.assign(instance, clone(response.data));
        instance.__revision = Date.now();
        instance.__response = response;
        instance.makeClean();
        cb();
        return instance;
      }).catch(function (err) {
        cb(err);
        throw err;
      });

      return request;
    }

    /**
     * Gets a list of changes that have occured since the last get/save
     * @returns {Request}
     */

  }, {
    key: 'changes',
    value: function changes() {
      var headers = this.__config.api().commonHeaders();
      var targetUrl = this['@changes'];
      var request = new Request().url(targetUrl).query({ search: { since: this.__revision } }).method('get').headers(headers).exec();
      return request;
    }

    /**
     * Starts listening for changes and calls onChange whenever they are detected
     * @param {function} onChange - Function to call when changes detected
     * @param {number} refreshRate - the duration (in milliseconds) between checks
     * @returns {this}
     */

  }, {
    key: 'subscribe',
    value: function subscribe(onChange) {
      var _this = this;

      var ttl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

      setInterval(function () {
        _this.changes().then(function (changeList) {
          if (changeList && changeList.length) {
            _this.__revision = Date.now();
            onChange(changeList, Date.now());
          }
        });
      }, ttl);

      return this;
    }

    /**
     * Puts only the changes (in patch notation) back to the api. The
     * server-side endpoint must support PATCH
     * @returns {Request}
     */

  }, {
    key: 'update',
    value: function update() {
      //use patch
      var headers = this.__config.api().commonHeaders();

      var patches = this.getDiffs();
      var targetUrl = this.makeHref();
      var instance = this;
      var request = new Request().url(targetUrl).method('patch').headers(headers).body(patches).exec().then(function (response) {
        Object.assign(instance, clone(response.data));
        instance.__revision = Date.now();
        instance.__response = response;
        instance.makeClean();
      });
      return request;
    }

    /**
     * Sets the underlying API config
     * @param {EndpointConfig} endpointConfig
     */

  }, {
    key: 'config',
    value: function config() {
      var endpointConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.__config = endpointConfig;
    }
  }, {
    key: 'makeHref',
    value: function makeHref() {
      var correctHref = void 0;
      if ('object' === _typeof(this.__config)) {
        correctHref = this.__config.baseUrl() + '/' + this.__config.url() + '/';
        if ('string' === typeof this._id) {
          correctHref += this._id;
        }
      } else {
        correctHref = '/__unit_test__';
      }
      return correctHref;
    }

    /**
     * Returns a list of diffs comparing this version to the last
     * synced version from the server
     * @private
     * @returns {object[]} Array of changes
     */

  }, {
    key: 'getDiffs',
    value: function getDiffs() {
      return jsonpatch.compare(this.__original, this);
    }
    /**
     * Returns the current status of this model
     * @returns {boolean}
     */

  }, {
    key: 'isDirty',
    value: function isDirty() {
      return this.getDiffs().length > 0;
    }
    /**
     * Clears out the change history and syncs the underlying original version
     * to the current version
     * @returns {undefined}
     */

  }, {
    key: 'makeClean',
    value: function makeClean() {
      this.__original = jsonpatch.deepClone(this);
    }

    /**
     * Removes this modal from the api
     * @param {function=} cb - Function to call on completetion (success or failure)
     * @returns {Request}
     */

  }, {
    key: 'remove',
    value: function remove() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      var headers = {};
      try {
        headers = this.__config.api().commonHeaders();
      } catch (e) {}

      var targetUrl = this.makeHref();
      var instance = this;

      var request = new Request().url(targetUrl).method('delete').headers(headers).exec().then(function (response) {
        instance.__response = response;
        return cb();
      }).catch(function (err) {
        cb(err);
        throw err;
      });
      return request;
    }
  }]);

  return Model;
}();

module.exports = Model;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var equalsOptions = { strict: true };
var _equals = __webpack_require__(6);
var areEquals = function (a, b) {
    return _equals(a, b, equalsOptions);
};
var helpers_1 = __webpack_require__(9);
var core_1 = __webpack_require__(10);
/* export all core functions */
var core_2 = __webpack_require__(10);
exports.applyOperation = core_2.applyOperation;
exports.applyPatch = core_2.applyPatch;
exports.applyReducer = core_2.applyReducer;
exports.getValueByPointer = core_2.getValueByPointer;
exports.validate = core_2.validate;
exports.validator = core_2.validator;
/* export some helpers */
var helpers_2 = __webpack_require__(9);
exports.JsonPatchError = helpers_2.PatchError;
exports.deepClone = helpers_2._deepClone;
exports.escapePathComponent = helpers_2.escapePathComponent;
exports.unescapePathComponent = helpers_2.unescapePathComponent;
var beforeDict = [];
var Mirror = (function () {
    function Mirror(obj) {
        this.observers = [];
        this.obj = obj;
    }
    return Mirror;
}());
var ObserverInfo = (function () {
    function ObserverInfo(callback, observer) {
        this.callback = callback;
        this.observer = observer;
    }
    return ObserverInfo;
}());
function getMirror(obj) {
    for (var i = 0, length = beforeDict.length; i < length; i++) {
        if (beforeDict[i].obj === obj) {
            return beforeDict[i];
        }
    }
}
function getObserverFromMirror(mirror, callback) {
    for (var j = 0, length = mirror.observers.length; j < length; j++) {
        if (mirror.observers[j].callback === callback) {
            return mirror.observers[j].observer;
        }
    }
}
function removeObserverFromMirror(mirror, observer) {
    for (var j = 0, length = mirror.observers.length; j < length; j++) {
        if (mirror.observers[j].observer === observer) {
            mirror.observers.splice(j, 1);
            return;
        }
    }
}
/**
 * Detach an observer from an object
 */
function unobserve(root, observer) {
    observer.unobserve();
}
exports.unobserve = unobserve;
/**
 * Observes changes made to an object, which can then be retrieved using generate
 */
function observe(obj, callback) {
    var patches = [];
    var root = obj;
    var observer;
    var mirror = getMirror(obj);
    if (!mirror) {
        mirror = new Mirror(obj);
        beforeDict.push(mirror);
    }
    else {
        observer = getObserverFromMirror(mirror, callback);
    }
    if (observer) {
        return observer;
    }
    observer = {};
    mirror.value = helpers_1._deepClone(obj);
    if (callback) {
        observer.callback = callback;
        observer.next = null;
        var dirtyCheck = function () {
            generate(observer);
        };
        var fastCheck = function () {
            clearTimeout(observer.next);
            observer.next = setTimeout(dirtyCheck);
        };
        if (typeof window !== 'undefined') {
            if (window.addEventListener) {
                window.addEventListener('mouseup', fastCheck);
                window.addEventListener('keyup', fastCheck);
                window.addEventListener('mousedown', fastCheck);
                window.addEventListener('keydown', fastCheck);
                window.addEventListener('change', fastCheck);
            }
            else {
                document.documentElement.attachEvent('onmouseup', fastCheck);
                document.documentElement.attachEvent('onkeyup', fastCheck);
                document.documentElement.attachEvent('onmousedown', fastCheck);
                document.documentElement.attachEvent('onkeydown', fastCheck);
                document.documentElement.attachEvent('onchange', fastCheck);
            }
        }
    }
    observer.patches = patches;
    observer.object = obj;
    observer.unobserve = function () {
        generate(observer);
        clearTimeout(observer.next);
        removeObserverFromMirror(mirror, observer);
        if (typeof window !== 'undefined') {
            if (window.removeEventListener) {
                window.removeEventListener('mouseup', fastCheck);
                window.removeEventListener('keyup', fastCheck);
                window.removeEventListener('mousedown', fastCheck);
                window.removeEventListener('keydown', fastCheck);
            }
            else {
                document.documentElement.detachEvent('onmouseup', fastCheck);
                document.documentElement.detachEvent('onkeyup', fastCheck);
                document.documentElement.detachEvent('onmousedown', fastCheck);
                document.documentElement.detachEvent('onkeydown', fastCheck);
            }
        }
    };
    mirror.observers.push(new ObserverInfo(callback, observer));
    return observer;
}
exports.observe = observe;
/**
 * Generate an array of patches from an observer
 */
function generate(observer) {
    var mirror;
    for (var i = 0, length = beforeDict.length; i < length; i++) {
        if (beforeDict[i].obj === observer.object) {
            mirror = beforeDict[i];
            break;
        }
    }
    _generate(mirror.value, observer.object, observer.patches, "");
    if (observer.patches.length) {
        core_1.applyPatch(mirror.value, observer.patches);
    }
    var temp = observer.patches;
    if (temp.length > 0) {
        observer.patches = [];
        if (observer.callback) {
            observer.callback(temp);
        }
    }
    return temp;
}
exports.generate = generate;
// Dirty check if obj is different from mirror, generate patches and update mirror
function _generate(mirror, obj, patches, path) {
    if (obj === mirror) {
        return;
    }
    if (typeof obj.toJSON === "function") {
        obj = obj.toJSON();
    }
    var newKeys = helpers_1._objectKeys(obj);
    var oldKeys = helpers_1._objectKeys(mirror);
    var changed = false;
    var deleted = false;
    //if ever "move" operation is implemented here, make sure this test runs OK: "should not generate the same patch twice (move)"
    for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];
        if (helpers_1.hasOwnProperty(obj, key) && !(obj[key] === undefined && oldVal !== undefined && Array.isArray(obj) === false)) {
            var newVal = obj[key];
            if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null) {
                _generate(oldVal, newVal, patches, path + "/" + helpers_1.escapePathComponent(key));
            }
            else {
                if (oldVal !== newVal) {
                    changed = true;
                    patches.push({ op: "replace", path: path + "/" + helpers_1.escapePathComponent(key), value: helpers_1._deepClone(newVal) });
                }
            }
        }
        else {
            patches.push({ op: "remove", path: path + "/" + helpers_1.escapePathComponent(key) });
            deleted = true; // property has been deleted
        }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
        return;
    }
    for (var t = 0; t < newKeys.length; t++) {
        var key = newKeys[t];
        if (!helpers_1.hasOwnProperty(mirror, key) && obj[key] !== undefined) {
            patches.push({ op: "add", path: path + "/" + helpers_1.escapePathComponent(key), value: helpers_1._deepClone(obj[key]) });
        }
    }
}
/**
 * Create an array of patches from the differences in two objects
 */
function compare(tree1, tree2) {
    var patches = [];
    _generate(tree1, tree2, patches, '');
    return patches;
}
exports.compare = compare;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(7);
var isArguments = __webpack_require__(8);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2017 Joachim Wester
 * MIT license
 */
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(obj, key) {
    return _hasOwnProperty.call(obj, key);
}
exports.hasOwnProperty = hasOwnProperty;
function _objectKeys(obj) {
    if (Array.isArray(obj)) {
        var keys = new Array(obj.length);
        for (var k = 0; k < keys.length; k++) {
            keys[k] = "" + k;
        }
        return keys;
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var i in obj) {
        if (hasOwnProperty(obj, i)) {
            keys.push(i);
        }
    }
    return keys;
}
exports._objectKeys = _objectKeys;
;
/**
* Deeply clone the object.
* https://jsperf.com/deep-copy-vs-json-stringify-json-parse/25 (recursiveDeepCopy)
* @param  {any} obj value to clone
* @return {any} cloned obj
*/
function _deepClone(obj) {
    switch (typeof obj) {
        case "object":
            return JSON.parse(JSON.stringify(obj)); //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
        case "undefined":
            return null; //this is how JSON.stringify behaves for array items
        default:
            return obj; //no need to clone primitives
    }
}
exports._deepClone = _deepClone;
//3x faster than cached /^\d+$/.test(str)
function isInteger(str) {
    var i = 0;
    var len = str.length;
    var charCode;
    while (i < len) {
        charCode = str.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            i++;
            continue;
        }
        return false;
    }
    return true;
}
exports.isInteger = isInteger;
/**
* Escapes a json pointer path
* @param path The raw pointer
* @return the Escaped path
*/
function escapePathComponent(path) {
    if (path.indexOf('/') === -1 && path.indexOf('~') === -1)
        return path;
    return path.replace(/~/g, '~0').replace(/\//g, '~1');
}
exports.escapePathComponent = escapePathComponent;
/**
 * Unescapes a json pointer path
 * @param path The escaped pointer
 * @return The unescaped path
 */
function unescapePathComponent(path) {
    return path.replace(/~1/g, '/').replace(/~0/g, '~');
}
exports.unescapePathComponent = unescapePathComponent;
function _getPathRecursive(root, obj) {
    var found;
    for (var key in root) {
        if (hasOwnProperty(root, key)) {
            if (root[key] === obj) {
                return escapePathComponent(key) + '/';
            }
            else if (typeof root[key] === 'object') {
                found = _getPathRecursive(root[key], obj);
                if (found != '') {
                    return escapePathComponent(key) + '/' + found;
                }
            }
        }
    }
    return '';
}
exports._getPathRecursive = _getPathRecursive;
function getPath(root, obj) {
    if (root === obj) {
        return '/';
    }
    var path = _getPathRecursive(root, obj);
    if (path === '') {
        throw new Error("Object not found in root");
    }
    return '/' + path;
}
exports.getPath = getPath;
/**
* Recursively checks whether an object has any undefined values inside.
*/
function hasUndefined(obj) {
    if (obj === undefined) {
        return true;
    }
    if (obj) {
        if (Array.isArray(obj)) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (hasUndefined(obj[i])) {
                    return true;
                }
            }
        }
        else if (typeof obj === "object") {
            var objKeys = _objectKeys(obj);
            var objKeysLength = objKeys.length;
            for (var i = 0; i < objKeysLength; i++) {
                if (hasUndefined(obj[objKeys[i]])) {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.hasUndefined = hasUndefined;
var PatchError = (function (_super) {
    __extends(PatchError, _super);
    function PatchError(message, name, index, operation, tree) {
        _super.call(this, message);
        this.message = message;
        this.name = name;
        this.index = index;
        this.operation = operation;
        this.tree = tree;
    }
    return PatchError;
}(Error));
exports.PatchError = PatchError;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var equalsOptions = { strict: true };
var _equals = __webpack_require__(6);
var areEquals = function (a, b) {
    return _equals(a, b, equalsOptions);
};
var helpers_1 = __webpack_require__(9);
exports.JsonPatchError = helpers_1.PatchError;
exports.deepClone = helpers_1._deepClone;
/* We use a Javascript hash to store each
 function. Each hash entry (property) uses
 the operation identifiers specified in rfc6902.
 In this way, we can map each patch operation
 to its dedicated function in efficient way.
 */
/* The operations applicable to an object */
var objOps = {
    add: function (obj, key, document) {
        obj[key] = this.value;
        return { newDocument: document };
    },
    remove: function (obj, key, document) {
        var removed = obj[key];
        delete obj[key];
        return { newDocument: document, removed: removed };
    },
    replace: function (obj, key, document) {
        var removed = obj[key];
        obj[key] = this.value;
        return { newDocument: document, removed: removed };
    },
    move: function (obj, key, document) {
        /* in case move target overwrites an existing value,
        return the removed value, this can be taxing performance-wise,
        and is potentially unneeded */
        var removed = getValueByPointer(document, this.path);
        if (removed) {
            removed = helpers_1._deepClone(removed);
        }
        var originalValue = applyOperation(document, { op: "remove", path: this.from }).removed;
        applyOperation(document, { op: "add", path: this.path, value: originalValue });
        return { newDocument: document, removed: removed };
    },
    copy: function (obj, key, document) {
        var valueToCopy = getValueByPointer(document, this.from);
        // enforce copy by value so further operations don't affect source (see issue #177)
        applyOperation(document, { op: "add", path: this.path, value: helpers_1._deepClone(valueToCopy) });
        return { newDocument: document };
    },
    test: function (obj, key, document) {
        return { newDocument: document, test: areEquals(obj[key], this.value) };
    },
    _get: function (obj, key, document) {
        this.value = obj[key];
        return { newDocument: document };
    }
};
/* The operations applicable to an array. Many are the same as for the object */
var arrOps = {
    add: function (arr, i, document) {
        if (helpers_1.isInteger(i)) {
            arr.splice(i, 0, this.value);
        }
        else {
            arr[i] = this.value;
        }
        // this may be needed when using '-' in an array
        return { newDocument: document, index: i };
    },
    remove: function (arr, i, document) {
        var removedList = arr.splice(i, 1);
        return { newDocument: document, removed: removedList[0] };
    },
    replace: function (arr, i, document) {
        var removed = arr[i];
        arr[i] = this.value;
        return { newDocument: document, removed: removed };
    },
    move: objOps.move,
    copy: objOps.copy,
    test: objOps.test,
    _get: objOps._get
};
/**
 * Retrieves a value from a JSON document by a JSON pointer.
 * Returns the value.
 *
 * @param document The document to get the value from
 * @param pointer an escaped JSON pointer
 * @return The retrieved value
 */
function getValueByPointer(document, pointer) {
    if (pointer == '') {
        return document;
    }
    var getOriginalDestination = { op: "_get", path: pointer };
    applyOperation(document, getOriginalDestination);
    return getOriginalDestination.value;
}
exports.getValueByPointer = getValueByPointer;
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the {newDocument, result} of the operation.
 * It modifies the `document` and `operation` objects - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyOperation(document, jsonpatch._deepClone(operation))`.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @param mutateDocument Whether to mutate the original document or clone it before applying
 * @return `{newDocument, result}` after the operation
 */
function applyOperation(document, operation, validateOperation, mutateDocument) {
    if (validateOperation === void 0) { validateOperation = false; }
    if (mutateDocument === void 0) { mutateDocument = true; }
    if (validateOperation) {
        if (typeof validateOperation == 'function') {
            validateOperation(operation, 0, document, operation.path);
        }
        else {
            validator(operation, 0);
        }
    }
    /* ROOT OPERATIONS */
    if (operation.path === "") {
        var returnValue = { newDocument: document };
        if (operation.op === 'add') {
            returnValue.newDocument = operation.value;
            return returnValue;
        }
        else if (operation.op === 'replace') {
            returnValue.newDocument = operation.value;
            returnValue.removed = document; //document we removed
            return returnValue;
        }
        else if (operation.op === 'move' || operation.op === 'copy') {
            returnValue.newDocument = getValueByPointer(document, operation.from); // get the value by json-pointer in `from` field
            if (operation.op === 'move') {
                returnValue.removed = document;
            }
            return returnValue;
        }
        else if (operation.op === 'test') {
            returnValue.test = areEquals(document, operation.value);
            if (returnValue.test === false) {
                throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
            }
            returnValue.newDocument = document;
            return returnValue;
        }
        else if (operation.op === 'remove') {
            returnValue.removed = document;
            returnValue.newDocument = null;
            return returnValue;
        }
        else if (operation.op === '_get') {
            operation.value = document;
            return returnValue;
        }
        else {
            if (validateOperation) {
                throw new exports.JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', 0, operation, document);
            }
            else {
                return returnValue;
            }
        }
    } /* END ROOT OPERATIONS */
    else {
        if (!mutateDocument) {
            document = helpers_1._deepClone(document);
        }
        var path = operation.path || "";
        var keys = path.split('/');
        var obj = document;
        var t = 1; //skip empty element - http://jsperf.com/to-shift-or-not-to-shift
        var len = keys.length;
        var existingPathFragment = undefined;
        var key = void 0;
        var validateFunction = void 0;
        if (typeof validateOperation == 'function') {
            validateFunction = validateOperation;
        }
        else {
            validateFunction = validator;
        }
        while (true) {
            key = keys[t];
            if (validateOperation) {
                if (existingPathFragment === undefined) {
                    if (obj[key] === undefined) {
                        existingPathFragment = keys.slice(0, t).join('/');
                    }
                    else if (t == len - 1) {
                        existingPathFragment = operation.path;
                    }
                    if (existingPathFragment !== undefined) {
                        validateFunction(operation, 0, document, existingPathFragment);
                    }
                }
            }
            t++;
            if (Array.isArray(obj)) {
                if (key === '-') {
                    key = obj.length;
                }
                else {
                    if (validateOperation && !helpers_1.isInteger(key)) {
                        throw new exports.JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", 0, operation.path, operation);
                    } // only parse key when it's an integer for `arr.prop` to work
                    else if (helpers_1.isInteger(key)) {
                        key = ~~key;
                    }
                }
                if (t >= len) {
                    if (validateOperation && operation.op === "add" && key > obj.length) {
                        throw new exports.JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", 0, operation.path, operation);
                    }
                    var returnValue = arrOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
                    }
                    return returnValue;
                }
            }
            else {
                if (key && key.indexOf('~') != -1) {
                    key = helpers_1.unescapePathComponent(key);
                }
                if (t >= len) {
                    var returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
                    }
                    return returnValue;
                }
            }
            obj = obj[key];
        }
    }
}
exports.applyOperation = applyOperation;
/**
 * Apply a full JSON Patch array on a JSON document.
 * Returns the {newDocument, result} of the patch.
 * It modifies the `document` object and `patch` - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyPatch(document, jsonpatch._deepClone(patch))`.
 *
 * @param document The document to patch
 * @param patch The patch to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @return An array of `{newDocument, result}` after the patch
 */
function applyPatch(document, patch, validateOperation) {
    if (validateOperation) {
        if (!Array.isArray(patch)) {
            throw new exports.JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }
    }
    var results = new Array(patch.length);
    for (var i = 0, length_1 = patch.length; i < length_1; i++) {
        results[i] = applyOperation(document, patch[i], validateOperation);
        document = results[i].newDocument; // in case root was replaced
    }
    results.newDocument = document;
    return results;
}
exports.applyPatch = applyPatch;
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the updated document.
 * Suitable as a reducer.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @return The updated document
 */
function applyReducer(document, operation) {
    var operationResult = applyOperation(document, operation);
    if (operationResult.test === false) {
        throw new exports.JsonPatchError("Test operation failed", 'TEST_OPERATION_FAILED', 0, operation, document);
    }
    return operationResult.newDocument;
}
exports.applyReducer = applyReducer;
/**
 * Validates a single operation. Called from `jsonpatch.validate`. Throws `JsonPatchError` in case of an error.
 * @param {object} operation - operation object (patch)
 * @param {number} index - index of operation in the sequence
 * @param {object} [document] - object where the operation is supposed to be applied
 * @param {string} [existingPathFragment] - comes along with `document`
 */
function validator(operation, index, document, existingPathFragment) {
    if (typeof operation !== 'object' || operation === null || Array.isArray(operation)) {
        throw new exports.JsonPatchError('Operation is not an object', 'OPERATION_NOT_AN_OBJECT', index, operation, document);
    }
    else if (!objOps[operation.op]) {
        throw new exports.JsonPatchError('Operation `op` property is not one of operations defined in RFC-6902', 'OPERATION_OP_INVALID', index, operation, document);
    }
    else if (typeof operation.path !== 'string') {
        throw new exports.JsonPatchError('Operation `path` property is not a string', 'OPERATION_PATH_INVALID', index, operation, document);
    }
    else if (operation.path.indexOf('/') !== 0 && operation.path.length > 0) {
        // paths that aren't empty string should start with "/"
        throw new exports.JsonPatchError('Operation `path` property must start with "/"', 'OPERATION_PATH_INVALID', index, operation, document);
    }
    else if ((operation.op === 'move' || operation.op === 'copy') && typeof operation.from !== 'string') {
        throw new exports.JsonPatchError('Operation `from` property is not present (applicable in `move` and `copy` operations)', 'OPERATION_FROM_REQUIRED', index, operation, document);
    }
    else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && operation.value === undefined) {
        throw new exports.JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_REQUIRED', index, operation, document);
    }
    else if ((operation.op === 'add' || operation.op === 'replace' || operation.op === 'test') && helpers_1.hasUndefined(operation.value)) {
        throw new exports.JsonPatchError('Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)', 'OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED', index, operation, document);
    }
    else if (document) {
        if (operation.op == "add") {
            var pathLen = operation.path.split("/").length;
            var existingPathLen = existingPathFragment.split("/").length;
            if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
                throw new exports.JsonPatchError('Cannot perform an `add` operation at the desired path', 'OPERATION_PATH_CANNOT_ADD', index, operation, document);
            }
        }
        else if (operation.op === 'replace' || operation.op === 'remove' || operation.op === '_get') {
            if (operation.path !== existingPathFragment) {
                throw new exports.JsonPatchError('Cannot perform the operation at a path that does not exist', 'OPERATION_PATH_UNRESOLVABLE', index, operation, document);
            }
        }
        else if (operation.op === 'move' || operation.op === 'copy') {
            var existingValue = { op: "_get", path: operation.from, value: undefined };
            var error = validate([existingValue], document);
            if (error && error.name === 'OPERATION_PATH_UNRESOLVABLE') {
                throw new exports.JsonPatchError('Cannot perform the operation from a path that does not exist', 'OPERATION_FROM_UNRESOLVABLE', index, operation, document);
            }
        }
    }
}
exports.validator = validator;
/**
 * Validates a sequence of operations. If `document` parameter is provided, the sequence is additionally validated against the object document.
 * If error is encountered, returns a JsonPatchError object
 * @param sequence
 * @param document
 * @returns {JsonPatchError|undefined}
 */
function validate(sequence, document, externalValidator) {
    try {
        if (!Array.isArray(sequence)) {
            throw new exports.JsonPatchError('Patch sequence must be an array', 'SEQUENCE_NOT_AN_ARRAY');
        }
        if (document) {
            //clone document and sequence so that we can safely try applying operations
            applyPatch(helpers_1._deepClone(document), helpers_1._deepClone(sequence), externalValidator || true);
        }
        else {
            externalValidator = externalValidator || validator;
            for (var i = 0; i < sequence.length; i++) {
                externalValidator(sequence[i], i, document, undefined);
            }
        }
    }
    catch (e) {
        if (e instanceof exports.JsonPatchError) {
            return e;
        }
        else {
            throw e;
        }
    }
}
exports.validate = validate;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clone_lib = __webpack_require__(12);

/**
 * @constructor
 */

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }
    /**
     * Does nothing
     * @returns {undefined}
     */


    _createClass(Utils, null, [{
        key: 'noop',
        value: function noop() {}

        /**
         * Creates a deep copy of the passed in object
         * @param {object} obj - Object to copy
         * @returns {object} Copied object
         */

    }, {
        key: 'clone',
        value: function clone(obj) {
            return obj;
            // return clone_lib(obj);
            // return privateClone(obj);
        }
    }]);

    return Utils;
}();
/**
 * Allows our static method to call this recursively
 * @param {object} obj
 * @private
 * @returns {object} Copied object 
 */


function privateClone(obj) {
    if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) != 'object') {
        return obj;
    }
    var temp = new obj.constructor();
    for (var key in obj) {
        temp[key] = privateClone(obj[key]);
    }
    return temp;
}

module.exports = Utils;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13).Buffer))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(15)
var ieee754 = __webpack_require__(16)
var isArray = __webpack_require__(17)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transport = __webpack_require__(19);
var clone = __webpack_require__(11).clone;

/**
 * @constructor
 * @param {object=} config
 */

var Request = function () {
  function Request() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Request);

    var defaults = {
      method: 'GET',
      url: '/',
      headers: {},
      data: undefined,
      responseType: 'application/json',
      params: {}
    };
    this.config = {};
    Object.assign(this.config, defaults, config);
  }
  /**
   * Executes the current request using the underlying transport mechanism (ie http)
   * @returns {Promise}
   */


  _createClass(Request, [{
    key: 'exec',
    value: function exec() {
      var originalRequest = this;
      var Promise = __webpack_require__(1).getPromise();
      return new Promise(function (resolve, reject) {
        originalRequest.transport = new Transport(originalRequest);

        originalRequest.transport.exec().then(function successCallback(response) {
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

  }, {
    key: 'query',
    value: function query(newQuery) {
      if ('undefined' !== typeof newQuery) {
        if ('object' === (typeof newQuery === 'undefined' ? 'undefined' : _typeof(newQuery)) && newQuery !== null) {
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

  }, {
    key: 'method',
    value: function method(newMethod) {
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

  }, {
    key: 'url',
    value: function url(newUrl) {
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

  }, {
    key: 'headers',
    value: function headers(newHeaderObj) {
      if ('undefined' !== typeof newHeaderObj) {
        if ('object' === (typeof newHeaderObj === 'undefined' ? 'undefined' : _typeof(newHeaderObj)) && newHeaderObj !== null) {
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

  }, {
    key: 'body',
    value: function body(newBody) {
      if ('undefined' !== typeof newBody) {
        if ('object' === (typeof newBody === 'undefined' ? 'undefined' : _typeof(newBody)) && newBody !== null) {
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

  }, {
    key: 'mediaType',
    value: function mediaType(newType) {
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

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return JSON.parse(JSON.stringify(this.config));
    }
  }]);

  return Request;
}();

module.exports = Request;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clone = __webpack_require__(11).clone;
var querystring = __webpack_require__(20);

/**
 * @constructor
 */

var Transport = function () {
	function Transport(request) {
		_classCallCheck(this, Transport);

		if ('undefined' !== typeof window && window.XMLHttpRequest) {
			this.HTTPRequest = window.XMLHttpRequest;
		} else {
			this.HTTPRequest = __webpack_require__(23); //used for Node based tests
		}
		this.setRequest(request);
	}
	/**
  * Stores the request object for use later (ie when .exec() gets called). Helpfull 
  * if building the transport request up instead of passing everything into constructor.
  * @param {Request} request 
  * @returns {this}
  */


	_createClass(Transport, [{
		key: 'setRequest',
		value: function setRequest(request) {
			this.request = clone(request);
			return this;
		}
		/**
   * Makes the actual api call using the Request object that was passed into the constructor 
   * or added using the setRequest method.
   * @returns {Promise}
   */

	}, {
		key: 'exec',
		value: function exec() {
			var Promise = __webpack_require__(1).getPromise();
			var instance = this;

			return new Promise(function (resolve, reject) {

				var httpInstance = new instance.HTTPRequest();
				var url = instance.request.url();

				var query = querystring.stringify(instance.request.query());
				if (query && query.length) {
					url = url + '?' + query;
				}
				var body = instance.request.body();
				if ('object' === (typeof body === 'undefined' ? 'undefined' : _typeof(body))) {
					body = JSON.stringify(body);
				}

				httpInstance.addEventListener("load", transferComplete);
				httpInstance.addEventListener("error", transferFailed);
				httpInstance.addEventListener("abort", transferAborted);
				httpInstance.open(instance.request.method().toUpperCase(), url);
				httpInstance.responseType = 'json';

				var headers = instance.request.headers();
				httpInstance.setRequestHeader("Content-Type", instance.request.mediaType());

				for (var headerName in headers) {
					httpInstance.setRequestHeader(headerName, headers[headerName]);
				}
				httpInstance.send(body);

				/**
    	* Handler:Aborted
    	*/
				function transferAborted() {
					var failed = new Error('Transfer cancelled.');
					reject(failed);
				}
				/**
    	* Handler:Failed
    	*/
				function transferFailed(e) {
					reject(httpInstance);
				}
				/**
    	* Handler:Finished
    	*/
				function transferComplete() {
					if (httpInstance.status < 400) {
						resolve(httpInstance);
					} else {
						reject(httpInstance);
					}
				}
			});
		}
	}]);

	return Transport;
}();

module.exports = Transport;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(21);
exports.encode = exports.stringify = __webpack_require__(22);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constructor
 */
var HTTPMock = function () {
	function HTTPMock() {
		var verbose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		_classCallCheck(this, HTTPMock);

		this.listeners = {};
		this.verbose = verbose;
	}
	/**
  * Mock representation of the XMLHttpRequest open method
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open}
  * @param {string} method 
  * @param {string} url 
  * @returns {undefined}
  */


	_createClass(HTTPMock, [{
		key: 'open',
		value: function open(method, url) {
			this.log('Opening ' + url + ' using ' + method);
		}
		/**
   * Mock representation of the XMLHttpRequest send method
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send}
   * @param {object} body 
   * @returns {undefined}
   */

	}, {
		key: 'send',
		value: function send(body) {
			this.log('Sending with ' + body);
			if ('function' === typeof this.listeners.load) {
				var mockResponse = {
					response: { 'mock_response': true, 'data': ['obj1'] },
					responseText: "{'mock_response' : true}",
					status: 200,
					statusText: '200',
					responseURL: '/mock-call'
				};
				Object.assign(this, mockResponse);
				this.listeners.load();
			}
		}
		/**
   * Mock representation of the XMLHttpRequest getAllResponseHeaders method
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders}
   * @returns {string} The mock headers
   */

	}, {
		key: 'getAllResponseHeaders',
		value: function getAllResponseHeaders() {
			return "Mock-Headers: true";
		}
		/**
   * Representation of Javascript's addEventListener designed to hook into this
   * mock XMLHttpRequest object
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
   * @param {string} name - The name of the event to listen for
   * @param {function} callback - Function to call when event is triggered
   */

	}, {
		key: 'addEventListener',
		value: function addEventListener(name, callback) {
			this.log(name + ' listener registered');
			this.listeners[name] = callback;
		}
		/**
   * Just a stub so we have a uniform interface between this and the real thing
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/setRequestHeader}
   * @param {string} header 
   * @param {string} value 
   */

	}, {
		key: 'setRequestHeader',
		value: function setRequestHeader(header, value) {
			return true;
		}
		/**
   * Helper function for logging status output based on this object's 
   * verbosity settings (true/false)
   * @param {string} message 
   */

	}, {
		key: 'log',
		value: function log(message) {
			if (this.verbose === true) {
				console.log(message);
			}
		}
	}]);

	return HTTPMock;
}();

module.exports = HTTPMock;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URLBuilder = __webpack_require__(25);
var Request = __webpack_require__(18);
var clone = __webpack_require__(11).clone;
var noop = __webpack_require__(11).noop;

/**
 * Creates an endpoint instance
 * @constructor
 */

var Endpoint = function () {
  function Endpoint() {
    var endpointConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Endpoint);

    if (!endpointConfig || 'function' !== typeof endpointConfig.model) {
      throw new Error('Invalid endpoint configuration.');
    }
    this.endpointConfig = clone(endpointConfig);
    this.config = {
      allowFromCache: true,
      method: 'get',
      target: '',
      query: {}
    };
    this.cache = this.endpointConfig.api().cache;
  }
  /**
   * Instantiates a new model instance and returns it
   * @param {object=} data - Initialization data for the new model instance
   * @returns {@link Model} New instance of Model
   */


  _createClass(Endpoint, [{
    key: 'createNew',
    value: function createNew() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var root = new URLBuilder([this.endpointConfig.baseUrl(), this.endpointConfig.url()]);
      data['@root'] = root;
      var instantiator = this.endpointConfig.model();
      var instance = new instantiator(data);
      instance.config(this.endpointConfig);
      return instance;
    }
    /**
     * Gets / sets instantiator to use when creating a new model instance. Instantiator *should* inherit
     * from {@link Model}
     * @param {(function|class)=} instantiator - Function or class to use when instantiating model
     * @returns {(this|function)} Current instantiator function or this instance
     */

  }, {
    key: 'model',
    value: function model(instantiator) {
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

  }, {
    key: 'url',
    value: function url(newUrl) {
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

  }, {
    key: 'findById',
    value: function findById(id) {
      if ('string' !== typeof id) {
        throw new Error('Invalid model identifier');
      }
      this.config.target = new URLBuilder([this.endpointConfig.baseUrl(), this.endpointConfig.url(), id]);
      this.config.method = 'get';
      return this;
    }
    /**
     * Creates a query to find objects that match the optional query
     * @param {object=} query
     * @returns {this}
     */

  }, {
    key: 'find',
    value: function find(query) {
      this.config.target = new URLBuilder([this.endpointConfig.baseUrl(), this.endpointConfig.url()]);
      this.config.method = 'get';
      this.config.query.search = JSON.stringify(query);
      return this;
    }

    /**
      * At the moment, this behaves exactly the same as .find, but uses the
      * SEARCH verb instead
      * @param {object} query
      * @returns {this}
      */

  }, {
    key: 'search',
    value: function search(query) {
      this.config.target = new URLBuilder([this.endpointConfig.baseUrl(), this.endpointConfig.url()]);
      this.config.method = 'search';
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

  }, {
    key: 'findByIdAndUpdate',
    value: function findByIdAndUpdate(id, body) {
      if ('string' !== typeof id) {
        throw new Error('Invalid model identifier');
      }
      if ('object' !== (typeof body === 'undefined' ? 'undefined' : _typeof(body))) {
        throw new Error('Invalid body object');
      }
      this.config.target = new URLBuilder([this.endpointConfig.baseUrl(), this.endpointConfig.url(), id]);
      this.config.body = body;
      this.config.method = 'put';
      return this;
    }

    /**
     * Creates a query that finds a model with the specified id and
     * removes it from the database
     * @param {string} id - the unique model identifier
     * @returns {this}
     */

  }, {
    key: 'findByIdAndRemove',
    value: function findByIdAndRemove(id) {
      if ('string' !== typeof id) {
        throw new Error('Invalid model identifier');
      }
      this.config.target = new URLBuilder([this.endpointConfig.baseUrl(), this.endpointConfig.url(), id]);
      this.config.method = 'delete';
      return this;
    }

    /**
     * Determines if the query request should allow objects from the cache
     * or require objects be fresh from the api
     * @param {boolean=} allow - Specify if using the cache is allowed
     * @returns {(this | boolean)} This instance or the current allow value
     */

  }, {
    key: 'allowFromCache',
    value: function allowFromCache(allow) {
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

  }, {
    key: 'exec',
    value: function exec() {
      var _this = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      var allowFromCache = this.allowFromCache();
      var modelConstructor = this.endpointConfig.model();
      var endpointConfig = this.endpointConfig;

      var headers = {};
      try {
        headers = this.endpointConfig.api().commonHeaders();
      } catch (e) {
        // console.error('Unable to get common headers. Something went\'t wrong (unless you are unit testing). ');
      }
      Object.assign(headers, this.config.headers);

      var request = new Request().method(this.config.method).body(this.config.body || {}).query(this.config.query || {}).headers(headers || {}).url(this.config.target.toString());

      var Promise = __webpack_require__(1).getPromise();

      return new Promise(function (resolve, reject) {
        if (_this.hasCache()) {
          var cachedObject = cache.get(request.url());
          if (cachedObject && allowFromCache) {
            cb(null, cachedObject);
            return resolve(cachedObject);
          }
        }
        //do actual 'get'
        request.exec().then(function (response) {
          var data = response.data;
          var model = void 0;

          if (Array.isArray(data)) {
            model = data.map(function (item) {
              var entry = new modelConstructor(item);
              entry.config(endpointConfig);
              Object.defineProperty(entry, '__request', { value: clone(request), enumerable: false });
              return entry;
            });
          } else {
            model = new modelConstructor(data);
            model.config(endpointConfig);
            Object.defineProperty(model, '__request', { value: clone(request), enumerable: false });
          }

          if (_this.hasCache()) {
            cache.put(request.url(), model);
          }
          cb(null, model);
          return resolve(model);
        }).catch(function (err) {
          if (_this.hasCache()) {
            cache.invalidate(request.url());
          }
          cb(err);
          reject(err);
          throw err;
        });
      });
    }
    /**
     * Query helper to skip records returned from the api (if supported). Combined
     * with the .limit method, this function is great for pagination
     * @param {number} skipAmount
     * @returns this
     */

  }, {
    key: 'skip',
    value: function skip() {
      var skipAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

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

  }, {
    key: 'limit',
    value: function limit() {
      var limitAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

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

  }, {
    key: 'select',
    value: function select() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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

  }, {
    key: 'hasCache',
    value: function hasCache() {
      return this.cache && 'function' === typeof this.cache;
    }
  }]);

  return Endpoint;
}();

module.exports = Endpoint;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constructor
 * @param {string[]} args 
 */
var URLBuilder = function () {
  function URLBuilder() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, URLBuilder);

    if (!args || 'function' !== typeof args.join) {
      throw new Error('URL Builder requires param 1 to be an array.');
    }
    this.target = args.filter(function (item) {
      return item !== '/';
    }).join('/') || "/";
  }
  /**
   * @returns {string} url
   */


  _createClass(URLBuilder, [{
    key: 'toString',
    value: function toString() {
      return this.target || '';
    }
  }]);

  return URLBuilder;
}();

module.exports = URLBuilder;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @constructor
 */
var Cache = function () {
  /**
   * Create a cache object
   */
  function Cache() {
    _classCallCheck(this, Cache);

    this.objects = new Map();
    this.config = {
      ttl: 60000
    };
  }
  /**
   * Fetches an object from the cache using the object's name (typically the url)
   * @param {string} name 
   * @returns {(object|Array|undefined)} The found object or array if exists, otherwise undefined
   */


  _createClass(Cache, [{
    key: 'get',
    value: function get(name) {
      var now = Date.now();
      var obj = this.objects.get(name);
      if ('undefined' !== typeof obj && now - obj[0] < this.config.ttl) {
        var cachedObject = obj[1];
        Object.defineProperty(cachedObject, '__fromCache', { value: true });
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

  }, {
    key: 'put',
    value: function put(name, value) {
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

  }, {
    key: 'invalidate',
    value: function invalidate(name) {
      return this.objects.delete(name);
    }
    /**
     * Changes the default time to live of objects in the cache
     * @param {number} newTTL 
     * @returns {boolean} success
     */

  }, {
    key: 'setTTL',
    value: function setTTL(newTTL) {
      if ('number' !== typeof newTTL) {
        throw new Error('Invalid TTL value');
      }
      this.config.ttl = newTTL;
      return true;
    }
  }]);

  return Cache;
}();

module.exports = Cache;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9hcGktY29uZmlnLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmRwb2ludC1jb25maWcuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsLmNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYXN0LWpzb24tcGF0Y2gvbGliL2R1cGxleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9saWIvaXNfYXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYXN0LWpzb24tcGF0Y2gvbGliL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zhc3QtanNvbi1wYXRjaC9saWIvY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nsb25lL2Nsb25lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yZXF1ZXN0LmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy90cmFuc3BvcnQuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2VuY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaHR0cC1tb2NrLmNsYXNzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmRwb2ludC5jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXJsLWJ1aWxkZXIuY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhY2hlLmNsYXNzLmpzIl0sIm5hbWVzIjpbIlNESyIsIlByb21pc2UiLCJTZXR0aW5ncyIsInJlcXVpcmUiLCJzZXRQcm9taXNlTGliIiwiZXhwb3J0cyIsIkFQSSIsIkNhY2hlIiwiRW5kcG9pbnRDb25maWciLCJFbmRwb2ludCIsIkhUVFBNb2NrIiwiTW9kZWwiLCJSZXF1ZXN0IiwiVHJhbnBvcnQiLCJVUkxCdWlsZGVyIiwiVXRpbHMiLCJtb2R1bGUiLCJzZXR0aW5ncyIsIl9wIiwicCIsImdldFByb21pc2UiLCJjbG9uZSIsIkFQSUNvbmZpZyIsImNvbmZpZyIsImhlYWRlcnMiLCJ1cmwiLCJlbmRwb2ludHMiLCJjYWNoZSIsImVuZHBvaW50TmFtZSIsImFwaSIsImRlZmF1bHRzIiwiT2JqZWN0IiwiYXNzaWduIiwibmV3VHlwZSIsInJlc3BvbnNlVHlwZSIsImJhc2VVcmwiLCJuZXdVcmwiLCJuZXdGbiIsImluc3RhbnRpYXRvciIsImpzb25wYXRjaCIsIm5vb3AiLCJkYXRhIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsImRlZXBDbG9uZSIsIkRhdGUiLCJub3ciLCJjYiIsIl9fY29uZmlnIiwiY29tbW9uSGVhZGVycyIsImUiLCJtZXRob2QiLCJfaWQiLCJpbnN0YW5jZSIsInJlcXVlc3QiLCJtYWtlSHJlZiIsImJvZHkiLCJleGVjIiwidGhlbiIsInJlc3BvbnNlIiwiX19yZXZpc2lvbiIsIl9fcmVzcG9uc2UiLCJtYWtlQ2xlYW4iLCJjYXRjaCIsImVyciIsInRhcmdldFVybCIsInF1ZXJ5Iiwic2VhcmNoIiwic2luY2UiLCJvbkNoYW5nZSIsInR0bCIsInNldEludGVydmFsIiwiY2hhbmdlcyIsImNoYW5nZUxpc3QiLCJsZW5ndGgiLCJwYXRjaGVzIiwiZ2V0RGlmZnMiLCJlbmRwb2ludENvbmZpZyIsImNvcnJlY3RIcmVmIiwiY29tcGFyZSIsIl9fb3JpZ2luYWwiLCJjbG9uZV9saWIiLCJvYmoiLCJwcml2YXRlQ2xvbmUiLCJ0ZW1wIiwiY29uc3RydWN0b3IiLCJrZXkiLCJUcmFuc3BvcnQiLCJ1bmRlZmluZWQiLCJwYXJhbXMiLCJvcmlnaW5hbFJlcXVlc3QiLCJyZXNvbHZlIiwicmVqZWN0IiwidHJhbnNwb3J0Iiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsIm5ld1F1ZXJ5IiwibmV3TWV0aG9kIiwibmV3SGVhZGVyT2JqIiwibmV3Qm9keSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInF1ZXJ5c3RyaW5nIiwid2luZG93IiwiWE1MSHR0cFJlcXVlc3QiLCJIVFRQUmVxdWVzdCIsInNldFJlcXVlc3QiLCJodHRwSW5zdGFuY2UiLCJhZGRFdmVudExpc3RlbmVyIiwidHJhbnNmZXJDb21wbGV0ZSIsInRyYW5zZmVyRmFpbGVkIiwidHJhbnNmZXJBYm9ydGVkIiwib3BlbiIsInRvVXBwZXJDYXNlIiwic2V0UmVxdWVzdEhlYWRlciIsIm1lZGlhVHlwZSIsImhlYWRlck5hbWUiLCJzZW5kIiwiZmFpbGVkIiwiRXJyb3IiLCJzdGF0dXMiLCJ2ZXJib3NlIiwibGlzdGVuZXJzIiwibG9nIiwibG9hZCIsIm1vY2tSZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJyZXNwb25zZVVSTCIsIm5hbWUiLCJjYWxsYmFjayIsImhlYWRlciIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibW9kZWwiLCJhbGxvd0Zyb21DYWNoZSIsInRhcmdldCIsInJvb3QiLCJpZCIsImFsbG93IiwibW9kZWxDb25zdHJ1Y3RvciIsInRvU3RyaW5nIiwiaGFzQ2FjaGUiLCJjYWNoZWRPYmplY3QiLCJnZXQiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJpdGVtIiwiZW50cnkiLCJwdXQiLCJpbnZhbGlkYXRlIiwic2tpcEFtb3VudCIsInNraXAiLCJsaW1pdEFtb3VudCIsImxpbWl0IiwiZmllbGRzIiwiam9pbiIsImFyZ3MiLCJmaWx0ZXIiLCJvYmplY3RzIiwiTWFwIiwiZGVsZXRlIiwiU3RyaW5nIiwiTnVtYmVyIiwiQm9vbGVhbiIsInNldCIsIm5ld1RUTCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRUE7Ozs7QUFJQSxJQUFJQSxNQUFPLFVBQVNDLE9BQVQsRUFBa0I7O0FBRTNCLE1BQUlDLFdBQVcsbUJBQUFDLENBQVEsQ0FBUixDQUFmO0FBQ0FELFdBQVNFLGFBQVQsQ0FBdUJILE9BQXZCOztBQUVBLE1BQUlJLFVBQVU7QUFDWkMsU0FBa0IsbUJBQUFILENBQVEsQ0FBUixDQUROO0FBRVpJLFdBQWtCLG1CQUFBSixDQUFRLEVB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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDZCQUE2QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDMVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsWUFBWTtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNXZEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0EsUUFBUSxVQUFVOztBQUVs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TUFBYixDQUFvQmpDLElBQXBCLENBQVA7QUFDRDtBQUNEOzs7Ozs7OzsyQkFLT3NDLE0sRUFBUTtBQUNiLFVBQUksYUFBYSxPQUFPQSxNQUF4QixFQUFnQztBQUM5QixjQUFNLElBQUloRCxLQUFKLENBQVUsbUJBQVYsQ0FBTjtBQUNEO0FBQ0QsV0FBS25HLE1BQUwsQ0FBWWlELEdBQVosR0FBa0JrRyxNQUFsQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7Ozs7QUFJSDFKLE9BQU9YLE9BQVAsR0FBaUJFLEtBQWpCLEMiLCJmaWxlIjoib2ZmaWNlYm90LXNkazIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyoqXG4gKiBUaGlzIGNyZWF0ZXMgYSBzaW1wbGUgcGFja2FnZSB0aGF0IGNhbiBiZSBleHBvcnRlZFxuICogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuSW5kZXhcbiAqL1xubGV0IFNESyA9IChmdW5jdGlvbihQcm9taXNlKSB7XG5cbiAgbGV0IFNldHRpbmdzID0gcmVxdWlyZSgnLi9zcmMvc2V0dGluZ3MuanMnKTtcbiAgU2V0dGluZ3Muc2V0UHJvbWlzZUxpYihQcm9taXNlKTtcblxuICBsZXQgZXhwb3J0cyA9IHtcbiAgICBBUEkgICAgICAgICAgICAgOiByZXF1aXJlKCcuL3NyYy9hcGktY29uZmlnLmNsYXNzJyksXG4gICAgQ2FjaGUgICAgICAgICAgIDogcmVxdWlyZSgnLi9zcmMvY2FjaGUuY2xhc3MnKSxcbiAgICBFbmRwb2ludENvbmZpZyAgOiByZXF1aXJlKCcuL3NyYy9lbmRwb2ludC1jb25maWcuY2xhc3MnKSxcbiAgICBFbmRwb2ludCAgICAgICAgOiByZXF1aXJlKCcuL3NyYy9lbmRwb2ludC5jbGFzcycpLFxuICAgIEhUVFBNb2NrICAgICAgICA6IHJlcXVpcmUoJy4vc3JjL2h0dHAtbW9jay5jbGFzcycpLFxuICAgIE1vZGVsICAgICAgICAgICA6IHJlcXVpcmUoJy4vc3JjL21vZGVsLmNsYXNzJyksXG4gICAgUmVxdWVzdCAgICAgICAgIDogcmVxdWlyZSgnLi9zcmMvcmVxdWVzdC5jbGFzcycpLFxuICAgIFNldHRpbmdzICAgICAgICA6IFNldHRpbmdzLFxuICAgIFRyYW5wb3J0ICAgICAgICA6IHJlcXVpcmUoJy4vc3JjL3RyYW5zcG9ydC5jbGFzcycpLFxuICAgIFVSTEJ1aWxkZXIgICAgICA6IHJlcXVpcmUoJy4vc3JjL3VybC1idWlsZGVyLmNsYXNzJyksXG4gICAgVXRpbHMgICAgICAgICAgIDogcmVxdWlyZSgnLi9zcmMvdXRpbHMuY2xhc3MnKVxuICB9O1xuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KShQcm9taXNlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTREs7IiwiLyoqXG4gKiBSZWZlcmVuY2UgcG9pbnQgZm9yIGFsbCBvZiB0aGUgc2RrIG1vZHVsZXMgdG8gZmluZCBjb21tb25cbiAqIHNldHRpbmdzLCBzdWNoIGFzIHdoYXQgcHJvbWlzZSB0byB1c2VcbiAqIEBzaW5nbGV0b25cbiAqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLlNldHRpbmdzXG4gKi9cbmxldCBzZXR0aW5ncyA9IHtcbiAgX3AgOiBQcm9taXNlLFxuICBzZXRQcm9taXNlTGliIDogZnVuY3Rpb24ocCkge1xuICAgIHRoaXMuX3AgPSBwO1xuICB9LFxuICBnZXRQcm9taXNlIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3A7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dGluZ3M7IiwiY29uc3QgRW5kcG9pbnRDb25maWcgPSByZXF1aXJlKCcuL2VuZHBvaW50LWNvbmZpZy5jbGFzcy5qcycpO1xuY29uc3QgRW5kcG9pbnQgPSByZXF1aXJlKCcuL2VuZHBvaW50LmNsYXNzLmpzJyk7XG5jb25zdCBDYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUuY2xhc3MnKTtcbmNvbnN0IGNsb25lID0gcmVxdWlyZSgnLi91dGlscy5jbGFzcycpLmNsb25lO1xuXG4vKipcbiAqIERlZmluZXMgdGhlIGJhc2UgY29uZmlndXJhdGlvbiBmb3IgYW4gQVBJXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgQVBJQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb25maWcgPSB7IGhlYWRlcnMgOiB7fSwgdXJsIDogJycgfTtcbiAgICB0aGlzLmVuZHBvaW50cyA9IHt9O1xuICAgIHRoaXMuY2FjaGUgPSBuZXcgQ2FjaGUoKTtcbiAgfVxuICAvKipcbiAgICogR2V0cyAvIFNldHMgYmFzZSBhcGkgdXJsXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gdXJsIC0gQmFzZSB1cmwgdGhhdCB0aGlzIGVuZHBvaW50IHRhbGtzIHRvXG4gICAqIEByZXR1cm5zIHsodGhpc3xzdHJpbmcpfVxuICAgKi9cbiAgYmFzZVVybCh1cmwpIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB1cmwpIHtcbiAgICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHVybCkge1xuICAgICAgICB0aGlzLmNvbmZpZy51cmwgPSB1cmw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnVybDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBlbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW5kcG9pbnROYW1lIC0gVGhlIG5hbWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZ2V0IHRoaXMgZW5kcG9pbnRcbiAgICogQHJldHVybnMge0BsaW5rIEVuZHBvaW50fSBBbiBpbnN0YW5jZSBvZiBFbmRwb2ludFxuICAgKi9cbiAgZW5kcG9pbnQoZW5kcG9pbnROYW1lID0gJ19fZGVmYXVsdF9fJykge1xuICAgIGxldCBjb25maWcgPSBuZXcgRW5kcG9pbnRDb25maWcoKS5hcGkodGhpcyk7XG4gICAgdGhpc1sgZW5kcG9pbnROYW1lIF0gPSBuZXcgRW5kcG9pbnQoY29uZmlnKTtcbiAgICByZXR1cm4gdGhpc1sgZW5kcG9pbnROYW1lIF07XG4gIH1cbiAgLyoqXG4gICAqIFNldHMgaGVhZGVycyB0aGF0IGFsbCBjYWxscyB3aWxsIHVzZS4gSGVscGZ1bCBmb3IgYXV0aGVudGljYXRpb25cbiAgICogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzIC0gS2V5IC8gdmFsdWUgcGFpcnMgb2YgaGVhZGVyc1xuICAgKiBAcmV0dXJucyB7dGhpcyB8IG9iamVjdH1cbiAgICovXG4gIGNvbW1vbkhlYWRlcnMoaGVhZGVycykge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGhlYWRlcnMpIHtcbiAgICAgIHRoaXMuY29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjbG9uZSh0aGlzLmNvbmZpZy5oZWFkZXJzKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBUElDb25maWc7IiwiY29uc3QgTW9kZWwgPSByZXF1aXJlKCcuL21vZGVsLmNsYXNzJyk7XG5jb25zdCBjbG9uZSA9IHJlcXVpcmUoJy4vdXRpbHMuY2xhc3MnKS5jbG9uZTtcbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIEVuZHBvaW50Q29uZmlnIHtcbiAgY29uc3RydWN0b3IoY29uZmlnID0ge30pIHtcbiAgICB0aGlzLmNvbmZpZyA9IHsgYXBpIDoge319O1xuXG4gICAgbGV0IGRlZmF1bHRzID0ge1xuICAgICAgJ3VybCcgOiAnLycsXG4gICAgICAncmVzcG9uc2VUeXBlJyA6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgJ2luc3RhbnRpYXRvcicgOiBNb2RlbFxuICAgIH07XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgZGVmYXVsdHMsIGNsb25lKGNvbmZpZykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgb3Igc2V0cyB0aGUgZXhwZWN0ZWQgbWVkaWEgcmV0dXJuIHR5cGUuIFVsdGltYXRlbHksIGl0IGlzIHVwIHRvIHRoZSB0cmFuc3BvcnRcbiAgICogdG8gdXNlIHRoaXMgc2V0dGluZyB0byBjb3JyZWN0bHkgdGFsayB0byB0aGUgYXBpXG4gICAqIE5vdGUgLSBUaGlzIGlzIGN1cnJlbnRseSB1bnVzZWRcbiAgICogQHBhcmFtIHtzdHJpbmc9fSBuZXdUeXBlIC0gVGhlIG5ldyBtZWRpYSB0eXBlIHRoYXQgdGhpcyBlbmRwb2ludCBjb21tdW5pY2F0ZXMgd2l0aFxuICAgKi9cbiAgbWVkaWFUeXBlKG5ld1R5cGUpIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBuZXdUeXBlKSB7XG4gICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBuZXdUeXBlKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnJlc3BvbnNlVHlwZSA9IG5ld1R5cGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIC8gc2V0cyB0aGUgQVBJIGNvbmZpZ3VyYXRpb24gb2JqZWN0LiBUaGlzIGlzIG5lZWRlZCBzbyBlYWNoXG4gICAqIGVuZHBvaW50IGNhbiBzaGFyZSBjb21tb24gc2V0dGluZ3NcbiAgICogQHBhcmFtIHtBUElDb25maWd9IGNvbmZpZyAtIFRoZSBwYXJlbnQgYXBpIGNvbmZpZ3VyYXRpb24gXG4gICAqIEByZXR1cm5zIHsodGhpcyB8IG9iamVjdCl9XG4gICAqL1xuICBhcGkoY29uZmlnKSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBjb25maWcgJiYgY29uZmlnICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmFwaSA9IGNsb25lKGNvbmZpZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmFwaTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBiYXNlIHVybCBmcm9tIHRoZSB1bmRlcmx5aW5nIGFwaSBjb25maWd1cmF0aW9uIFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBDdXJyZW50IHJvb3QgdXJsXG4gICAqL1xuICBiYXNlVXJsKCkge1xuICAgIGlmICghdGhpcy5jb25maWcuYXBpIHx8ICF0aGlzLmNvbmZpZy5hcGkuYmFzZVVybCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuYXBpLmJhc2VVcmwoKTtcbiAgfVxuICAvKipcbiAgICogR2V0cyAvIHNldHMgdGhlIGVuZHBvaW50J3MgcmVsYXRpdmUgdXJsXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gbmV3VXJsIC0gVXJsIHRvIHVzZSBmb3IgdGhpcyBlbmRwb2ludFxuICAgKiBAcmV0dXJucyB7KHRoaXMgfCBzdHJpbmcpfSBUaGlzIGluc3RhbmNlIG9yIHRoZSBjdXJyZW50IHVybFxuICAgKi9cbiAgdXJsKG5ld1VybCkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5ld1VybCkge1xuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgbmV3VXJsKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnVybCA9IG5ld1VybDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcudXJsO1xuICB9XG4gIC8qKlxuICAgKiBHZXRzIC8gc2V0cyB0aGUgaW5zdGFudGlhdG9yIGZ1bmN0aW9uIHRvIHVzZSB3aGVuIGNyZWF0aW5nIGEgbmV3IG1vZGVsLiBcbiAgICogQHBhcmFtIHsoZnVuY3Rpb258Y2xhc3MpPX0gaW5zdGFudGlhdG9yIC0gdGhlIGZ1bmN0aW9uIG9yIGNsYXNzIHRvIHVzZSBmb3IgaW5zdGFudGlhdGlvblxuICAgKiBAcmV0dXJucyB7KHRoaXN8ZnVuY3Rpb24pfSBUaGlzIGluc3RhbmNlIG9yIHRoZSBjdXJyZW50IGluc2FudGlhdGlvbiBmdW5jdGlvbiBcbiAgICovXG4gIG1vZGVsKG5ld0ZuKSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmV3Rm4pIHtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgbmV3Rm4pIHtcbiAgICAgICAgdGhpcy5jb25maWcuaW5zdGFudGlhdG9yID0gbmV3Rm47XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmluc3RhbnRpYXRvcjtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW5kcG9pbnRDb25maWc7IiwiY29uc3QganNvbnBhdGNoID0gcmVxdWlyZSgnZmFzdC1qc29uLXBhdGNoJyk7XG5jb25zdCBjbG9uZSA9IHJlcXVpcmUoJy4vdXRpbHMuY2xhc3MnKS5jbG9uZTtcbmNvbnN0IG5vb3AgPSByZXF1aXJlKCcuL3V0aWxzLmNsYXNzJykubm9vcDtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QuY2xhc3MnKTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgTW9kZWwge1xuICBjb25zdHJ1Y3RvcihkYXRhID0ge30pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19fY29uZmlnJywge2VudW1lcmFibGUgOiBmYWxzZSwgd3JpdGFibGUgOiB0cnVlfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfX3Jlc3BvbnNlJywge2VudW1lcmFibGUgOiBmYWxzZSwgd3JpdGFibGUgOiB0cnVlfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfX29yaWdpbmFsJywge3ZhbHVlIDoganNvbnBhdGNoLmRlZXBDbG9uZShkYXRhKSwgd3JpdGFibGUgOiB0cnVlfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfX3JldmlzaW9uJywge3ZhbHVlIDogRGF0ZS5ub3coKSwgd3JpdGFibGUgOiB0cnVlfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNsb25lKGRhdGEpKTtcbiAgfVxuICAvKipcbiAgICogUGVyc2lzdHMgdGhpcyBtb2RlbCBiYWNrIHRvIHRoZSBhcGlcbiAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNiIC0gQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGNvbXBsZXRpb24gKGZhaWx1cmUgb3Igc3VjY2VzcylcbiAgICogQHJldHVybnMge1JlcXVlc3R9XG4gICAqL1xuICBzYXZlKGNiID0gbm9vcCkge1xuICAgIGxldCBoZWFkZXJzID0ge307XG4gICAgdHJ5IHtcbiAgICAgIGhlYWRlcnMgPSB0aGlzLl9fY29uZmlnLmFwaSgpLmNvbW1vbkhlYWRlcnMoKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIC8vaWdub3JlXG4gICAgfVxuXG4gICAgbGV0IG1ldGhvZCA9IHRoaXMuX2lkID8gJ3B1dCcgOiAncG9zdCc7XG4gICAgbGV0IGluc3RhbmNlID0gdGhpcztcblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxuICAgICAgLnVybCh0aGlzLm1ha2VIcmVmKCkpXG4gICAgICAubWV0aG9kKG1ldGhvZClcbiAgICAgIC5oZWFkZXJzKGhlYWRlcnMpXG4gICAgICAuYm9keSh0aGlzKVxuICAgICAgLmV4ZWMoKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oaW5zdGFuY2UsIGNsb25lKHJlc3BvbnNlLmRhdGEpKTtcbiAgICAgICAgaW5zdGFuY2UuX19yZXZpc2lvbiA9IERhdGUubm93KCk7XG4gICAgICAgIGluc3RhbmNlLl9fcmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgaW5zdGFuY2UubWFrZUNsZWFuKCk7XG4gICAgICAgIGNiKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNiKGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgY2hhbmdlcyB0aGF0IGhhdmUgb2NjdXJlZCBzaW5jZSB0aGUgbGFzdCBnZXQvc2F2ZVxuICAgKiBAcmV0dXJucyB7UmVxdWVzdH1cbiAgICovXG4gIGNoYW5nZXMoKSB7XG4gICAgbGV0IGhlYWRlcnMgPSB0aGlzLl9fY29uZmlnLmFwaSgpLmNvbW1vbkhlYWRlcnMoKTtcbiAgICBsZXQgdGFyZ2V0VXJsID0gdGhpc1snQGNoYW5nZXMnXTtcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcbiAgICAgIC51cmwodGFyZ2V0VXJsKVxuICAgICAgLnF1ZXJ5KHtzZWFyY2ggOiB7c2luY2UgOiB0aGlzLl9fcmV2aXNpb259fSlcbiAgICAgIC5tZXRob2QoJ2dldCcpXG4gICAgICAuaGVhZGVycyhoZWFkZXJzKVxuICAgICAgLmV4ZWMoKTtcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIGZvciBjaGFuZ2VzIGFuZCBjYWxscyBvbkNoYW5nZSB3aGVuZXZlciB0aGV5IGFyZSBkZXRlY3RlZFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbkNoYW5nZSAtIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBjaGFuZ2VzIGRldGVjdGVkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZWZyZXNoUmF0ZSAtIHRoZSBkdXJhdGlvbiAoaW4gbWlsbGlzZWNvbmRzKSBiZXR3ZWVuIGNoZWNrc1xuICAgKiBAcmV0dXJucyB7dGhpc31cbiAgICovXG4gIHN1YnNjcmliZShvbkNoYW5nZSwgdHRsID0gMzAwMCkge1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlcygpLnRoZW4oY2hhbmdlTGlzdCA9PiB7XG4gICAgICAgIGlmIChjaGFuZ2VMaXN0ICYmIGNoYW5nZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5fX3JldmlzaW9uID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICBvbkNoYW5nZShjaGFuZ2VMaXN0LCBEYXRlLm5vdygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSx0dGwpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUHV0cyBvbmx5IHRoZSBjaGFuZ2VzIChpbiBwYXRjaCBub3RhdGlvbikgYmFjayB0byB0aGUgYXBpLiBUaGVcbiAgICogc2VydmVyLXNpZGUgZW5kcG9pbnQgbXVzdCBzdXBwb3J0IFBBVENIXG4gICAqIEByZXR1cm5zIHtSZXF1ZXN0fVxuICAgKi9cbiAgdXBkYXRlKCkge1xuICAgIC8vdXNlIHBhdGNoXG4gICAgbGV0IGhlYWRlcnMgPSB0aGlzLl9fY29uZmlnLmFwaSgpLmNvbW1vbkhlYWRlcnMoKTtcblxuICAgIGxldCBwYXRjaGVzID0gdGhpcy5nZXREaWZmcygpO1xuICAgIGxldCB0YXJnZXRVcmwgPSB0aGlzLm1ha2VIcmVmKCk7XG4gICAgbGV0IGluc3RhbmNlID0gdGhpcztcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcbiAgICAgIC51cmwodGFyZ2V0VXJsKVxuICAgICAgLm1ldGhvZCgncGF0Y2gnKVxuICAgICAgLmhlYWRlcnMoaGVhZGVycylcbiAgICAgIC5ib2R5KHBhdGNoZXMpXG4gICAgICAuZXhlYygpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihpbnN0YW5jZSwgY2xvbmUocmVzcG9uc2UuZGF0YSkpO1xuICAgICAgICBpbnN0YW5jZS5fX3JldmlzaW9uID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaW5zdGFuY2UuX19yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICBpbnN0YW5jZS5tYWtlQ2xlYW4oKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHVuZGVybHlpbmcgQVBJIGNvbmZpZ1xuICAgKiBAcGFyYW0ge0VuZHBvaW50Q29uZmlnfSBlbmRwb2ludENvbmZpZ1xuICAgKi9cbiAgY29uZmlnKGVuZHBvaW50Q29uZmlnID0ge30pIHtcbiAgICB0aGlzLl9fY29uZmlnID0gZW5kcG9pbnRDb25maWc7XG4gIH1cblxuICBtYWtlSHJlZigpIHtcbiAgICBsZXQgY29ycmVjdEhyZWY7XG4gICAgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgdGhpcy5fX2NvbmZpZykge1xuICAgICAgY29ycmVjdEhyZWYgPSB0aGlzLl9fY29uZmlnLmJhc2VVcmwoKSArICcvJyArIHRoaXMuX19jb25maWcudXJsKCkgKyAnLyc7XG4gICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB0aGlzLl9pZCApIHtcbiAgICAgICAgY29ycmVjdEhyZWYgKz0gdGhpcy5faWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvcnJlY3RIcmVmID0gJy9fX3VuaXRfdGVzdF9fJztcbiAgICB9XG4gICAgcmV0dXJuIGNvcnJlY3RIcmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGRpZmZzIGNvbXBhcmluZyB0aGlzIHZlcnNpb24gdG8gdGhlIGxhc3RcbiAgICogc3luY2VkIHZlcnNpb24gZnJvbSB0aGUgc2VydmVyXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXX0gQXJyYXkgb2YgY2hhbmdlc1xuICAgKi9cbiAgZ2V0RGlmZnMoKSB7XG4gICAgcmV0dXJuIGpzb25wYXRjaC5jb21wYXJlKHRoaXMuX19vcmlnaW5hbCwgdGhpcyk7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoaXMgbW9kZWxcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0RpcnR5KCkge1xuICAgIHJldHVybiB0aGlzLmdldERpZmZzKCkubGVuZ3RoID4gMDtcbiAgfVxuICAvKipcbiAgICogQ2xlYXJzIG91dCB0aGUgY2hhbmdlIGhpc3RvcnkgYW5kIHN5bmNzIHRoZSB1bmRlcmx5aW5nIG9yaWdpbmFsIHZlcnNpb25cbiAgICogdG8gdGhlIGN1cnJlbnQgdmVyc2lvblxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKi9cbiAgbWFrZUNsZWFuKCkge1xuICAgIHRoaXMuX19vcmlnaW5hbCA9IGpzb25wYXRjaC5kZWVwQ2xvbmUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGlzIG1vZGFsIGZyb20gdGhlIGFwaVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gY2IgLSBGdW5jdGlvbiB0byBjYWxsIG9uIGNvbXBsZXRldGlvbiAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgKiBAcmV0dXJucyB7UmVxdWVzdH1cbiAgICovXG4gIHJlbW92ZShjYiA9IG5vb3ApIHtcbiAgICBsZXQgaGVhZGVycyA9IHt9O1xuICAgIHRyeSB7XG4gICAgICBoZWFkZXJzID0gdGhpcy5fX2NvbmZpZy5hcGkoKS5jb21tb25IZWFkZXJzKCk7XG4gICAgfSBjYXRjaChlKSB7fVxuXG4gICAgbGV0IHRhcmdldFVybCA9IHRoaXMubWFrZUhyZWYoKTtcbiAgICBsZXQgaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXG4gICAgICAudXJsKHRhcmdldFVybClcbiAgICAgIC5tZXRob2QoJ2RlbGV0ZScpXG4gICAgICAuaGVhZGVycyhoZWFkZXJzKVxuICAgICAgLmV4ZWMoKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGluc3RhbmNlLl9fcmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgcmV0dXJuIGNiKCk7XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjYihlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9KTtcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWw7IiwidmFyIGVxdWFsc09wdGlvbnMgPSB7IHN0cmljdDogdHJ1ZSB9O1xyXG52YXIgX2VxdWFscyA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcclxudmFyIGFyZUVxdWFscyA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICByZXR1cm4gX2VxdWFscyhhLCBiLCBlcXVhbHNPcHRpb25zKTtcclxufTtcclxudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xyXG52YXIgY29yZV8xID0gcmVxdWlyZSgnLi9jb3JlJyk7XHJcbi8qIGV4cG9ydCBhbGwgY29yZSBmdW5jdGlvbnMgKi9cclxudmFyIGNvcmVfMiA9IHJlcXVpcmUoJy4vY29yZScpO1xyXG5leHBvcnRzLmFwcGx5T3BlcmF0aW9uID0gY29yZV8yLmFwcGx5T3BlcmF0aW9uO1xyXG5leHBvcnRzLmFwcGx5UGF0Y2ggPSBjb3JlXzIuYXBwbHlQYXRjaDtcclxuZXhwb3J0cy5hcHBseVJlZHVjZXIgPSBjb3JlXzIuYXBwbHlSZWR1Y2VyO1xyXG5leHBvcnRzLmdldFZhbHVlQnlQb2ludGVyID0gY29yZV8yLmdldFZhbHVlQnlQb2ludGVyO1xyXG5leHBvcnRzLnZhbGlkYXRlID0gY29yZV8yLnZhbGlkYXRlO1xyXG5leHBvcnRzLnZhbGlkYXRvciA9IGNvcmVfMi52YWxpZGF0b3I7XHJcbi8qIGV4cG9ydCBzb21lIGhlbHBlcnMgKi9cclxudmFyIGhlbHBlcnNfMiA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xyXG5leHBvcnRzLkpzb25QYXRjaEVycm9yID0gaGVscGVyc18yLlBhdGNoRXJyb3I7XHJcbmV4cG9ydHMuZGVlcENsb25lID0gaGVscGVyc18yLl9kZWVwQ2xvbmU7XHJcbmV4cG9ydHMuZXNjYXBlUGF0aENvbXBvbmVudCA9IGhlbHBlcnNfMi5lc2NhcGVQYXRoQ29tcG9uZW50O1xyXG5leHBvcnRzLnVuZXNjYXBlUGF0aENvbXBvbmVudCA9IGhlbHBlcnNfMi51bmVzY2FwZVBhdGhDb21wb25lbnQ7XHJcbnZhciBiZWZvcmVEaWN0ID0gW107XHJcbnZhciBNaXJyb3IgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTWlycm9yKG9iaikge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5vYmogPSBvYmo7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWlycm9yO1xyXG59KCkpO1xyXG52YXIgT2JzZXJ2ZXJJbmZvID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9ic2VydmVySW5mbyhjYWxsYmFjaywgb2JzZXJ2ZXIpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE9ic2VydmVySW5mbztcclxufSgpKTtcclxuZnVuY3Rpb24gZ2V0TWlycm9yKG9iaikge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGJlZm9yZURpY3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmVmb3JlRGljdFtpXS5vYmogPT09IG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gYmVmb3JlRGljdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJGcm9tTWlycm9yKG1pcnJvciwgY2FsbGJhY2spIHtcclxuICAgIGZvciAodmFyIGogPSAwLCBsZW5ndGggPSBtaXJyb3Iub2JzZXJ2ZXJzLmxlbmd0aDsgaiA8IGxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYgKG1pcnJvci5vYnNlcnZlcnNbal0uY2FsbGJhY2sgPT09IGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaXJyb3Iub2JzZXJ2ZXJzW2pdLm9ic2VydmVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZW1vdmVPYnNlcnZlckZyb21NaXJyb3IobWlycm9yLCBvYnNlcnZlcikge1xyXG4gICAgZm9yICh2YXIgaiA9IDAsIGxlbmd0aCA9IG1pcnJvci5vYnNlcnZlcnMubGVuZ3RoOyBqIDwgbGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAobWlycm9yLm9ic2VydmVyc1tqXS5vYnNlcnZlciA9PT0gb2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgbWlycm9yLm9ic2VydmVycy5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIERldGFjaCBhbiBvYnNlcnZlciBmcm9tIGFuIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gdW5vYnNlcnZlKHJvb3QsIG9ic2VydmVyKSB7XHJcbiAgICBvYnNlcnZlci51bm9ic2VydmUoKTtcclxufVxyXG5leHBvcnRzLnVub2JzZXJ2ZSA9IHVub2JzZXJ2ZTtcclxuLyoqXHJcbiAqIE9ic2VydmVzIGNoYW5nZXMgbWFkZSB0byBhbiBvYmplY3QsIHdoaWNoIGNhbiB0aGVuIGJlIHJldHJpZXZlZCB1c2luZyBnZW5lcmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gb2JzZXJ2ZShvYmosIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgcGF0Y2hlcyA9IFtdO1xyXG4gICAgdmFyIHJvb3QgPSBvYmo7XHJcbiAgICB2YXIgb2JzZXJ2ZXI7XHJcbiAgICB2YXIgbWlycm9yID0gZ2V0TWlycm9yKG9iaik7XHJcbiAgICBpZiAoIW1pcnJvcikge1xyXG4gICAgICAgIG1pcnJvciA9IG5ldyBNaXJyb3Iob2JqKTtcclxuICAgICAgICBiZWZvcmVEaWN0LnB1c2gobWlycm9yKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9ic2VydmVyID0gZ2V0T2JzZXJ2ZXJGcm9tTWlycm9yKG1pcnJvciwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgaWYgKG9ic2VydmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgb2JzZXJ2ZXIgPSB7fTtcclxuICAgIG1pcnJvci52YWx1ZSA9IGhlbHBlcnNfMS5fZGVlcENsb25lKG9iaik7XHJcbiAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICBvYnNlcnZlci5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQgPSBudWxsO1xyXG4gICAgICAgIHZhciBkaXJ0eUNoZWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZShvYnNlcnZlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgZmFzdENoZWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQob2JzZXJ2ZXIubmV4dCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQgPSBzZXRUaW1lb3V0KGRpcnR5Q2hlY2spO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmYXN0Q2hlY2spO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmYXN0Q2hlY2spO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmYXN0Q2hlY2spO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZhc3RDaGVjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoRXZlbnQoJ29ubW91c2V1cCcsIGZhc3RDaGVjayk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoRXZlbnQoJ29ua2V5dXAnLCBmYXN0Q2hlY2spO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmF0dGFjaEV2ZW50KCdvbm1vdXNlZG93bicsIGZhc3RDaGVjayk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoRXZlbnQoJ29ua2V5ZG93bicsIGZhc3RDaGVjayk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uY2hhbmdlJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9ic2VydmVyLnBhdGNoZXMgPSBwYXRjaGVzO1xyXG4gICAgb2JzZXJ2ZXIub2JqZWN0ID0gb2JqO1xyXG4gICAgb2JzZXJ2ZXIudW5vYnNlcnZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdlbmVyYXRlKG9ic2VydmVyKTtcclxuICAgICAgICBjbGVhclRpbWVvdXQob2JzZXJ2ZXIubmV4dCk7XHJcbiAgICAgICAgcmVtb3ZlT2JzZXJ2ZXJGcm9tTWlycm9yKG1pcnJvciwgb2JzZXJ2ZXIpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZhc3RDaGVjayk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kZXRhY2hFdmVudCgnb25tb3VzZXVwJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kZXRhY2hFdmVudCgnb25rZXl1cCcsIGZhc3RDaGVjayk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGV0YWNoRXZlbnQoJ29ubW91c2Vkb3duJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kZXRhY2hFdmVudCgnb25rZXlkb3duJywgZmFzdENoZWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBtaXJyb3Iub2JzZXJ2ZXJzLnB1c2gobmV3IE9ic2VydmVySW5mbyhjYWxsYmFjaywgb2JzZXJ2ZXIpKTtcclxuICAgIHJldHVybiBvYnNlcnZlcjtcclxufVxyXG5leHBvcnRzLm9ic2VydmUgPSBvYnNlcnZlO1xyXG4vKipcclxuICogR2VuZXJhdGUgYW4gYXJyYXkgb2YgcGF0Y2hlcyBmcm9tIGFuIG9ic2VydmVyXHJcbiAqL1xyXG5mdW5jdGlvbiBnZW5lcmF0ZShvYnNlcnZlcikge1xyXG4gICAgdmFyIG1pcnJvcjtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBiZWZvcmVEaWN0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGJlZm9yZURpY3RbaV0ub2JqID09PSBvYnNlcnZlci5vYmplY3QpIHtcclxuICAgICAgICAgICAgbWlycm9yID0gYmVmb3JlRGljdFtpXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX2dlbmVyYXRlKG1pcnJvci52YWx1ZSwgb2JzZXJ2ZXIub2JqZWN0LCBvYnNlcnZlci5wYXRjaGVzLCBcIlwiKTtcclxuICAgIGlmIChvYnNlcnZlci5wYXRjaGVzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvcmVfMS5hcHBseVBhdGNoKG1pcnJvci52YWx1ZSwgb2JzZXJ2ZXIucGF0Y2hlcyk7XHJcbiAgICB9XHJcbiAgICB2YXIgdGVtcCA9IG9ic2VydmVyLnBhdGNoZXM7XHJcbiAgICBpZiAodGVtcC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIucGF0Y2hlcyA9IFtdO1xyXG4gICAgICAgIGlmIChvYnNlcnZlci5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICBvYnNlcnZlci5jYWxsYmFjayh0ZW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVtcDtcclxufVxyXG5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XHJcbi8vIERpcnR5IGNoZWNrIGlmIG9iaiBpcyBkaWZmZXJlbnQgZnJvbSBtaXJyb3IsIGdlbmVyYXRlIHBhdGNoZXMgYW5kIHVwZGF0ZSBtaXJyb3JcclxuZnVuY3Rpb24gX2dlbmVyYXRlKG1pcnJvciwgb2JqLCBwYXRjaGVzLCBwYXRoKSB7XHJcbiAgICBpZiAob2JqID09PSBtaXJyb3IpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG9iai50b0pTT04gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIG9iaiA9IG9iai50b0pTT04oKTtcclxuICAgIH1cclxuICAgIHZhciBuZXdLZXlzID0gaGVscGVyc18xLl9vYmplY3RLZXlzKG9iaik7XHJcbiAgICB2YXIgb2xkS2V5cyA9IGhlbHBlcnNfMS5fb2JqZWN0S2V5cyhtaXJyb3IpO1xyXG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgIHZhciBkZWxldGVkID0gZmFsc2U7XHJcbiAgICAvL2lmIGV2ZXIgXCJtb3ZlXCIgb3BlcmF0aW9uIGlzIGltcGxlbWVudGVkIGhlcmUsIG1ha2Ugc3VyZSB0aGlzIHRlc3QgcnVucyBPSzogXCJzaG91bGQgbm90IGdlbmVyYXRlIHRoZSBzYW1lIHBhdGNoIHR3aWNlIChtb3ZlKVwiXHJcbiAgICBmb3IgKHZhciB0ID0gb2xkS2V5cy5sZW5ndGggLSAxOyB0ID49IDA7IHQtLSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBvbGRLZXlzW3RdO1xyXG4gICAgICAgIHZhciBvbGRWYWwgPSBtaXJyb3Jba2V5XTtcclxuICAgICAgICBpZiAoaGVscGVyc18xLmhhc093blByb3BlcnR5KG9iaiwga2V5KSAmJiAhKG9ialtrZXldID09PSB1bmRlZmluZWQgJiYgb2xkVmFsICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShvYmopID09PSBmYWxzZSkpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbCA9PSBcIm9iamVjdFwiICYmIG9sZFZhbCAhPSBudWxsICYmIHR5cGVvZiBuZXdWYWwgPT0gXCJvYmplY3RcIiAmJiBuZXdWYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgX2dlbmVyYXRlKG9sZFZhbCwgbmV3VmFsLCBwYXRjaGVzLCBwYXRoICsgXCIvXCIgKyBoZWxwZXJzXzEuZXNjYXBlUGF0aENvbXBvbmVudChrZXkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChvbGRWYWwgIT09IG5ld1ZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7IG9wOiBcInJlcGxhY2VcIiwgcGF0aDogcGF0aCArIFwiL1wiICsgaGVscGVyc18xLmVzY2FwZVBhdGhDb21wb25lbnQoa2V5KSwgdmFsdWU6IGhlbHBlcnNfMS5fZGVlcENsb25lKG5ld1ZhbCkgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7IG9wOiBcInJlbW92ZVwiLCBwYXRoOiBwYXRoICsgXCIvXCIgKyBoZWxwZXJzXzEuZXNjYXBlUGF0aENvbXBvbmVudChrZXkpIH0pO1xyXG4gICAgICAgICAgICBkZWxldGVkID0gdHJ1ZTsgLy8gcHJvcGVydHkgaGFzIGJlZW4gZGVsZXRlZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghZGVsZXRlZCAmJiBuZXdLZXlzLmxlbmd0aCA9PSBvbGRLZXlzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGZvciAodmFyIHQgPSAwOyB0IDwgbmV3S2V5cy5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBuZXdLZXlzW3RdO1xyXG4gICAgICAgIGlmICghaGVscGVyc18xLmhhc093blByb3BlcnR5KG1pcnJvciwga2V5KSAmJiBvYmpba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaCh7IG9wOiBcImFkZFwiLCBwYXRoOiBwYXRoICsgXCIvXCIgKyBoZWxwZXJzXzEuZXNjYXBlUGF0aENvbXBvbmVudChrZXkpLCB2YWx1ZTogaGVscGVyc18xLl9kZWVwQ2xvbmUob2JqW2tleV0pIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuICogQ3JlYXRlIGFuIGFycmF5IG9mIHBhdGNoZXMgZnJvbSB0aGUgZGlmZmVyZW5jZXMgaW4gdHdvIG9iamVjdHNcclxuICovXHJcbmZ1bmN0aW9uIGNvbXBhcmUodHJlZTEsIHRyZWUyKSB7XHJcbiAgICB2YXIgcGF0Y2hlcyA9IFtdO1xyXG4gICAgX2dlbmVyYXRlKHRyZWUxLCB0cmVlMiwgcGF0Y2hlcywgJycpO1xyXG4gICAgcmV0dXJuIHBhdGNoZXM7XHJcbn1cclxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZTtcclxuIiwidmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cy5qcycpO1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9saWIvaXNfYXJndW1lbnRzLmpzJyk7XG5cbnZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQgfHwgdHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0cy5zdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcbiAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgeC5jb3B5ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4LnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIHhbMF0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBvcHRzKSB7XG4gIHZhciBpLCBrZXk7XG4gIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvL35+fkkndmUgbWFuYWdlZCB0byBicmVhayBPYmplY3Qua2V5cyB0aHJvdWdoIHNjcmV3eSBhcmd1bWVudHMgcGFzc2luZy5cbiAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cbiAgaWYgKGlzQXJndW1lbnRzKGEpKSB7XG4gICAgaWYgKCFpc0FyZ3VtZW50cyhiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgb3B0cyk7XG4gIH1cbiAgaWYgKGlzQnVmZmVyKGEpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgICAga2IgPSBvYmplY3RLZXlzKGIpO1xuICB9IGNhdGNoIChlKSB7Ly9oYXBwZW5zIHdoZW4gb25lIGlzIGEgc3RyaW5nIGxpdGVyYWwgYW5kIHRoZSBvdGhlciBpc24ndFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBhID09PSB0eXBlb2YgYjtcbn1cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuICA/IE9iamVjdC5rZXlzIDogc2hpbTtcblxuZXhwb3J0cy5zaGltID0gc2hpbTtcbmZ1bmN0aW9uIHNoaW0gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG4iLCJ2YXIgc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50cylcbn0pKCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPyBzdXBwb3J0ZWQgOiB1bnN1cHBvcnRlZDtcblxuZXhwb3J0cy5zdXBwb3J0ZWQgPSBzdXBwb3J0ZWQ7XG5mdW5jdGlvbiBzdXBwb3J0ZWQob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbmV4cG9ydHMudW5zdXBwb3J0ZWQgPSB1bnN1cHBvcnRlZDtcbmZ1bmN0aW9uIHVuc3VwcG9ydGVkKG9iamVjdCl7XG4gIHJldHVybiBvYmplY3QgJiZcbiAgICB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmXG4gICAgdHlwZW9mIG9iamVjdC5sZW5ndGggPT0gJ251bWJlcicgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnY2FsbGVlJykgJiZcbiAgICAhT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpIHx8XG4gICAgZmFsc2U7XG59O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxuLyohXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9TdGFyY291bnRlci1KYWNrL0pTT04tUGF0Y2hcclxuICogKGMpIDIwMTcgSm9hY2hpbSBXZXN0ZXJcclxuICogTUlUIGxpY2Vuc2VcclxuICovXHJcbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIGtleSkge1xyXG4gICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcclxufVxyXG5leHBvcnRzLmhhc093blByb3BlcnR5ID0gaGFzT3duUHJvcGVydHk7XHJcbmZ1bmN0aW9uIF9vYmplY3RLZXlzKG9iaikge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgICAgIHZhciBrZXlzID0gbmV3IEFycmF5KG9iai5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwga2V5cy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICBrZXlzW2tdID0gXCJcIiArIGs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgfVxyXG4gICAgaWYgKE9iamVjdC5rZXlzKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICB9XHJcbiAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkob2JqLCBpKSkge1xyXG4gICAgICAgICAgICBrZXlzLnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGtleXM7XHJcbn1cclxuZXhwb3J0cy5fb2JqZWN0S2V5cyA9IF9vYmplY3RLZXlzO1xyXG47XHJcbi8qKlxyXG4qIERlZXBseSBjbG9uZSB0aGUgb2JqZWN0LlxyXG4qIGh0dHBzOi8vanNwZXJmLmNvbS9kZWVwLWNvcHktdnMtanNvbi1zdHJpbmdpZnktanNvbi1wYXJzZS8yNSAocmVjdXJzaXZlRGVlcENvcHkpXHJcbiogQHBhcmFtICB7YW55fSBvYmogdmFsdWUgdG8gY2xvbmVcclxuKiBAcmV0dXJuIHthbnl9IGNsb25lZCBvYmpcclxuKi9cclxuZnVuY3Rpb24gX2RlZXBDbG9uZShvYmopIHtcclxuICAgIHN3aXRjaCAodHlwZW9mIG9iaikge1xyXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7IC8vRmFzdGVyIHRoYW4gRVM1IGNsb25lIC0gaHR0cDovL2pzcGVyZi5jb20vZGVlcC1jbG9uaW5nLW9mLW9iamVjdHMvNVxyXG4gICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vdGhpcyBpcyBob3cgSlNPTi5zdHJpbmdpZnkgYmVoYXZlcyBmb3IgYXJyYXkgaXRlbXNcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gb2JqOyAvL25vIG5lZWQgdG8gY2xvbmUgcHJpbWl0aXZlc1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuX2RlZXBDbG9uZSA9IF9kZWVwQ2xvbmU7XHJcbi8vM3ggZmFzdGVyIHRoYW4gY2FjaGVkIC9eXFxkKyQvLnRlc3Qoc3RyKVxyXG5mdW5jdGlvbiBpc0ludGVnZXIoc3RyKSB7XHJcbiAgICB2YXIgaSA9IDA7XHJcbiAgICB2YXIgbGVuID0gc3RyLmxlbmd0aDtcclxuICAgIHZhciBjaGFyQ29kZTtcclxuICAgIHdoaWxlIChpIDwgbGVuKSB7XHJcbiAgICAgICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5pc0ludGVnZXIgPSBpc0ludGVnZXI7XHJcbi8qKlxyXG4qIEVzY2FwZXMgYSBqc29uIHBvaW50ZXIgcGF0aFxyXG4qIEBwYXJhbSBwYXRoIFRoZSByYXcgcG9pbnRlclxyXG4qIEByZXR1cm4gdGhlIEVzY2FwZWQgcGF0aFxyXG4qL1xyXG5mdW5jdGlvbiBlc2NhcGVQYXRoQ29tcG9uZW50KHBhdGgpIHtcclxuICAgIGlmIChwYXRoLmluZGV4T2YoJy8nKSA9PT0gLTEgJiYgcGF0aC5pbmRleE9mKCd+JykgPT09IC0xKVxyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvfi9nLCAnfjAnKS5yZXBsYWNlKC9cXC8vZywgJ34xJyk7XHJcbn1cclxuZXhwb3J0cy5lc2NhcGVQYXRoQ29tcG9uZW50ID0gZXNjYXBlUGF0aENvbXBvbmVudDtcclxuLyoqXHJcbiAqIFVuZXNjYXBlcyBhIGpzb24gcG9pbnRlciBwYXRoXHJcbiAqIEBwYXJhbSBwYXRoIFRoZSBlc2NhcGVkIHBvaW50ZXJcclxuICogQHJldHVybiBUaGUgdW5lc2NhcGVkIHBhdGhcclxuICovXHJcbmZ1bmN0aW9uIHVuZXNjYXBlUGF0aENvbXBvbmVudChwYXRoKSB7XHJcbiAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9+MS9nLCAnLycpLnJlcGxhY2UoL34wL2csICd+Jyk7XHJcbn1cclxuZXhwb3J0cy51bmVzY2FwZVBhdGhDb21wb25lbnQgPSB1bmVzY2FwZVBhdGhDb21wb25lbnQ7XHJcbmZ1bmN0aW9uIF9nZXRQYXRoUmVjdXJzaXZlKHJvb3QsIG9iaikge1xyXG4gICAgdmFyIGZvdW5kO1xyXG4gICAgZm9yICh2YXIga2V5IGluIHJvb3QpIHtcclxuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkocm9vdCwga2V5KSkge1xyXG4gICAgICAgICAgICBpZiAocm9vdFtrZXldID09PSBvYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlc2NhcGVQYXRoQ29tcG9uZW50KGtleSkgKyAnLyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJvb3Rba2V5XSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kID0gX2dldFBhdGhSZWN1cnNpdmUocm9vdFtrZXldLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVzY2FwZVBhdGhDb21wb25lbnQoa2V5KSArICcvJyArIGZvdW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG59XHJcbmV4cG9ydHMuX2dldFBhdGhSZWN1cnNpdmUgPSBfZ2V0UGF0aFJlY3Vyc2l2ZTtcclxuZnVuY3Rpb24gZ2V0UGF0aChyb290LCBvYmopIHtcclxuICAgIGlmIChyb290ID09PSBvYmopIHtcclxuICAgICAgICByZXR1cm4gJy8nO1xyXG4gICAgfVxyXG4gICAgdmFyIHBhdGggPSBfZ2V0UGF0aFJlY3Vyc2l2ZShyb290LCBvYmopO1xyXG4gICAgaWYgKHBhdGggPT09ICcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IG5vdCBmb3VuZCBpbiByb290XCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcvJyArIHBhdGg7XHJcbn1cclxuZXhwb3J0cy5nZXRQYXRoID0gZ2V0UGF0aDtcclxuLyoqXHJcbiogUmVjdXJzaXZlbHkgY2hlY2tzIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhbnkgdW5kZWZpbmVkIHZhbHVlcyBpbnNpZGUuXHJcbiovXHJcbmZ1bmN0aW9uIGhhc1VuZGVmaW5lZChvYmopIHtcclxuICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iaikge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1VuZGVmaW5lZChvYmpbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICB2YXIgb2JqS2V5cyA9IF9vYmplY3RLZXlzKG9iaik7XHJcbiAgICAgICAgICAgIHZhciBvYmpLZXlzTGVuZ3RoID0gb2JqS2V5cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5c0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzVW5kZWZpbmVkKG9ialtvYmpLZXlzW2ldXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnRzLmhhc1VuZGVmaW5lZCA9IGhhc1VuZGVmaW5lZDtcclxudmFyIFBhdGNoRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFBhdGNoRXJyb3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBQYXRjaEVycm9yKG1lc3NhZ2UsIG5hbWUsIGluZGV4LCBvcGVyYXRpb24sIHRyZWUpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMub3BlcmF0aW9uID0gb3BlcmF0aW9uO1xyXG4gICAgICAgIHRoaXMudHJlZSA9IHRyZWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUGF0Y2hFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnRzLlBhdGNoRXJyb3IgPSBQYXRjaEVycm9yO1xyXG4iLCJ2YXIgZXF1YWxzT3B0aW9ucyA9IHsgc3RyaWN0OiB0cnVlIH07XHJcbnZhciBfZXF1YWxzID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xyXG52YXIgYXJlRXF1YWxzID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIHJldHVybiBfZXF1YWxzKGEsIGIsIGVxdWFsc09wdGlvbnMpO1xyXG59O1xyXG52YXIgaGVscGVyc18xID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XHJcbmV4cG9ydHMuSnNvblBhdGNoRXJyb3IgPSBoZWxwZXJzXzEuUGF0Y2hFcnJvcjtcclxuZXhwb3J0cy5kZWVwQ2xvbmUgPSBoZWxwZXJzXzEuX2RlZXBDbG9uZTtcclxuLyogV2UgdXNlIGEgSmF2YXNjcmlwdCBoYXNoIHRvIHN0b3JlIGVhY2hcclxuIGZ1bmN0aW9uLiBFYWNoIGhhc2ggZW50cnkgKHByb3BlcnR5KSB1c2VzXHJcbiB0aGUgb3BlcmF0aW9uIGlkZW50aWZpZXJzIHNwZWNpZmllZCBpbiByZmM2OTAyLlxyXG4gSW4gdGhpcyB3YXksIHdlIGNhbiBtYXAgZWFjaCBwYXRjaCBvcGVyYXRpb25cclxuIHRvIGl0cyBkZWRpY2F0ZWQgZnVuY3Rpb24gaW4gZWZmaWNpZW50IHdheS5cclxuICovXHJcbi8qIFRoZSBvcGVyYXRpb25zIGFwcGxpY2FibGUgdG8gYW4gb2JqZWN0ICovXHJcbnZhciBvYmpPcHMgPSB7XHJcbiAgICBhZGQ6IGZ1bmN0aW9uIChvYmosIGtleSwgZG9jdW1lbnQpIHtcclxuICAgICAgICBvYmpba2V5XSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHsgbmV3RG9jdW1lbnQ6IGRvY3VtZW50IH07XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAob2JqLCBrZXksIGRvY3VtZW50KSB7XHJcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBvYmpba2V5XTtcclxuICAgICAgICBkZWxldGUgb2JqW2tleV07XHJcbiAgICAgICAgcmV0dXJuIHsgbmV3RG9jdW1lbnQ6IGRvY3VtZW50LCByZW1vdmVkOiByZW1vdmVkIH07XHJcbiAgICB9LFxyXG4gICAgcmVwbGFjZTogZnVuY3Rpb24gKG9iaiwga2V5LCBkb2N1bWVudCkge1xyXG4gICAgICAgIHZhciByZW1vdmVkID0gb2JqW2tleV07XHJcbiAgICAgICAgb2JqW2tleV0gPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiB7IG5ld0RvY3VtZW50OiBkb2N1bWVudCwgcmVtb3ZlZDogcmVtb3ZlZCB9O1xyXG4gICAgfSxcclxuICAgIG1vdmU6IGZ1bmN0aW9uIChvYmosIGtleSwgZG9jdW1lbnQpIHtcclxuICAgICAgICAvKiBpbiBjYXNlIG1vdmUgdGFyZ2V0IG92ZXJ3cml0ZXMgYW4gZXhpc3RpbmcgdmFsdWUsXHJcbiAgICAgICAgcmV0dXJuIHRoZSByZW1vdmVkIHZhbHVlLCB0aGlzIGNhbiBiZSB0YXhpbmcgcGVyZm9ybWFuY2Utd2lzZSxcclxuICAgICAgICBhbmQgaXMgcG90ZW50aWFsbHkgdW5uZWVkZWQgKi9cclxuICAgICAgICB2YXIgcmVtb3ZlZCA9IGdldFZhbHVlQnlQb2ludGVyKGRvY3VtZW50LCB0aGlzLnBhdGgpO1xyXG4gICAgICAgIGlmIChyZW1vdmVkKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZWQgPSBoZWxwZXJzXzEuX2RlZXBDbG9uZShyZW1vdmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsVmFsdWUgPSBhcHBseU9wZXJhdGlvbihkb2N1bWVudCwgeyBvcDogXCJyZW1vdmVcIiwgcGF0aDogdGhpcy5mcm9tIH0pLnJlbW92ZWQ7XHJcbiAgICAgICAgYXBwbHlPcGVyYXRpb24oZG9jdW1lbnQsIHsgb3A6IFwiYWRkXCIsIHBhdGg6IHRoaXMucGF0aCwgdmFsdWU6IG9yaWdpbmFsVmFsdWUgfSk7XHJcbiAgICAgICAgcmV0dXJuIHsgbmV3RG9jdW1lbnQ6IGRvY3VtZW50LCByZW1vdmVkOiByZW1vdmVkIH07XHJcbiAgICB9LFxyXG4gICAgY29weTogZnVuY3Rpb24gKG9iaiwga2V5LCBkb2N1bWVudCkge1xyXG4gICAgICAgIHZhciB2YWx1ZVRvQ29weSA9IGdldFZhbHVlQnlQb2ludGVyKGRvY3VtZW50LCB0aGlzLmZyb20pO1xyXG4gICAgICAgIC8vIGVuZm9yY2UgY29weSBieSB2YWx1ZSBzbyBmdXJ0aGVyIG9wZXJhdGlvbnMgZG9uJ3QgYWZmZWN0IHNvdXJjZSAoc2VlIGlzc3VlICMxNzcpXHJcbiAgICAgICAgYXBwbHlPcGVyYXRpb24oZG9jdW1lbnQsIHsgb3A6IFwiYWRkXCIsIHBhdGg6IHRoaXMucGF0aCwgdmFsdWU6IGhlbHBlcnNfMS5fZGVlcENsb25lKHZhbHVlVG9Db3B5KSB9KTtcclxuICAgICAgICByZXR1cm4geyBuZXdEb2N1bWVudDogZG9jdW1lbnQgfTtcclxuICAgIH0sXHJcbiAgICB0ZXN0OiBmdW5jdGlvbiAob2JqLCBrZXksIGRvY3VtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHsgbmV3RG9jdW1lbnQ6IGRvY3VtZW50LCB0ZXN0OiBhcmVFcXVhbHMob2JqW2tleV0sIHRoaXMudmFsdWUpIH07XHJcbiAgICB9LFxyXG4gICAgX2dldDogZnVuY3Rpb24gKG9iaiwga2V5LCBkb2N1bWVudCkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBvYmpba2V5XTtcclxuICAgICAgICByZXR1cm4geyBuZXdEb2N1bWVudDogZG9jdW1lbnQgfTtcclxuICAgIH1cclxufTtcclxuLyogVGhlIG9wZXJhdGlvbnMgYXBwbGljYWJsZSB0byBhbiBhcnJheS4gTWFueSBhcmUgdGhlIHNhbWUgYXMgZm9yIHRoZSBvYmplY3QgKi9cclxudmFyIGFyck9wcyA9IHtcclxuICAgIGFkZDogZnVuY3Rpb24gKGFyciwgaSwgZG9jdW1lbnQpIHtcclxuICAgICAgICBpZiAoaGVscGVyc18xLmlzSW50ZWdlcihpKSkge1xyXG4gICAgICAgICAgICBhcnIuc3BsaWNlKGksIDAsIHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXJyW2ldID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyBtYXkgYmUgbmVlZGVkIHdoZW4gdXNpbmcgJy0nIGluIGFuIGFycmF5XHJcbiAgICAgICAgcmV0dXJuIHsgbmV3RG9jdW1lbnQ6IGRvY3VtZW50LCBpbmRleDogaSB9O1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGFyciwgaSwgZG9jdW1lbnQpIHtcclxuICAgICAgICB2YXIgcmVtb3ZlZExpc3QgPSBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIHJldHVybiB7IG5ld0RvY3VtZW50OiBkb2N1bWVudCwgcmVtb3ZlZDogcmVtb3ZlZExpc3RbMF0gfTtcclxuICAgIH0sXHJcbiAgICByZXBsYWNlOiBmdW5jdGlvbiAoYXJyLCBpLCBkb2N1bWVudCkge1xyXG4gICAgICAgIHZhciByZW1vdmVkID0gYXJyW2ldO1xyXG4gICAgICAgIGFycltpXSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHsgbmV3RG9jdW1lbnQ6IGRvY3VtZW50LCByZW1vdmVkOiByZW1vdmVkIH07XHJcbiAgICB9LFxyXG4gICAgbW92ZTogb2JqT3BzLm1vdmUsXHJcbiAgICBjb3B5OiBvYmpPcHMuY29weSxcclxuICAgIHRlc3Q6IG9iak9wcy50ZXN0LFxyXG4gICAgX2dldDogb2JqT3BzLl9nZXRcclxufTtcclxuLyoqXHJcbiAqIFJldHJpZXZlcyBhIHZhbHVlIGZyb20gYSBKU09OIGRvY3VtZW50IGJ5IGEgSlNPTiBwb2ludGVyLlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIGRvY3VtZW50IFRoZSBkb2N1bWVudCB0byBnZXQgdGhlIHZhbHVlIGZyb21cclxuICogQHBhcmFtIHBvaW50ZXIgYW4gZXNjYXBlZCBKU09OIHBvaW50ZXJcclxuICogQHJldHVybiBUaGUgcmV0cmlldmVkIHZhbHVlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRWYWx1ZUJ5UG9pbnRlcihkb2N1bWVudCwgcG9pbnRlcikge1xyXG4gICAgaWYgKHBvaW50ZXIgPT0gJycpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XHJcbiAgICB9XHJcbiAgICB2YXIgZ2V0T3JpZ2luYWxEZXN0aW5hdGlvbiA9IHsgb3A6IFwiX2dldFwiLCBwYXRoOiBwb2ludGVyIH07XHJcbiAgICBhcHBseU9wZXJhdGlvbihkb2N1bWVudCwgZ2V0T3JpZ2luYWxEZXN0aW5hdGlvbik7XHJcbiAgICByZXR1cm4gZ2V0T3JpZ2luYWxEZXN0aW5hdGlvbi52YWx1ZTtcclxufVxyXG5leHBvcnRzLmdldFZhbHVlQnlQb2ludGVyID0gZ2V0VmFsdWVCeVBvaW50ZXI7XHJcbi8qKlxyXG4gKiBBcHBseSBhIHNpbmdsZSBKU09OIFBhdGNoIE9wZXJhdGlvbiBvbiBhIEpTT04gZG9jdW1lbnQuXHJcbiAqIFJldHVybnMgdGhlIHtuZXdEb2N1bWVudCwgcmVzdWx0fSBvZiB0aGUgb3BlcmF0aW9uLlxyXG4gKiBJdCBtb2RpZmllcyB0aGUgYGRvY3VtZW50YCBhbmQgYG9wZXJhdGlvbmAgb2JqZWN0cyAtIGl0IGdldHMgdGhlIHZhbHVlcyBieSByZWZlcmVuY2UuXHJcbiAqIElmIHlvdSB3b3VsZCBsaWtlIHRvIGF2b2lkIHRvdWNoaW5nIHlvdXIgdmFsdWVzLCBjbG9uZSB0aGVtOlxyXG4gKiBganNvbnBhdGNoLmFwcGx5T3BlcmF0aW9uKGRvY3VtZW50LCBqc29ucGF0Y2guX2RlZXBDbG9uZShvcGVyYXRpb24pKWAuXHJcbiAqXHJcbiAqIEBwYXJhbSBkb2N1bWVudCBUaGUgZG9jdW1lbnQgdG8gcGF0Y2hcclxuICogQHBhcmFtIG9wZXJhdGlvbiBUaGUgb3BlcmF0aW9uIHRvIGFwcGx5XHJcbiAqIEBwYXJhbSB2YWxpZGF0ZU9wZXJhdGlvbiBgZmFsc2VgIGlzIHdpdGhvdXQgdmFsaWRhdGlvbiwgYHRydWVgIHRvIHVzZSBkZWZhdWx0IGpzb25wYXRjaCdzIHZhbGlkYXRpb24sIG9yIHlvdSBjYW4gcGFzcyBhIGB2YWxpZGF0ZU9wZXJhdGlvbmAgY2FsbGJhY2sgdG8gYmUgdXNlZCBmb3IgdmFsaWRhdGlvbi5cclxuICogQHBhcmFtIG11dGF0ZURvY3VtZW50IFdoZXRoZXIgdG8gbXV0YXRlIHRoZSBvcmlnaW5hbCBkb2N1bWVudCBvciBjbG9uZSBpdCBiZWZvcmUgYXBwbHlpbmdcclxuICogQHJldHVybiBge25ld0RvY3VtZW50LCByZXN1bHR9YCBhZnRlciB0aGUgb3BlcmF0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiBhcHBseU9wZXJhdGlvbihkb2N1bWVudCwgb3BlcmF0aW9uLCB2YWxpZGF0ZU9wZXJhdGlvbiwgbXV0YXRlRG9jdW1lbnQpIHtcclxuICAgIGlmICh2YWxpZGF0ZU9wZXJhdGlvbiA9PT0gdm9pZCAwKSB7IHZhbGlkYXRlT3BlcmF0aW9uID0gZmFsc2U7IH1cclxuICAgIGlmIChtdXRhdGVEb2N1bWVudCA9PT0gdm9pZCAwKSB7IG11dGF0ZURvY3VtZW50ID0gdHJ1ZTsgfVxyXG4gICAgaWYgKHZhbGlkYXRlT3BlcmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0ZU9wZXJhdGlvbiA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlT3BlcmF0aW9uKG9wZXJhdGlvbiwgMCwgZG9jdW1lbnQsIG9wZXJhdGlvbi5wYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRvcihvcGVyYXRpb24sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIFJPT1QgT1BFUkFUSU9OUyAqL1xyXG4gICAgaWYgKG9wZXJhdGlvbi5wYXRoID09PSBcIlwiKSB7XHJcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0geyBuZXdEb2N1bWVudDogZG9jdW1lbnQgfTtcclxuICAgICAgICBpZiAob3BlcmF0aW9uLm9wID09PSAnYWRkJykge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZS5uZXdEb2N1bWVudCA9IG9wZXJhdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChvcGVyYXRpb24ub3AgPT09ICdyZXBsYWNlJykge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZS5uZXdEb2N1bWVudCA9IG9wZXJhdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWUucmVtb3ZlZCA9IGRvY3VtZW50OyAvL2RvY3VtZW50IHdlIHJlbW92ZWRcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChvcGVyYXRpb24ub3AgPT09ICdtb3ZlJyB8fCBvcGVyYXRpb24ub3AgPT09ICdjb3B5Jykge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZS5uZXdEb2N1bWVudCA9IGdldFZhbHVlQnlQb2ludGVyKGRvY3VtZW50LCBvcGVyYXRpb24uZnJvbSk7IC8vIGdldCB0aGUgdmFsdWUgYnkganNvbi1wb2ludGVyIGluIGBmcm9tYCBmaWVsZFxyXG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uLm9wID09PSAnbW92ZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLnJlbW92ZWQgPSBkb2N1bWVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbi5vcCA9PT0gJ3Rlc3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlLnRlc3QgPSBhcmVFcXVhbHMoZG9jdW1lbnQsIG9wZXJhdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS50ZXN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4cG9ydHMuSnNvblBhdGNoRXJyb3IoXCJUZXN0IG9wZXJhdGlvbiBmYWlsZWRcIiwgJ1RFU1RfT1BFUkFUSU9OX0ZBSUxFRCcsIDAsIG9wZXJhdGlvbiwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlLm5ld0RvY3VtZW50ID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAob3BlcmF0aW9uLm9wID09PSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgICByZXR1cm5WYWx1ZS5yZW1vdmVkID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgIHJldHVyblZhbHVlLm5ld0RvY3VtZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChvcGVyYXRpb24ub3AgPT09ICdfZ2V0Jykge1xyXG4gICAgICAgICAgICBvcGVyYXRpb24udmFsdWUgPSBkb2N1bWVudDtcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlT3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhwb3J0cy5Kc29uUGF0Y2hFcnJvcignT3BlcmF0aW9uIGBvcGAgcHJvcGVydHkgaXMgbm90IG9uZSBvZiBvcGVyYXRpb25zIGRlZmluZWQgaW4gUkZDLTY5MDInLCAnT1BFUkFUSU9OX09QX0lOVkFMSUQnLCAwLCBvcGVyYXRpb24sIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gLyogRU5EIFJPT1QgT1BFUkFUSU9OUyAqL1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKCFtdXRhdGVEb2N1bWVudCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudCA9IGhlbHBlcnNfMS5fZGVlcENsb25lKGRvY3VtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBhdGggPSBvcGVyYXRpb24ucGF0aCB8fCBcIlwiO1xyXG4gICAgICAgIHZhciBrZXlzID0gcGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgIHZhciBvYmogPSBkb2N1bWVudDtcclxuICAgICAgICB2YXIgdCA9IDE7IC8vc2tpcCBlbXB0eSBlbGVtZW50IC0gaHR0cDovL2pzcGVyZi5jb20vdG8tc2hpZnQtb3Itbm90LXRvLXNoaWZ0XHJcbiAgICAgICAgdmFyIGxlbiA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBleGlzdGluZ1BhdGhGcmFnbWVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB2YXIga2V5ID0gdm9pZCAwO1xyXG4gICAgICAgIHZhciB2YWxpZGF0ZUZ1bmN0aW9uID0gdm9pZCAwO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdGVPcGVyYXRpb24gPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZUZ1bmN0aW9uID0gdmFsaWRhdGVPcGVyYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YWxpZGF0ZUZ1bmN0aW9uID0gdmFsaWRhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBrZXkgPSBrZXlzW3RdO1xyXG4gICAgICAgICAgICBpZiAodmFsaWRhdGVPcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1BhdGhGcmFnbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdQYXRoRnJhZ21lbnQgPSBrZXlzLnNsaWNlKDAsIHQpLmpvaW4oJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodCA9PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nUGF0aEZyYWdtZW50ID0gb3BlcmF0aW9uLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1BhdGhGcmFnbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlRnVuY3Rpb24ob3BlcmF0aW9uLCAwLCBkb2N1bWVudCwgZXhpc3RpbmdQYXRoRnJhZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0Kys7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICctJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IG9iai5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGVPcGVyYXRpb24gJiYgIWhlbHBlcnNfMS5pc0ludGVnZXIoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhwb3J0cy5Kc29uUGF0Y2hFcnJvcihcIkV4cGVjdGVkIGFuIHVuc2lnbmVkIGJhc2UtMTAgaW50ZWdlciB2YWx1ZSwgbWFraW5nIHRoZSBuZXcgcmVmZXJlbmNlZCB2YWx1ZSB0aGUgYXJyYXkgZWxlbWVudCB3aXRoIHRoZSB6ZXJvLWJhc2VkIGluZGV4XCIsIFwiT1BFUkFUSU9OX1BBVEhfSUxMRUdBTF9BUlJBWV9JTkRFWFwiLCAwLCBvcGVyYXRpb24ucGF0aCwgb3BlcmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IC8vIG9ubHkgcGFyc2Uga2V5IHdoZW4gaXQncyBhbiBpbnRlZ2VyIGZvciBgYXJyLnByb3BgIHRvIHdvcmtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChoZWxwZXJzXzEuaXNJbnRlZ2VyKGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gfn5rZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHQgPj0gbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlT3BlcmF0aW9uICYmIG9wZXJhdGlvbi5vcCA9PT0gXCJhZGRcIiAmJiBrZXkgPiBvYmoubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKFwiVGhlIHNwZWNpZmllZCBpbmRleCBNVVNUIE5PVCBiZSBncmVhdGVyIHRoYW4gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgYXJyYXlcIiwgXCJPUEVSQVRJT05fVkFMVUVfT1VUX09GX0JPVU5EU1wiLCAwLCBvcGVyYXRpb24ucGF0aCwgb3BlcmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlID0gYXJyT3BzW29wZXJhdGlvbi5vcF0uY2FsbChvcGVyYXRpb24sIG9iaiwga2V5LCBkb2N1bWVudCk7IC8vIEFwcGx5IHBhdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLnRlc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKFwiVGVzdCBvcGVyYXRpb24gZmFpbGVkXCIsICdURVNUX09QRVJBVElPTl9GQUlMRUQnLCAwLCBvcGVyYXRpb24sIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSAmJiBrZXkuaW5kZXhPZignficpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gaGVscGVyc18xLnVuZXNjYXBlUGF0aENvbXBvbmVudChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHQgPj0gbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlID0gb2JqT3BzW29wZXJhdGlvbi5vcF0uY2FsbChvcGVyYXRpb24sIG9iaiwga2V5LCBkb2N1bWVudCk7IC8vIEFwcGx5IHBhdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLnRlc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKFwiVGVzdCBvcGVyYXRpb24gZmFpbGVkXCIsICdURVNUX09QRVJBVElPTl9GQUlMRUQnLCAwLCBvcGVyYXRpb24sIGRvY3VtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iaiA9IG9ialtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmFwcGx5T3BlcmF0aW9uID0gYXBwbHlPcGVyYXRpb247XHJcbi8qKlxyXG4gKiBBcHBseSBhIGZ1bGwgSlNPTiBQYXRjaCBhcnJheSBvbiBhIEpTT04gZG9jdW1lbnQuXHJcbiAqIFJldHVybnMgdGhlIHtuZXdEb2N1bWVudCwgcmVzdWx0fSBvZiB0aGUgcGF0Y2guXHJcbiAqIEl0IG1vZGlmaWVzIHRoZSBgZG9jdW1lbnRgIG9iamVjdCBhbmQgYHBhdGNoYCAtIGl0IGdldHMgdGhlIHZhbHVlcyBieSByZWZlcmVuY2UuXHJcbiAqIElmIHlvdSB3b3VsZCBsaWtlIHRvIGF2b2lkIHRvdWNoaW5nIHlvdXIgdmFsdWVzLCBjbG9uZSB0aGVtOlxyXG4gKiBganNvbnBhdGNoLmFwcGx5UGF0Y2goZG9jdW1lbnQsIGpzb25wYXRjaC5fZGVlcENsb25lKHBhdGNoKSlgLlxyXG4gKlxyXG4gKiBAcGFyYW0gZG9jdW1lbnQgVGhlIGRvY3VtZW50IHRvIHBhdGNoXHJcbiAqIEBwYXJhbSBwYXRjaCBUaGUgcGF0Y2ggdG8gYXBwbHlcclxuICogQHBhcmFtIHZhbGlkYXRlT3BlcmF0aW9uIGBmYWxzZWAgaXMgd2l0aG91dCB2YWxpZGF0aW9uLCBgdHJ1ZWAgdG8gdXNlIGRlZmF1bHQganNvbnBhdGNoJ3MgdmFsaWRhdGlvbiwgb3IgeW91IGNhbiBwYXNzIGEgYHZhbGlkYXRlT3BlcmF0aW9uYCBjYWxsYmFjayB0byBiZSB1c2VkIGZvciB2YWxpZGF0aW9uLlxyXG4gKiBAcmV0dXJuIEFuIGFycmF5IG9mIGB7bmV3RG9jdW1lbnQsIHJlc3VsdH1gIGFmdGVyIHRoZSBwYXRjaFxyXG4gKi9cclxuZnVuY3Rpb24gYXBwbHlQYXRjaChkb2N1bWVudCwgcGF0Y2gsIHZhbGlkYXRlT3BlcmF0aW9uKSB7XHJcbiAgICBpZiAodmFsaWRhdGVPcGVyYXRpb24pIHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGF0Y2gpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKCdQYXRjaCBzZXF1ZW5jZSBtdXN0IGJlIGFuIGFycmF5JywgJ1NFUVVFTkNFX05PVF9BTl9BUlJBWScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciByZXN1bHRzID0gbmV3IEFycmF5KHBhdGNoLmxlbmd0aCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoXzEgPSBwYXRjaC5sZW5ndGg7IGkgPCBsZW5ndGhfMTsgaSsrKSB7XHJcbiAgICAgICAgcmVzdWx0c1tpXSA9IGFwcGx5T3BlcmF0aW9uKGRvY3VtZW50LCBwYXRjaFtpXSwgdmFsaWRhdGVPcGVyYXRpb24pO1xyXG4gICAgICAgIGRvY3VtZW50ID0gcmVzdWx0c1tpXS5uZXdEb2N1bWVudDsgLy8gaW4gY2FzZSByb290IHdhcyByZXBsYWNlZFxyXG4gICAgfVxyXG4gICAgcmVzdWx0cy5uZXdEb2N1bWVudCA9IGRvY3VtZW50O1xyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbn1cclxuZXhwb3J0cy5hcHBseVBhdGNoID0gYXBwbHlQYXRjaDtcclxuLyoqXHJcbiAqIEFwcGx5IGEgc2luZ2xlIEpTT04gUGF0Y2ggT3BlcmF0aW9uIG9uIGEgSlNPTiBkb2N1bWVudC5cclxuICogUmV0dXJucyB0aGUgdXBkYXRlZCBkb2N1bWVudC5cclxuICogU3VpdGFibGUgYXMgYSByZWR1Y2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0gZG9jdW1lbnQgVGhlIGRvY3VtZW50IHRvIHBhdGNoXHJcbiAqIEBwYXJhbSBvcGVyYXRpb24gVGhlIG9wZXJhdGlvbiB0byBhcHBseVxyXG4gKiBAcmV0dXJuIFRoZSB1cGRhdGVkIGRvY3VtZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBhcHBseVJlZHVjZXIoZG9jdW1lbnQsIG9wZXJhdGlvbikge1xyXG4gICAgdmFyIG9wZXJhdGlvblJlc3VsdCA9IGFwcGx5T3BlcmF0aW9uKGRvY3VtZW50LCBvcGVyYXRpb24pO1xyXG4gICAgaWYgKG9wZXJhdGlvblJlc3VsdC50ZXN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKFwiVGVzdCBvcGVyYXRpb24gZmFpbGVkXCIsICdURVNUX09QRVJBVElPTl9GQUlMRUQnLCAwLCBvcGVyYXRpb24sIGRvY3VtZW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvcGVyYXRpb25SZXN1bHQubmV3RG9jdW1lbnQ7XHJcbn1cclxuZXhwb3J0cy5hcHBseVJlZHVjZXIgPSBhcHBseVJlZHVjZXI7XHJcbi8qKlxyXG4gKiBWYWxpZGF0ZXMgYSBzaW5nbGUgb3BlcmF0aW9uLiBDYWxsZWQgZnJvbSBganNvbnBhdGNoLnZhbGlkYXRlYC4gVGhyb3dzIGBKc29uUGF0Y2hFcnJvcmAgaW4gY2FzZSBvZiBhbiBlcnJvci5cclxuICogQHBhcmFtIHtvYmplY3R9IG9wZXJhdGlvbiAtIG9wZXJhdGlvbiBvYmplY3QgKHBhdGNoKVxyXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBpbmRleCBvZiBvcGVyYXRpb24gaW4gdGhlIHNlcXVlbmNlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbZG9jdW1lbnRdIC0gb2JqZWN0IHdoZXJlIHRoZSBvcGVyYXRpb24gaXMgc3VwcG9zZWQgdG8gYmUgYXBwbGllZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2V4aXN0aW5nUGF0aEZyYWdtZW50XSAtIGNvbWVzIGFsb25nIHdpdGggYGRvY3VtZW50YFxyXG4gKi9cclxuZnVuY3Rpb24gdmFsaWRhdG9yKG9wZXJhdGlvbiwgaW5kZXgsIGRvY3VtZW50LCBleGlzdGluZ1BhdGhGcmFnbWVudCkge1xyXG4gICAgaWYgKHR5cGVvZiBvcGVyYXRpb24gIT09ICdvYmplY3QnIHx8IG9wZXJhdGlvbiA9PT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KG9wZXJhdGlvbikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgZXhwb3J0cy5Kc29uUGF0Y2hFcnJvcignT3BlcmF0aW9uIGlzIG5vdCBhbiBvYmplY3QnLCAnT1BFUkFUSU9OX05PVF9BTl9PQkpFQ1QnLCBpbmRleCwgb3BlcmF0aW9uLCBkb2N1bWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghb2JqT3BzW29wZXJhdGlvbi5vcF0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgZXhwb3J0cy5Kc29uUGF0Y2hFcnJvcignT3BlcmF0aW9uIGBvcGAgcHJvcGVydHkgaXMgbm90IG9uZSBvZiBvcGVyYXRpb25zIGRlZmluZWQgaW4gUkZDLTY5MDInLCAnT1BFUkFUSU9OX09QX0lOVkFMSUQnLCBpbmRleCwgb3BlcmF0aW9uLCBkb2N1bWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2Ygb3BlcmF0aW9uLnBhdGggIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IGV4cG9ydHMuSnNvblBhdGNoRXJyb3IoJ09wZXJhdGlvbiBgcGF0aGAgcHJvcGVydHkgaXMgbm90IGEgc3RyaW5nJywgJ09QRVJBVElPTl9QQVRIX0lOVkFMSUQnLCBpbmRleCwgb3BlcmF0aW9uLCBkb2N1bWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChvcGVyYXRpb24ucGF0aC5pbmRleE9mKCcvJykgIT09IDAgJiYgb3BlcmF0aW9uLnBhdGgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIHBhdGhzIHRoYXQgYXJlbid0IGVtcHR5IHN0cmluZyBzaG91bGQgc3RhcnQgd2l0aCBcIi9cIlxyXG4gICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKCdPcGVyYXRpb24gYHBhdGhgIHByb3BlcnR5IG11c3Qgc3RhcnQgd2l0aCBcIi9cIicsICdPUEVSQVRJT05fUEFUSF9JTlZBTElEJywgaW5kZXgsIG9wZXJhdGlvbiwgZG9jdW1lbnQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKG9wZXJhdGlvbi5vcCA9PT0gJ21vdmUnIHx8IG9wZXJhdGlvbi5vcCA9PT0gJ2NvcHknKSAmJiB0eXBlb2Ygb3BlcmF0aW9uLmZyb20gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IGV4cG9ydHMuSnNvblBhdGNoRXJyb3IoJ09wZXJhdGlvbiBgZnJvbWAgcHJvcGVydHkgaXMgbm90IHByZXNlbnQgKGFwcGxpY2FibGUgaW4gYG1vdmVgIGFuZCBgY29weWAgb3BlcmF0aW9ucyknLCAnT1BFUkFUSU9OX0ZST01fUkVRVUlSRUQnLCBpbmRleCwgb3BlcmF0aW9uLCBkb2N1bWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgob3BlcmF0aW9uLm9wID09PSAnYWRkJyB8fCBvcGVyYXRpb24ub3AgPT09ICdyZXBsYWNlJyB8fCBvcGVyYXRpb24ub3AgPT09ICd0ZXN0JykgJiYgb3BlcmF0aW9uLnZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgZXhwb3J0cy5Kc29uUGF0Y2hFcnJvcignT3BlcmF0aW9uIGB2YWx1ZWAgcHJvcGVydHkgaXMgbm90IHByZXNlbnQgKGFwcGxpY2FibGUgaW4gYGFkZGAsIGByZXBsYWNlYCBhbmQgYHRlc3RgIG9wZXJhdGlvbnMpJywgJ09QRVJBVElPTl9WQUxVRV9SRVFVSVJFRCcsIGluZGV4LCBvcGVyYXRpb24sIGRvY3VtZW50KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKChvcGVyYXRpb24ub3AgPT09ICdhZGQnIHx8IG9wZXJhdGlvbi5vcCA9PT0gJ3JlcGxhY2UnIHx8IG9wZXJhdGlvbi5vcCA9PT0gJ3Rlc3QnKSAmJiBoZWxwZXJzXzEuaGFzVW5kZWZpbmVkKG9wZXJhdGlvbi52YWx1ZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgZXhwb3J0cy5Kc29uUGF0Y2hFcnJvcignT3BlcmF0aW9uIGB2YWx1ZWAgcHJvcGVydHkgaXMgbm90IHByZXNlbnQgKGFwcGxpY2FibGUgaW4gYGFkZGAsIGByZXBsYWNlYCBhbmQgYHRlc3RgIG9wZXJhdGlvbnMpJywgJ09QRVJBVElPTl9WQUxVRV9DQU5OT1RfQ09OVEFJTl9VTkRFRklORUQnLCBpbmRleCwgb3BlcmF0aW9uLCBkb2N1bWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChkb2N1bWVudCkge1xyXG4gICAgICAgIGlmIChvcGVyYXRpb24ub3AgPT0gXCJhZGRcIikge1xyXG4gICAgICAgICAgICB2YXIgcGF0aExlbiA9IG9wZXJhdGlvbi5wYXRoLnNwbGl0KFwiL1wiKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBleGlzdGluZ1BhdGhMZW4gPSBleGlzdGluZ1BhdGhGcmFnbWVudC5zcGxpdChcIi9cIikubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAocGF0aExlbiAhPT0gZXhpc3RpbmdQYXRoTGVuICsgMSAmJiBwYXRoTGVuICE9PSBleGlzdGluZ1BhdGhMZW4pIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKCdDYW5ub3QgcGVyZm9ybSBhbiBgYWRkYCBvcGVyYXRpb24gYXQgdGhlIGRlc2lyZWQgcGF0aCcsICdPUEVSQVRJT05fUEFUSF9DQU5OT1RfQUREJywgaW5kZXgsIG9wZXJhdGlvbiwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbi5vcCA9PT0gJ3JlcGxhY2UnIHx8IG9wZXJhdGlvbi5vcCA9PT0gJ3JlbW92ZScgfHwgb3BlcmF0aW9uLm9wID09PSAnX2dldCcpIHtcclxuICAgICAgICAgICAgaWYgKG9wZXJhdGlvbi5wYXRoICE9PSBleGlzdGluZ1BhdGhGcmFnbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4cG9ydHMuSnNvblBhdGNoRXJyb3IoJ0Nhbm5vdCBwZXJmb3JtIHRoZSBvcGVyYXRpb24gYXQgYSBwYXRoIHRoYXQgZG9lcyBub3QgZXhpc3QnLCAnT1BFUkFUSU9OX1BBVEhfVU5SRVNPTFZBQkxFJywgaW5kZXgsIG9wZXJhdGlvbiwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9wZXJhdGlvbi5vcCA9PT0gJ21vdmUnIHx8IG9wZXJhdGlvbi5vcCA9PT0gJ2NvcHknKSB7XHJcbiAgICAgICAgICAgIHZhciBleGlzdGluZ1ZhbHVlID0geyBvcDogXCJfZ2V0XCIsIHBhdGg6IG9wZXJhdGlvbi5mcm9tLCB2YWx1ZTogdW5kZWZpbmVkIH07XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHZhbGlkYXRlKFtleGlzdGluZ1ZhbHVlXSwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IubmFtZSA9PT0gJ09QRVJBVElPTl9QQVRIX1VOUkVTT0xWQUJMRScpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKCdDYW5ub3QgcGVyZm9ybSB0aGUgb3BlcmF0aW9uIGZyb20gYSBwYXRoIHRoYXQgZG9lcyBub3QgZXhpc3QnLCAnT1BFUkFUSU9OX0ZST01fVU5SRVNPTFZBQkxFJywgaW5kZXgsIG9wZXJhdGlvbiwgZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMudmFsaWRhdG9yID0gdmFsaWRhdG9yO1xyXG4vKipcclxuICogVmFsaWRhdGVzIGEgc2VxdWVuY2Ugb2Ygb3BlcmF0aW9ucy4gSWYgYGRvY3VtZW50YCBwYXJhbWV0ZXIgaXMgcHJvdmlkZWQsIHRoZSBzZXF1ZW5jZSBpcyBhZGRpdGlvbmFsbHkgdmFsaWRhdGVkIGFnYWluc3QgdGhlIG9iamVjdCBkb2N1bWVudC5cclxuICogSWYgZXJyb3IgaXMgZW5jb3VudGVyZWQsIHJldHVybnMgYSBKc29uUGF0Y2hFcnJvciBvYmplY3RcclxuICogQHBhcmFtIHNlcXVlbmNlXHJcbiAqIEBwYXJhbSBkb2N1bWVudFxyXG4gKiBAcmV0dXJucyB7SnNvblBhdGNoRXJyb3J8dW5kZWZpbmVkfVxyXG4gKi9cclxuZnVuY3Rpb24gdmFsaWRhdGUoc2VxdWVuY2UsIGRvY3VtZW50LCBleHRlcm5hbFZhbGlkYXRvcikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2VxdWVuY2UpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBleHBvcnRzLkpzb25QYXRjaEVycm9yKCdQYXRjaCBzZXF1ZW5jZSBtdXN0IGJlIGFuIGFycmF5JywgJ1NFUVVFTkNFX05PVF9BTl9BUlJBWScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgLy9jbG9uZSBkb2N1bWVudCBhbmQgc2VxdWVuY2Ugc28gdGhhdCB3ZSBjYW4gc2FmZWx5IHRyeSBhcHBseWluZyBvcGVyYXRpb25zXHJcbiAgICAgICAgICAgIGFwcGx5UGF0Y2goaGVscGVyc18xLl9kZWVwQ2xvbmUoZG9jdW1lbnQpLCBoZWxwZXJzXzEuX2RlZXBDbG9uZShzZXF1ZW5jZSksIGV4dGVybmFsVmFsaWRhdG9yIHx8IHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXh0ZXJuYWxWYWxpZGF0b3IgPSBleHRlcm5hbFZhbGlkYXRvciB8fCB2YWxpZGF0b3I7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VxdWVuY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGV4dGVybmFsVmFsaWRhdG9yKHNlcXVlbmNlW2ldLCBpLCBkb2N1bWVudCwgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBleHBvcnRzLkpzb25QYXRjaEVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy52YWxpZGF0ZSA9IHZhbGlkYXRlO1xyXG4iLCJ2YXIgY2xvbmVfbGliID0gcmVxdWlyZSgnY2xvbmUnKTtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgVXRpbHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERvZXMgbm90aGluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAgICAgKi9cbiAgICBzdGF0aWMgbm9vcCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgdGhlIHBhc3NlZCBpbiBvYmplY3RcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gT2JqZWN0IHRvIGNvcHlcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBDb3BpZWQgb2JqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGNsb25lKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAvLyByZXR1cm4gY2xvbmVfbGliKG9iaik7XG4gICAgICAgIC8vIHJldHVybiBwcml2YXRlQ2xvbmUob2JqKTtcbiAgICB9XG59XG4vKipcbiAqIEFsbG93cyBvdXIgc3RhdGljIG1ldGhvZCB0byBjYWxsIHRoaXMgcmVjdXJzaXZlbHlcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBDb3BpZWQgb2JqZWN0IFxuICovXG5mdW5jdGlvbiBwcml2YXRlQ2xvbmUob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Yob2JqKSAhPSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICB2YXIgdGVtcCA9IG5ldyBvYmouY29uc3RydWN0b3IoKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHRlbXBba2V5XSA9IHByaXZhdGVDbG9uZShvYmpba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0ZW1wO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxzOyIsInZhciBjbG9uZSA9IChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2luc3RhbmNlb2Yob2JqLCB0eXBlKSB7XG4gIHJldHVybiB0eXBlICE9IG51bGwgJiYgb2JqIGluc3RhbmNlb2YgdHlwZTtcbn1cblxudmFyIG5hdGl2ZU1hcDtcbnRyeSB7XG4gIG5hdGl2ZU1hcCA9IE1hcDtcbn0gY2F0Y2goXykge1xuICAvLyBtYXliZSBhIHJlZmVyZW5jZSBlcnJvciBiZWNhdXNlIG5vIGBNYXBgLiBHaXZlIGl0IGEgZHVtbXkgdmFsdWUgdGhhdCBub1xuICAvLyB2YWx1ZSB3aWxsIGV2ZXIgYmUgYW4gaW5zdGFuY2VvZi5cbiAgbmF0aXZlTWFwID0gZnVuY3Rpb24oKSB7fTtcbn1cblxudmFyIG5hdGl2ZVNldDtcbnRyeSB7XG4gIG5hdGl2ZVNldCA9IFNldDtcbn0gY2F0Y2goXykge1xuICBuYXRpdmVTZXQgPSBmdW5jdGlvbigpIHt9O1xufVxuXG52YXIgbmF0aXZlUHJvbWlzZTtcbnRyeSB7XG4gIG5hdGl2ZVByb21pc2UgPSBQcm9taXNlO1xufSBjYXRjaChfKSB7XG4gIG5hdGl2ZVByb21pc2UgPSBmdW5jdGlvbigpIHt9O1xufVxuXG4vKipcbiAqIENsb25lcyAoY29waWVzKSBhbiBPYmplY3QgdXNpbmcgZGVlcCBjb3B5aW5nLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gc3VwcG9ydHMgY2lyY3VsYXIgcmVmZXJlbmNlcyBieSBkZWZhdWx0LCBidXQgaWYgeW91IGFyZSBjZXJ0YWluXG4gKiB0aGVyZSBhcmUgbm8gY2lyY3VsYXIgcmVmZXJlbmNlcyBpbiB5b3VyIG9iamVjdCwgeW91IGNhbiBzYXZlIHNvbWUgQ1BVIHRpbWVcbiAqIGJ5IGNhbGxpbmcgY2xvbmUob2JqLCBmYWxzZSkuXG4gKlxuICogQ2F1dGlvbjogaWYgYGNpcmN1bGFyYCBpcyBmYWxzZSBhbmQgYHBhcmVudGAgY29udGFpbnMgY2lyY3VsYXIgcmVmZXJlbmNlcyxcbiAqIHlvdXIgcHJvZ3JhbSBtYXkgZW50ZXIgYW4gaW5maW5pdGUgbG9vcCBhbmQgY3Jhc2guXG4gKlxuICogQHBhcmFtIGBwYXJlbnRgIC0gdGhlIG9iamVjdCB0byBiZSBjbG9uZWRcbiAqIEBwYXJhbSBgY2lyY3VsYXJgIC0gc2V0IHRvIHRydWUgaWYgdGhlIG9iamVjdCB0byBiZSBjbG9uZWQgbWF5IGNvbnRhaW5cbiAqICAgIGNpcmN1bGFyIHJlZmVyZW5jZXMuIChvcHRpb25hbCAtIHRydWUgYnkgZGVmYXVsdClcbiAqIEBwYXJhbSBgZGVwdGhgIC0gc2V0IHRvIGEgbnVtYmVyIGlmIHRoZSBvYmplY3QgaXMgb25seSB0byBiZSBjbG9uZWQgdG9cbiAqICAgIGEgcGFydGljdWxhciBkZXB0aC4gKG9wdGlvbmFsIC0gZGVmYXVsdHMgdG8gSW5maW5pdHkpXG4gKiBAcGFyYW0gYHByb3RvdHlwZWAgLSBzZXRzIHRoZSBwcm90b3R5cGUgdG8gYmUgdXNlZCB3aGVuIGNsb25pbmcgYW4gb2JqZWN0LlxuICogICAgKG9wdGlvbmFsIC0gZGVmYXVsdHMgdG8gcGFyZW50IHByb3RvdHlwZSkuXG4gKiBAcGFyYW0gYGluY2x1ZGVOb25FbnVtZXJhYmxlYCAtIHNldCB0byB0cnVlIGlmIHRoZSBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG4gKiAgICBzaG91bGQgYmUgY2xvbmVkIGFzIHdlbGwuIE5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gdGhlIHByb3RvdHlwZVxuICogICAgY2hhaW4gd2lsbCBiZSBpZ25vcmVkLiAob3B0aW9uYWwgLSBmYWxzZSBieSBkZWZhdWx0KVxuKi9cbmZ1bmN0aW9uIGNsb25lKHBhcmVudCwgY2lyY3VsYXIsIGRlcHRoLCBwcm90b3R5cGUsIGluY2x1ZGVOb25FbnVtZXJhYmxlKSB7XG4gIGlmICh0eXBlb2YgY2lyY3VsYXIgPT09ICdvYmplY3QnKSB7XG4gICAgZGVwdGggPSBjaXJjdWxhci5kZXB0aDtcbiAgICBwcm90b3R5cGUgPSBjaXJjdWxhci5wcm90b3R5cGU7XG4gICAgaW5jbHVkZU5vbkVudW1lcmFibGUgPSBjaXJjdWxhci5pbmNsdWRlTm9uRW51bWVyYWJsZTtcbiAgICBjaXJjdWxhciA9IGNpcmN1bGFyLmNpcmN1bGFyO1xuICB9XG4gIC8vIG1haW50YWluIHR3byBhcnJheXMgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMsIHdoZXJlIGNvcnJlc3BvbmRpbmcgcGFyZW50c1xuICAvLyBhbmQgY2hpbGRyZW4gaGF2ZSB0aGUgc2FtZSBpbmRleFxuICB2YXIgYWxsUGFyZW50cyA9IFtdO1xuICB2YXIgYWxsQ2hpbGRyZW4gPSBbXTtcblxuICB2YXIgdXNlQnVmZmVyID0gdHlwZW9mIEJ1ZmZlciAhPSAndW5kZWZpbmVkJztcblxuICBpZiAodHlwZW9mIGNpcmN1bGFyID09ICd1bmRlZmluZWQnKVxuICAgIGNpcmN1bGFyID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGRlcHRoID09ICd1bmRlZmluZWQnKVxuICAgIGRlcHRoID0gSW5maW5pdHk7XG5cbiAgLy8gcmVjdXJzZSB0aGlzIGZ1bmN0aW9uIHNvIHdlIGRvbid0IHJlc2V0IGFsbFBhcmVudHMgYW5kIGFsbENoaWxkcmVuXG4gIGZ1bmN0aW9uIF9jbG9uZShwYXJlbnQsIGRlcHRoKSB7XG4gICAgLy8gY2xvbmluZyBudWxsIGFsd2F5cyByZXR1cm5zIG51bGxcbiAgICBpZiAocGFyZW50ID09PSBudWxsKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoZGVwdGggPT09IDApXG4gICAgICByZXR1cm4gcGFyZW50O1xuXG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciBwcm90bztcbiAgICBpZiAodHlwZW9mIHBhcmVudCAhPSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVNYXApKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVNYXAoKTtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlU2V0KSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlU2V0KCk7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVByb21pc2UpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcGFyZW50LnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICByZXNvbHZlKF9jbG9uZSh2YWx1ZSwgZGVwdGggLSAxKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIHJlamVjdChfY2xvbmUoZXJyLCBkZXB0aCAtIDEpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNBcnJheShwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IFtdO1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc1JlZ0V4cChwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBSZWdFeHAocGFyZW50LnNvdXJjZSwgX19nZXRSZWdFeHBGbGFncyhwYXJlbnQpKTtcbiAgICAgIGlmIChwYXJlbnQubGFzdEluZGV4KSBjaGlsZC5sYXN0SW5kZXggPSBwYXJlbnQubGFzdEluZGV4O1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc0RhdGUocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBuZXcgRGF0ZShwYXJlbnQuZ2V0VGltZSgpKTtcbiAgICB9IGVsc2UgaWYgKHVzZUJ1ZmZlciAmJiBCdWZmZXIuaXNCdWZmZXIocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBuZXcgQnVmZmVyKHBhcmVudC5sZW5ndGgpO1xuICAgICAgcGFyZW50LmNvcHkoY2hpbGQpO1xuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBFcnJvcikpIHtcbiAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHByb3RvdHlwZSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwYXJlbnQpO1xuICAgICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuICAgICAgICBwcm90byA9IHByb3RvdHlwZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2lyY3VsYXIpIHtcbiAgICAgIHZhciBpbmRleCA9IGFsbFBhcmVudHMuaW5kZXhPZihwYXJlbnQpO1xuXG4gICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGFsbENoaWxkcmVuW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGFsbFBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgYWxsQ2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlTWFwKSkge1xuICAgICAgcGFyZW50LmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICB2YXIga2V5Q2hpbGQgPSBfY2xvbmUoa2V5LCBkZXB0aCAtIDEpO1xuICAgICAgICB2YXIgdmFsdWVDaGlsZCA9IF9jbG9uZSh2YWx1ZSwgZGVwdGggLSAxKTtcbiAgICAgICAgY2hpbGQuc2V0KGtleUNoaWxkLCB2YWx1ZUNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVTZXQpKSB7XG4gICAgICBwYXJlbnQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB2YXIgZW50cnlDaGlsZCA9IF9jbG9uZSh2YWx1ZSwgZGVwdGggLSAxKTtcbiAgICAgICAgY2hpbGQuYWRkKGVudHJ5Q2hpbGQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSBpbiBwYXJlbnQpIHtcbiAgICAgIHZhciBhdHRycztcbiAgICAgIGlmIChwcm90bykge1xuICAgICAgICBhdHRycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXR0cnMgJiYgYXR0cnMuc2V0ID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjaGlsZFtpXSA9IF9jbG9uZShwYXJlbnRbaV0sIGRlcHRoIC0gMSk7XG4gICAgfVxuXG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhwYXJlbnQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIERvbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgY2xvbmluZyBhIHN5bWJvbCBiZWNhdXNlIGl0IGlzIGEgcHJpbWl0aXZlLFxuICAgICAgICAvLyBsaWtlIGEgbnVtYmVyIG9yIHN0cmluZy5cbiAgICAgICAgdmFyIHN5bWJvbCA9IHN5bWJvbHNbaV07XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIHN5bWJvbCk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmICFkZXNjcmlwdG9yLmVudW1lcmFibGUgJiYgIWluY2x1ZGVOb25FbnVtZXJhYmxlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRbc3ltYm9sXSA9IF9jbG9uZShwYXJlbnRbc3ltYm9sXSwgZGVwdGggLSAxKTtcbiAgICAgICAgaWYgKCFkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hpbGQsIHN5bWJvbCwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICAgICAgdmFyIGFsbFByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwYXJlbnQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxQcm9wZXJ0eU5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBhbGxQcm9wZXJ0eU5hbWVzW2ldO1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGFyZW50LCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZFtwcm9wZXJ0eU5hbWVdID0gX2Nsb25lKHBhcmVudFtwcm9wZXJ0eU5hbWVdLCBkZXB0aCAtIDEpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hpbGQsIHByb3BlcnR5TmFtZSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIHJldHVybiBfY2xvbmUocGFyZW50LCBkZXB0aCk7XG59XG5cbi8qKlxuICogU2ltcGxlIGZsYXQgY2xvbmUgdXNpbmcgcHJvdG90eXBlLCBhY2NlcHRzIG9ubHkgb2JqZWN0cywgdXNlZnVsbCBmb3IgcHJvcGVydHlcbiAqIG92ZXJyaWRlIG9uIEZMQVQgY29uZmlndXJhdGlvbiBvYmplY3QgKG5vIG5lc3RlZCBwcm9wcykuXG4gKlxuICogVVNFIFdJVEggQ0FVVElPTiEgVGhpcyBtYXkgbm90IGJlaGF2ZSBhcyB5b3Ugd2lzaCBpZiB5b3UgZG8gbm90IGtub3cgaG93IHRoaXNcbiAqIHdvcmtzLlxuICovXG5jbG9uZS5jbG9uZVByb3RvdHlwZSA9IGZ1bmN0aW9uIGNsb25lUHJvdG90eXBlKHBhcmVudCkge1xuICBpZiAocGFyZW50ID09PSBudWxsKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHZhciBjID0gZnVuY3Rpb24gKCkge307XG4gIGMucHJvdG90eXBlID0gcGFyZW50O1xuICByZXR1cm4gbmV3IGMoKTtcbn07XG5cbi8vIHByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbnNcblxuZnVuY3Rpb24gX19vYmpUb1N0cihvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5jbG9uZS5fX29ialRvU3RyID0gX19vYmpUb1N0cjtcblxuZnVuY3Rpb24gX19pc0RhdGUobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmNsb25lLl9faXNEYXRlID0gX19pc0RhdGU7XG5cbmZ1bmN0aW9uIF9faXNBcnJheShvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbmNsb25lLl9faXNBcnJheSA9IF9faXNBcnJheTtcblxuZnVuY3Rpb24gX19pc1JlZ0V4cChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5jbG9uZS5fX2lzUmVnRXhwID0gX19pc1JlZ0V4cDtcblxuZnVuY3Rpb24gX19nZXRSZWdFeHBGbGFncyhyZSkge1xuICB2YXIgZmxhZ3MgPSAnJztcbiAgaWYgKHJlLmdsb2JhbCkgZmxhZ3MgKz0gJ2cnO1xuICBpZiAocmUuaWdub3JlQ2FzZSkgZmxhZ3MgKz0gJ2knO1xuICBpZiAocmUubXVsdGlsaW5lKSBmbGFncyArPSAnbSc7XG4gIHJldHVybiBmbGFncztcbn1cbmNsb25lLl9fZ2V0UmVnRXhwRmxhZ3MgPSBfX2dldFJlZ0V4cEZsYWdzO1xuXG5yZXR1cm4gY2xvbmU7XG59KSgpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKFxuICAgICAgdWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKVxuICAgICkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiY29uc3QgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQuY2xhc3MuanMnKTtcbmNvbnN0IGNsb25lID0gcmVxdWlyZSgnLi91dGlscy5jbGFzcycpLmNsb25lO1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3Q9fSBjb25maWdcbiAqL1xuY2xhc3MgUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZyA9IHt9KSB7XG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHVybDogJy8nLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICByZXNwb25zZVR5cGUgOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBwYXJhbXMgOiB7fVxuICAgIH07XG4gICAgdGhpcy5jb25maWcgPSB7fTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBkZWZhdWx0cywgY29uZmlnKTtcbiAgfVxuICAvKipcbiAgICogRXhlY3V0ZXMgdGhlIGN1cnJlbnQgcmVxdWVzdCB1c2luZyB0aGUgdW5kZXJseWluZyB0cmFuc3BvcnQgbWVjaGFuaXNtIChpZSBodHRwKVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGV4ZWMoKSB7XG4gICAgbGV0IG9yaWdpbmFsUmVxdWVzdCA9IHRoaXM7XG4gICAgbGV0IFByb21pc2UgPSByZXF1aXJlKCcuL3NldHRpbmdzJykuZ2V0UHJvbWlzZSgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvcmlnaW5hbFJlcXVlc3QudHJhbnNwb3J0ID0gbmV3IFRyYW5zcG9ydChvcmlnaW5hbFJlcXVlc3QpO1xuXG4gICAgICBvcmlnaW5hbFJlcXVlc3QudHJhbnNwb3J0XG4gICAgICAuZXhlYygpXG4gICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzQ2FsbGJhY2socmVzcG9uc2UpIHtcbiAgICAgICAgcmVzcG9uc2UuZGF0YSA9IGNsb25lKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgICAgLy8gb3JpZ2luYWxSZXF1ZXN0LnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHJlc3BvbnNlLnJlcXVlc3QgPSBvcmlnaW5hbFJlcXVlc3Q7XG4gICAgICAgIHJldHVybiByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0sIGZ1bmN0aW9uIGVycm9yQ2FsbGJhY2socmVzcG9uc2UpIHtcbiAgICAgICAgLy8gb3JpZ2luYWxSZXF1ZXN0LnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHJlc3BvbnNlLnJlcXVlc3QgPSBvcmlnaW5hbFJlcXVlc3Q7ICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlamVjdChyZXNwb25zZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogR2V0cyAvIHNldHMgdGhlIHF1ZXJ5IG9iamVjdCB0byB1c2VcbiAgICogQHBhcmFtIHtvYmplY3Q9fSBuZXdRdWVyeSBcbiAgICogQHJldHVybnMgeyh0aGlzIHwgb2JqZWN0KX1cbiAgICovXG4gIHF1ZXJ5KG5ld1F1ZXJ5KSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmV3UXVlcnkpIHtcbiAgICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIG5ld1F1ZXJ5ICYmIG5ld1F1ZXJ5ICE9PSBudWxsKSB7XG4gICAgICAgIG5ld1F1ZXJ5ID0gY2xvbmUobmV3UXVlcnkpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb25maWcucGFyYW1zID0gbmV3UXVlcnk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnBhcmFtcztcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXRzIC8gc2V0cyB0aGUgaHR0cCB2ZXJiIChtZXRob2QpIHRvIHVzZSAoaWUgZ2V0LHB1dCxwb3N0LCBldGMpXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gbmV3TWV0aG9kIFxuICAgKiBAcmV0dXJucyB7KHRoaXMgfCBzdHJpbmcpfVxuICAgKi9cbiAgbWV0aG9kKG5ld01ldGhvZCkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5ld01ldGhvZCkge1xuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgbmV3TWV0aG9kKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLm1ldGhvZCA9IG5ld01ldGhvZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcubWV0aG9kO1xuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldHMgLyBzZXRzIHRoZSB0YXJnZXQgdXJsIHRvIG1ha2UgdGhlIHJlcXVlc3QgdG9cbiAgICogQHBhcmFtIHtzdHJpbmc9fSBuZXdVcmwgXG4gICAqIEByZXR1cm5zIHsodGhpcyB8IHN0cmluZyl9XG4gICAqL1xuICB1cmwobmV3VXJsKSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmV3VXJsKSB7XG4gICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBuZXdVcmwpIHtcbiAgICAgICAgdGhpcy5jb25maWcudXJsID0gbmV3VXJsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy51cmw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgLyBzZXRzIGhlYWRlcnMgKGtleSAvIHZhbHVlIHBhaXJzICkgdG8gdXNlIGZvciB0aGUgcmVxdWVzdFxuICAgKiBAcGFyYW0ge29iamVjdD19IG5ld0hlYWRlck9iaiBcbiAgICogQHJldHVybnMgeyh0aGlzIHwgb2JqZWN0KX1cbiAgICovXG4gIGhlYWRlcnMobmV3SGVhZGVyT2JqKSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmV3SGVhZGVyT2JqKSB7XG4gICAgICBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBuZXdIZWFkZXJPYmogJiYgbmV3SGVhZGVyT2JqICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmhlYWRlcnMgPSBjbG9uZShuZXdIZWFkZXJPYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5oZWFkZXJzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIC8gc2V0cyB0aGUgcmVxdWVzdCBib2R5XG4gICAqIEBwYXJhbSB7b2JqZWN0PX0gbmV3Qm9keSBcbiAgICogQHJldHVybnMgeyh0aGlzIHwgb2JqZWN0IHwgdW5kZWZpbmVkKX1cbiAgICovXG4gIGJvZHkobmV3Qm9keSkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5ld0JvZHkpIHtcbiAgICAgIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIG5ld0JvZHkgJiYgbmV3Qm9keSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbmZpZy5kYXRhID0gY2xvbmUobmV3Qm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRhdGE7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBHZXRzIG9yIHNldHMgdGhlIHJlc3BvbnNlIHR5cGUgZm9yIHRoZSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gbmV3VHlwZSBcbiAgICogQHJldHVybnMgeyh0aGlzIHwgc3RyaW5nKX1cbiAgICovXG4gIG1lZGlhVHlwZShuZXdUeXBlKSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmV3VHlwZSkge1xuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgbmV3VHlwZSkge1xuICAgICAgICB0aGlzLmNvbmZpZy5yZXNwb25zZVR5cGUgPSBuZXdUeXBlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhpcyByZXF1ZXN0J3MgY29uZmlndXJhdGlvbnNcbiAgICogQHJldHVybnMge29iamVjdH1cbiAgICovXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkodGhpcy5jb25maWcpICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0O1xuIiwiY29uc3QgY2xvbmUgPSByZXF1aXJlKCcuL3V0aWxzLmNsYXNzJykuY2xvbmU7XG5jb25zdCBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIFRyYW5zcG9ydCB7XG5cdGNvbnN0cnVjdG9yKHJlcXVlc3QpIHtcblx0XHRpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB3aW5kb3cgJiYgd2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7XG5cdFx0XHR0aGlzLkhUVFBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLkhUVFBSZXF1ZXN0ID0gcmVxdWlyZSgnLi9odHRwLW1vY2suY2xhc3MuanMnKTsgLy91c2VkIGZvciBOb2RlIGJhc2VkIHRlc3RzXG5cdFx0fVxuXHRcdHRoaXMuc2V0UmVxdWVzdChyZXF1ZXN0KTtcblx0fVxuXHQvKipcblx0ICogU3RvcmVzIHRoZSByZXF1ZXN0IG9iamVjdCBmb3IgdXNlIGxhdGVyIChpZSB3aGVuIC5leGVjKCkgZ2V0cyBjYWxsZWQpLiBIZWxwZnVsbCBcblx0ICogaWYgYnVpbGRpbmcgdGhlIHRyYW5zcG9ydCByZXF1ZXN0IHVwIGluc3RlYWQgb2YgcGFzc2luZyBldmVyeXRoaW5nIGludG8gY29uc3RydWN0b3IuXG5cdCAqIEBwYXJhbSB7UmVxdWVzdH0gcmVxdWVzdCBcblx0ICogQHJldHVybnMge3RoaXN9XG5cdCAqL1xuXHRzZXRSZXF1ZXN0KHJlcXVlc3QpIHtcblx0XHR0aGlzLnJlcXVlc3QgPSBjbG9uZShyZXF1ZXN0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKipcblx0ICogTWFrZXMgdGhlIGFjdHVhbCBhcGkgY2FsbCB1c2luZyB0aGUgUmVxdWVzdCBvYmplY3QgdGhhdCB3YXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yIFxuXHQgKiBvciBhZGRlZCB1c2luZyB0aGUgc2V0UmVxdWVzdCBtZXRob2QuXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0ZXhlYygpIHtcblx0XHRsZXQgUHJvbWlzZSA9IHJlcXVpcmUoJy4vc2V0dGluZ3MnKS5nZXRQcm9taXNlKCk7XHRcdFxuXHRcdGxldCBpbnN0YW5jZSA9IHRoaXM7XG5cdFx0XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFxuXHRcdFx0bGV0IGh0dHBJbnN0YW5jZSA9IG5ldyBpbnN0YW5jZS5IVFRQUmVxdWVzdCgpO1xuXHRcdFx0bGV0IHVybCA9IGluc3RhbmNlLnJlcXVlc3QudXJsKCkgO1xuXG5cdFx0XHRsZXQgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoaW5zdGFuY2UucmVxdWVzdC5xdWVyeSgpKTtcblx0XHRcdGlmIChxdWVyeSAmJiBxdWVyeS5sZW5ndGgpIHtcblx0XHRcdFx0dXJsID0gdXJsICsgJz8nICsgcXVlcnk7XG5cdFx0XHR9XG5cdFx0XHRsZXQgYm9keSA9IGluc3RhbmNlLnJlcXVlc3QuYm9keSgpO1xuXHRcdFx0aWYgKCdvYmplY3QnID09PSB0eXBlb2YgYm9keSkge1xuXHRcdFx0XHRib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGh0dHBJbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCB0cmFuc2ZlckNvbXBsZXRlKTtcblx0XHRcdGh0dHBJbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdHJhbnNmZXJGYWlsZWQpO1xuXHRcdFx0aHR0cEluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCB0cmFuc2ZlckFib3J0ZWQpO1xuXHRcdFx0aHR0cEluc3RhbmNlLm9wZW4oIGluc3RhbmNlLnJlcXVlc3QubWV0aG9kKCkudG9VcHBlckNhc2UoKSwgdXJsICk7XG5cdFx0XHRodHRwSW5zdGFuY2UucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0XG5cdFx0XHRsZXQgaGVhZGVycyA9IGluc3RhbmNlLnJlcXVlc3QuaGVhZGVycygpO1xuXHRcdFx0aHR0cEluc3RhbmNlLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgaW5zdGFuY2UucmVxdWVzdC5tZWRpYVR5cGUoKSk7XHRcblx0XHRcdFxuXHRcdFx0Zm9yICggbGV0IGhlYWRlck5hbWUgaW4gaGVhZGVycyApIHtcblx0XHRcdFx0aHR0cEluc3RhbmNlLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyTmFtZSwgaGVhZGVyc1toZWFkZXJOYW1lXSk7XG5cdFx0XHR9XG5cdFx0XHRodHRwSW5zdGFuY2Uuc2VuZCggYm9keSApO1xuXG5cdFx0XHQvKipcblx0XHRcdFx0KiBIYW5kbGVyOkFib3J0ZWRcblx0XHRcdFx0Ki9cblx0XHRcdGZ1bmN0aW9uIHRyYW5zZmVyQWJvcnRlZCgpIHtcblx0XHRcdFx0bGV0IGZhaWxlZCA9IG5ldyBFcnJvcignVHJhbnNmZXIgY2FuY2VsbGVkLicpO1xuXHRcdFx0XHRyZWplY3QoZmFpbGVkKTtcblx0XHRcdH1cblx0XHRcdC8qKlxuXHRcdFx0XHQqIEhhbmRsZXI6RmFpbGVkXG5cdFx0XHRcdCovXG5cdFx0XHRmdW5jdGlvbiB0cmFuc2ZlckZhaWxlZChlKSB7XG5cdFx0XHRcdHJlamVjdChodHRwSW5zdGFuY2UpO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHRcdCogSGFuZGxlcjpGaW5pc2hlZFxuXHRcdFx0XHQqL1xuXHRcdFx0ZnVuY3Rpb24gdHJhbnNmZXJDb21wbGV0ZSgpIHtcdFxuXHRcdFx0XHRpZiAoaHR0cEluc3RhbmNlLnN0YXR1cyA8IDQwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoaHR0cEluc3RhbmNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoaHR0cEluc3RhbmNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG1hcChvYmplY3RLZXlzKG9iaiksIGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBtYXAob2JqW2tdLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIvKipcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBIVFRQTW9jayB7XG5cdGNvbnN0cnVjdG9yKHZlcmJvc2UgPSBmYWxzZSkge1xuXHRcdHRoaXMubGlzdGVuZXJzID0ge307XG5cdFx0dGhpcy52ZXJib3NlID0gdmVyYm9zZTtcblx0fVxuXHQvKipcblx0ICogTW9jayByZXByZXNlbnRhdGlvbiBvZiB0aGUgWE1MSHR0cFJlcXVlc3Qgb3BlbiBtZXRob2Rcblx0ICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L29wZW59XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRvcGVuKG1ldGhvZCwgdXJsKSB7XG5cdFx0dGhpcy5sb2coYE9wZW5pbmcgJHt1cmx9IHVzaW5nICR7bWV0aG9kfWApO1xuXHR9XG5cdC8qKlxuXHQgKiBNb2NrIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBYTUxIdHRwUmVxdWVzdCBzZW5kIG1ldGhvZFxuXHQgKiBAc2VlIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3Qvc2VuZH1cblx0ICogQHBhcmFtIHtvYmplY3R9IGJvZHkgXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRzZW5kKGJvZHkpIHtcblx0XHR0aGlzLmxvZyhgU2VuZGluZyB3aXRoICR7Ym9keX1gKTtcblx0XHRpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHRoaXMubGlzdGVuZXJzLmxvYWQpIHtcblx0XHRcdGxldCBtb2NrUmVzcG9uc2UgPSB7XG5cdFx0XHRcdHJlc3BvbnNlIDogeydtb2NrX3Jlc3BvbnNlJyA6IHRydWUsICdkYXRhJyA6IFsnb2JqMSddfSxcblx0XHRcdFx0cmVzcG9uc2VUZXh0IDogXCJ7J21vY2tfcmVzcG9uc2UnIDogdHJ1ZX1cIixcblx0XHRcdFx0c3RhdHVzIDogMjAwLFxuXHRcdFx0XHRzdGF0dXNUZXh0IDogJzIwMCcsXG5cdFx0XHRcdHJlc3BvbnNlVVJMIDogJy9tb2NrLWNhbGwnXG5cdFx0XHR9O1xuXHRcdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBtb2NrUmVzcG9uc2UpO1xuXHRcdFx0dGhpcy5saXN0ZW5lcnMubG9hZCgpO1xuXHRcdH1cblx0fVxuXHQvKipcblx0ICogTW9jayByZXByZXNlbnRhdGlvbiBvZiB0aGUgWE1MSHR0cFJlcXVlc3QgZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIG1ldGhvZFxuXHQgKiBAc2VlIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvZ2V0QWxsUmVzcG9uc2VIZWFkZXJzfVxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbW9jayBoZWFkZXJzXG5cdCAqL1xuXHRnZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB7XG5cdFx0cmV0dXJuIFwiTW9jay1IZWFkZXJzOiB0cnVlXCI7XG5cdH1cblx0LyoqXG5cdCAqIFJlcHJlc2VudGF0aW9uIG9mIEphdmFzY3JpcHQncyBhZGRFdmVudExpc3RlbmVyIGRlc2lnbmVkIHRvIGhvb2sgaW50byB0aGlzXG5cdCAqIG1vY2sgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0XG5cdCAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyfVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gZm9yXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIGV2ZW50IGlzIHRyaWdnZXJlZFxuXHQgKi9cblx0YWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBjYWxsYmFjaykge1xuXHRcdHRoaXMubG9nKGAke25hbWV9IGxpc3RlbmVyIHJlZ2lzdGVyZWRgKTtcblx0XHR0aGlzLmxpc3RlbmVyc1tuYW1lXSA9IGNhbGxiYWNrO1xuXHR9XG5cdC8qKlxuXHQgKiBKdXN0IGEgc3R1YiBzbyB3ZSBoYXZlIGEgdW5pZm9ybSBpbnRlcmZhY2UgYmV0d2VlbiB0aGlzIGFuZCB0aGUgcmVhbCB0aGluZ1xuXHQgKiBAc2VlIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXQvc2V0UmVxdWVzdEhlYWRlcn1cblx0ICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlciBcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuXHQgKi9cblx0c2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIHZhbHVlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiBmb3IgbG9nZ2luZyBzdGF0dXMgb3V0cHV0IGJhc2VkIG9uIHRoaXMgb2JqZWN0J3MgXG5cdCAqIHZlcmJvc2l0eSBzZXR0aW5ncyAodHJ1ZS9mYWxzZSlcblx0ICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXG5cdCAqL1xuXHRsb2cobWVzc2FnZSkge1xuXHRcdGlmICh0aGlzLnZlcmJvc2UgPT09IHRydWUpIHtcblx0XHRcdGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhUVFBNb2NrO1xuIiwiY29uc3QgVVJMQnVpbGRlciA9IHJlcXVpcmUoJy4vdXJsLWJ1aWxkZXIuY2xhc3MnKTtcbmNvbnN0IFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QuY2xhc3MnKTtcbmNvbnN0IGNsb25lID0gcmVxdWlyZSgnLi91dGlscy5jbGFzcycpLmNsb25lO1xuY29uc3Qgbm9vcCA9IHJlcXVpcmUoJy4vdXRpbHMuY2xhc3MnKS5ub29wO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gZW5kcG9pbnQgaW5zdGFuY2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBFbmRwb2ludCB7XG4gIGNvbnN0cnVjdG9yKGVuZHBvaW50Q29uZmlnID0ge30pIHtcbiAgICBpZiAoIWVuZHBvaW50Q29uZmlnIHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiBlbmRwb2ludENvbmZpZy5tb2RlbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVuZHBvaW50IGNvbmZpZ3VyYXRpb24uJyk7XG4gICAgfVxuICAgIHRoaXMuZW5kcG9pbnRDb25maWcgPSBjbG9uZShlbmRwb2ludENvbmZpZyk7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBhbGxvd0Zyb21DYWNoZSA6IHRydWUsXG4gICAgICBtZXRob2QgOiAnZ2V0JyxcbiAgICAgIHRhcmdldCA6ICcnLFxuICAgICAgcXVlcnkgOiB7fVxuICAgIH07XG4gICAgdGhpcy5jYWNoZSA9IHRoaXMuZW5kcG9pbnRDb25maWcuYXBpKCkuY2FjaGU7XG4gIH1cbiAgLyoqXG4gICAqIEluc3RhbnRpYXRlcyBhIG5ldyBtb2RlbCBpbnN0YW5jZSBhbmQgcmV0dXJucyBpdFxuICAgKiBAcGFyYW0ge29iamVjdD19IGRhdGEgLSBJbml0aWFsaXphdGlvbiBkYXRhIGZvciB0aGUgbmV3IG1vZGVsIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHtAbGluayBNb2RlbH0gTmV3IGluc3RhbmNlIG9mIE1vZGVsXG4gICAqL1xuICBjcmVhdGVOZXcoZGF0YSA9IHt9KSB7XG4gICAgbGV0IHJvb3QgPSBuZXcgVVJMQnVpbGRlcihbXG4gICAgICB0aGlzLmVuZHBvaW50Q29uZmlnLmJhc2VVcmwoKSxcbiAgICAgIHRoaXMuZW5kcG9pbnRDb25maWcudXJsKClcbiAgICBdKTtcbiAgICBkYXRhWydAcm9vdCddID0gcm9vdDtcbiAgICBsZXQgaW5zdGFudGlhdG9yID0gdGhpcy5lbmRwb2ludENvbmZpZy5tb2RlbCgpO1xuICAgIGxldCBpbnN0YW5jZSA9IG5ldyBpbnN0YW50aWF0b3IoZGF0YSk7XG4gICAgaW5zdGFuY2UuY29uZmlnKHRoaXMuZW5kcG9pbnRDb25maWcpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuICAvKipcbiAgICogR2V0cyAvIHNldHMgaW5zdGFudGlhdG9yIHRvIHVzZSB3aGVuIGNyZWF0aW5nIGEgbmV3IG1vZGVsIGluc3RhbmNlLiBJbnN0YW50aWF0b3IgKnNob3VsZCogaW5oZXJpdFxuICAgKiBmcm9tIHtAbGluayBNb2RlbH1cbiAgICogQHBhcmFtIHsoZnVuY3Rpb258Y2xhc3MpPX0gaW5zdGFudGlhdG9yIC0gRnVuY3Rpb24gb3IgY2xhc3MgdG8gdXNlIHdoZW4gaW5zdGFudGlhdGluZyBtb2RlbFxuICAgKiBAcmV0dXJucyB7KHRoaXN8ZnVuY3Rpb24pfSBDdXJyZW50IGluc3RhbnRpYXRvciBmdW5jdGlvbiBvciB0aGlzIGluc3RhbmNlXG4gICAqL1xuICBtb2RlbChpbnN0YW50aWF0b3IpIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBpbnN0YW50aWF0b3IpIHtcbiAgICAgIHRoaXMuZW5kcG9pbnRDb25maWcubW9kZWwoaW5zdGFudGlhdG9yKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbmRwb2ludENvbmZpZy5tb2RlbCgpO1xuICB9XG4gIC8qKlxuICAgKiBHZXRzIC8gc2V0cyB0aGUgZW5kcG9pbnQncyByZWxhdGl2ZSB1cmxcbiAgICogQHBhcmFtIHtzdHJpbmc9fSB1cmwgLSBUaGUgbmV3IHVybCB2YWx1ZVxuICAgKiBAcmV0dXJucyB7KHRoaXN8c3RyaW5nKX0gVGhpcyBpbnN0YW5jZSBvciB0aGUgY3VycmVudCB1cmxcbiAgICovXG4gIHVybChuZXdVcmwpIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBuZXdVcmwpIHtcbiAgICAgIHRoaXMuZW5kcG9pbnRDb25maWcudXJsKG5ld1VybCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZW5kcG9pbnRDb25maWcudXJsKCk7XG4gIH1cbiAgLyoqXG4gICAqIEJ1aWxkcyBhIHF1ZXJ5IHRvIGZpbmQgYW4gb2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSB1bmlxdWUgbW9kZWwgaWRlbnRpZmllclxuICAgKiBAcmV0dXJucyB7dGhpc31cbiAgICovXG4gIGZpbmRCeUlkKGlkKSB7XG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtb2RlbCBpZGVudGlmaWVyJyk7XG4gICAgfVxuICAgIHRoaXMuY29uZmlnLnRhcmdldCA9IG5ldyBVUkxCdWlsZGVyKFtcbiAgICAgIHRoaXMuZW5kcG9pbnRDb25maWcuYmFzZVVybCgpLFxuICAgICAgdGhpcy5lbmRwb2ludENvbmZpZy51cmwoKSxcbiAgICAgIGlkXG4gICAgXSk7XG4gICAgdGhpcy5jb25maWcubWV0aG9kID0gJ2dldCc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBxdWVyeSB0byBmaW5kIG9iamVjdHMgdGhhdCBtYXRjaCB0aGUgb3B0aW9uYWwgcXVlcnlcbiAgICogQHBhcmFtIHtvYmplY3Q9fSBxdWVyeVxuICAgKiBAcmV0dXJucyB7dGhpc31cbiAgICovXG4gIGZpbmQocXVlcnkpIHtcbiAgICB0aGlzLmNvbmZpZy50YXJnZXQgPSBuZXcgVVJMQnVpbGRlcihbXG4gICAgICB0aGlzLmVuZHBvaW50Q29uZmlnLmJhc2VVcmwoKSxcbiAgICAgIHRoaXMuZW5kcG9pbnRDb25maWcudXJsKClcbiAgICBdKTtcbiAgICB0aGlzLmNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgICB0aGlzLmNvbmZpZy5xdWVyeS5zZWFyY2ggPSBKU09OLnN0cmluZ2lmeShxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICAqIEF0IHRoZSBtb21lbnQsIHRoaXMgYmVoYXZlcyBleGFjdGx5IHRoZSBzYW1lIGFzIC5maW5kLCBidXQgdXNlcyB0aGVcbiAgICAqIFNFQVJDSCB2ZXJiIGluc3RlYWRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBxdWVyeVxuICAgICogQHJldHVybnMge3RoaXN9XG4gICAgKi9cbiAgc2VhcmNoKHF1ZXJ5KSB7XG4gICAgdGhpcy5jb25maWcudGFyZ2V0ID0gbmV3IFVSTEJ1aWxkZXIoW1xuICAgICAgdGhpcy5lbmRwb2ludENvbmZpZy5iYXNlVXJsKCksXG4gICAgICB0aGlzLmVuZHBvaW50Q29uZmlnLnVybCgpXG4gICAgXSk7XG4gICAgdGhpcy5jb25maWcubWV0aG9kID0gJ3NlYXJjaCc7XG4gICAgdGhpcy5jb25maWcucXVlcnkuc2VhcmNoID0gSlNPTi5zdHJpbmdpZnkocXVlcnkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBxdWVyeSB0byBmaW5kIGEgdW5pcXVlIG1vZGVsIHdpdGggdGhlIHNwZWNpZmllZCBpZFxuICAgKiBhbmQgcmVwbGFjZXMgaXQncyBkYXRhIHdpdGggdGhlIHNwZWNpZmllZCBib2R5IG9iamVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgdW5pcXVlIG1vZGVsIGlkZW50aWZpZXJcbiAgICogQHBhcmFtIHtvYmplY3R9IGJvZHlcbiAgICogQHJldHVybnMge3RoaXN9XG4gICAqL1xuICBmaW5kQnlJZEFuZFVwZGF0ZShpZCwgYm9keSkge1xuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbW9kZWwgaWRlbnRpZmllcicpO1xuICAgIH1cbiAgICBpZiAoJ29iamVjdCcgIT09IHR5cGVvZiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYm9keSBvYmplY3QnKTtcbiAgICB9XG4gICAgdGhpcy5jb25maWcudGFyZ2V0ID0gbmV3IFVSTEJ1aWxkZXIoW1xuICAgICAgdGhpcy5lbmRwb2ludENvbmZpZy5iYXNlVXJsKCksXG4gICAgICB0aGlzLmVuZHBvaW50Q29uZmlnLnVybCgpLFxuICAgICAgaWRcbiAgICBdKTtcbiAgICB0aGlzLmNvbmZpZy5ib2R5ID0gYm9keTtcbiAgICB0aGlzLmNvbmZpZy5tZXRob2QgPSAncHV0JztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcXVlcnkgdGhhdCBmaW5kcyBhIG1vZGVsIHdpdGggdGhlIHNwZWNpZmllZCBpZCBhbmRcbiAgICogcmVtb3ZlcyBpdCBmcm9tIHRoZSBkYXRhYmFzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgdW5pcXVlIG1vZGVsIGlkZW50aWZpZXJcbiAgICogQHJldHVybnMge3RoaXN9XG4gICAqL1xuICBmaW5kQnlJZEFuZFJlbW92ZShpZCkge1xuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbW9kZWwgaWRlbnRpZmllcicpO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZy50YXJnZXQgPSBuZXcgVVJMQnVpbGRlcihbXG4gICAgICB0aGlzLmVuZHBvaW50Q29uZmlnLmJhc2VVcmwoKSxcbiAgICAgIHRoaXMuZW5kcG9pbnRDb25maWcudXJsKCksXG4gICAgICBpZFxuICAgIF0pO1xuICAgIHRoaXMuY29uZmlnLm1ldGhvZCA9ICdkZWxldGUnO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIHF1ZXJ5IHJlcXVlc3Qgc2hvdWxkIGFsbG93IG9iamVjdHMgZnJvbSB0aGUgY2FjaGVcbiAgICogb3IgcmVxdWlyZSBvYmplY3RzIGJlIGZyZXNoIGZyb20gdGhlIGFwaVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBhbGxvdyAtIFNwZWNpZnkgaWYgdXNpbmcgdGhlIGNhY2hlIGlzIGFsbG93ZWRcbiAgICogQHJldHVybnMgeyh0aGlzIHwgYm9vbGVhbil9IFRoaXMgaW5zdGFuY2Ugb3IgdGhlIGN1cnJlbnQgYWxsb3cgdmFsdWVcbiAgICovXG4gIGFsbG93RnJvbUNhY2hlKGFsbG93KSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgYWxsb3cpIHtcbiAgICAgIGlmICgnYm9vbGVhbicgPT09IHR5cGVvZiBhbGxvdykge1xuICAgICAgICB0aGlzLmNvbmZpZy5hbGxvd0Zyb21DYWNoZSA9IGFsbG93O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hbGxvd0Zyb21DYWNoZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBxdWVyeSB0aGF0IGhhcyBiZWVuIGNyZWF0ZWQgdXNpbmcgdGhlIGZpbmQvZmluZEJ5Li4gY2FsbHNcbiAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNiIC0gRnVuY3Rpb24gdG8gY2FsbCBvbiBjb21wbGV0aW9uIChzdWNjZXNzIG9yIGZhaWx1cmUpXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgZXhlYyhjYiA9IG5vb3ApIHtcbiAgICBsZXQgYWxsb3dGcm9tQ2FjaGUgPSB0aGlzLmFsbG93RnJvbUNhY2hlKCk7XG4gICAgbGV0IG1vZGVsQ29uc3RydWN0b3IgPSB0aGlzLmVuZHBvaW50Q29uZmlnLm1vZGVsKCk7XG4gICAgbGV0IGVuZHBvaW50Q29uZmlnID0gdGhpcy5lbmRwb2ludENvbmZpZztcblxuICAgIGxldCBoZWFkZXJzID0ge307XG4gICAgdHJ5IHtcbiAgICAgIGhlYWRlcnMgPSB0aGlzLmVuZHBvaW50Q29uZmlnLmFwaSgpLmNvbW1vbkhlYWRlcnMoKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBnZXQgY29tbW9uIGhlYWRlcnMuIFNvbWV0aGluZyB3ZW50XFwndCB3cm9uZyAodW5sZXNzIHlvdSBhcmUgdW5pdCB0ZXN0aW5nKS4gJyk7XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24oaGVhZGVycywgdGhpcy5jb25maWcuaGVhZGVycyk7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcbiAgICAgIC5tZXRob2QodGhpcy5jb25maWcubWV0aG9kKVxuICAgICAgLmJvZHkodGhpcy5jb25maWcuYm9keSB8fCB7fSlcbiAgICAgIC5xdWVyeSh0aGlzLmNvbmZpZy5xdWVyeSB8fCB7fSlcbiAgICAgIC5oZWFkZXJzKGhlYWRlcnMgfHwge30pXG4gICAgICAudXJsKHRoaXMuY29uZmlnLnRhcmdldC50b1N0cmluZygpKTtcblxuICAgIGxldCBQcm9taXNlID0gcmVxdWlyZSgnLi9zZXR0aW5ncycpLmdldFByb21pc2UoKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5oYXNDYWNoZSgpKSB7XG4gICAgICAgIGxldCBjYWNoZWRPYmplY3QgPSBjYWNoZS5nZXQocmVxdWVzdC51cmwoKSk7XG4gICAgICAgIGlmIChjYWNoZWRPYmplY3QgJiYgYWxsb3dGcm9tQ2FjaGUpIHtcbiAgICAgICAgICBjYihudWxsLCBjYWNoZWRPYmplY3QpO1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKGNhY2hlZE9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vZG8gYWN0dWFsICdnZXQnXG4gICAgICByZXF1ZXN0LmV4ZWMoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICBsZXQgbW9kZWw7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICBtb2RlbCA9IGRhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBsZXQgZW50cnkgPSBuZXcgbW9kZWxDb25zdHJ1Y3RvcihpdGVtKTtcbiAgICAgICAgICAgIGVudHJ5LmNvbmZpZyhlbmRwb2ludENvbmZpZyk7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZW50cnksICdfX3JlcXVlc3QnLCB7IHZhbHVlIDogY2xvbmUocmVxdWVzdCksIGVudW1lcmFibGUgOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtb2RlbCA9IG5ldyBtb2RlbENvbnN0cnVjdG9yKGRhdGEpO1xuICAgICAgICAgIG1vZGVsLmNvbmZpZyhlbmRwb2ludENvbmZpZyk7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZGVsLCAnX19yZXF1ZXN0JywgeyB2YWx1ZSA6IGNsb25lKHJlcXVlc3QpLCBlbnVtZXJhYmxlIDogZmFsc2UgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNDYWNoZSgpKSB7XG4gICAgICAgICAgY2FjaGUucHV0KHJlcXVlc3QudXJsKCksIG1vZGVsKTtcbiAgICAgICAgfVxuICAgICAgICBjYihudWxsLCBtb2RlbCk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKG1vZGVsKTtcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGlmICh0aGlzLmhhc0NhY2hlKCkpIHtcbiAgICAgICAgICBjYWNoZS5pbnZhbGlkYXRlKHJlcXVlc3QudXJsKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNiKGVycik7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogUXVlcnkgaGVscGVyIHRvIHNraXAgcmVjb3JkcyByZXR1cm5lZCBmcm9tIHRoZSBhcGkgKGlmIHN1cHBvcnRlZCkuIENvbWJpbmVkXG4gICAqIHdpdGggdGhlIC5saW1pdCBtZXRob2QsIHRoaXMgZnVuY3Rpb24gaXMgZ3JlYXQgZm9yIHBhZ2luYXRpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IHNraXBBbW91bnRcbiAgICogQHJldHVybnMgdGhpc1xuICAgKi9cbiAgc2tpcChza2lwQW1vdW50ID0gMCkge1xuICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNraXBBbW91bnQpIHtcbiAgICAgIHRoaXMuY29uZmlnLnF1ZXJ5LnNraXAgPSBza2lwQW1vdW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuIC8qKlxuICAqIFF1ZXJ5IGhlbHBlciB0byBsaW1pdCB0aGUgbnVtYmVyIG9mIHJlc3VsdHMgcmV0dXJuZWQgKHByb3ZpZGVkIHRoZSBhcGlcbiAgKiBzdXBwb3J0cyBpdClcbiAgKiBAcGFyYW0ge251bWJlcn0gbGltaXRBbW91bnRcbiAgKiBAcmV0dXJucyB0aGlzXG4gICovXG4gIGxpbWl0KGxpbWl0QW1vdW50ID0gMCkge1xuICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIGxpbWl0QW1vdW50KSB7XG4gICAgICB0aGlzLmNvbmZpZy5xdWVyeS5saW1pdCA9IGxpbWl0QW1vdW50O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogU2V0cyBhIGxpc3Qgb2YgZmllbGRzIHRvIHJldHVybiBmcm9tIHRoZSBhcGkgKGlmIHN1cHBvcnRlZCkuXG4gICAqIEBwYXJhbSB7KHN0cmluZ3xzdHJpbmdbXSl9IGZpZWxkcyAtIGEgbGlzdCBvZiBmaWVsZHMgdG8gcmV0dXJuIGZyb20gdGhlIGFwaVxuICAgKiBAcmV0dXJucyB0aGlzXG4gICAqL1xuICBzZWxlY3QoZmllbGRzID0gJycpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWVsZHMpKSB7XG4gICAgICBmaWVsZHMgPSBmaWVsZHMuam9pbignICcpO1xuICAgIH1cbiAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBmaWVsZHMpIHtcbiAgICAgIHRoaXMuY29uZmlnLnF1ZXJ5LmZpZWxkcyA9IGZpZWxkcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0aGUgY2FjaGUgb2JqZWN0IGhhcyBiZWVuIHNldCBhbmQgaXMgdmFsaWRcbiAgICogQGFjY2VzcyBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaGFzQ2FjaGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUgJiYgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHRoaXMuY2FjaGU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbmRwb2ludDtcbiIsIi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBhcmdzIFxuICovXG5jbGFzcyBVUkxCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoYXJncyA9IFtdKSB7XG4gICAgaWYgKCFhcmdzIHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiBhcmdzLmpvaW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVVJMIEJ1aWxkZXIgcmVxdWlyZXMgcGFyYW0gMSB0byBiZSBhbiBhcnJheS4nKTtcbiAgICB9XG4gICAgdGhpcy50YXJnZXQgPSBhcmdzLmZpbHRlcihpdGVtID0+IHtcbiAgICAgIHJldHVybiBpdGVtICE9PSAnLyc7XG4gICAgfSkuam9pbignLycpIHx8IFwiL1wiO1xuICB9XG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB1cmxcbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnRhcmdldCB8fCAnJztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVSTEJ1aWxkZXI7IiwiLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgQ2FjaGUge1xuICAvKipcbiAgICogQ3JlYXRlIGEgY2FjaGUgb2JqZWN0XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9iamVjdHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB0dGwgOiA2MDAwMCxcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBGZXRjaGVzIGFuIG9iamVjdCBmcm9tIHRoZSBjYWNoZSB1c2luZyB0aGUgb2JqZWN0J3MgbmFtZSAodHlwaWNhbGx5IHRoZSB1cmwpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgKiBAcmV0dXJucyB7KG9iamVjdHxBcnJheXx1bmRlZmluZWQpfSBUaGUgZm91bmQgb2JqZWN0IG9yIGFycmF5IGlmIGV4aXN0cywgb3RoZXJ3aXNlIHVuZGVmaW5lZFxuICAgKi9cbiAgZ2V0KG5hbWUpIHtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgb2JqID0gdGhpcy5vYmplY3RzLmdldChuYW1lKTtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBvYmogJiYgbm93IC0gb2JqWzBdIDwgdGhpcy5jb25maWcudHRsKSB7XG4gICAgICBsZXQgY2FjaGVkT2JqZWN0ID0gb2JqWzFdO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNhY2hlZE9iamVjdCwnX19mcm9tQ2FjaGUnLCB7dmFsdWUgOiB0cnVlfSk7XG4gICAgICByZXR1cm4gY2FjaGVkT2JqZWN0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9iamVjdHMuZGVsZXRlKG5hbWUpOyAvL2luIGNhc2UgdGhlIG9iamVjdCBleGlzdHMgYnV0IGhhcyBleHBpcmVkXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogU3RvcmVzIGFueSBvYmplY3Qgb3IgcHJpbWl0aXZlIGludG8gdGhlIGNhY2hlIHVzaW5nIGl0J3MgbmFtZVxuICAgKiBOT1RFOiBQcmltaXRpdmVzIFdJTEwgYmUgY29udmVydGVkIHRvIG9iamVjdHMgcHJpb3IgdG8gY2FjaGluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICogQHBhcmFtIHsoc3RyaW5nfG51bWJlcnxib29sZWFufG9iamVjdCl9IHZhbHVlIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gc3VjY2Vzc1xuICAgKi9cbiAgcHV0KG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG5hbWUgYXR0cmlidXRlJyk7XG4gICAgfVxuICAgIC8vY29udmVydCBwcmltaXRpdmUgc3RyaW5ncyB0byBzdHJpbmcgb2JqZWN0cyBzbyB3ZSBjYW4gYWRkIF9fZnJvbUNhY2hlZFxuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5ldyBTdHJpbmcodmFsdWUpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICB9XG4gICAgaWYgKCdudW1iZXInID09PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gbmV3IE51bWJlcih2YWx1ZSk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgIH1cbiAgICBpZiAoJ2Jvb2xlYW4nID09PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gbmV3IEJvb2xlYW4odmFsdWUpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmUgICAgICBcbiAgICB9XG4gICAgdGhpcy5vYmplY3RzLnNldChuYW1lLCBbRGF0ZS5ub3coKSwgdmFsdWVdKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBvYmplY3QgZnJvbSB0aGUgY2FjaGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAqL1xuICBpbnZhbGlkYXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5vYmplY3RzLmRlbGV0ZShuYW1lKTtcbiAgfVxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgZGVmYXVsdCB0aW1lIHRvIGxpdmUgb2Ygb2JqZWN0cyBpbiB0aGUgY2FjaGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5ld1RUTCBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHN1Y2Nlc3NcbiAgICovXG4gIHNldFRUTChuZXdUVEwpIHtcbiAgICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiBuZXdUVEwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBUVEwgdmFsdWUnKTtcbiAgICB9XG4gICAgdGhpcy5jb25maWcudHRsID0gbmV3VFRMO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FjaGU7Il0sInNvdXJjZVJvb3QiOiIifQ==