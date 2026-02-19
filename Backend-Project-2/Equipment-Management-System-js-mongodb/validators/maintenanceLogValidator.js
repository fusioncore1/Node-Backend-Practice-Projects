// External Modules/Packages:
import Joi from 'joi';

// creating the validation schema:
const schema = Joi.object({
	equipmentId: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	description: Joi.string()
		.min(3)
		.max(100)
		.required(),
	startDate: Joi.date()
		.required(),
	endDate: Joi.date()
		.greater(Joi.ref('startDate'))
		.required(),
});

// exporting the validation schema:
export default schema;