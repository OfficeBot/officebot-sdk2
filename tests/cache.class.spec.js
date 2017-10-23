let chai = require('chai');
let spies = require('chai-spies');
let expect = chai.expect;
let assert = chai.assert;
chai.use(spies);

let Cache = require('../src/cache.class.js');
let instance;

beforeEach(() => {
    instance = new Cache();
});

describe('Cache class', () => {
    it('should be a constructor', () => {
        assert('function' === typeof Cache);
    });
    it ('should have a .get() method', () => {
        assert('function' === typeof instance.get);
    });
    it ('should have a .put() method', () => {
        assert('function' === typeof instance.put);
    });
    it ('should have an .invalidate method', () => {
        assert('function' === typeof instance.invalidate);
    });
    it ('should have a .setTTL method', () => {
        assert('function' === typeof instance.setTTL);
    });
    describe('.put()', () => {
        it ('should throw an error with invalid name', () => {
            let pass = true;
            try {
                instance.put(null, 'test');
            } catch(e) {
                pass = false;
            } finally {
                assert(!pass);
            }
        });
        it ('should persist data stored in it', () => {
            let obj = {'sample' : 'data'};
            instance.put('test', obj);
            let cachedObject = instance.get('test');
            assert(cachedObject.sample === 'data');
        });
        it ('should not return stale data', () => {
            let obj = {'sample' : 'data'};
            instance.setTTL(-1); //no cache
            instance.put('test', obj);
            let cachedObject = instance.get('test');
            assert('undefined' === typeof cachedObject);
        });
        it ('should indicate if data was returned from the cache', () => {
            let obj = {'sample' : 'data'};
            instance.put('test', obj);
            let cachedObject = instance.get('test');
            assert(cachedObject.__fromCache === true);
        });
    });
    describe('.get()', () => {
        it ('Should return "undefined" on objects that do not exist', () => {
            let obj = instance.get('test');
            assert('undefined' === typeof obj);
        });
        it ('Should return full objects', () => {
            let testFn = function() { this.name = 'my name'; };
            testFn.prototype.sample = function() { return this.name; };
            let testInstance = new testFn();
            instance.put('test', testInstance);
            let cachedObject = instance.get('test');
            assert( 'object' === typeof cachedObject && 
                'function' === typeof cachedObject.sample && 
                'my name' === cachedObject.sample());
        });
        it ('Should correctly return arrays', () => {
            let test = [1,2,3];
            instance.put('test', test);
            let cached = instance.get('test');
            assert(Array.isArray(cached));
        });
        it ('Should correctly return strings', () => {
            let test = 'obj1';
            instance.put('test', test);
            let cached = instance.get('test');
            assert(cached == 'obj1'); //jshint ignore:line
        });
        it ('Should correctly return numbers', () => {
            let test = 42;
            instance.put('test', test);
            let cached = instance.get('test');
            assert(cached == 42); //jshint ignore:line
        });
        it ('Should correctly return booleans', () => {
            let test = true;
            instance.put('test', test);
            let cached = instance.get('test');
            assert(cached == true); //jshint ignore:line
        });
    });
    describe('.invalidate()', () => {
        it ('Should remove an object that exists', () => {
            let obj = {'sample' : 'data'};
            instance.put('test', obj);
            instance.invalidate('test');
            let cached = instance.get('test');
            assert('undefined' === typeof cached);
        });
        it ('Should return true if the object is in the cache', () => {
            let obj = {'sample' : 'data'};
            instance.put('test', obj);
            let val = instance.invalidate('test');
            assert(val === true);
        });
        it ('Should return false if the object is not in the cache', () => {
            let val = instance.invalidate('test');
            assert(val === false);
        });
    });
    describe('.setTTL()', () => {
        it ('Should return true when given a number', () => {
            let val = instance.setTTL(10);
            assert(val === true);
        });
        it ('Should throw an error if passed anything but a number', () => {
            var success = true;
            try {
                instance.setTTL('some time');
            } catch(e) {
                success = false;
            } finally {
                assert(success === false);
            }
        });
    });
});