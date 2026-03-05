// external libraries/modules/packages:
import express from 'express';

// internal libraries/modules/packages:
import {
	addOrganization,
	getAllOrganizations,
	getOrganizationById,
	updateOrganizationById,
	deleteOrganizationById,
} from '../controllers/organizationController.js';
import validate from '../middlewares/validate-middleware.js';
import organizationValidator from '../validators/organizationValidator.js';

// creating router object:
const router = express.Router();

// defining routes:
router.post('/', validate(organizationValidator), addOrganization);
router.get('/', getAllOrganizations);
router.get('/:id', getOrganizationById);
router.put('/:id', updateOrganizationById);
router.delete('/:id', deleteOrganizationById);

// exporting router:
export default router;