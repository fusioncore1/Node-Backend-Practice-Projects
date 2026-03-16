// internal packages/modules:
import Product from '../models/productModel.js';

// controller function to add product:
const addProduct = async (req, res, next) => {
	try {
		// getting validated data from the request object:
		const data = req.validated;

		// getting unique data:
		const uniqueProductData = { name: data.name, sku: data.sku };

		// checking if the product already exists:
		const productExists = await Product.findOne(uniqueProductData);

		// if data doesn't exist:
		if (!productExists) {
			// creating the data:
			const product = new Product(data);

			// saving the data to db (db operations are always in async-await):
			await product.save();
		} else {
			// if data exists we will send error response:
			return res.status(409).send({               // 409 status code is for data confliction
				message: 'Data already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({        // 201 status code for proper data
			data: data,
			message: 'Product added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all products:
const getAllProducts = async (req, res, next) => {
	try {
		// getting all the data from products collection or table:
		const allProducts = await Product.find();

		// if no products found:
		if (!allProducts) {
			return res.status(404).send({
				message: 'No products found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allProducts,
			message: 'All products fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get product by id:
const getProductById = async (req, res, next) => {
	try {
		// getting id from the request parameters:
		const id = req.params.id;

		// getting data from products table or collection:
		const productById = await Product.findById(id);

		// if the data doesn't exist:
		if (!productById) {
			return res.status(404).send({
				message: 'Product not found',
				success: false,
			});
		}

		// sending the response:
		res.status(200).send({
			data: productById,
			message: 'Product found',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update product by id:
const updateProductById = async (req, res, next) => {
	try {
		// getting product id from request parameters:
		const id = req.params.id;

		// getting updated data from request body:
		const updatedData = req.body;

		// getting data based on id from products collection or table and updating it:
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if product not found and updated:
		if (!updatedProduct) {
			return res.status(404).send({
				message: 'Product not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'Product updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete product by id:
const deleteProductById = async (req, res, next) => {
	try {
		// getting product id from request parameters:
		const id = req.params.id;

		// getting data by id from products collection or table and deleting it:
		const deleteProduct = await Product.findByIdAndDelete(id);

		// if product is not found and deleted:
		if (!deleteProduct) {
			return res.status(404).send({
				message: 'Product not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteProduct,
			message: 'Product found and deleted',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addProduct,
	getAllProducts,
	getProductById,
	updateProductById,
	deleteProductById,
};