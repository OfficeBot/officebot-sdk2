/**
 * @constructor
 */
class HTTPMock {
	constructor(verbose = false) {
		this.listeners = {};
		this.verbose = verbose;
	}
	/**
	 * Mock representation of the XMLHttpRequest open method
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open}
	 * @param {string} method 
	 * @param {string} url 
	 * @returns {undefined}
	 */
	open(method, url) {
		this.log(`Opening ${url} using ${method}`);
	}
	/**
	 * Mock representation of the XMLHttpRequest send method
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send}
	 * @param {object} body 
	 * @returns {undefined}
	 */
	send(body) {
		this.log(`Sending with ${body}`);
		if ('function' === typeof this.listeners.load) {
			let mockResponse = {
				response : {'mock_response' : true, 'data' : ['obj1']},
				responseText : "{'mock_response' : true}",
				status : 200,
				statusText : '200',
				responseURL : '/mock-call'
			};
			Object.assign(this, mockResponse);
			this.listeners.load();
		}
	}
	/**
	 * Mock representation of the XMLHttpRequest getAllResponseHeaders method
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders}
	 * @returns {string} The mock headers
	 */
	getAllResponseHeaders() {
		return "Mock-Headers: true";
	}
	/**
	 * Representation of Javascript's addEventListener designed to hook into this
	 * mock XMLHttpRequest object
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
	 * @param {string} name - The name of the event to listen for
	 * @param {function} callback - Function to call when event is triggered
	 */
	addEventListener(name, callback) {
		this.log(`${name} listener registered`);
		this.listeners[name] = callback;
	}
	/**
	 * Just a stub so we have a uniform interface between this and the real thing
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/setRequestHeader}
	 * @param {string} header 
	 * @param {string} value 
	 */
	setRequestHeader(header, value) {
		return true;
	}
	/**
	 * Helper function for logging status output based on this object's 
	 * verbosity settings (true/false)
	 * @param {string} message 
	 */
	log(message) {
		if (this.verbose === true) {
			console.log(message);
		}
	}
}

module.exports = HTTPMock;
