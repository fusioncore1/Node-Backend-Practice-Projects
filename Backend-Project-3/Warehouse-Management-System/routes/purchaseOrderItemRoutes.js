// external packages/modules:
import express from 'express';

// internal packages/modules:
import validate from '../middlewares/validate-middleware.js';
import purchaseOrderItemValidator from '../validators/purchaseOrderItemValidator.js';
import {
	addPurchaseOrderItem,
	getAllPurchaseOrderItems,
	getPurchaseOrderItemById,
	updatePurchaseOrderItemById,
	deletePurchaseOrderItemById,
} from '../controllers/purchaseOrderItemController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(purchaseOrderItemValidator), addPurchaseOrderItem);
router.get('/', getAllPurchaseOrderItems);
router.get('/:id', getPurchaseOrderItemById);
router.put('/:id', updatePurchaseOrderItemById);
router.delete('/:id', deletePurchaseOrderItemById);

// exporting router object:
export default router;