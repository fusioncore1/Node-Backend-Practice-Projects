// Internal modules/packages:
import validateData from '../middlewares/validate-middleware.js';
import issueRecordValidator from '../validators/issueRecordValidator.js';
import {
	addIssuedBook,
	getAllIssuedBooks,
	getIssuedBookById,
	updateIssuedBookById,
	deleteIssuedBookById,
} from '../controllers/issueRecordController.js';

// External modules/packages:
import express from 'express';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validateData(issueRecordValidator), addIssuedBook);
router.get('/', getAllIssuedBooks);
router.get('/:id', getIssuedBookById);
router.put('/:id', validateData(issueRecordValidator), updateIssuedBookById);
router.delete('/:id', deleteIssuedBookById);

// exporting the router object:
export default router;