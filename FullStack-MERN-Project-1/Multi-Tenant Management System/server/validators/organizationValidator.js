// external package/module:
import Joi from 'joi';

// creating organization validation schema:
const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required(),
});

// exporting the organization validation schema:
export default schema;