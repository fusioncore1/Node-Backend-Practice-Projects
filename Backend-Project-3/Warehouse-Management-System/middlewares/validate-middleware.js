// middleware function to validate data:
export default function validateData(schema) {
	// getting data from the request body:

	return async (req, res, next) => {

		const data = req.body;

		try {
			const validatedData = await schema.validateAsync(data, {
				abortEarly: false,
				stripUnknown: true,
			});

			// sending validated data in request:
			req.validated = validatedData;

			// jumping to the next middleware:
			next();
		} catch (error) {
			next(error);
		}
	}
}