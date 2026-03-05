// external libraries/packages/modules:
import express from 'express';

// internal libraries/packages/modules:
import {
	addInvoice,
	getAllInvoices,
	getInvoiceById,
	updateInvoiceById,
	deleteInvoiceById,
} from '../controllers/invoiceController.js';
import validate from '../middlewares/validate-middleware.js';
import invoiceValidator from '../validators/invoiceValidator.js';

// creating the router object:
const router = express.Router();

// defining routes:
router.post('/', validate(invoiceValidator), addInvoice);
router.get('/', getAllInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id', updateInvoiceById);
router.delete('/:id', deleteInvoiceById);

// exporting the router object:
export default router;