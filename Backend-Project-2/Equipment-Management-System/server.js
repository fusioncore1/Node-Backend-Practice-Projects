// external modules/packages:
import express from 'express';

// internal modules/packages:
import connectDb from './utils/connectDb.js';
import errorHandler from './middlewares/error-middleware.js';

// creating the app:
const app = express();

// importing port variable:
const port = process.env.PORT;


// creating middlewares:
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// error-middleware should be in the last of all the middlewares:
app.use(errorHandler);

// connecting to database:
connectDb();

// listening for requests:
app.listen(port, () => {
	console.log(`Server running on address: http://localhost:${port}`);
});