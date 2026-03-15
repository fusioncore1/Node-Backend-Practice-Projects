// external modules/packages:
import Joi from 'joi';

// creating the schema:
const schema = Joi.object({
	warehouseId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	shipmentDate: Joi.date()
		.required(),
	destination: Joi.string()
		.min(3)
		.max(100)
		.required(),
	status: Joi.string()
		.min(6)
		.max(9)
		.required(),
	trackingNumber: Joi.string()
		.alphanum()
		.min(10)
		.max(20)
		.required(),
	carrier: Joi.string()
		.min(3)
		.max(50)
		.required(),
	notes: Joi.string()
		.min(3)
		.max(2000)
		.required(),
});

// exporting the schema:
export default schema;