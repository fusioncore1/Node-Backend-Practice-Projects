const validateData = (schema) => {

	// getting whole validation schema as function's input param and returning the middleware function:

	return async (req, res, next) => {
		const data = req.body;   // getting data from request

		try {
			await schema.validateAsync(data);   // since we are using try-catch, Joi docs tell us to use `validateAsync()` in place of `validate()`
			next();   // going to next middleware
		}
		catch (error) {
			next(error);   // if invalid
		}
	}
}

export default validateData;