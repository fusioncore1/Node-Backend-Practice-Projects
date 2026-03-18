// internal packages/modules:
import Shipment from '../models/shipmentModel.js';

// controller function to add shipment data:
const addShipment = async (req, res, next) => {
	try {
		// getting validated data from request object:
		const data = req.validated;

		// getting unique data:
		const uniqueData = { warehouseId: data.warehouseId, shipmentDate: data.shipmentDate, destination: data.destination };

		// checking if the shipment data already exists:
		const shipmentExists = await Shipment.findOne(uniqueData);

		// if shipment data doesn't exist:
		if (!shipmentExists) {
			// creating db record:
			const shipment = new Shipment(data);

			// saving data to db (db operations are always in async-await):
			await shipment.save();
		} else {
			// if data already exists, we will return error response:
			return res.status(409).send({
				message: 'Shipment data already exists',
				success: false,
			});     // 409 is status code for data confliction
		}

		// sending response:
		res.status(201).send({
			data: data,
			message: 'Shipment data added successfully',
			success: true,
		});      // 201 is the status code for recieving proper data
	} catch (error) {
		next(error);
	}
}

// controller function to get all shipment data:
const getAllShipments = async (req, res, next) => {
	try {
		// getting all the records from the shipments collection or table:
		const allShipments = await Shipment.find();

		// if no data exists:
		if (!allShipments) {
			return res.status(404).send({
				message: 'No shipment data found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allShipments,
			message: 'All shipment data fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get shipment data:
const getShipmentById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from shipment collections or table:
		const shipmentById = await Purchase.findById(id);

		// if shipment data doesn't exist:
		if (!shipmentById) {
			return res.status(404).send({
				message: 'Shipment not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: shipmentById,
			message: 'Shipment info found',
			success: false,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update shipment data:
const updateShipmentById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting updated data from request body:
		const updatedData = req.body;

		// getting data by id from shipment collection or table and updating it:
		const updateShipment = await Shipment.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if shipment doesn't exist:
		if (!updateShipment) {
			return res.status(404).send({
				message: 'Shipment not found',
				success: false,
			});
		}

		// sending response: 
		res.status(200).send({
			data: updatedData,
			message: 'Shipment updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete shipment data:
const deleteShipmentById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from shipment collection or table and deleting it:
		const deleteShipment = await Shipment.findByIdAndDelete(id);

		// if data isn't found and deleted:
		if (!deleteShipment) {
			return res.status(404).send({
				message: 'Shipment not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteShipment,
			message: 'Shipment deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addShipment,
	getAllShipments,
	getShipmentById,
	updateShipmentById,
	deleteShipmentById,
}