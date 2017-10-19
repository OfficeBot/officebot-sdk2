# OfficeBot SDK

A handly little utility for interacting with RESTful APIs.

### Prerequisites

This library uses many ES6 features and will only work in modern browsers that support ES6 features. Additionally, the end-to-end test suite requires Node.js to be installed.

### Installation and Getting Started

Install the library via NPM:

```
npm install officebot-sdk
```

When using in the browser, this package will export a single global variable `officebotSdk`. This package can also be included in any 
project that uses Browserify by requiring it in:

```
<script src="node_modules/officebot-sdk/dist/officebot-sdk.min.js"></script>
```
OR
```
const officebotSdk = require('officebot-sdk');
```

### Example Usage

```
let api = new officebotSdk.API();

api
  .baseUrl('http://localhost/api');

api
  .endpoint('Sample')
  .url('/sample');

api.Sample
  .find({id : 1})
  .select('id title')
  .limit(10)
  .exec().then(arrayOfModels => {
    //Do something with the array of models
  }).catch(err => {
    console.error(err);
  });
```

Check out our [documentation](https://www.office-bot.com/sdk/docs) for more examples.

### Building

Though a prebuild version of this library is included with this repository, you may find yourself in a situation where rebuilding it from source is desirable. Two NPM scripts are provided to do exactly that:

```
npm run build
```

Or if you'd prefer a minified version

```
npm run build-minified
```

## Running the tests

Unit tests and end-to-end tests are included. To run the full test suite, first ensure that all dependencies are installed:

```
npm install
```

Then run:
```
npm test
```

### Generating Docs and Coverage Report

NPM scripts for generating documentation are included.

```
npm run coverage && npm run docs
```

## Built With

* [Browserify](http://browserify.org/) - Javascript bundler
* [Istanbul](https://istanbul.js.org/) - Code coverage
* [Karma](https://karma-runner.github.io/1.0/index.html) - Test runner
* [Mocha](https://mochajs.org/) - Unit testing
* [NodeJS](https://nodejs.org/en/) - Provides core libraries for query parsing
* [Fast JSON Patch](https://github.com/Starcounter-Jack/JSON-Patch) - Used to calculate diffs

## Contributing

Please read [Contributing.md](https://github.com/OfficeBot/officebot-sdk2/Contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/OfficeBot/officebot-sdk/tags). 

## Authors

* Scott Peterson - [OfficeBot](https://github.com/OfficeBot)

## License

This project is licensed under the MIT License - see the [LICENSE.md](License.md) file for details

## Acknowledgments

* Billie Thompson - [PurpleBooth](https://github.com/PurpleBooth) for providing the CONTRIBUTING.md gist