const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

const Model = require('../src/model.class.js');
let instance;

beforeEach(() => {
  instance = new Model();
});

describe('Model class', () => {
  it('Should be a constructor', () => {
    assert('function' === typeof Model);
  });
  it('Should be a class', () => {
    let success = true;
    let childClass;
    try {
      childClass = class testClass extends Model {
        constructor() {}
      };
    } catch(e) { //invalid class
      sucess = false;
    }
    assert(success === true && childClass.prototype instanceof Model);
  });

  it('Should have a .save method', () => {
    assert('function' === typeof instance.save);
  });

  it('Should have a .changes method', () => {
    assert('function' === typeof instance.changes);
  });

  it('Should have a .subscribe method', () => {
    assert('function' === typeof instance.subscribe);
  });

  it('Should have a .update method', () => {
    assert('function' === typeof instance.update);
  });

  it('Should have a .getDiffs method', () => {
    assert('function' === typeof instance.getDiffs);
  });

  it('Should have a .isDirty method', () => {
    assert('function' === typeof instance.isDirty);
  });

  it('Should have a .makeClean method', () => {
    assert('function' === typeof instance.makeClean);
  });

  it('Should have a .remove method', () => {
    assert('function' === typeof instance.remove);
  });

  describe('.save()', () => {
    it('Should return a promise', () => {
      assert(instance.save() instanceof Promise);
    });
    it('Should invoke a callback', () => {
      let spy = chai.spy();
      instance.save(spy).then(() => {
        expect(spy).to.have.been.called();
      });
    });
  });

  describe('constructor()', () => {
    it('Should not create any closures', () => {
      let data = {sample : 'value'};
      let newInstance = new Model(data);
      data.sample = 'new value';
      assert(newInstance.sample === 'value' && data.sample === 'new value');
    });
  });

  describe('.remove()', () => {
    it('Should return a promise', () => {
      assert(instance.remove() instanceof Promise);
    });
    it('Should invoke a callback', () => {
      let spy = chai.spy();
      instance.remove(spy).then(() => {
        expect(spy).to.have.been.called();
      });
    });
  });

  describe('.isDirty()', () => {
    it('Should return a boolean', () => {
      assert('boolean' === typeof instance.isDirty());
    });
    it('Should default to false', () => {
      assert(false === instance.isDirty());
    });
    it('Should show true if model has changed', () => {
      instance.title = 'Test change';
      assert(true === instance.isDirty());
    });
  });

});