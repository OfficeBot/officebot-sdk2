let chai = require('chai');
let spies = require('chai-spies');
let expect = chai.expect;
let assert = chai.assert;
chai.use(spies);

//need for many of the tests
let EndpointConfig = require('../src/endpoint-config.class.js');
let Endpoint = require('../src/endpoint.class.js');
let instance;

beforeEach(() => {
  let config = new EndpointConfig();
  instance = new Endpoint(config);
});

describe('Endpoint class', () => {
  it('Should be a constructor', () => {
    assert('function' === typeof Endpoint);
  });
  it('Should have .createNew method', () => {
    assert('function' === typeof instance.createNew);
  });
  it('Should have .model method', () => {
    assert('function' === typeof instance.model);
  });
  it('Should have .findById method', () => {
    assert('function' === typeof instance.findById);
  });
  it('Should have .find method', () => {
    assert('function' === typeof instance.find);
  });
  it('Should have .findByIdAndUpdate method', () => {
    assert('function' === typeof instance.findByIdAndRemove);
  });
  it('Should have .allowFromCache method', () => {
    assert('function' === typeof instance.allowFromCache);
  });
  it('Should have a .exec method', () => {
    assert('function' === typeof instance.exec);
  });

  describe('constructor', () => {
    it('should throw an error if no configuration is passed in', () => {
      let newInstance;
      let success = true;
      try {
        newInstance = new Endpoint();
      } catch(e) {
        success = false;
      }
      assert(success === false);
    });
  });

  describe('.createNew()', () => {
    it('Should return an object', () => {
      let model = instance.createNew();
      assert('object' === typeof model);
    });
    it('Should not create a closue', () => {
      let data = {'value' : 1};
      let model = instance.createNew(data);
      data.value++;
      assert(model.value === 1 && data.value === 2);
    });
    it('Should create a valid model', () => {
      let model = instance.createNew();
      assert('function' === typeof model.save);
    });
  });

  describe('.model()', () => {
    it('Should return a constructor when called without params', () => {
      let fn = instance.model();
      assert('function' === typeof fn && 'function' === typeof fn.constructor);
    });
    it('Should return "this" when called with a function', () => {
      let fn = function() {};
      let response = instance.model(fn);
      assert(instance === response);
    });
    it('Should correctly set the insantiation functions', () => {
      let fn = function Test() { return 'A'; };
      instance.model(fn);
      let response = instance.model();
      assert(response === fn && response() === 'A');
    });
  });
  
  describe('.url()', () => {
    it('Should return a string when called without params', () => {
      assert('string' === typeof instance.url());
    });
    it('Should return "this" when called with a string', () => {
      assert(instance === instance.url(''));
    });
  });


  describe('.findById()', () => {
    it('Should return "this"', () => {
      assert(instance === instance.findById('1'));
    });
  });

  describe('.find()', () => {
    it('Should return "this"', () => {
      assert(instance === instance.find());
    });
  });

  describe('.findByIdAndUpdate()', () => {
    it('Should return "this"', () => {
      assert(instance === instance.findByIdAndUpdate('1', {}));
    });
  });

  describe('.findByIdAndRemove()', () => {
    it('Should return "this"', () => {
      assert(instance === instance.findByIdAndRemove('1'));
    });
  });

  describe('.allowFromCache()', () => {
    it('Should return "this" when passed a boolean', () => {
      assert(instance === instance.allowFromCache(true));
    });
    it('Should not set invalid values', () => {
      instance.allowFromCache(true);
      instance.allowFromCache('invalid');
      assert(instance.allowFromCache() === true);
    });
  });
  describe('.exec()', () => {
    it('Should return a promise', () => {
      let p = instance.exec();
      assert(p instanceof Promise);
    });
    it('Should invoke a callback function', (done) => {
      let cb = chai.spy();
      instance.exec(cb).then(() => {
        expect(cb).to.have.been.called();
        done();        
      }).catch(e => {
        assert(false);
        done();
      });
    });
  });
});