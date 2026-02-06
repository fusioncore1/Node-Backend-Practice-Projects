// Internal Modules/Packages:
import validateData from '../middlewares/validate-middleware.js';
import maintenanceLogValidator from '../validators/maintenanceLogValidator.js';
import {
	addMaintenanceLog,
	getAllMaintenanceLogs,
	getMaintenanceLogById,
	updateMaintenanceLogById,
	deleteMaintenanceLogById,
} from '../controllers/maintenanceLogController.js';

// External Modules/Packages:
import express from 'express';

// creating the router object:
const router = express.Router();

// creating routes:
router.post('/:id', validateData(maintenanceLogValidator), addMaintenanceLog);
router.get('/', getAllMaintenanceLogs);
router.get('/:id', getMaintenanceLogById);
router.put('/:id', validateData(maintenanceLogValidator), updateMaintenanceLogById);   // should use different validators for updates
// router.put('/:id',updateMaintenanceLogById);   // if above one doesn't run, use this
router.delete('/:id', deleteMaintenanceLogById);

// exporting router object:
export default router;