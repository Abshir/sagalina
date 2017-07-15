/**
 * Response Data.
 *
 * @author Abdul Abshir and Thomas Rientjes
 * @version 0.4.6
 * MIT Licensed
 */

module.exports = function (action, doc, error, count) {
	
	this.meta = {
		action: action,
		timestamp: new Date()
	};

	this.doc = doc;
	this.error = error;

	if (count !== null && count !== undefined) {
		this.meta.count = count;
	}
};
