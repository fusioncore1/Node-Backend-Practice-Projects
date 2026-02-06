// Error Handling Middleware for handling errors:
const errorHandler = (err, req, res, next) => {
	// handle the error:
	console.log('Error Handling Middleware');
	const errorStatus = err.statusCode || 500;   // ErrorCode 500: error from server
	const errorMessage = err.message || 'Something went wrong';
	res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {},    // we don't want to expose our code on a production server, since this returns file name and line number
	});
}

// exporting the error-middleware:
export default errorHandler;