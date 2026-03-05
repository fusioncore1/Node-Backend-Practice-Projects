// external modules/libraries/packages:
import express from 'express';

// internal modules/libraries/packages:
import {
	addUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
} from '../controllers/userController.js';
import validate from '../middlewares/validate-middleware.js';
import userValidator from '../validators/userValidator.js';

// creating router object:
const router = express.Router();

// defining routes:
router.post('/', validate(userValidator), addUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

// exporting router:
export default router;