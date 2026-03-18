// external packages/modules:
import express from 'express';

// internal packages/modules:
import validate from '../middlewares/validate-middleware.js';
import inventoryValidator from '../validators/inventoryValidator.js';
import {
	addInventory,
	getAllInventory,
	getInventoryById,
	updateInventoryById,
	deleteInventoryById,
} from '../controllers/inventoryController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(inventoryValidator), addInventory);
router.get('/', getAllInventory);
router.get('/:id', getInventoryById);
router.put('/:id', updateInventoryById);
router.delete('/:id', deleteInventoryById);

// exporting router object:
export default router;