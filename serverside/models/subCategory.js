//Getting Express and Mongoose 
var mongoose = require('mongoose'),
extendmongoose = require('mongoose-schematypes-extend')(mongoose),
validator = require('../imports/validator'),
Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;


// SCHEMA
var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
    created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	enabled: { type: Boolean, default: false, required: true },
	category: { type: ObjectId, ref: "Category", required: true }, /* Object moet gecontroleerd worden!*/
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
module.exports = mongoose.model('subCategory', schema);
