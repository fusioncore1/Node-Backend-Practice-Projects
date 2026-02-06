// Internal modules/packages:
import Rental from '../models/rentalModel.js';

// Controller function to add Equipment Rental Data:
const addRentalData = async (req, res, next) => {
	try {
		// getting data from `req.validatedData` without any need for imports:
		const data = req.validatedData;

		// getting the user id and equipment id: 
		const rentalData = { userId: data.userId, equipmentId: data.equipmentId };

		// checking if the rental data exists:
		const rentalDataExists = await Rental.findOne(rentalData);

		// if the rental Data doesn't exist, we will create the one:
		if (!rentalDataExists) {
			// creating a new data in the database:
			const rentalDataInDB = new Rental(data);

			// saving data in mongodb (db operations always need to be in async-await):
			await rentalDataInDB.save();
		} else {
			return res.status(409).send({   // Response code '409': Indicates conflict error with the data sent to the server.
				message: 'Rental Data already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: {
				UserId: data.userId,
				EquipmentId: data.equipmentId,
			},
			message: 'Rental Data added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get all Equipment Rental Data:
const getAllRentalData = async (req, res, next) => {
	try {
		// getting all the rental data from the rental collection or table:
		const allRentals = await Rental.find();

		// if no data exists:
		if (!allRentals) {
			return res.status(404).send({
				message: 'No data found for rentals',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allRentals,
			message: 'All the rentals data fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get Equipment Rental Data By Id:
const getRentalDataById = async (req, res, next) => {
	try {
		// getting rental id from the parameters:
		const rentalDataId = req.params.id;

		// getting data from the rentals collection or table:
		const rentalById = await Rental.findById(rentalDataId);

		// if no rental data exists:
		if (!rentalById) {
			return res.status(404).send({
				message: `Rental Data by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: rentalById,
			message: `Rental Data by id found`,
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update Equipment Rental Data By Id:
const updateRentalDataById = async (req, res, next) => {
	try {
		// getting rental id from the request parameters:
		const rentalDataId = req.params.id;

		// getting rental data from the user:
		const updatedData = req.validatedData;

		// getting data from rentals collection or table and updating it:
		const updatedRentalById = await Rental.findByIdAndUpdate(
			rentalDataId,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if rental data is not found and updated:
		if (!updatedRentalById) {
			return res.status(404).send({
				message: 'Rental data not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedRentalById,
			message: 'Rental data updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete Equipment Rental Data By Id:
const deleteRentalDataById = async (req, res, next) => {
	try {
		// getting rental data id from the parameters:
		const rentalDataId = req.params.id;

		// getting data from the rental collection or table based on id and deleting it:
		const deletedRentalData = await Rental.findByIdAndDelete(rentalDataId);

		// if data is not found and deleted:
		if (!deletedRentalData) {
			return res.status(404).send({
				message: 'Rental data not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedRentalData,
			message: 'Rental data deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Exporting all the controller functions:
export {
	addRentalData,
	getAllRentalData,
	getRentalDataById,
	updateRentalDataById,
	deleteRentalDataById,
};