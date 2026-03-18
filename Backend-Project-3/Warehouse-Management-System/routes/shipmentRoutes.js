// external packages/modules:
import express from 'express';

// internal packages/modules:
import validate from '../middlewares/validate-middleware.js';
import shipmentValidator from '../validators/shipmentValidator.js';
import {
	addShipment,
	getAllShipments,
	getShipmentById,
	updateShipmentById,
	deleteShipmentById,
} from '../controllers/shipmentController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(shipmentValidator), addShipment);
router.get('/', getAllShipments);
router.get('/:id', getShipmentById);
router.put('/:id', updateShipmentById);
router.delete('/:id', deleteShipmentById);

// exporting router object:
export default router;