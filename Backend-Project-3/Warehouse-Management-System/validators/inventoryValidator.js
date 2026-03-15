// external packages/modules:
import Joi from 'joi';

// creating the validation schema:
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
	quantityAvailable: Joi.number()
		.positive()
		.required(),
	quantityReserved: Joi.number()
		.positive()
		.required(),
	reorderLevel: Joi.number()
		.positive()
		.required(),
	lastRestockedAt: Joi.date()
		.required(),
});

// exporting the validation schema:
export default schema;