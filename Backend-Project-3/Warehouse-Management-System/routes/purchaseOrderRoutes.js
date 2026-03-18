// external modules/packages:
import express from 'express';

// internal modules/packages:
import validate from '../middlewares/validate-middleware.js';
import purchaseOrderValidator from '../validators/purchaseOrderValidator.js';
import {
	addPurchaseOrder,
	getAllPurchaseOrders,
	getPurchaseOrderById,
	updatePurchaseOrderById,
	deletePurchaseOrderById,
} from '../controllers/purchaseOrderController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(purchaseOrderValidator), addPurchaseOrder);
router.get('/', getAllPurchaseOrders);
router.get('/:id', getPurchaseOrderById);
router.put('/:id', updatePurchaseOrderById);
router.delete('/:id', deletePurchaseOrderById);

// exporting router object:
export default router;