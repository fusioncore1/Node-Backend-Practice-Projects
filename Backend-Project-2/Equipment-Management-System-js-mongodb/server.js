// external modules/packages:
import express from 'express';

// internal modules/packages:
import connectDb from './utils/connectDb.js';
import errorHandler from './middlewares/error-middleware.js';
import {
	equipmentRouter,
	rentalRouter,
	userRouter,
	maintenanceLogRouter,
} from './routes/indexRoutes.js';

// creating the app:
const app = express();

// importing port variable:
const port = process.env.PORT;


// creating middlewares:
// adding request-body-parser as our first middleware so requests can be parsed properly:
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// creating routes:
app.use('/api/equipments/', equipmentRouter);
app.use('/api/rentals/', rentalRouter);
app.use('/api/users/', userRouter);
app.use('/api/maintenance-log/', maintenanceLogRouter);


// error-middleware should be in the last of all the middlewares:
app.use(errorHandler);

// connecting to database:
connectDb();

// listening for requests:
app.listen(port, () => {
	console.log(`Server running on address: http://localhost:${port}`);
});