/**
 * Password Hasher.
 *
 * @author Abdul Abshir and Thomas Rientjes
 * @version 0.4.6
 * MIT Licensed
 */

var crypto = require('crypto');

exports.hash = function (text, type, salt) {
	var hash, possibilities;

	hash = crypto.createHash(type);

	if (!salt) {
		salt = '';
		possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/~|=+';

		for( var i=0; i < 10; i++ ) {
			salt += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
		}
	}

	hash.update(text + salt || '');
	return { password: hash.digest('hex'), salt: salt };
};
