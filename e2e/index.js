let api;
let Model;
let testModel;

beforeEach(() => {
  api = new officebotSdk.APIConfig();
  Model = officebotSdk.Model;

  api.baseUrl('http://localhost:5544/api');

  api
    .endpoint('Test')
    .url('/');

  testModel = api.Test.createNew({sample : 'data'});
});

describe('Endpoint', () => {
  it('Should talk to the server', (done) => {
    api.Test
    .find()
    .exec()
    .then((response) => {
      assert(Array.isArray(response));
      done();
    }).catch(err => {
      assert(false);
      done(err);
    });
  });

  it('Should correctly implement "skip"', (done) => {
    api.Test
    .find()
    .skip(10)
    .exec()
    .then((response) => {
      let success = Array.isArray(response) && response[0].id == 10; //id is zero-index on test server
      assert(success);
      done();
    });
  });

  it('Should correctly implement .limit', (done) => {
    api.Test
    .find()
    .limit(5)
    .exec()
    .then((response) => {
      let success = Array.isArray(response) && response.length === 5;
      assert(success);
      done();
    });
  });

  it('Should correctly implement .select', (done) => {
    api.Test
    .find()
    .select('id title')
    .exec()
    .then(response => {
      let firstItem = response[0];
      
      assert(firstItem && firstItem.title);
      done();
    });
  });

  it('Should correctly pass a query to the server', (done) => {
    api.Test
    .find({id : 1})
    .exec()
    .then(response => {
      let success = Array.isArray(response) && response.length == 1 && response[0].id == 1;
      assert(success);
      done();
    });
  });

  describe('.findById()',() => {
    it('Should return one model', (done) => {
      api.Test
      .findById('1')
      .exec()
      .then(response => {
        assert(response instanceof Model);
        done();
      });
    });
  });
  
  describe('.findByIdAndUpdate()',() => {
    it('Should return one model', (done) => {
      api.Test
      .findById('1')
      .exec()
      .then(response => {
        assert(response instanceof Model);
        done();
      });
    });
  });

  describe('.findByIdAndRemove()', () => {
    it('Should return one model', (done) => {
      api.Test
      .findById('1')
      .exec()
      .then(response => {
        assert(response instanceof Model);
        done();
      });
    });
  });
});

describe('Models', () => {
  it('Should call the api on .save', (done) => {
    testModel.save().then(() => {
      let statusCode = testModel.__response.status;
      assert(statusCode === 201);
      done();      
    });
  });
  it('Should call the api on .remove', (done) => {
    testModel._id = '12345';
    testModel.remove().then(() => {
      let statusCode = testModel.__response.status;
      assert(statusCode === 204);
      done();      
    });
  });
  it('Should call the api on .update with a list of diffs', (done) => {
    testModel._id = '12345';
    testModel.name = 'Update Call';
    testModel.update().then(() => {
      let statusCode = testModel.__response.status;
      assert(statusCode === 200);
      done();      
    });
  });
});