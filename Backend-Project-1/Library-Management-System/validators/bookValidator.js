// Importing External Modules:
import Joi from 'joi';

// creating validation schema:
const schema = Joi.object({

	bookName: Joi.string()
		.pattern(new RegExp(`^[a-zA-Z0-9\\s?.\\'-]+$`))   // If you intend to use hyphen `-` as a character, make sure to mention it at end. Cuz that's safe.
		.min(3)
		.max(100)
		.required(),

	authorName: Joi.string()
		.pattern(new RegExp('^[a-zA-Z\\s.-]+$'))   // '+' matches more occurances of same character
		.min(3)
		.max(100)
		.required(),

	edition: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9\\s.-]+$'))
		.min(1)
		.max(1000)
		.required(),

	noOfPages: Joi.number()
		.min(1)
		.max(3000)
		.required(),

	totalCopies: Joi.number()
		.min(1)
		.max(20)
		.required(),

	availableCopies: Joi.number()
		.min(0)
		.max(20)
		.required()
		.max(Joi.ref('totalCopies')),   // limits the max value to said field

});

// exporting validation schema:
export default schema;