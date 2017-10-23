const chai = require('chai');
const assert = chai.assert;

let settings = require('../src/settings');

describe('Settings', () => {
  it('Should be an object', () => {
    assert('object' === typeof settings && settings !== null);
  });
  it('Should have a .setPromiseLib method', () => {
    assert('function' === typeof settings.setPromiseLib);
  });
  it('Should have a .getPromise method', () => {
    assert('function' === typeof settings.getPromise);
  });
});