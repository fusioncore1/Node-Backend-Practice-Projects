// internal libraries/packages/modules:
import Warehouse from '../models/warehouseModel.js';

// controller function to add warehouse:
const addWarehouse = async (req, res, next) => {
	try {
		// getting validated data from request object:
		const data = req.validated;

		// getting unique data:
		const uniqueData = {
			name: data.name,
			location: data.location,
			city: data.city,
			country: data.country,
			managerName: data.managerName,
			contactNumber: data.contactNumber
		};

		// checking if the warehouse already exists or not:
		const warehouseExists = await Warehouse.findOne(uniqueData);

		// if warehouse doesn't exists we'll insert data or we'll send error response:
		if (!warehouseExists) {
			// creating data for db:
			const warehouse = new Warehouse(data);

			// saving the data in db (db operations are always in async-await):
			await warehouse.save();
		} else {
			return res.status(409).send({
				message: 'Warehouse already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: data,
			message: 'Warehouse added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all warehouses:
const getAllWarehouses = async (req, res, next) => {
	try {
		// getting all data from warehouse collection or table:
		const allWarehouses = await warehouse.find();

		// if no warehouse exists:
		if (!allWarehouses) {
			return res.status(404).send({
				message: 'No warehouse data found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allWarehouses,
			message: 'All warehouses fetched successfully',
			success: false,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get warehouse by id:
const getWarehouseById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from warehouse collection or table:
		const warehouseById = await Warehouse.findById(id);

		// if warehouse by id not found:
		if (!warehouseById) {
			return res.status(404).send({
				message: 'Warehouse not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: warehouseById,
			message: 'Warehouse found successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update warehouse by id:
const updateWarehouseById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting updated data from request body:
		const updatedData = req.body;

		// getting data by id from warehouses collection or table and updating it:
		const updateWarehouse = await Warehouse.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if data isn't found and updated:
		if (!updateWarehouse) {
			return res.status(404).send({
				message: 'Warehouse not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'Warehouse updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete warehouse by id:
const deleteWarehouseById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from warehouses collection or table and deleting it:
		const deleteWarehouse = await Warehouse.findByIdAndDelete(id);

		// if data isn't found and deleted:
		if (!deleteWarehouse) {
			return res.status(404).send({
				message: 'Warehouse not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteWarehouse,
			message: 'Warehouse deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addWarehouse,
	getAllWarehouses,
	getWarehouseById,
	updateWarehouseById,
	deleteWarehouseById,
}