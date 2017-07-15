var Model = require('../models/order');
queryTools = require('../imports/querytools');


// RETRIEVE DOCUMENT
exports.create = function(request, response) {
	var input, lockedFields = [];
	input = request.body;

		queryTools.create(Model, input, lockedFields, function (doc, error) {
			queryTools.respond(response, doc, error, 'create');
		});
};

// RETRIEVE DOCUMENTS
exports.list = function(request, response) {
	var parsedQuery, fields, options = {};
	parsedQuery = queryTools.parse(request.query);

	queryTools.list(Model, parsedQuery, fields, options, function (doc, error, count) {
		queryTools.respond(response, doc, error, 'list', count);
	});
};


// RETRIEVE DOCUMENT
exports.show = function(request, response) {
	var conditions, fields, options = {}, population;
	conditions = getConditions(request.params);
	population = ['orderdetails'];

	queryTools.show(Model, conditions, fields, options, population, function (doc, error) {
		queryTools.respond(response, doc, error, 'show');
	});
};

// UPDATE DOCUMENT
exports.update = function (request, response) {
	var input, conditions, lockedFields = [], options = {};
	
	input = request.body;
	conditions = getConditions(request.params);
	
	queryTools.update(Model, input, conditions, lockedFields, options, function (doc, error) {
		queryTools.respond(response, doc, error, 'update');
	});
};

// DELETE DOCUMENT
exports.del = function (request, response) {
	var conditions = getConditions(request.params);

	queryTools.del(Model, conditions, function (doc, error) {
		queryTools.respond(response, doc, error, 'delete');
	});
};

// PRIVATE FUNCTIONS
function getConditions (parameters) {
	return { _id: parameters._id };
}