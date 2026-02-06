// External modules/packages:
import mongoose from 'mongoose';

// Constants:
const mongodbConn = process.env.MONGODB_URI;

// function to handle connection error (for now we will just throw it):
function handleError(error) {
	console.error('Error while connecting with MongoDB Database: ', error);
}

const connectDb = async () => {
	try {
		// establishing the connection:
		const conn = await mongoose.connect(mongodbConn);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	}
	catch (err) {
		handleError(err.message);
		process.exit(1);
	}
}

export default connectDb;