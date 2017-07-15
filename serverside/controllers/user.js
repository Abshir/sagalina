var Model = require('../models/user'),
queryTools = require('../imports/querytools'),
passwordHasher = require('../imports/passwordhasher');

// CREATE DOCUMENT
exports.create = function (request, response) {
	var input, lockedFields;

	input = hashPassword(request.body);
	lockedFields = [ 'creationDate' ];

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
	population = [ 'friends', 'favouriteCity', 'favouriteActivities' ];

	queryTools.show(Model, conditions, fields, options, population, function (doc, error) {
		queryTools.respond(response, doc, error, 'show');
	});
};

// UPDATE DOCUMENT
exports.update = function (request, response) {
	var input, conditions, lockedFields, options = {};

	input = hashPassword(request.body);
	conditions = getConditions(request.params);
	lockedFields = [ 'creationDate', 'salt' ];
	
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

// VALIDATE DOCUMENT
exports.validate = function (request, response) {
	var input, lockedFields;

	input = hashPassword(request.body);

	var doc = new Model(input);

	doc.validate(function (error) {
		queryTools.respond(response, doc, error, 'validate');
	});
};

// PRIVATE FUNCTIONS
function getConditions (parameters) {
	return { username: parameters.username };
}

function hashPassword (body) {
	if (body.hasOwnProperty('password') && body.password !== '') {
		hashData = passwordHasher.hash(body.password, 'sha1');

		body.password = hashData.password;
		body.salt = hashData.salt;
	}
	
	return body;
}
