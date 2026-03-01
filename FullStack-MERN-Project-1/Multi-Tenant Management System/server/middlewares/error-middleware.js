// errors from other middlewares will get here to be handled:
const errorHandler = (err, req, res, next) => {
	console.log("Error handling middleware");
	const errStatus = err.statusCode || 500;   // '500' is the server error code
	const errMsg = err.message || 'Something went wrong';
	res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMsg,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {}   // error stack show line of code, so avoid in production
	});
}

// exporting the error-middleware:
export default errorHandler;