// external library/package/module:
import Joi from 'joi';

// creating user validation schema:
const schema = Joi.object({
	name: Joi.string()
		.min(2)
		.max(100)
		.required(),
	email: Joi.string()
		.email()
		.min(10)
		.max(100)
		.required(),
	passwordHash: Joi.string()
		.trim()
		.min(6)
		.max(300)
		.required(),
	role: Joi.string()
		.min(5)
		.max(10)
		.required(),
	organizationId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
});

// exporting the user validation schema:
export default schema;