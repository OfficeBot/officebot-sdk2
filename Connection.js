function Request(method, url, headers = []) {
	let notifyCb = function noop() {/** noop */};

	let deferred = new Promise(function(resolve, reject) {

		let instance = new XMLHttpRequest();

		instance.addEventListener("load", transferComplete);
		instance.addEventListener("error", transferFailed);
		instance.addEventListener("abort", transferCanceled);

		instance.open(method, url);
		instance.send();

		function transferComplete() {
			if (instance.status < 400) {
				resolve(parseResponse());
			} else {
				reject(parseError());
			}
		}

		function transferFailed() {
			reject(parseError());
		}

		function transferCanceled() {
			reject(parseError());
		}

		function parseResponse() {
			return instance.response;
		}

		function parseError() {
			return {
				status : instance.status,
				response : instance.response
			};
		}
	});

	return deferred;

}

/**
	* @factory
	*/
function http() {
	let instance = Object.create({});

	instance._method = 'GET';
	instance._url = '';
	instance._transform = undefined;
	instance._headers = [];

	instance.header = function(headerName = '', headerValue = '') {
		instance._headers.push(headerName, headerValue);
		return this;
	}

	instance.method = function(methodString) {
		if ('string' !== typeof methodString) {
			return new Error('Invalid method. Method must be of type "string".');
		}
		instance._method = methodString.toUpperCase();
		return instance;
	};

	instance.url = function(urlString) {
		if ('string' !== typeof urlString) {
			return new Error('Invalid url. Url must be of type "string".');
		}
		instance._url = urlString;
		return instance;
	};

	instance.transform = function(transformation) {
		if ('function' === typeof transformation) {
			instance._transform = transformation.bind(instance);
		}
		return instance;
	}

	instance.exec = function() {
		let req = new Request(instance._method, instance._url);
		return req.then(function onSuccess(data) {
			let response;
			try {
				response = JSON.parse(data);
			} catch(e) {
				return data;
			}
			if ('object' !== typeof response) {
				throw new Error('Invalid JSON response.');
			}
			if ('function' !== typeof instance._transform) {
				return response;
			}
			if (Array.isArray(response)) {
				return response.map(instance._transform);
			}
			return instance._transform(response);

		});
	}

	return instance;
}

class ApiEndpoint {
	constructor(config = {}) {
		let defaults = {
			baseUrl : '',
			route : ''
		};
		Object.assign(this, defaults, config);
	}

	route(url) {
		this.route = ['',this.baseUrl,url].join('/');
	}

	model(modelDef = {}) {

	}
}

function api() {
	let instance = Object.create({});
	instance = {
		_base : '',
		_version : '',
		_endpoints : {}
	};
	instance.prototype = {
		setBaseRoute : setBaseRoute,
		endpoint : endpoint
	};
	return instance;

	function setBaseRoute(url) {
		instance._base = url;
		return this;
	}

	function version(vId) {
		instance._version = vId + '';
		return this;
	}

	function getUrl() {
		let url = ['', instance._base, instance._version ];
		return url.join('/');
	}

	function endpoint(name) {
		//call constructor using params from this object
		let newEndpoint = new ApiEndpoint({
			baseUrl : getUrl()
		});
		instance._endpoints[name] = newEndpoint;
		instance[name] = newEndpoint;
	}

}


//sample code
let a = http()
	.method('get')
	.url('http://localhost:3000/api/v0/users_bad')
	.exec()
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {

	});
