/**
 * HTTP Status Library.
 *
 * @author Abdul Abshir and Thomas Rientjes
 * @version 0.4.6
 * MIT Licensed
 */

exports.determine = function (action, doc, error) {

	if (error) {
		return 400;
	}

	if (!doc && action !== 'create') {
		return 404;
	}

	switch(action) {
		case 'create':
			return 201;
		case 'list':
			return 200;
		case 'show':
			return 200;
		case 'update':
			return 200;
		case 'delete':
			return 200;
		case 'validate':
			return 200;
	}
};
