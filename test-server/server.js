/**
 * Mock API for end-to-end testing
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/*
 * Build up our test api router logic
 */
let API_BASE ='/api/test';
let router = express.Router();
/*
 * Collection endpoints
 */
router.route(API_BASE)
  .get(getSampleCollection)
  .post(createItem);
/*
 * Element endpoints
 */
router.route(API_BASE + '/:id')
  .get(getSampleItem)
  .put(saveItem)
  .patch(updateItem)
  .delete(removeItem);


app
  /*
   * CORS Middleware - since this is a test server that will be accessed from Karma via a different
   * port, we need to enable CORS
   */
  .all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Expose-Headers","X-Auth-Token");
    return next();
  })
  /*
  * Basic server setup for json body parsing
  */
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  /*
   * Needed to ensure Karma handles the CORS request okay
   */
  .options('*', function(req, res, next) {
    return res.status(200).end();
  })
  .use(parseQuery) // Mimick the way we normally handle queries on production api
  .use(router) // The actual router logic
  /*
   * 404 handler
   */
  .use(function(req, res, next) {
    console.error(`Could not find ${req.originalUrl} using ${req.method}`);
    return res.status(404).end();
  });

/**
 * Mock create function that just echos back to data that was sent via req.body
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function createItem(req, res, next) {
  let model = req.body;
  model.id = '1234567890';
  console.log(`[${new Date()}] Create called`);
  return res.status(201).json(model);
}

/**
 * Mock PUT handler for updating a model. Just returns the correct status code
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function saveItem(req, res, next) {
  console.log(`[${new Date()}] Save called`);
  return res.status(200).end();
}

/**
 * Mock update (via PATCH). Since there's nothing to actually persist, we're going
 * to pretend everything works okay (we should check the request body better) and
 * return the correct status code
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function updateItem(req, res, next) {
  console.log(`[${new Date()}] Update called`);
  if (!req.body || !Array.isArray(req.body) || 'string' !== typeof req.body[0].op) {
    return res.status(400).send('Missing diffs array');
  }
  return res.status(200).end();
}

/**
 * Mock remove call. Since there is no database, there is nothing to actually do except
 * return the correct status code
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function removeItem(req, res, next) {
  console.log(`[${new Date()}] Remove called`);
  return res.status(204).end();
}
/**
 * Returns a mock collection of sample items. The number of items should match the
 * requested amount (using req.limit)
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
function getSampleCollection(req, res, next) {
  let skip = req.skip || 0;
  let limit = req.limit || 100;
  
  let itemTemplate = function(itemNumber) {
    return {
      id : itemNumber,
      title : 'Item ' + itemNumber,
      body : {
        sample : 'data'
      }
    };
  };
  let collection = [];

  for (let k = 0; k < limit; ++k) {
    let item = new itemTemplate(k + skip);
    collection.push(item);
  }

  if (req.search && Object.keys(req.search).length) {
    let filteredCollection = collection.filter(item => {
      let isMatch = true;
      for (let i in req.search) {
        if (item[i] !== req.search[i]) {
          isMatch = false;
          break;
        }
      }
      return isMatch;
    });
    collection = filteredCollection;
  }

  if ('string' === typeof req.fields) {
    let fields = req.fields.split(' ');
    let filteredCollection = collection.map(item => {
      let obj = {};
      for (let i in item) {
        if (fields.indexOf(i) !== -1) {
          obj[i] = item[i];
        }
      }
      return obj;
    });
    collection = filteredCollection;
  }

  res.status(200).json(collection);
}

/**
 * Return a single sample object
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function getSampleItem(req, res, next) {
  let item = {
    title : 'Item 1',
    body : {
      sample : 'data 1'
    }
  };

  res.status(200).json(item);
}

/**
 * Wire up some middleware logic that will transform our standard request into a 
 * "smart" request the same way our production server does it
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
function parseQuery(req, res, next) {
  if (req.query.skip) {
    let skip = parseInt(req.query.skip);
    if (!isNaN(skip)) {
      req.skip = skip;
    } else {
      req.skip = 0;
    }
  }
  if (req.query.limit) {
    let limit = parseInt(req.query.limit);
    if (!isNaN(limit)) {
      req.limit = limit;
    } else {
      req.skip = 100;
    }
  }

  if(req.query.fields) {
    req.fields = req.query.fields;
  }

  if(req.query.search) {
    if ('string' === typeof req.query.search) {
      try {
        req.search = JSON.parse(req.query.search);
      } catch(e) {
        //ignore
      }
    } else if ('object' === typeof req.query.search && req.query.search !== null) {
      req.search = req.query.search;
    }
  }
  return next();
}
/*
 * Start the server and send off control message (if this is being run as part of e2e tests)
 */
app.listen(5544, (err) => {
  if (err) {
    throw err;
  }
  console.info(`[${new Date()}] Sample api server active on 5544`);
  if ('function' === typeof process.send) {
    process.send({status : 1});
  }
});

/*
 * Listen for control messages to close this server from e2e tests
 */
process.on('message', (m) => {
  if (m.status == 2) {
    process.exit();
  }
});