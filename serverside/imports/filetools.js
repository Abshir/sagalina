/**
 * File Tools.
 *
 * @author Abdul Abshir and Thomas Rientjes
 * @version 0.4.6
 * MIT Licensed
 */

var fs = require('fs');

exports.fetchNames = function (path, hideExtensions) {
	
	fileNames = fs.readdirSync(path);

	if (hideExtensions === true) {
		for (var i = 0; i < fileNames.length; i++) {
			fileNames[i] = fileNames[i].replace('.js', '');
		}
	}

	return fileNames;
};
