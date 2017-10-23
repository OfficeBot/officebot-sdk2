let chai = require('chai');
let spies = require('chai-spies');
let expect = chai.expect;
let assert = chai.assert;
chai.use(spies);

let ApiConfig = require('../src/api-config.class.js');
let instance;

beforeEach(() => {
    instance = new ApiConfig();
});

describe('Api Config class', () => {
  it('Should be a constructor', () => {
    assert('function' === typeof ApiConfig);
  });
  it('Should have a .baseUrl method', () => {
    assert('function' === typeof instance.baseUrl);
  });
  it('Should have a .endpoint method', () => {
    assert('function' === typeof instance.endpoint);
  });
  it('Should have a .commonHeaders method', () => {
    assert('function' === typeof instance.commonHeaders);
  });

  describe('.baseUrl()', () => {
    it ('Should return "this" when passed a string', () => {
      let response = instance.baseUrl('/');
      assert(response === instance);
    });
    it ('Should correctly persist a string url', () => {
      let url = '/test';
      instance.baseUrl(url);
      assert(url === instance.baseUrl());
    });
    it ('Should return a string when called without params', () => {
      let response = instance.baseUrl();
      assert('string' === typeof response);
    });
  });

  describe('.endpoint()', () => {
    it ('Should always return an object', () => {
      let response = instance.endpoint();
      assert('object' === typeof response && response !== null);
    });

  });
});