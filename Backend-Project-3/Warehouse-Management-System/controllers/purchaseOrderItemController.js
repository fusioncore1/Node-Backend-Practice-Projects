// internal modules/packages:
import PurchaseOrderItem from '../models/purchaseOrderItemModel.js';

// controller function to add purchase order item:
const addPurchaseOrderItem = async (req, res, next) => {
	try {
		// getting validated data from request object:
		const data = req.validated;

		// getting unique data for purchase order item:
		const uniqueData = { purchaseOrderId: data.purchaseOrderId, productId: data.productId };

		// checking if the purchase order item exists or not:
		const purchaseOrderItemExists = await PurchaseOrderItem.findOne(uniqueData);

		//if purchase order item doesn't exist:
		if (!purchaseOrderItemExists) {
			// creating the data in db:
			const purchaseOrderItems = new PurchaseOrderItem(data);

			// saving data into db (db operations are always in async-await):
			await purchaseOrderItems.save();
		} else {
			// if data already exists we will send an error response:
			return res.status(409).send({     // 409 is status code for data confliction
				message: 'Purchase order item already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({     // 201 stands for proper data
			data: data,
			message: 'Purchase order item record added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all purchase order items:
const getAllPurchaseOrderItems = async (req, res, next) => {
	try {
		// getting all the data from purchase order items collection or table:
		const allPurchaseOrderItems = await PurchaseOrderItem.find();

		// if no data exists:
		if (!allPurchaseOrderItems) {
			return res.status(404).send({
				message: 'No purchase order item found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allPurchaseOrderItems,
			message: 'All purchase order items fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get purchase order item by id:
const getPurchaseOrderItemById = async (req, res, next) => {
	try {
		// getting purchase order item id from request parameters:
		const id = req.params.id;

		// getting data by id from purchase order items collection or table:
		const purchaseOrderItemById = await PurchaseOrderItem.findById(id);

		// if data doesn't exist:
		if (!purchaseOrderItemById) {
			return res.status(404).send({
				message: 'Purchase Order Item not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: purchaseOrderItemById,
			message: 'Purchase Order Item found',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update purchase order item by id:
const updatePurchaseOrderItemById = async (req, res, next) => {
	try {
		// getting purchase order item id from request parameters:
		const id = req.params.id;

		// getting the updated data from request body:
		const updatedData = req.body;

		// getting data by id from purchase order items collection or table and updating it:
		const updatePurchaseOrderItem = await PurchaseOrderItem.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true }
		);

		// if data not found and updated:
		if (!updatePurchaseOrderItem) {
			return res.status(404).send({
				message: 'Purchase Order Item not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'Purchase order item updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete purchase order item by id:
const deletePurchaseOrderItemById = async (req, res, next) => {
	try {
		// getting purchase order item id from request parameters:
		const id = req.params.id;

		// getting data by id from purchase order items collection or table and deleting it:
		const deletePurchaseOrderItem = await PurchaseOrderItem.findByIdAndDelete(id);

		// if purchase order item not found and deleted:
		if (!deletePurchaseOrderItem) {
			return res.status(404).send({
				message: 'Purchase order item not deleted',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletePurchaseOrderItem,
			message: 'Purchase order item deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addPurchaseOrderItem,
	getAllPurchaseOrderItems,
	getPurchaseOrderItemById,
	updatePurchaseOrderItemById,
	deletePurchaseOrderItemById,
};