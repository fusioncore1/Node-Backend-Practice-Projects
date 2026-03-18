// internal modules/packages:
import ShipmentItem from '../models/shipmentItemModel.js';

// controller function to add shipment item:
const addShipmentItem = async (req, res, next) => {
	try {
		// getting validated data from request object:
		const data = req.validated;

		// getting unique data:
		const uniqueData = { shipmentId: data.shipmentId, productId: data.productId };

		// checking if the shipment item already exists or not:
		const shipmentItemExists = await ShipmentItem.findOne(uniqueData);

		// if shipment item doesn't exist:
		if (!shipmentItemExists) {
			// creating data for db:
			const shipmentItem = new ShipmentItem(data);

			// saving the data into db (db operations are always in async-await):
			await shipmentItem.save();
		} else {
			// if data already exists, we will return it:
			return res.status(409).send({        // 409 status code for data confliction
				message: 'Shipment Item not added',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: data,
			message: 'Shipment Item added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all shipment items:
const getAllShipmentItems = async (req, res, next) => {
	try {
		// getting all the data from the shipment items collection or table:
		const allShipmentItems = await ShipmentItem.find();

		// if no data is found:
		if (!allShipmentItems) {
			return res.status(404).send({
				message: 'No shipment item data exist',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allShipmentItems,
			message: 'All shipment items fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get shipment item by id:
const getShipmentItemById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// finding data by id from shipment items collection or table:
		const shipmentItemById = await ShipmentItem.findById(id);

		// if shipment by id isn't found:
		if (!shipmentItemById) {
			return res.status(404).send({
				message: 'Shipment Item not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: shipmentItemById,
			message: 'Shipment item found successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update shipment item by id:
const updateShipmentItemById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting updated data from request body:
		const updatedData = req.body;

		// getting data by id from shipment item collection or table and updating it:
		const updateShipmentItem = await ShipmentItem.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true }
		);

		// if shipment item data is not found and updated:
		if (!updateShipmentItem) {
			return res.status(404).send({
				message: 'Shipment item data not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'Shipment item updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete shipment item by id:
const deleteShipmentItemById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from shipment item collection or table and deleting it:
		const deleteShipmentItem = await ShipmentItem.findByIdAndDelete(id);

		// if shipment item not found and deleted:
		if (!deleteShipmentItem) {
			return res.status(404).send({
				message: 'Shipment item not deleted',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteShipmentItem,
			message: 'Shipment item deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addShipmentItem,
	getAllShipmentItems,
	getShipmentItemById,
	updateShipmentItemById,
	deleteShipmentItemById,
}