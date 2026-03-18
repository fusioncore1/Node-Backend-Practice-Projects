// external packages/modules:
import express from 'express';

// internal packages/modules:
import validate from '../middlewares/validate-middleware.js';
import shipmentItemValidator from '../validators/shipmentItemValidator.js';
import {
	addShipmentItem,
	getAllShipmentItems,
	getShipmentItemById,
	updateShipmentItemById,
	deleteShipmentItemById,
} from '../controllers/shipmentItemController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(shipmentItemValidator), addShipmentItem);
router.get('/', getAllShipmentItems);
router.get('/:id', getShipmentItemById);
router.put('/:id', updateShipmentItemById);
router.delete('/:id', deleteShipmentItemById);

// exporting router object:
export default router;