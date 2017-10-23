const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const Request = require('../src/request.class.js');
let instance;

beforeEach(() => {
  instance = new Request();
});

describe('Request class', () => {
  it('Should be a constructor', () => {
    assert('function' === typeof Request);
  });
  it('Should have .exec method', () => {
    assert('function' === typeof instance.exec);
  });
  it('Should have .query method', () => {
    assert('function' === typeof instance.query);
  });
  it('Should have .method method', () => {
    assert('function' === typeof instance.method);
  });
  it('Should have .url method', () => {
    assert('function' === typeof instance.url); 
  });
  it('Should have .headers method', () => {
    assert('function' === typeof instance.headers); 
  });
  it('Should have .body method', () => {
    assert('function' === typeof instance.body);
  });
  it('Should have a .mediaType method', () => {
    assert('function' === typeof instance.mediaType);
  })
  it('Should have .toJSON method', () => {
    assert('function' === typeof instance.toJSON);    
  });

  describe('.exec()', () => {
    it('Should return a promise', () => {
      assert(instance.exec() instanceof Promise);
    });
  });
  describe('.query()', () => {
    it('Should return "this" when called with params', () => {
      assert(instance === instance.query({}));
    });
    it('Should return an object when called without params', () => {
      assert('object' === typeof instance.query());
    });
    it('Should persist a value', () => {
      let query = {a : 1};
      instance.query(query);
      assert(instance.query().a === 1);
    });
    it('Should not create a closure', () => {
      let query = {a : 1};
      instance.query(query);
      query.a = 2;
      assert(instance.query().a === 1 && query.a === 2);
    });
  });
  describe('.method()', () => {
    it('Should return "this" when called with params', () => {
      assert(instance === instance.method('get'));
    });
    it('Should return string when called without params', () => {
      assert('string' === typeof instance.method());
    });
    it('Should persist a value', () => {
      let method = "PATCH";
      instance.method(method);
      assert(method === instance.method());
    });
    it('Should not persist invalid values', () => {
      let method = 'post';
      instance.method(method);
      method = {type : 'get'};
      instance.method(method);
      assert(instance.method() === 'post');
    });
  });
  describe('.url()', () => {
    it('Should return a string', () => {
      assert('string' === typeof instance.url());
    });
    it('Should return "this" when called with params', () => {
      assert(instance === instance.url('/'));
    });
    it('Should not persist invalid values', () => {
      instance.url('/test');
      instance.url({place : '/another'});
      assert(instance.url() === '/test');
    });
    it('Should persist valid values', () => {
      instance.url('/test');
      assert(instance.url() === '/test');
    });
  });
  describe('.headers()', () => {
    it('Should return "this" when called with a parameter', () => {
      assert(instance === instance.headers({sample : 'header'}));
    });
    it('Should return an object', () => {
      assert('object' === typeof instance.headers());
    });
    it('Should not create a closure', () => {
      let newHeaders = {some : 'header'};
      instance.headers(newHeaders);
      newHeaders.some = 'updated header';
      assert(instance.headers().some === 'header' && newHeaders.some === 'updated header');
    });
    it('Should not persist invalid values', () => {
      let newHeaders = {some : 'header'};
      instance.headers(newHeaders);
      instance.headers("not valid");
      assert(instance.headers().some === 'header');
    });
    it('Should persist valid values', () => {
      let newHeaders = {some : 'header'};
      instance.headers(newHeaders);
      assert(instance.headers().some === 'header');
    });
  });
  describe('.body()', () => {
    it('Should return undefined when called initially', () => {
      assert('undefined' === typeof instance.body());
    });
    it('Should persist valid values', () => {
      let newBody = {some : 'body'};
      instance.body(newBody);
      assert(instance.body().some === 'body');
    });
    it('Should not create a closure', () => {
      let newBody = {some : 'body'};
      instance.body(newBody);
      newBody.some = 'other body';
      assert(instance.body().some === 'body' && newBody.some === 'other body');
    });
    it('Should not persist invalid values', () => {
      let newBody = {some : 'body'};
      instance.body(newBody);
      instance.body("something invalid");
      assert(instance.body().some === 'body');      
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
  describe('.toJSON()', () => {
    it('Should return an object', () => {
      let json = instance.toJSON();
      assert('object' === typeof json && json !== null);
    });
    it('Should not create a closure', () => {
      instance.method('put');      
      let json = instance.toJSON();
      json.method = 'delete';
      assert(instance.method() === 'put');      
    });
  });
});