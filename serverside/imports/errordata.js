/**
 * Error Data.
 *
 * @author Abdul Abshir and Thomas Rientjes
 * @version 0.4.6
 * MIT Licensed
 */

module.exports = function (name, type, message, code) {
	this.name = name;
	this.type = type;
	this.message = message;
	this.code = code;
};
