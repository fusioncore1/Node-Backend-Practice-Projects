// external modules/packages:
import Joi from 'joi';

// creating the schema:
const schema = Joi.object({
	productId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	warehouseId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	type: Joi.string()
		.min(7)
		.max(10)
		.required(),
	referenceType: Joi.string()
		.min(6)
		.max(14)
		.required(),
	referenceId: Joi.string()
		.alphanum()
		.required(),
	quantityChanged: Joi.number(),
	previousQuantity: Joi.number(),
	newQuantity: Joi.number()
		.required(),
	movementDate: Joi.date()
		.required(),
	notes: Joi.string()
		.required(),
});

// exporting the schema:
export default schema;