// declaring and defining error-middleware function:
const errorHandler = (err, req, res, next) => {
	console.log('Error Handling Middleware');
	const errStatus = err.statusCode || 500;   // 500 for server error
	const errMsg = err.message || 'Something went wrong';
	res.status(errStatus).send({
		success: false,
		statusCode: errStatus,
		message: errMsg,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {},   // showing error stack in prod is dangerous
		// `details` and `stack`/`error_stack` are different. `details` is for showing errors from 'validation' side
	});
}

// exporting the error-middleware function:
export default errorHandler;