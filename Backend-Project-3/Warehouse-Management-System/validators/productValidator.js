// external packages/modules:
import Joi from 'joi';

// creating the schema:
const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required(),
	sku: Joi.string()
		.alphanum()
		.max(100)
		.required(),
	description: Joi.string()
		.required(),
	vendorId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	category: Joi.string()
		.required(),
	unitPrice: Joi.number()
		.positive()
		.required(),
	weight: Joi.number()
		.positive()
		.required(),
	dimensions: Joi.number()
		.positive()
		.required(),
	barcode: Joi.string()
		.alphanum()
		.required(),
	isFragile: Joi.boolean()
		.required(),
});

// exporting the schema:
export default schema;