// internal packages/modules:
import Inventory from '../models/inventoryModel.js';

// controller function to add inventory data:
const addInventory = async (req, res, next) => {
	try {
		// getting validated data from the request object:
		const data = req.validated;

		// getting unique data:
		const uniqueInventoryData = { productId: data.productId, warehouseId: data.warehouseId };

		// checking if the inventory already exists:
		const inventoryExists = await Inventory.findOne(uniqueInventoryData);

		// if data doesn't exist:
		if (!inventoryExists) {
			// creating the data:
			const inventory = new Inventory(data);

			// saving the data into mongodb (db operations are always in async-await):
			await inventory.save();
		} else {
			// we'll send the response if data already exists:
			return res.status(409).send({                // 409 is the status code for data confliction
				message: 'Inventory already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({        // 201 for data is correct and received
			data: uniqueInventoryData,
			message: 'Inventory successfully added',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all inventory data:
const getAllInventory = async (req, res, next) => {
	try {
		// getting all inventory data from the inventory collection or table:
		const allInventory = await Inventory.find();

		// if no data exists:
		if (!allInventory) {
			// sending response for no inventory exists:
			return res.status(404).send({
				message: 'No inventory data found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allInventory,
			message: 'All inventory data successfully fetched',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get inventory data by id:
const getInventoryById = async (req, res, next) => {
	try {
		// getting the inventory id from request parameters:
		const id = req.params.id;

		// getting the inventory data from inventory collection or table by id:
		const inventoryById = await Inventory.findById(id);

		// if no inventory exists:
		if (!inventoryById) {
			return res.status(404).send({
				message: 'Inventory not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: inventoryById,
			message: 'Inventory by id found',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update inventory data by id:
const updateInventoryById = async (req, res, next) => {
	try {
		// getting inventory id from request parameters:
		const id = req.params.id;

		// getting the updated data from request body:
		const updatedInventoryData = req.body;

		// getting the data from inventory collection or table based on id and updating it:
		const updateInventory = await Inventory.findByIdAndUpdate(
			id,
			updatedInventoryData,
			{ new: true, runValidators: true },
		);

		// if inventory is not found and updated:
		if (!updateInventory) {
			return res.status(404).send({
				message: 'Inventory not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedInventoryData,
			message: 'Inventory updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete inventory data by id:
const deleteInventoryById = async (req, res, next) => {
	try {
		// getting the inventory id from request parameters:
		const id = req.params.id;

		// getting data from inventory collection or table based on id and deleting it:
		const deleteInventory = await Inventory.findByIdAndDelete(id);

		// if data not found and deleted:
		if (!deleteInventory) {
			return res.status(404).send({
				message: 'Inventory not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteInventory,
			message: 'Inventory deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addInventory,
	getAllInventory,
	getInventoryById,
	updateInventoryById,
	deleteInventoryById,
};