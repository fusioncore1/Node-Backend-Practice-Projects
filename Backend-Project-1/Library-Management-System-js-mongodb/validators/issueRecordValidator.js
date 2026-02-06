// importing external module:
import Joi from 'joi';

// creating validation schema:
const schema = Joi.object({

	issueDate: Joi.date()
		.required(),

	returnDate: Joi.date()
		.greater(Joi.ref('issueDate')),

	bookId: Joi.string()
		.alphanum()
		.required(),

	memberId: Joi.string()
		.alphanum()
		.required(),

	status: Joi.string()
		.required(),

});

// exporting validation schema: 
export default schema;