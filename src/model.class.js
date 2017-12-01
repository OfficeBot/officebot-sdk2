const jsonpatch = require('fast-json-patch');
const clone = require('./utils.class').clone;
const noop = require('./utils.class').noop;
const Request = require('./request.class');

/**
 * @constructor
 */
class Model {
    constructor(data = {}) {
            Object.defineProperty(this, '__config', { enumerable: false, writable: true });
            Object.defineProperty(this, '__response', { enumerable: false, writable: true });
            Object.defineProperty(this, '__original', { value: data, writable: true });
            Object.defineProperty(this, '__revision', { value: Date.now(), writable: true });

            Object.assign(this, clone(data));
        }
        /**
         * Persists this model back to the api
         * @param {function=} cb - Callback to invoke on completion (failure or success)
         * @returns {Request}
         */
    save(cb = noop) {
        let headers = {};
        try {
            headers = this.__config.api().commonHeaders();
        } catch (e) {
            //ignore
        }

        let method = this.id ? 'put' : 'post';
        let instance = this;

        let request = new Request()
            .url(this.makeHref())
            .method(method)
            .headers(headers)
            .body(this)
            .exec()
            .then((response) => {
                Object.assign(instance, clone(response.data));
                instance.__revision = Date.now();
                instance.__response = response;
                instance.makeClean();
                cb();
                return instance;
            }).catch(err => {
                cb(err);
                throw err;
            });

        return request;
    }

    /**
     * Gets a list of changes that have occured since the last get/save
     * @returns {Request}
     */
    changes() {
        let headers = this.__config.api().commonHeaders();
        let targetUrl = this['@changes'];
        let request = new Request()
            .url(targetUrl)
            .query({ search: { since: this.__revision } })
            .method('get')
            .headers(headers)
            .exec();
        return request;
    }

    /**
     * Starts listening for changes and calls onChange whenever they are detected
     * @param {function} onChange - Function to call when changes detected
     * @param {number} refreshRate - the duration (in milliseconds) between checks
     * @returns {this}
     */
    subscribe(onChange, ttl = 3000) {
        setInterval(() => {
            this.changes().then(changeList => {
                if (changeList && changeList.length) {
                    this.__revision = Date.now();
                    onChange(changeList, Date.now());
                }
            });
        }, ttl);

        return this;
    }

    /**
     * Puts only the changes (in patch notation) back to the api. The
     * server-side endpoint must support PATCH
     * @returns {Request}
     */
    update() {
        //use patch
        let headers = this.__config.api().commonHeaders();

        let patches = this.getDiffs();
        let targetUrl = this.makeHref();
        let instance = this;
        let request = new Request()
            .url(targetUrl)
            .method('patch')
            .headers(headers)
            .body(patches)
            .exec()
            .then((response) => {
                Object.assign(instance, clone(response.data));
                instance.__revision = Date.now();
                instance.__response = response;
                instance.makeClean();
            });
        return request;
    }

    /**
     * Sets the underlying API config
     * @param {EndpointConfig} endpointConfig
     */
    config(endpointConfig = {}) {
        this.__config = endpointConfig;
    }

    makeHref() {
        let correctHref;
        if ('object' === typeof this.__config) {
            correctHref = this.__config.baseUrl() + '/' + this.__config.url() + '/';
            if ('string' === typeof this.id) {
                correctHref += this.id;
            }
        } else {
            correctHref = '/__unit_test__';
        }
        return correctHref;
    }

    /**
     * Returns a list of diffs comparing this version to the last
     * synced version from the server
     * @private
     * @returns {object[]} Array of changes
     */
    getDiffs() {
            return jsonpatch.compare(this.__original, this);
        }
        /**
         * Returns the current status of this model
         * @returns {boolean}
         */
    isDirty() {
            return this.getDiffs().length > 0;
        }
        /**
         * Clears out the change history and syncs the underlying original version
         * to the current version
         * @returns {undefined}
         */
    makeClean() {
        this.__original = clone(this);
    }

    /**
     * Removes this modal from the api
     * @param {function=} cb - Function to call on completetion (success or failure)
     * @returns {Request}
     */
    remove(cb = noop) {
        let headers = {};
        try {
            headers = this.__config.api().commonHeaders();
        } catch (e) {}

        let targetUrl = this.makeHref();
        let instance = this;

        let request = new Request()
            .url(targetUrl)
            .method('delete')
            .headers(headers)
            .exec()
            .then((response) => {
                instance.__response = response;
                return cb();
            }).catch(err => {
                return cb(err);
            });
        return request;
    }

}

module.exports = Model;