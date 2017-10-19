(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.officebotSdk = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * This creates a simple package that can be exported
 * @namespace OfficeBotSDK.Index
 */
let SDK = (function(Promise) {

  let Settings = require('./src/settings.js');
  Settings.setPromiseLib(Promise);

  let exports = {
    API             : require('./src/api-config.class'),
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
},{"./src/api-config.class":11,"./src/cache.class":12,"./src/endpoint-config.class":13,"./src/endpoint.class":14,"./src/http-mock.class":15,"./src/model.class":16,"./src/request.class":17,"./src/settings.js":18,"./src/transport.class":19,"./src/url-builder.class":20,"./src/utils.class":21}],2:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

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

},{"./lib/is_arguments.js":3,"./lib/keys.js":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],5:[function(require,module,exports){
var equalsOptions = { strict: true };
var _equals = require('deep-equal');
var areEquals = function (a, b) {
    return _equals(a, b, equalsOptions);
};
var helpers_1 = require('./helpers');
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

},{"./helpers":7,"deep-equal":2}],6:[function(require,module,exports){
var equalsOptions = { strict: true };
var _equals = require('deep-equal');
var areEquals = function (a, b) {
    return _equals(a, b, equalsOptions);
};
var helpers_1 = require('./helpers');
var core_1 = require('./core');
/* export all core functions */
var core_2 = require('./core');
exports.applyOperation = core_2.applyOperation;
exports.applyPatch = core_2.applyPatch;
exports.applyReducer = core_2.applyReducer;
exports.getValueByPointer = core_2.getValueByPointer;
exports.validate = core_2.validate;
exports.validator = core_2.validator;
/* export some helpers */
var helpers_2 = require('./helpers');
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

},{"./core":5,"./helpers":7,"deep-equal":2}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

'use strict';

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

},{}],9:[function(require,module,exports){
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

'use strict';

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

},{}],10:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":8,"./encode":9}],11:[function(require,module,exports){
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
  endpoint(endpointName = '__default') {
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
},{"./cache.class":12,"./endpoint-config.class.js":13,"./endpoint.class.js":14,"./utils.class":21}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
      'responseType' : "application/json",
      'instantiator' : Model
    };
    Object.assign(this.config, defaults, clone(config));
  }

  /**
   * Gets or sets the expected media return type. Ultimately, it is up to the transport
   * to use this setting to correctly talk to the api
   * Note - This is currently unused
   * @param {string=} newType - The new media type that this endpoint communicates with
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
},{"./model.class":16,"./utils.class":21}],14:[function(require,module,exports){
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
            entry.__request = clone(request);
            return entry;            
          });
        } else {
          model = new modelConstructor(data);
          model.config(endpointConfig);
          model.__request = clone(request);
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

},{"./request.class":17,"./settings":18,"./url-builder.class":20,"./utils.class":21}],15:[function(require,module,exports){
/**
 * @constructor
 */
class HTTPMock {
	constructor(verbose = false) {
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
	open(method, url) {
		this.log(`Opening ${url} using ${method}`);
	}
	/**
	 * Mock representation of the XMLHttpRequest send method
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send}
	 * @param {object} body 
	 * @returns {undefined}
	 */
	send(body) {
		this.log(`Sending with ${body}`);
		if ('function' === typeof this.listeners.load) {
			let mockResponse = {
				response : {'mock_response' : true, 'data' : ['obj1']},
				responseText : "{'mock_response' : true}",
				status : 200,
				statusText : '200',
				responseURL : '/mock-call'
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
	getAllResponseHeaders() {
		return "Mock-Headers: true";
	}
	/**
	 * Representation of Javascript's addEventListener designed to hook into this
	 * mock XMLHttpRequest object
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
	 * @param {string} name - The name of the event to listen for
	 * @param {function} callback - Function to call when event is triggered
	 */
	addEventListener(name, callback) {
		this.log(`${name} listener registered`);
		this.listeners[name] = callback;
	}
	/**
	 * Just a stub so we have a uniform interface between this and the real thing
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/setRequestHeader}
	 * @param {string} header 
	 * @param {string} value 
	 */
	setRequestHeader(header, value) {
		return true;
	}
	/**
	 * Helper function for logging status output based on this object's 
	 * verbosity settings (true/false)
	 * @param {string} message 
	 */
	log(message) {
		if (this.verbose === true) {
			console.log(message);
		}
	}
}

module.exports = HTTPMock;

},{}],16:[function(require,module,exports){
const jsonpatch = require('fast-json-patch');
const clone = require('./utils.class').clone;
const noop = require('./utils.class').noop;
const Request = require('./request.class');

/**
 * @constructor
 */
class Model {
  constructor(data = {}) {
    Object.defineProperty(this, '__config', {enumerable : false, writable : true});
    Object.defineProperty(this, '__response', {enumerable : false, writable : true});    
    Object.defineProperty(this, '__original', {value : data, writable : true});
    Object.defineProperty(this, '__revision', {value : Date.now(), writable : true});

    Object.assign(this, clone(data));
  }
  /**
   * Persists this model back to the api
   * @param {function=} cb - Callback to invoke on completion (failure or success)
   * @returns {Request} 
   */
  save(cb = noop) {
    let headers = {};
    try {
      headers = this.__config.api().commonHeaders();
    } catch(e) {
      //ignore
    }

    let method = this['id'] ? 'put' : 'post';
    let instance = this;
    
    let request = new Request()
      .url(this.makeHref())
      .method(method)
      .headers(headers)
      .body(this)
      .exec()
      .then((response) => {
        Object.assign(instance, clone(response.data));
        instance.__revision = Date.now();
        instance.__response = response;
        instance.makeClean();
        cb();
        return instance;
      }).catch(err => {
        cb(err);
      });

    return request;
  }

  /**
   * Gets a list of changes that have occured since the last get/save
   * @returns {Request}
   */
  changes() {
    let headers = this.__config.api().commonHeaders();
    let targetUrl = this['@changes'];
    let request = new Request()
      .url(targetUrl)
      .query({search : {since : this.__revision}})
      .method('get')
      .headers(headers)
      .exec();
    return request;
  }
  
  /**
   * Starts listening for changes and calls onChange whenever they are detected
   * @param {function} onChange - Function to call when changes detected
   * @param {number} refreshRate - the duration (in milliseconds) between checks
   * @returns {this}
   */
  subscribe(onChange, ttl = 3000) {
    setInterval(() => {
      this.changes().then(changeList => {
        if (changeList && changeList.length) {
          this.__revision = Date.now();
          onChange(changeList, Date.now());
        }
      });
    },ttl);

    return this;
  }

  /**
   * Puts only the changes (in patch notation) back to the api. The 
   * server-side endpoint must support PATCH
   * @returns {Request}
   */
  update() {
    //use patch
    let headers = this.__config.api().commonHeaders();

    let patches = this.getDiffs();
    let targetUrl = this.makeHref();
    let instance = this;
    let request = new Request()
      .url(targetUrl)
      .method('patch')
      .headers(headers)
      .body(patches)
      .exec()
      .then((response) => {
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
  config(endpointConfig = {}) {
    this.__config = endpointConfig;
  }

  makeHref() {
    let correctHref;
    if ('object' === typeof this.__config) {
      correctHref = this.__config.baseUrl() + this.__config.url();
      if ('string' === typeof this.id ) {
        correctHref += this.id;
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
  getDiffs() {
    return jsonpatch.compare(this.__original, this);
  }
  /**
   * Returns the current status of this model
   * @returns {boolean}
   */
  isDirty() {
    return this.getDiffs().length > 0;
  }
  /**
   * Clears out the change history and syncs the underlying original version
   * to the current version
   * @returns {undefined}
   */
  makeClean() {
    this.__original = clone(this);
  }

  /**
   * Removes this modal from the api
   * @param {function=} cb - Function to call on completetion (success or failure)
   * @returns {Request}
   */
  remove(cb = noop) {
    let headers = {};
    try {
      headers = this.__config.api().commonHeaders();
    } catch(e) {}

    let targetUrl = this.makeHref();
    let instance = this;
    
    let request = new Request()
      .url(targetUrl)
      .method('delete')
      .headers(headers)
      .exec()
      .then((response) => {
        instance.__response = response;
        return cb();
      }).catch(err => {
        return cb(err);
      });
    return request;
  }

}

module.exports = Model;
},{"./request.class":17,"./utils.class":21,"fast-json-patch":6}],17:[function(require,module,exports){
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
    return clone(this.config);
  }
}

module.exports = Request;

},{"./settings":18,"./transport.class.js":19,"./utils.class":21}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
const clone = require('./utils.class').clone;
const querystring = require('querystring');

/**
 * @constructor
 */
class Transport {
	constructor(request) {
		if ('undefined' !== typeof window && window.XMLHttpRequest) {
			this.HTTPRequest = window.XMLHttpRequest;
		} else {
			this.HTTPRequest = require('./http-mock.class.js'); //used for Node based tests
		}
		this.setRequest(request);
	}
	/**
	 * Stores the request object for use later (ie when .exec() gets called). Helpfull 
	 * if building the transport request up instead of passing everything into constructor.
	 * @param {Request} request 
	 * @returns {this}
	 */
	setRequest(request) {
		this.request = clone(request);
		return this;
	}
	/**
	 * Makes the actual api call using the Request object that was passed into the constructor 
	 * or added using the setRequest method.
	 * @returns {Promise}
	 */
	exec() {
		let Promise = require('./settings').getPromise();		
		let instance = this;
		
		return new Promise((resolve, reject) => {
			
			let httpInstance = new instance.HTTPRequest();
			let url = instance.request.url() ;

			let query = querystring.stringify(instance.request.query());
			if (query && query.length) {
				url = url + '?' + query;
			}
			let body = instance.request.body();
			if ('object' === typeof body) {
				body = JSON.stringify(body);
			}
			
			httpInstance.addEventListener("load", transferComplete);
			httpInstance.addEventListener("error", transferFailed);
			httpInstance.addEventListener("abort", transferAborted);
			httpInstance.open( instance.request.method().toUpperCase(), url );
			httpInstance.responseType = 'json';
			
			let headers = instance.request.headers();
			httpInstance.setRequestHeader("Content-Type", instance.request.mediaType());	
			
			for ( let headerName in headers ) {
				httpInstance.setRequestHeader(headerName, headers[headerName]);
			}
			httpInstance.send( body );

			/**
				* Handler:Aborted
				*/
			function transferAborted() {
				let failed = new Error('Transfer cancelled.');
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
}

module.exports = Transport;

},{"./http-mock.class.js":15,"./settings":18,"./utils.class":21,"querystring":10}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
/**
 * @constructor
 */
class Utils {
    constructor() {

    }
    /**
     * Does nothing
     * @returns {undefined}
     */
    static noop() {

    }

    /**
     * Creates a deep copy of the passed in object
     * @param {object} obj - Object to copy
     * @returns {object} Copied object
     */
    static clone(obj) {
        return privateClone(obj);
    }
}
/**
 * Allows are static method to call this recursively
 * @param {object} obj
 * @private
 * @returns {object} Copied object 
 */
function privateClone(obj) {
   if(obj === null || typeof(obj) != 'object') {
      return obj;
   }
   var temp = new obj.constructor();
   for(var key in obj) {
      temp[key] = privateClone(obj[key]);
   }
   return temp;
}

module.exports = Utils;
},{}]},{},[1])(1)
});