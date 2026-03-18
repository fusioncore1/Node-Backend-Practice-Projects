// external packages/modules:
import express from 'express';

// internal modules/packages:
import validate from '../middlewares/validate-middleware.js';
import vendorValidator from '../validators/vendorValidator.js';
import {
	addVendor,
	getAllVendors,
	getVendorById,
	updateVendorById,
	deleteVendorById,
} from '../controllers/vendorController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(vendorValidator), addVendor);
router.get('/', getAllVendors);
router.get('/:id', getVendorById);
router.put('/:id', updateVendorById);
router.delete('/:id', deleteVendorById);

// exporting router object:
export default router;