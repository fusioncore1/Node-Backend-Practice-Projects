// Internal Modules/Packages:
import validateData from '../middlewares/validate-middleware.js';
import userValidator from '../validators/userValidator.js';
import {
	addUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
} from '../controllers/userController.js';

// External Modules/Packages:
import express from 'express';

// creating the router object:
const router = express.Router();

// creating routes:
router.post('/', validateData(userValidator), addUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validateData(userValidator), updateUserById);   // should use different validators for updates
// router.put('/:id', updateUserById);   // if above one doesn't run, use this
router.delete('/:id', deleteUserById);

// exporting the router object:
export default router;