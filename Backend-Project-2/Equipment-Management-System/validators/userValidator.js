// External Modules/Packages:
import Joi from 'joi';

// defining validation schema:
const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required(),
	email: Joi.string()
		.email()
		.min(10)
		.max(100)
		.required(),
	role: Joi.string()
		.min(5)
		.max(10)
		.required(),
	isActive: Joi.boolean()
		.required(),
});

// exporting validation schema:
export default schema;