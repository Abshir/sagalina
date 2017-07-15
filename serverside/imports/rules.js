/**
 * Basic Validation Rules.
 *
 * @author Abdul Abshir
 * @version 0.4.6
 * MIT Licensed
 */

var queryTools = require('../imports/querytools');

exports.isAuthor = function (Model, request, response, conditions, callback) {
	var user = request.session.user;

	queryTools.show(Model, conditions, null, {}, [], function (doc, error) {
		if (doc && (doc.author == user._id || user.username == 'admin')) {
			callback();
		} else if (doc) {
			response.send(401);
		} else {
			response.send(404);
		}
	});
};

exports.isOrganizer = function (Model, request, response, conditions, callback) {
	var user = request.session.user;

	queryTools.show(Model, conditions, null, {}, [], function (doc, error) {
		if (doc && (doc.organizer == user._id || user.username == 'admin')) {
			callback();
		} else if (doc) {
			response.send(401);
		} else {
			response.send(404);
		}
	});
};

exports.isOrganizerOrAttendee = function (Model, request, response, conditions, callback) {
	var user = request.session.user;

	queryTools.show(Model, conditions, null, {}, [], function (doc, error) {
		if (doc && (doc.organizer == user._id || doc.attendees.indexOf(user._id) >= 0 || user.username == 'admin')) {
			callback();
		} else if (doc) {
			response.send(401);
		} else {
			response.send(404);
		}
	});
};
