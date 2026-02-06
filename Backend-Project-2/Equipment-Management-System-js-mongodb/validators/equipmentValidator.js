// External Modules/Packages:
import Joi from 'joi';

// creating the validation schema:
const schema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required(),

	category: Joi.string()
		.min(3)
		.max(100)
		.required(),

	serialNumber: Joi.string()
		.alphanum()
		.min(5)
		.max(20)
		.required(),

	status: Joi.string()
		.min(6)
		.max(10)
		.required(),

	dailyRate: Joi.number()
		.required(),
});

// exporting the validation schema:
export default schema;