// external packages/modules:
import express from 'express';

// internal packages/modules:
import validate from '../middlewares/validate-middleware.js';
import stockMovementValidators from '../validators/stockMovementValidator.js';
import {
	addStockMovement,
	getAllStockMovements,
	getStockMovementById,
	updateStockMovementById,
	deleteStockMovementById,
} from '../controllers/stockMovementController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(stockMovementValidators), addStockMovement);
router.get('/', getAllStockMovements);
router.get('/:id', getStockMovementById);
router.put('/:id', updateStockMovementById);
router.delete('/:id', deleteStockMovementById);

// exporting router object:
export default router;