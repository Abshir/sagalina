var Model = require('../models/user'),
ResponseData = require('../imports/responsedata'),
queryTools = require('../imports/querytools'),
passwordHasher = require('../imports/passwordhasher');

// CREATE
exports.create = function (request, response) {

	var user, username, password;

	user = request.session.user;

	if (user !== undefined && user !== null) {
		return response.status(409).send();
	}

	username = request.body.username;
	password = request.body.password;

	queryTools.show(Model, { username: username }, 'salt', {}, [], function (doc, error) {
		doc = doc || {};

		hashData = passwordHasher.hash(password, 'sha1', doc.salt || '');
		password = hashData.password;

		queryTools.show(Model, { username: username, password: password }, null, {}, [], function (doc, error) {
			if (!doc) {
				return response.send(401);
			} else {
				request.session.user = doc;
				queryTools.respond(response, doc, error, 'create');
			}
		});
	});
};

// RETRIEVE
exports.show = function (request, response) {
	var user, username, password;

	user = request.session.user;

	if (user === undefined || user === null) {
		return response.send(404);
	}

	username = request.session.user.username;

	queryTools.show(Model, { username: username }, 'password', {}, [], function (doc, error) {

		doc = doc || {};
		password = doc.password;
		
		queryTools.show(Model, { username: username, password: password }, null, {}, [], function (doc, error) {
			if (!doc) {
				return response.send(404);
			} else {
				request.session.user = doc;
				queryTools.respond(response, doc, error, 'show');
			}
		});
	});


};

// DELETE
exports.del = function (request, response) {

	var user, responseData;
	user = request.session.user;

	if (user === undefined || user === null) {
		response.status(404).send();
	} else {
		delete request.session.user;

		responseData = new ResponseData('delete', null, null);
		response.status(200).send(responseData);
	}
};
