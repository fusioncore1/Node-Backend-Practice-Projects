// external packages/modules:
import express from 'express';

// internal packages/modules:
import validate from '../middlewares/validate-middleware.js';
import warehouseValidator from '../validators/warehouseValidator.js';
import {
	addWarehouse,
	getAllWarehouses,
	getWarehouseById,
	updateWarehouseById,
	deleteWarehouseById,
} from '../controllers/warehouseController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(warehouseValidator), addWarehouse);
router.get('/', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.put('/:id', updateWarehouseById);
router.delete('/:id', deleteWarehouseById);

// exporting router object:
export default router;