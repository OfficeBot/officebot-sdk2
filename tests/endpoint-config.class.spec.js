let chai = require('chai');
let spies = require('chai-spies');
let expect = chai.expect;
let assert = chai.assert;
chai.use(spies);

let EndpointConfig = require('../src/endpoint-config.class.js');
let instance;

beforeEach(() => {
    instance = new EndpointConfig();
});

describe('Endpoint Config class', () => {
  it('Should be a constructor', () => {
    assert('function' === typeof EndpointConfig);
  });
  it('Should have a .api method', () => {
    assert('function' === typeof instance.api);
  });
  it('Should have a .baseUrl method', () => {
    assert('function' === typeof instance.baseUrl);
  });
  it('Should have a .url method', () => {
    assert('function' === typeof instance.url);
  });
  it('Should have a .model method', () => {
    assert('function' === typeof instance.model);
  });
  it('Should have a .mediaType method', () => {
    assert('function' === typeof instance.mediaType);
  });

  describe('.api()', () => {
    it('Should return "this" when called with a config object', () => {
      let response = instance.api({});
      assert(response === instance);
    });
    it('Should return a config object when called with no params', () => {
      let response = instance.api();
      assert('object' === typeof response && response !== null);
    });
    it('Should persist config settings', () => {
      let config = {'sample' : 'data'};
      instance.api(config);
      assert(instance.api().sample === 'data');
    });
    // it('Should not create a closure', () => {
    //   let config = {'sample' : 'data'};
    //   instance.api(config);
    //   config.sample = 'updated';
    //   assert(instance.api().sample === 'data');
    // });
  });
  describe('.baseUrl()', () => {
    it('Should return a string when called with no params', () => {
      assert('string' === typeof instance.baseUrl());
    });
  });
  describe('.url()', () => {
    it('Should return a string when called with no params', () => {
      assert('string' === typeof instance.url());
    });
    it('Should return "this" when called with a string', () => {
      assert(instance === instance.url('/test'));
    });
    it('Should persist a string value', () => {
      let url = '/test';
      instance.url(url);
      assert(url === instance.url());
    });
    it('Should not persist non-string values', () => {
      let url = false;
      instance.url(url);
      assert('string' === typeof instance.url());
    });
  });
  describe('.mediaType',() => {
    it('Should return a string when called with no params', () => {
      assert('string' === typeof instance.mediaType());
    });
    it('Should return "this" when called with a string', () => {
      assert(instance === instance.mediaType('text/xml'));
    });
    it('Should persist a string value', () => {
      let mime = 'text/plain';
      instance.mediaType(mime);
      assert(mime === instance.mediaType());
    });
    it('Should not persist non-string values', () => {
      let mime = {text : 'plain'};
      instance.mediaType(mime);
      assert('string' === typeof instance.mediaType());
    });
  });
  describe('.model()', () => {
    it('Should return a constructor', () => {
      let isConstructor = true;
      let constructorFn = instance.model();
      try {
        let test = new constructorFn();
      } catch(e) {
        isConstructor = false;
      }
      assert(isConstructor === true);
    });
    it('Should set a constructor function when passed a function', () => {
      let newConstructor = function() {};
      instance.model(newConstructor);
      assert(instance.model() === newConstructor);
    });
    it('Should not save non-function params', () => {
      let newConstructor = 'not a function';
      let response = instance.model(newConstructor);
      assert(response === instance && instance.model() !== newConstructor);
    });
  });
});