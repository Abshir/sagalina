/**
 * Query Tools
 * @class QueryTools
 * @author Abdul Abshir and Thomas Rientjes
 * Simplifies the excecution of CRUD actions.
 * @version 0.4.6
 * MIT Licensed
 */

var _ = require('underscore'),
bodyParser = require('body-parser'),
httpStatus = require('../imports/httpstatus'),
ResponseData = require('../imports/responsedata');

/**
* Saves a newly created document and reports back.
*
* @method create
* @param {Object} Model Model of active entity.
* @param {Object} input Body of active HTTP request.
* @param {Array} lockedFields A list of read-only fields.
* @param {Method} callback Callback method.
* @param {Method} [validate=null] Validation method. 
* @async
*/
exports.create = function (Model, input, lockedFields, callback, validate) {
	deleteFields(input, lockedFields);
	var doc = new Model(input);

	console.log(doc);

	if (validate) {
		validate(doc);
	}

	doc.save(function (error) {

		callback(doc, error);
	});
};

/**
* Fetches a list of existing documents and reports back.
*
* @method list
* @param {Object} Model Model of active entity.
* @param {Object} parsedQuery Contains query conditions and modifiers.
* @param {Array} fields A list of specific query fields.
* @param {Object} options Extended query options.
* @param {Method} callback Callback method.
* @async
*/
exports.list = function (Model, parsedQuery, fields, options, callback) {

	var conditions = parsedQuery.conditions;
	var modifiers = parsedQuery.modifiers;

	Model
	.find(conditions, fields, options)
	.sort(modifiers.sort)
	.limit(modifiers.limit)
	.skip(modifiers.skip)
	.exec(function (error, doc) {
		try {
			Model.find(conditions, {}).count().exec(function (countError, count) {
				callback(doc, error, count);
			});
		} catch (e) {
			callback(doc, error, -1);
		}
	});
};

/**
* Fetches a specific document and reports back.
*
* @method show
* @param {Object} Model Model of active entity.
* @param {Object} Conditions Contains conditions.
* @param {Array} fields List of specific query fields.
* @param {Object} options Extended query options.
* @param {Array} population List of fillable reference fields.
* @param {Method} callback Callback method.
* @async
*/
exports.show = function (Model, conditions, fields, options, population, callback) {

	Model
	.findOne(conditions, fields, options)
	.populate(population)
	.exec(function (error, doc) {
		callback(doc, error);
	});
};

/**
* Alters a specific document and reports back.
*
* @method update
* @param {Object} Model Model of active entity.
* @param {Object} input Body of active HTTP request.
* @param {Object} Conditions Contains conditions.
* @param {Array} lockedFields A list of read-only fields.
* @param {Object} options Extended query options.
* @param {Method} callback Callback method.
* @param {Method} [validate=null] Validation method. 
* @async
*/
exports.update = function (Model, input, conditions, lockedFields, options, callback, validate) {
	
	deleteFields(input, lockedFields);

	Model
	.findOne(conditions, null, options)
	.exec(function (error, doc) {

		if (doc !== undefined && doc !== null) {

			if (validate) {
				validate(doc);
			}

			_.extend(doc, input);

			doc.save(function (error) {
				callback(doc, error);
			});
		} else {
			callback(null, error);
		}
	});
};

/**
* Removes a specific document and reports back.
*
* @method del
* @param {Object} Model Model of active entity.
* @param {Object} Conditions Contains conditions.
* @param {Method} callback Callback method.
* @async
*/
exports.del = function (Model, conditions, callback) {
	
	Model.remove(conditions, function (error, doc) {
		callback(doc, error);
	});
};

/**
* Separates conditions from known modifiers.
*
* @method parse
* @param {Object} parsedQuery Contains query conditions and modifiers.
* @async
*/
exports.parse = function (query) {
	var modifiers, conditions, conditionModifiers, element, rawElement;
	
	knownModifiers = [ '$limit','$sort','$fields','$skip','$hint','$explain','$snapshot','$timeout' ];
	modifiers = {};
	
	for (element in query) {
		rawElement = element.replace("$", "");

		if (knownModifiers.indexOf(element) >= 0) {
			modifiers[rawElement] = query[element];
			delete query[element];
		}
	}

	return { conditions: query, modifiers: modifiers };
};

/**
* Creates a response data object and sends it to the client.
*
* @method respond
* @param {Object} response Responds a data object.
* @param {Object} doc Body of active HTTP request.
* @param {String} action Action is the name of the active method. 
* @param {Number} count Counts the number of doc's
* @async
*/
exports.respond = function (response, doc, error, action, count) {
	var statusCode, responseData;

	statusCode = httpStatus.determine(action, doc, error);
	responseData = new ResponseData(action, doc, error, count);

	return response.status(statusCode).send(responseData);
};

/**
* Removes specific fields from document.
*
* @method deleteFields
* @param {Object} object Body of active HTTP request.
* @param {Array} fields A list of specific query fields.
* @private
*/
var deleteFields = function (object, fields) {
	for (var field in object) {
		if (fields.indexOf(field) >= 0) {
			delete object[field];
		}
	}
};
