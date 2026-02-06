// This file is just made so that importing and exporting of the routers can be shortened in the server.js file

// Internal Modules/Packages:
import equipmentRouter from './equipmentRouter.js';
import rentalRouter from './rentalRouter.js';
import userRouter from './userRouter.js';
import maintenanceLogRouter from './maintenanceLogRouter.js';

// Exporting all the routers:
export {
	equipmentRouter,
	rentalRouter,
	userRouter,
	maintenanceLogRouter,
};