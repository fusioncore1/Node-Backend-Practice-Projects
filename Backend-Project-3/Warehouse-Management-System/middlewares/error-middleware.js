// error handling middleware:
const errorHandler = (req, res, next, err) => {
	console.log('Middleware Error Handling');
	const errStatus = err.statusCode || 500;
	const errMessage = err.message || 'Something went wrong';
	res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMessage,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {},   // we don't wanna expose our code in prod
	});
}

export default errorHandler;