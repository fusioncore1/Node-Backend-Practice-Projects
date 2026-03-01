// external package/module:
import Joi from 'joi';

// creating project validation schema:
const schema = Joi.object({
	name,
	organizationId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	createdBy: Joi.string()         // stores user id of who created it
		.alphanum()
		.min(3)
		.max(20)
		.required(),
});

// exporting the project validation schema:
export default schema;