/**
 * Basic validator.
 *
 * @author Abdul Abshir and Thomas Rientjes
 * @version 0.4.6
 * MIT Licensed
 */

exports.validateLength = function (schema, path, minimum, maximum) {
	schema.path(path).validate(function (value) {
		return (value !== undefined && value !== null && value.length >= minimum && value.length <= maximum);
	}, 'The path `' + path + '` should have a minimum length of ' + minimum + ' and a maximum length of ' + maximum + ' characters.');
};
