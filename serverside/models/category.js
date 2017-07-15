var mongoose = require('mongoose'),
validator = require('../imports/validator'),
bodyParser = require('body-parser'),
Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;

// SCHEMA
var schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
    created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	enabled: { type: Boolean, default: false, required: true },
	image: { type: Number, required: false }
});

// UNIQUE CONSTRAINTS
schema.index(
	{ name: 1, description: 1}, { unique: true }
);

// VALIDATION RULES
validator.validateLength(schema, 'name', 5, 50);
validator.validateLength(schema, 'description', 5, 300);
// EXPORT
module.exports = mongoose.model('Category', schema);
