var mongoose = require('mongoose'),
validator = require('../imports/validator'),
privatePaths = require('mongoose-private-paths'),
Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;

// SCHEMA
var schema = new Schema({
	username: { type: String, unique: true, required: true },
	emailAddress: { type: String, unique: true, required: true },
	password: { type: String, required: true, private: true },
    salt: { type: String, private: true },
    creationDate: { type: Date, default: Date.now },
    age: { type: Number, required: true },
    phoneNumber: { type: String, index: { unique: true, sparse: true } },
	name: { 
		forename: { type: String, required: true },
		surname: { type: String, required: true }
	},
	friends: [ { type: ObjectId, ref: 'User' } ],
	favouriteCategory: { type: ObjectId, ref: 'Category' },
	favouriteActivities: [ { type: ObjectId, ref: 'Activity' } ],
});

// SCHEMA PLUGINS
schema.plugin(privatePaths);

// VALIDATION RULES
validator.validateLength(schema, 'username', 2, 12);
validator.validateLength(schema, 'emailAddress', 4, 55);
validator.validateLength(schema, 'password', 6, 120);
validator.validateLength(schema, 'phoneNumber', 10, 18);
validator.validateLength(schema, 'name.forename', 2, 40);
validator.validateLength(schema, 'name.surname', 2, 40);

schema.path('emailAddress').validate(function (value) {
	var regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regularExpression.test(value);
}, 'Invalid email address');

// EXPORT
module.exports = mongoose.model('User', schema);
