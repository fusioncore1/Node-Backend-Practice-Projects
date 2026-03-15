// middleware function to validate data:
export default function validateData(schema) {
	// getting data from the request body:
	const data = req.body;

	return async (req, res, next) => {
		try {
			await schema.validateAsync(data, {
				abortEarly: false,
				stripUnknown: true,
			});

			// jumping to the next middleware:
			next();
		} catch (error) {
			next(error);
		}
	}
}