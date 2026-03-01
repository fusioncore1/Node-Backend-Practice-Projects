// importing external modules/packages:
import Joi from 'joi';

// validation schema will be passed and validated in this function:

const validateData = (schema) => {
	// returning a function:
	return async (req, res, next) => {

		// getting data from the req.body, i.e. from the user directly:
		const data = req.body;

		try {
			// getting the validated data:
			const validated = await schema.validateAsync(data, {
				abortEarly: false,               // check all the data before quitting
				stripUnknown: true,              // remove any unknown part of data
			});

			// sending validated data into request parameter:
			req.validated = validated;

			// passing control to next middleware:
			next();
		} catch (error) {
			next(error);
		}
	}
}

// exporting the validation-middleware:
export default validateData;