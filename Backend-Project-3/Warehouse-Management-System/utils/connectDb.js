// external packages/modules:
import mongoose from 'mongoose';

// Environment variables:
const mongodb_uri = process.env.MONGODB_URI;

// error handler function:
function handleError(error) {
	console.log(`Error while connecting to DB: ${error}`);
	console.error(error.message);
	process.exit(1);                     // aborting the program in the case of failure:
}

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(mongodb_uri);

		console.log(`Mongodb Connected: ${conn.connection.host}`);
	}
	catch (error) {
		handleError(error);
	}
}

export default connectDb;