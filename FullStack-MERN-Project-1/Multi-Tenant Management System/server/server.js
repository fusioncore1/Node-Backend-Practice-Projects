// importing external modules/packages:
import express from 'express';

// importing internal modules/packages:
import connectDb from './utils/connectDb.js';
import errorHandler from './middlewares/error-middleware.js';

// creating the server app:
const app = express();

// getting the port info:
const port = process.env.PORT;

// declaring and defining middlewares:

// express.json() allows parsing of the data (should come first):
app.get(express.json());

// 
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// error middleware:
app.use(errorHandler);   // last middleware to use

// connecting to DB (should come last):
connectDb();

// server listening for the connections:
app.listen(port, () => {
	console.log(`Server listening from address: http://localhost:${port}`);
});