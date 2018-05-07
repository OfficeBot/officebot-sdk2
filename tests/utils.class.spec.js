const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const utils = require('../src/utils.class');

describe('Utils', () => {
  it('Should have a .noop function', () => {
    assert('function' === typeof utils.noop);
  });
  it('Should have a .clone function', () => {
    assert('function' === typeof utils.clone);
  });

  describe('.noop()', () => {
    it('Should have no return value', () => {
      let response = utils.noop();
      assert(undefined === response);
    });
    it('Should have no side effects', () => {
      let test = {'some' : 'value'};
      utils.noop(test);
      assert('object' === typeof test && test.some === 'value');
    });
  });

  describe('.clone()', () => {
    it('Should create a deep copy', () => {
      let test = { a : {
        value : {
          is : {
            deeply : 'nested'
          }
        }
      }};
      let copy = utils.clone(test);
      assert(copy.a.value.is.deeply === 'nested');
    });
    // it('Should not create a reference', () => {
    //   let test = { a : {
    //     value : {
    //       is : {
    //         deeply : 'nested'
    //       }
    //     }
    //   }};
    //   let copy = utils.clone(test);
    //   test.a.value.is = {'now' : 'missing'};
    //   assert(copy.a.value.is.deeply === 'nested');
    // });
    it('Should copy methods', () => {
      let test = {
        fn : function() {
          return "called";
        }
      };
      let copy = utils.clone(test);
      assert('function' === typeof copy.fn && copy.fn() === 'called');
    });
  });
});