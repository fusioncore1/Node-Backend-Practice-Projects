// External packages/modules:
import express from 'express';

// Internal packages/modules:
import connectDb from './utils/connectDb.js';
import errorHandler from './middlewares/error-middleware.js';
import allRoutes from './routes/indexRouters.js';

// Creating the server app:
const app = express();

// Environment variables:
const port = process.env.PORT || 3000;

// declaring and defining the middlewares:

// creating parser (request will go through this):
app.use(express.json());

// hello world:
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Using routers:
app.use('/api', allRoutes);

// error middleware (which always comes at last of all middlewares):
app.use(errorHandler);

// connecting to database:
connectDb();

// server listening:
app.listen(port, () => {
	console.log(`Warehouse Management System Server listening on address: http://localhost:${port}`);
});