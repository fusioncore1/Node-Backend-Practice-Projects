// This file is just made so that importing and exporting of the routers can be shortened in the server.js file

// Internal Modules/Packages:
import equipmentRouter from './equipmentRouter.js';
import rentalRouter from './rentalRouter.js';
import userRouter from './userRouter.js';
import maintenanceLogRouter from './maintenanceLogRouter.js';

// External Modules/Packages:
import express from 'express';

// Creating the router object:
const router = express.Router();

// creating routes (1):
router.use('/equipments/', equipmentRouter);
router.use('/rentals/', rentalRouter);
router.use('/users/', userRouter);
router.use('/maintenance-log/', maintenanceLogRouter);

// // Exporting all the routers:
// export {
// 	equipmentRouter,
// 	rentalRouter,
// 	userRouter,
// 	maintenanceLogRouter,
// };

// Exporting the router object:
export default router;