// External Packages/Modules:
import mongoose from 'mongoose';

// Constants:
const mongodb_uri = process.env.MONGODB_URI;

// function to handle an error:
function handleError(error) {
	// sending message about db connection error:
	console.error(`An error occurred while connecting to database: ${error}`);
}

const connectDb = async () => {
	try {
		// establishing db connection:
		const conn = await mongoose.connect(mongodb_uri);

		// sending message about db connection:
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	}
	catch (error) {
		handleError(error);
	}
}

export default connectDb;