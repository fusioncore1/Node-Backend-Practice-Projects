// importing external module:
import Joi from 'joi';

// creating validation schema:
const schema = Joi.object({

	memberName: Joi.string()
		.pattern(new RegExp('^[a-zA-Z\\s.-]+$'))
		.min(3)
		.max(100)
		.required(),

	address: Joi.string()
		.pattern('^[a-zA-Z0-9\\s.-()[\\]{}]+$')
		.min(3)
		.max(3000)
		.required(),

	phone: Joi.string()
		.pattern(new RegExp('^[0-9\\s+-]+$'))
		.min(10)
		.max(20)
		.required(),

	email: Joi.string()
		.email()
		.min(10)
		.max(100)
		.required(),

	// subscription date end
	subsDateStart: Joi.date()
		.required(),

	// subscription date end
	subsDateEnd: Joi.date()
		.greater(Joi.ref('subsDateStart')),

	// number of books issued (every member will be issued max 10 books)
	issuedBooks: Joi.number()
		.min(0)
		.max(10)
		.integer(),

});

// exporting validation schema:
export default schema;