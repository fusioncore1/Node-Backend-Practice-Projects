// internal modules/packages:
import Vendor from '../models/vendorModel.js';

// controller function to add vendor:
const addVendor = async (req, res, next) => {
	try {
		// getting validated data from request object:
		const data = req.validated;

		// getting unique data:
		const uniqueData = { name: data.name, contactPerson: data.contactPerson, email: data.email, phone: data.phone };

		// checking if the vendor already exists or not:
		const vendorExists = await Vendor.findOne(uniqueData);

		// if the data doesn't exist we will create it, or else we will send response error:
		if (!vendorExists) {
			// creating db record:
			const vendor = new Vendor(data);

			// saving data into db (db operations are always in async-await):
			await vendor.save();
		} else {
			return res.status(409).send({
				message: 'Failed to add vendor',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: data,
			message: 'Vendor added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get all vendors:
const getAllVendors = async (req, res, next) => {
	try {
		// getting all the data from vendors collection or table:
		const allVendors = await Vendor.find();

		// if no vendor data exists:
		if (!allVendors) {
			return res.status(404).send({
				message: 'No vendors found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allVendors,
			message: 'All vendors fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to get vendor by id:
const getVendorById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from vendors collection or table:
		const vendorById = await Vendor.findById(id);

		// if vendor data isn't found:
		if (!vendorById) {
			return res.status(404).send({
				message: 'Vendor by id not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: vendorById,
			message: 'Vendor found successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to update vendor by id:
const updateVendorById = async (req, res, next) => {
	try {
		// getting id from the request parameters:
		const id = req.params.id;

		// getting updated data from request body:
		const updatedData = req.body;

		// getting data by id from vendors collection or table and updating it:
		const updateVendor = await Vendor.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if vendor data isn't found and updated:
		if (!updateVendor) {
			return res.status(404).send({
				message: 'Vendor not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedData,
			message: 'Vendor data updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// controller function to delete vendor by id:
const deleteVendorById = async (req, res, next) => {
	try {
		// getting id from request parameters:
		const id = req.params.id;

		// getting data by id from vendors collection or table and deleting it:
		const deleteVendor = await Vendor.findByIdAndDelete(id);

		// if vendor data isn't found and deleted:
		if (!deleteVendor) {
			return res.status(404).send({
				message: 'Vendor not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteVendor,
			message: 'Vendor deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addVendor,
	getAllVendors,
	getVendorById,
	updateVendorById,
	deleteVendorById,
};