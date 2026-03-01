// Connecting to mongodb using mongoose:

// importing external packages/modules:
import mongoose from 'mongoose';

// constants:
const mongodb_uri = process.env.MONGODB_URI;

// function to handle error:
function handleError(error) {
	console.error('Connection to MongoDB failed\n', error.message);
	process.exit(1);                               // forceful termination of server program in case of DB connection failure
}

const connectDb = async () => {
	try {
		// trying to connect to db:
		const conn = await mongoose.connect(mongodb_uri);

		// sending message about successful connection:
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		// if the connection to db fails:
		handleError(error);
	}
}

export default connectDb;