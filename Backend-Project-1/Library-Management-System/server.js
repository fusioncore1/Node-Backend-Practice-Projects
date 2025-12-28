// External modules/packages:
import express from 'express';
import 'dotenv/config';

// Internal modules/packages:
import * as routers from './routes/indexRouters.js';
import connectDb from './utils/connectDb.js';
import errorHandler from './middlewares/error-middleware.js';

// Creating an app from ExpressJS:
const app = express();

// Constants from .ENV file:
const port = process.env.PORT;

// creating a middleware with `express.json()` to parse the json requests (should be created first so every middleware can get proper request data):
app.use(express.json());

// connecting to database
connectDb();

// creating middlewares:
app.get('/', (req, res) => {
	res.send('Hello World!');   // after sending this, response is over
});

// error middleware (should be in last after all middlewares):
app.use(errorHandler);

// server up and running and listening for requests:
app.listen(port, () => {
	console.log(`Server listening on address - http://localhost:${port}`);
});