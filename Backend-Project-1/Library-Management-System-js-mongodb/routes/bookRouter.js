// Internal modules/packages:
import validateData from '../middlewares/validate-middleware.js';
import {
	addBook,
	getAllBooks,
	getBookById,
	updateBookById,
	deleteBookById,
} from '../controllers/bookController.js';
import bookValidator from '../validators/bookValidator.js';

// External modules/packages:
import express from 'express';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validateData(bookValidator), addBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', validateData(bookValidator), updateBookById);
// router.put('/:id', updateBookById);  // Need to use different validator for update. Idk why, but using the one for add, creates issues.
router.delete('/:id', deleteBookById);

// exporting the router object:
export default router;