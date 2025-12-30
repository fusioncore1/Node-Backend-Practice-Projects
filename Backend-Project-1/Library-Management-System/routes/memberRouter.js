// Internal packages/modules:
import validateData from '../middlewares/validate-middleware.js';
import memberValidator from '../validators/memberValidator.js';
import {
	addMember,
	getAllMembers,
	getMemberById,
	updateMemberById,
	deleteMemberById,
} from '../controllers/memberController.js';

// External module/packages:
import express from 'express';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validateData(memberValidator), addMember);
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.put('/:id', validateData(memberValidator), updateMemberById);
router.delete('/:id', deleteMemberById);

// exporting the router object:
export default router;