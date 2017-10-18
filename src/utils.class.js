/**
 * @constructor
 */
class Utils {
    constructor() {

    }
    /**
     * Does nothing
     * @returns {undefined}
     */
    static noop() {

    }

    /**
     * Creates a deep copy of the passed in object
     * @param {object} obj - Object to copy
     * @returns {object} Copied object
     */
    static clone(obj) {
        return privateClone(obj);
    }
}
/**
 * Allows are static method to call this recursively
 * @param {object} obj
 * @private
 * @returns {object} Copied object 
 */
function privateClone(obj) {
   if(obj === null || typeof(obj) != 'object') {
      return obj;
   }
   var temp = new obj.constructor();
   for(var key in obj) {
      temp[key] = privateClone(obj[key]);
   }
   return temp;
}

module.exports = Utils;