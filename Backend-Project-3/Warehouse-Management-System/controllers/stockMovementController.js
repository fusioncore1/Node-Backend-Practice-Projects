// internal packages/modules:
import StockMovement from '../models/stockMovementModel.js';

// controller function to add stock movement data:
const addStockMovement = async (req, res, next) => {
	try {
		// getting validated data from request object:
		const data = req.validated;

		// getting unique data:
		const uniqueData = { productId, warehouseId, type, referenceType, referenceId };

		// checking if the data exists:
		const stockMovementExists = await StockMovement.findOne(uniqueData);

		// if stock movement data doesn't exist we will add it or we will return an error:
		if (!stockMovementExists) {
			// creating record for db:
			const stockMovement = new StockMovement(data);

			// saving the record into db (db operations are always in async-await):
			await stockMovement.save();
		} else {
			return res.status(409).send({
				message: 'Stock movement not added',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: data,
			message: 'Stock movement added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all stock movement data:
const getAllStockMovements = async (req, res, next) => {
	try {
		// getting all the data from the stock movements collection or table:
		const allStockMovements = await StockMovement.find();

		// if no data was found:
		if (!allStockMovements) {
			return res.status(404).send({
				message: 'No stock movements data found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allStockMovements,
			message: 'Stock movements data fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get stock movement data by id:
const getStockMovementById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from stock movements collection or table:
		const stockMovementById = await StockMovement.findById(id);

		// if stock movement by id not found:
		if (!stockMovementById) {
			return res.status(404).send({
				message: 'Stock Movement data not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: stockMovementById,
			message: 'Stock Movement data found successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update stock movement data by id:
const updateStockMovementById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting updated data from the request body object:
		const updatedData = req.body;

		// getting data by id from the stock movements collection or table and updating it:
		const updateStockMovement = await StockMovement.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if data isn't found and updated:
		if (!updateStockMovement) {
			return res.status(404).send({
				message: 'Stock movement data not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'Stock movement data updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete stock movement data by id:
const deleteStockMovementById = async (req, res, next) => {
	try {
		// getting id from the request parameters:
		const id = req.params.id;

		// getting data by id from the stock movement collection or table and deleting it:
		const deleteStockMovement = await StockMovement.findByIdAndDelete(id);

		// if data isn't found and deleted:
		if (!deleteStockMovement) {
			return res.status(404).send({
				message: 'Stock movement data not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteStockMovement,
			message: 'Stock movement data deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addStockMovement,
	getAllStockMovements,
	getStockMovementById,
	updateStockMovementById,
	deleteStockMovementById,
};