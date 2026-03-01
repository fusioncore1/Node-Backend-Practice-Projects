// external module/packages:
import Joi from 'joi';

// creating invoice validation schema:
const schema = Joi.object({
	projectId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	amount: Joi.number()
		.positive()         // prevents from entering the negative number
		.required(),
	status: Joi.string()
		.min(4)
		.max(5)
		.required(),
	organizationId: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
	createdBy: Joi.string()      // stores the user id who crfeated it
		.alphanum()
		.min(3)
		.max(20)
		.required(),
});

// exporting the invoice validation schema:
export default schema;