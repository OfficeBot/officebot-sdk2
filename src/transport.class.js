const clone = require('./utils.class').clone;
const querystring = require('querystring');

/**
 * @constructor
 */
class Transport {
	constructor(request) {
		if ('undefined' !== typeof window && window.XMLHttpRequest) {
			this.HTTPRequest = window.XMLHttpRequest;
		} else {
			this.HTTPRequest = require('./http-mock.class.js'); //used for Node based tests
		}
		this.setRequest(request);
	}
	/**
	 * Stores the request object for use later (ie when .exec() gets called). Helpfull 
	 * if building the transport request up instead of passing everything into constructor.
	 * @param {Request} request 
	 * @returns {this}
	 */
	setRequest(request) {
		this.request = clone(request);
		return this;
	}
	/**
	 * Makes the actual api call using the Request object that was passed into the constructor 
	 * or added using the setRequest method.
	 * @returns {Promise}
	 */
	exec() {
		let Promise = require('./settings').getPromise();		
		let instance = this;
		
		return new Promise((resolve, reject) => {
			
			let httpInstance = new instance.HTTPRequest();
			let url = instance.request.url() ;

			let query = querystring.stringify(instance.request.query());
			if (query && query.length) {
				url = url + '?' + query;
			}
			let body = instance.request.body();
			if ('object' === typeof body) {
				body = JSON.stringify(body);
			}
			
			httpInstance.addEventListener("load", transferComplete);
			httpInstance.addEventListener("error", transferFailed);
			httpInstance.addEventListener("abort", transferAborted);
			httpInstance.open( instance.request.method().toUpperCase(), url );
			httpInstance.responseType = 'json';
			
			let headers = instance.request.headers();
			httpInstance.setRequestHeader("Content-Type", instance.request.mediaType());	
			
			for ( let headerName in headers ) {
				httpInstance.setRequestHeader(headerName, headers[headerName]);
			}
			httpInstance.send( body );

			/**
				* Handler:Aborted
				*/
			function transferAborted() {
				let failed = new Error('Transfer cancelled.');
				reject(failed);
			}
			/**
				* Handler:Failed
				*/
			function transferFailed(e) {
				reject(httpInstance);
			}
			/**
				* Handler:Finished
				*/
			function transferComplete() {	
				if (httpInstance.status < 400) {
					resolve(httpInstance);
				} else {
					reject(httpInstance);
				}
			}
		});
	}
}

module.exports = Transport;
