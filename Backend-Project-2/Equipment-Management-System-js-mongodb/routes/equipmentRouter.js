// Internal Modules/Packages:
import equipmentValidator from '../validators/equipmentValidator.js';
import {
	addEquipment,
	getAllEquipments,
	getEquipmentById,
	updateEquipmentById,
	deleteEquipmentById,
} from '../controllers/equipmentController.js';
import validateData from '../middlewares/validate-middleware.js';

// External Modules/Packages:
import express from 'express';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validateData(equipmentValidator), addEquipment);
router.get('/', getAllEquipments);
router.get('/:id', getEquipmentById);
router.put('/:id', validateData(equipmentValidator), updateEquipmentById);   // should use different validator for updates
// router.put('/:id', updateEquipmentById);   // if above one doesn't run, use this
router.delete('/:id', deleteEquipmentById);

// exporting the router object:
export default router;