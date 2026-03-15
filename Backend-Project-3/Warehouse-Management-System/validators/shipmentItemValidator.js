// external packages/modules:
import Joi from 'joi';

// creating the schema:
const schema = Joi.object({
	shipmentId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	productId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	quantityShipped: Joi.number()
		.positive()
		.required(),
});

// exporting the schema:
export default schema;