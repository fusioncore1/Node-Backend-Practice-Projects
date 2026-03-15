// external packages/modules:
import Joi from 'joi';

// creating the schema:
const schema = Joi.object({
	vendorId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	warehouseId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	orderDate: Joi.date()
		.required(),
	expectedDeliveryDate: Joi.date()
		.required(),
	status: Joi.string()
		.min(6)
		.max(9)
		.required(),
	totalAmount: Joi.number()
		.positive()
		.required(),
	notes: Joi.string()
		.required(),
});

// exporting the schema:
export default schema;