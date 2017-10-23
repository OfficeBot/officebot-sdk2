const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const URLBuilder = require('../src/url-builder.class.js');
let instance;

describe('URL Builder class', () => {
  it('Should be a constructor', () => {
    assert('function' === typeof URLBuilder);
  });
  it('Should have a .toString method', () => {
    assert('function' === typeof URLBuilder.toString);
  });
  describe('constructor',() => {
    it('Should throw an error if called with a string', () => {
      let success = true;
      try {
        instance = new URLBuilder('invalid args');        
      } catch(e) {
        success = false;
      }
      assert(success === false);
    });
    it('Should throw an error if called with a number', () => {
      let success = true;
      try {
        instance = new URLBuilder(42);        
      } catch(e) {
        success = false;
      }
      assert(success === false);
    });
    it('Should throw an error if called with an object', () => {
      let success = true;
      try {
        instance = new URLBuilder({a : '/', b : 'test'});        
      } catch(e) {
        success = false;
      }
      assert(success === false);
    });
  });
  describe('.toString()', () => {
    beforeEach(() => {
      instance = new URLBuilder(['api','test']);
    });
    it('Should always return a string', () => {
      let response = instance.toString();
      assert('string' === typeof response);
    });
    it('Should return a string representing the current target', () => {
      let response = instance.toString();
      assert(response === 'api/test');
    });
  });
});