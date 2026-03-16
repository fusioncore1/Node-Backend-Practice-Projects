// internal packages/modules:
import PurchaseOrder from '../models/purchaseOrderModel.js';

// controller function to add purchase order:
const addPurchaseOrder = async (req, res, next) => {
	try {
		// getting the validated data from request object:
		const data = req.validated;

		// getting the unique data:
		const uniqueData = { vendorId: data.vendorId, warehouseId: data.warehouseId, orderDate: data.orderDate };

		// checking if the data already exists or not:
		const purchaseOrderExists = await PurchaseOrder.findOne(uniqueData);

		// if the purchase order doesn't exists:
		if (!purchaseOrderExists) {
			// creating the db record:
			const purchaseOrder = new PurchaseOrder(data);

			// saving data into db (db operations are always in async-await):
			await purchaseOrder.save();
		} else {
			// if the purchase order exists then we will send the response:
			return res.status(409).send({       // 409 is the status code for data confliction
				message: 'Purchase Order already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({      // 201 is the status code for proper data insertion
			data: data,
			message: 'Purchase Order added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all purchase orders:
const getAllPurchaseOrders = async (req, res, next) => {
	try {
		// getting all the data from the purchase order collection or table:
		const allPurchaseOrders = await PurchaseOrder.find();

		// if no data exists:
		if (!allPurchaseOrders) {
			return res.status(404).send({
				message: 'No purchase order data found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allPurchaseOrders,
			message: 'All Purchase Orders fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get purchase order by id:
const getPurchaseOrderById = async (req, res, next) => {
	try {
		// getting purchase order id from request parameters:
		const id = req.params.id;

		// getting data based on id from purchase order collection or table:
		const purchaseOrderById = await PurchaseOrder.findById(id);

		// if purchase order doesn't exist:
		if (!purchaseOrderById) {
			return res.status(404).send({
				message: 'Purchase order not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: purchaseOrderById,
			message: 'Purchase Order found successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update purchase order by id:
const updatePurchaseOrderById = async (req, res, next) => {
	try {
		// getting purchase order id from request parameters:
		const id = req.params.id;

		// getting update data from request body:
		const updatedData = req.body;

		// getting data by id from purchase orders collection or table and updating it:
		const updatePurchaseOrder = await PurchaseOrder.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if data is not found and updated:
		if (!updatePurchaseOrder) {
			return res.status(404).send({
				message: 'Purchase Order not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'Purchase Order updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete purchase order by id:
const deletePurchaseOrderById = async (req, res, next) => {
	try {
		// getting id from request paramters:
		const id = req.params.id;

		// getting data by id from purchase orders collection or table and deleting it:
		const deletePurchaseOrder = await PurchaseOrder.findByIdAndUpdate(id);

		// if data doesn't exist:
		if (!deletePurchaseOrder) {
			return res.status(404).send({
				message: 'Purchase order not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletePurchaseOrder,
			message: 'Purchase order deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions by id:
export {
	addPurchaseOrder,
	getAllPurchaseOrders,
	getPurchaseOrderById,
	updatePurchaseOrderById,
	deletePurchaseOrderById,
};