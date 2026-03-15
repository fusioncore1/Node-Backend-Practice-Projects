// external modules/packages:
import Joi from 'joi';

// creating the schema:
const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required(),
	contactPerson: Joi.string()
		.min(10)
		.max(20)
		.required(),
	email: Joi.string()
		.email()
		.min(10)
		.max(100)
		.required(),
	phone: Joi.string()
		.min(10)
		.max(20)
		.required(),
	address: Joi.string()
		.min(3)
		.max(200)
		.required(),
	city: Joi.string()
		.min(3)
		.max(100)
		.required(),
	country: Joi.string()
		.min(3)
		.max(20)
		.required(),
	gstNumber: Joi.string()
		.alphanum()
		.min(10)
		.max(20)
		.required(),
	isActive: Joi.string()
		.required(),
});

// exporting the schema:
export default schema;