//Getting Express and Mongoose 
var mongoose = require('mongoose'),
extendmongoose = require('mongoose-schematypes-extend')(mongoose),
validator = require('../imports/validator'),
Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;

//Using schema to help define our model
var schema = new mongoose.Schema({
	name: { type: String, required: true, capitalizeAll: true},
	price: { type: Number, roundto: 2 /*<- Will round 1234.5678 to 1234.57*/ },
	description: { type: String, required: true },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
	height: { type: Number, roundto: 2, required: false }, 
    weight: { type: Number, roundto: 2, required: false }, 
	category: { type: ObjectId, ref: "Category", required: true }, /* Object moet gecontroleerd worden!*/
	enabled: { type: Boolean, default: false, required: true },
    breadth: { type: Number, roundto: 2, required: false },
    length: { type: Number, roundto: 2, required: false }, 
    image: { type: Number, required: false }
});

// UNIQUE CONSTRAINTS
schema.index(
	{ name: 1, description: 1}, { unique: true }
);

// VALIDATION RULES
validator.validateLength(schema, 'name', 2, 100);
validator.validateLength(schema, 'description', 10, 500);

//EXPORT
/*Here we define our model, mongoose.model() takes two arguments a name and a schema. 
As an aside when we insert documents into the MongoDB based on this model the collection it creates the pluralized version of the model name.*/
module.exports = mongoose.model('Item', schema);