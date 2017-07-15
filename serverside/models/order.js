//Getting Express and Mongoose 
var mongoose = require('mongoose'),
extendmongoose = require('mongoose-schematypes-extend')(mongoose),
validator = require('../imports/validator'),
Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;

//Using schema to help define our model
var schema = new mongoose.Schema({
	user: { type: String, required: true},
	totalPrice: { type: Number, roundto: 2 /*<- Will round 1234.5678 to 1234.57*/ },
	totalPriceTax: { type: Number, roundto: 2 /*<- Will round 1234.5678 to 1234.57*/ },
	purchaseDate: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	orderDetails: { type: ObjectId, ref: "orderDetails", required: true }, //moet verplicht al aanwezig zijn.
	billingAddress: { type: String, required: true },
	deliveryAddress: { type: String, required: true },
    confirmOrder: { type: Boolean, required: true },
    paymentMethod: { type: Number, required: true }, //methoden krijgen een nr(lijst)...
    paymentConfirmed: { type: Boolean, required: true },
    paymentDeclined: { type: Boolean, required: true },
    orderCancelled: { type: Boolean, required: true },
    //shipment: { type: ObjectId, ref: "shipment", required: true }, een order hoeft nog geen shipment te hebben, dit wordt later bepaald na ontvangst betaling e.d.
    image: { type: Number, required: false }
});

// UNIQUE CONSTRAINTS
schema.index(
	{ name: 1, description: 1}, { unique: true }
);

// VALIDATION RULES
validator.validateLength(schema, 'billingAddress', 2, 250);
validator.validateLength(schema, 'deliveryAddress', 2, 250);

//EXPORT
/*Here we define our model, mongoose.model() takes two arguments a name and a schema. 
As an aside when we insert documents into the MongoDB based on this model the collection it creates the pluralized version of the model name.*/
module.exports = mongoose.model('Order', schema);