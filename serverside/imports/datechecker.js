/**
 * Date Checker.
 * @class DateChecker
 * @author Abdul Abshir
 * @version 0.4.6
 * @license MIT Licensed
 */

var Activity = require('../models/activity'),
queryTools = require('../imports/querytools'),
ErrorData = require('../imports/errordata');

/**
* Checks if the given date is between boundaries and if until(end time) is not prior to from(start time).
* @method checkAppointmentDate
* @param {Object} response HTTP response object.
* @param {Object} input Body of the active request.
* @param {String} action Action is the name of the active method.
* @param {Method} callback Callback method.
* @async 
*/
exports.checkAppointmentDate = function (response, input, action, callback) {
	var startDate, endDate, conditions;

	conditions = input.activity || '';
	input.schedule = input.schedule || { from: '', until: '' };
	
	if (input.schedule.from) {
		startDate = new Date(input.schedule.from);
	} else {
		startDate = '';
	}

	if (input.schedule.until) {
		endDate = new Date(input.schedule.until);
	} else {
		endDate = '';
	}

	if(startDate >= endDate) {
		queryTools.respond(response, null, new ErrorData ('ValidationError', 'DateError', 'The start date of the appointment cannot take place at the same time or later than its end date.', 39230), action);
	} else {
		queryTools.show(Activity, conditions, null, {}, [], function (doc, error) {
			if (doc && doc._id == input.activity) {
				if (doc.schedule.from <= startDate && doc.schedule.until >= endDate) {
					callback();
				} else {
					queryTools.respond(response, null, new ErrorData ('ValidationError', 'DateError', 'The `appointment.schedule` path should not exceed the date or time boundaries set by the activity.', 29480), action);
				}
			} else {
				queryTools.respond(response, null, new ErrorData ('ValidationError', 'DependencyError', 'The `appointment` path should point towards a valid activity.', 80520), action);
			}
		});
	}
};

/**
* Checks if until(end time) is not prior to from(start time).
* @method checkActivityDate
* @param {Object} response HTTP response object.
* @param {Object} input Body of the active request.
* @param {String} action Action is the name of the active method.
* @param {Method} callback Callback method.
* @async 
*/
exports.checkActivityDate = function (response, input, action, callback) {
	var startDate, endDate;

	input.schedule = input.schedule || { from: '', until: '' };
	
	if (input.schedule.from) {
		startDate = new Date(input.schedule.from);
	} else {
		startDate = '';
	}

	if (input.schedule.until) {
		endDate = new Date(input.schedule.until);
	} else {
		endDate = '';
	}

	if(startDate >= endDate) {
		queryTools.respond(response, null, new ErrorData ('ValidationError', 'DateError', 'The start date of the `appointment.schedule` path cannot take place at the same time or later than its end date.', 39230), action);
	} else {
		callback();
	}
};
