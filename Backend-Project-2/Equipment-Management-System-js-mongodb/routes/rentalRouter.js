// Internal Modules/Packages:
import validateData from '../middlewares/validate-middleware.js';
import rentalValidator from '../validators/rentalValidator.js';
import {
	addRentalData,
	getAllRentalData,
	getRentalDataById,
	updateRentalDataById,
	deleteRentalDataById,
} from '../controllers/rentalController.js';

// External Modules/Packages:
import express from 'express';

// creating the router object:
const router = express.Router();

// creating routes:
router.post('/', validateData(rentalValidator), addRentalData);
router.get('/', getAllRentalData);
router.get('/:id', getRentalDataById);
router.put('/:id', validateData(rentalValidator), updateRentalDataById);   // should use different validators for updates
// router.put('/:id', updateRentalDataById);   // if above one doesn't run, use this
router.delete('/:id', deleteRentalDataById);

// export router object:
export default router;