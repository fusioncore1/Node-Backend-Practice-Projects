// internal packages/modules:
import Joi from 'joi';

// creating the schema:
const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required(),
	location: Joi.string()
		.min(3)
		.max(100)
		.required(),
	city: Joi.string()
		.min(3)
		.max(100)
		.required(),
	country: Joi.string()
		.min(3)
		.max(100)
		.required(),
	capacity: Joi.number()
		.positive()
		.object(),
	managerName: Joi.string()
		.min(3)
		.max(100)
		.required(),
	contactNumber: Joi.string()
		.min(10)
		.max(20)
		.required(),
	isActive: Joi.boolean()
		.required(),
});

// exporting the schema:
export default schema;