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
	children: [{type: ObjectId, ref: "Category", required: true }],
	enabled: { type: Boolean, default: false, required: true },
	image: { type: Number, required: false }
});

//Children - subcategories
var autoPopulateChildren = function(next) {
    this.populate('children');
    next();
};

schema
.pre('findOne', autoPopulateChildren)
.pre('find', autoPopulateChildren);

// UNIQUE CONSTRAINTS
schema.index(
	{ name: 1, description: 1}, { unique: true }
);

// VALIDATION RULES
validator.validateLength(schema, 'name', 5, 50);
validator.validateLength(schema, 'description', 5, 300);
// EXPORT
module.exports = mongoose.model('Category', schema);
