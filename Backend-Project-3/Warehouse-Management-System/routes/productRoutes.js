// external packages/modules:
import express from 'express';

// internal packages/modules:
import validate from '../middlewares/validate-middleware.js';
import productValidator from '../validators/productValidator.js';
import {
	addProduct,
	getAllProducts,
	getProductById,
	updateProductById,
	deleteProductById,
} from '../controllers/productController.js';

// creating router object:
const router = express.Router();

// creating routes:
router.post('/', validate(productValidator), addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

// exporting router object:
export default router;