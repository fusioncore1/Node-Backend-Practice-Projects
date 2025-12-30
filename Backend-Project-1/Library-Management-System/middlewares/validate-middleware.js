const validateData = (schema) => {

	// getting whole validation schema as function's input param and returning the middleware function:

	return async (req, res, next) => {
		const data = req.body;   // getting data from request

		try {
			const validated = await schema.validateAsync(data, {
				abortEarly: false,   // this will allow validation to continue
				stripUnknown: true,   // removes unknown elements
			});   // since we are using try-catch, Joi docs tell us to use `validateAsync()` in place of `validate()`

			// we will use this to pass into controllers:
			req.validatedData = validated;   // this way, we won't be even needing to export the data directly

			next();   // going to next middleware
		}
		catch (error) {
			next(error);   // if invalid
		}
	}
}

export default validateData;