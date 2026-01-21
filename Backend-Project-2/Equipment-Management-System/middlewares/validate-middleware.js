// middleware to validate the data we will get from the validator:
const validateData = (schema) => {   // this will take the validation schema and validate the data it gets against it
	// returning a function:
	return async (req, res, next) => {

		// getting data from req.body, i.e. from the user request:
		const data = req.body;

		try {
			const validated = await schema.validateAsync(data, {
				abortEarly: false,        // we want all values to be checked
				stripUnknown: true,
			});

			// we will use this to pass into controllers (their only job will be to enter data into db):
			req.validatedData = validated;

			// jump to next middleware:
			next();
		} catch (error) {
			next(error);
		}
	}
}

// exporting validation-middleware:
export default validateData;